(ns tsask.user.crud
  (:use tsask.env
        tsask.util
        tsask.pages.template-pg
        com.reasonr.scriptjure
        digest
        hiccup.page
        hiccup.core)
  (:require [clojure.java.jdbc :as j]
            [clojure.java.jdbc.sql :as sql]
            [clj-http.client :as client]))

(defn- redirect [url]
  {:status 302
   :headers {"Location" url}
   :body ""})

(def user-files ["/css/common.css" "/css/fix.css" "/js/jquery-1.7.2.js" "/js/DD_belatedPNG.js" "/js/layout.js" "/js/login.js" "/js/user.js"])

(defn index [sort sort-type]
  (let [users (j/query SQLDB
                       (sql/select [:id :username :email_address :first_name :last_name] :user
                                   (if sort (sql/order-by {(keyword sort) (keyword sort-type)}))))
        opposite-sort-type {"desc" "asc", "asc" "desc", nil "asc"}]
    (binding [*js-css-files* user-files]
      (pages
       [:dl.txtcont
        [:dt [:div.ltit [:strong "Userss List"]] [:div.clear]]
        [:form {:method "post" :action "/forms/batch/action"}
         [:dd
          [:div.fc_con
           [:table.fcc_tab {:width "100%" :cellspacing "0" :cesspadding "0" :border "0"}
            [:tr
             [:th#sf_admin_list_batch_actions [:input#sf_admin_list_batch_checkbox {:type "checkbox" :onclick "checkAll()"}]]
             [:th.sf_admin_text.sf_admin_list_th
              [:a {:href (str "/users?sort=username&sort_type=" (opposite-sort-type sort-type))} "Username"]
              (if (= sort "username") [:img {:src (str "/images/" sort-type ".png")}])]
             [:th.sf_admin_list_th "Role"]
             [:th.sf_admin_text.sf_admin_list_th
              [:a {:href (str "/users?sort=email_address&sort_type=" (opposite-sort-type sort-type))} "Email Address"]
              (if (= sort "email_address") [:img {:src (str "/images/" sort-type ".png")}])]
             [:th.sf_admin_text.sf_admin_list_th
              [:a {:href (str "/users?sort=last_name&sort_type=" (opposite-sort-type sort-type))} "Last Name"]
              (if (= sort "first_name") [:img {:src (str "/images/" sort-type ".png")}])]
             [:th.sf_admin_text.sf_admin_list_th
              [:a {:href (str "/users?sort=first_name&sort_type=" (opposite-sort-type sort-type))} "First Name"]
              (if (= sort "last_name") [:img {:src (str "/images/" sort-type ".png")}])]
             [:th.sf_admin_list_th "Actions"]]
            (for [user users]
              (let [role-names (j/query SQLDB [(str "select r.name from role r, hasrole h where r.id = h.role_id AND h.user_id = " (:id user))])
                    role-name (clojure.string/join (for [n role-names] (str (:name n) " ")))]
              [:tr
               [:td [:input.sf_admin_batch_checkbox {:type "checkbox" :value (:id user) :name "ids[]"}]]
               [:td.sf_admin_text.sf_admin_list_td_username [:a {:href (str "/user/" (:id user) "/edit")} (:username user)]]
               [:td.sf_admin_text.sf_admin_list_td_email_address role-name]
               [:td.sf_admin_text.sf_admin_list_td_email_address (:email_address user)]
               [:td.sf_admin_text.sf_admin_list_td_first_name (:first_name user)]
               [:td.sf_admin_text.sf_admin_list_td_last_name (:last_name user)]
               [:td [:ul.sf_admin_td_actions
                     [:li.sf_admin_action_edit [:a {:href (str "/user/" (:id user) "/edit")} "Edit"]]
                     [:li.sf_admin_action_delete [:a {:href (str "/user/" (:id user) "/delete")
                                                      :onclick (js (return (confirm "are you sure")))} "Delete"]]]]]))]]]
        [:script {:type "text/javascript"}
         (js (fn checkAll []
               (var checkboxes (.getElementsByName document "ids[]"))
               (doseq [i checkboxes]
                 (set! (.. (aget checkboxes i) checked)
                       (.. (.getElementById document "sf_admin_list_batch_checkbox") checked)))))]]]))))

(defn delete [id]
  (j/delete! SQLDB :user (sql/where {:id id}))
  (j/delete! SQLDB :hasrole (sql/where {:user_id id}))
  (redirect "/users"))


(defn user-design-pages [& [user]]
  (binding [*js-css-files* user-files]
  (pages
    [:dl.txtcont
      [:form#user_form {:method "post" :action (.replace (str "/user/" (:id user) "/create") "//" "/") :onsubmit "return validateForm()"}
        [:dt
          [:div.ltit [:strong "User Builder"]]
          [:div.rbtns
          [:ul.sf_admin_actions
            [:li.sf_admin_action_save [:input {:type "submit" :value "SAVE"}]]
            [:li.sf_admin_action_list [:a {:href "/users"} "CANCEL"]]]]
          [:div.clear]]
          [:div.forms_cont
            [:div.fc_tit
              [:table.fct_tab {:width "100%" :border "0" :cellspacing "0" :cellpadding "0"}
                [:tr [:th "User information"]]]]
            [:div.fc_con.userbuil_box
              [:div.sf_admin_form
                [:fieldset#sf_fieldset_user
                  [:div.fc_con.userbuil_box
                    [:table.ub_tab {:width "100%" :border "0" :cellspacing "0" :cellpadding "0"}
                      [:tr
                        [:th {:width "20px"}]
                        [:td
                          [:table
                           (let [all-roles (j/query SQLDB [(str "select id, name from role")])
                                 has-roles (if (nil? user); if new user, default to be user. otherwise query haswole table
                                             (j/query SQLDB [(str "select h.role_id from hasrole h, role r where r.name = 'user' AND h.role_id = r.id")])
                                             (j/query SQLDB [(str "select role_id from hasrole where user_id = " (:id user))]))
                                 in-has-roles? (fn [id]
                                                 (reduce #(or %1 %2) false
                                                         (for [role has-roles]
                                                           (= id (:role_id role)))))]
                             [:tr [:td (for [role all-roles]
                                    [:input {:type "checkbox"
                                             :name "hasrole[]"
                                             :value (:id role)
                                             :checked (in-has-roles? (:id role))}
                                     (:name role)]
                                    )]])
                            [:tr
                              [:td [:input#sf_guard_user_first_name {:type "text" :name "first_name" :value (:first_name user)}] [:br]
                              [:span.fonti [:label {:for "sf_guard_user_first_name"} "First Name"]]]
                              [:div.sf_admin_form_row.sf_admin_text.sf_admin_form_field_first_name]]]]]
                      [:tr
                        [:th {:width "20px"}]
                        [:td
                          [:table
                            [:tr
                              [:td [:input#sf_guard_user_last_name {:type "text" :name "last_name" :value (:last_name user)}] [:br]
                              [:span.fonti [:label {:for "sf_guard_user_last_name"} "Last Name"]]]
                              [:div.sf_admin_form_row.sf_admin_text.sf_admin_form_field_last_name]]]]]
                      [:tr
                        [:th {:width "20px"}]
                        [:td
                          [:table
                            [:tr
                              [:td [:input#sf_guard_user_email_address {:type "text" :name "email_address" :value (:email_address user)}] [:br]
                              [:span.fonti [:label {:for "sf_guard_user_email_address"} "Email Address"]]]
                              [:div.sf_admin_form_row.sf_admin_text.sf_admin_form_field_email_address]]]]]
                      [:tr
                        [:th {:width "20px"}]
                        [:td
                          [:table
                            [:tr
                              [:td [:input#sf_guard_user_username {:type "text" :name "username" :value (:username user)}] [:br]
                              [:span.fonti [:label {:for "sf_guard_user_username"} "Username"]]]
                              [:div.sf_admin_form_row.sf_admin_text.sf_admin_form_field_username]]]]]
                      [:tr
                        [:th {:width "20px"}]
                        [:td
                          [:table
                            [:tr
                              [:td [:input#sf_guard_user_password {:type "password" :name "password"}] [:br]
                              [:span.fonti [:label {:for "sf_guard_user_password"} "Password"]]]
                              [:div.sf_admin_form_row.sf_admin_text.sf_admin_form_field_password]]]]]
                      [:tr
                        [:th {:width "20px"}]
                        [:td
                          [:table
                            [:tr
                              [:td [:input#sf_guard_user_password_again {:type "password" :name "password_again"}] [:br]
                              [:span.fonti [:label {:for "sf_guard_user_password_again"} "Password (again)"]]]
                              [:div.sf_admin_form_row.sf_admin_text.sf_admin_form_field_password_again]]]]]]]]]]]]])))

(defn edit [id]
  (binding [*js-css-files* user-files]
    (let [user (first (j/query SQLDB
                               (sql/select [:id :username :email_address :first_name :last_name] :user
                                           (sql/where {:id id}))))]
      (user-design-pages user))))

(defn new []
  (binding [*js-css-files* user-files]
    (user-design-pages)))

;(defn create [params]
;  (prn (:hasrole params))
;  )

(defn create [params]
  (let [user (j/insert! SQLDB :user
                        {:username 	(:username params)
                         :email_address	(:email_address params)
                         :first_name 	(:first_name params)
                         :last_name        (:last_name params)
                         :password         (digest/sha-256 (:password params))
                         :created_at	(.getTime (java.util.Date.))
                         :updated_at	(.getTime (java.util.Date.))})]
    (doseq [role-id (:hasrole params)]
      (j/insert! SQLDB :hasrole
                 {:user_id (get_last_id user)
                  :role_id role-id}))
    (redirect "/users")))

(defn update [params]
  (if (empty? (:password params))
    (j/update! SQLDB :user
               {:username 	(:username params)
                :email_address	(:email_address params)
                :first_name 	(:first_name params)
                :last_name      (:last_name params)
                :updated_at	(.getTime (java.util.Date.))}
              (sql/where {:id (:id params)}))
    (j/update! SQLDB :user
               {:username 	(:username params)
                :email_address	(:email_address params)
                :first_name 	(:first_name params)
                :last_name      (:last_name params)
                :password       (digest/sha-256 (:password params))
                :updated_at	(.getTime (java.util.Date.))}
              (sql/where {:id (:id params)})))
  (j/delete! SQLDB :hasrole (sql/where {:user_id (:id params)}))
  (doseq [role-id (:hasrole params)]
      (j/insert! SQLDB :hasrole
                 {:user_id (:id params)
                  :role_id role-id}))
  (redirect "/users"))

(defmacro apply-macro [macro coll]
  (cons macro coll))
