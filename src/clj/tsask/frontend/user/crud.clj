(ns tsask.frontend.user.crud
  (:use tsask.env
        tsask.util
        com.reasonr.scriptjure
        digest
        hiccup.page
        hiccup.core)
  (:require [clojure.java.jdbc :as j]
            [clojure.java.jdbc.sql :as sql]
            [clj-http.client :as client]
            [tsask.frontend.pages.template-pg :as template]))

(defn- redirect [url]
  {:status 302
   :headers {"Location" url}
   :body ""})

(defn user-design-pages [& [user session]]
  (binding [template/*js-css-files* template/user-files]
  (template/pages
    [:dl.txtcont
      [:form#user_form {:method "post" :action (if user (str "/fuser/" (:id user) "/update")
                                                 (str "/fuser/create"))
                        :onsubmit "return validateForm()"}
        [:dt
          [:div.ltit (if (not-empty user)
                       [:strong "Edit account"]
                       [:strong "Sign up as new User"])]

          [:div.clear]]
        [:div {:style "background: #555; color: #fff; font-size: 20px; width: 90%; padding: 5px; margin-left: 10px;"} "Your Personal Details"]
        [:div {:style "margin-left: 15px; padding: 10px;"}
          [:span "Username *" (apply str (repeat 2 "&nbsp;"))]
          [:input {:type "text" :name "username" :value (:username user)}]
          [:br] [:br]
          [:span "First Name *" (apply str (repeat 1 "&nbsp;"))]
          [:input {:type "text" :name "first_name" :value (:first_name user)}]
          [:br] [:br]
          [:span "Last Name *" (apply str (repeat 1 "&nbsp;"))]
          [:input {:type "text" :name "last_name" :value (:last_name user)}]
          [:br] [:br]
          [:span "Email *" (apply str (repeat 8 "&nbsp;"))]
          [:input {:type "text" :name "email_address" :value (:email_address user)}]
          [:br] [:br]
          [:span "Telephone *" (apply str (repeat 1 "&nbsp;"))]
          [:input {:type "text" :name "tel" :value (:tel user)}]
          [:br] [:br]
          [:span "Fax" (apply str (repeat 13 "&nbsp;"))]
          [:input {:type "text" :name "fax" :value (:fax user)}]
          ]
        [:div {:style "background: #555; color: #fff; font-size: 20px; width: 90%; padding: 5px; margin-left: 10px;"} "Your Address Information"]
        [:div {:style "margin-left: 15px; padding: 10px;"}
          [:span "Company " (apply str (repeat 8 "&nbsp;"))]
          [:input {:type "text" :name "company":value (:company user)}]
          [:br] [:br]
          [:span "Company ID" (apply str (repeat 5 "&nbsp;"))]
          [:input {:type "text" :name "company_id":value (:company_id user)}]
          [:br] [:br]
          [:span "Address * " (apply str (repeat 8 "&nbsp;"))]
          [:input {:type "text" :name "address":value (:address user)}]
          [:br] [:br]
          [:span "City * " (apply str (repeat 14 "&nbsp;"))]
          [:input {:type "text" :name "city" :value (:city user)}]
          [:br] [:br]
          [:span "Postal Code * " (apply str (repeat 3 "&nbsp;"))]
          [:input {:type "text" :name "post" :value (:post user)}]
          [:br] [:br]
          [:span "Country * " (apply str (repeat 8 "&nbsp;"))]
          [:select {:type "text" :name "country"}
           [:option {:value 0} "-----Country----"]
           (let [countries (j/query SQLDB ["select id, name from country"])]
             (for [country countries]
               (if (= (:id country) (:country_id user))
                 [:option {:value (:id country) :selected "selected"}(:name country)]
                 [:option {:value (:id country)}(:name country)]
                 )))]
          [:br] [:br]
          [:span "Region/State * " (apply str (repeat 1 "&nbsp;"))]
          [:select {:type "text" :name "region"}
           (let [regions (j/query SQLDB ["select id, name from region"])]
             (for [region regions]
               (if (= (:id region) (:region_id user))
                 [:option {:value (:id region) :selected "selected"}(:name region)]
                 [:option {:value (:id region)}(:name region)]
                 )))]
          [:br] [:br]
         ]
        [:div {:style "background: #555; color: #fff; font-size: 20px; width: 90%; padding: 5px; margin-left: 10px;"} "Your Password"]
        [:div {:style "margin-left: 15px; padding: 10px;"}
          [:span "Password * " (apply str (repeat 13 "&nbsp;"))]
          [:input {:type "password" :name "password"}]
          [:br] [:br]
          [:span "Password Confirm * " (apply str (repeat 1 "&nbsp;"))]
          [:input#sf_guard_user_password_again {:type "password" :name "password_again"}]
          [:br] [:br]

         ]
        [:div {:style "background: #555; color: #fff; font-size: 20px; width: 90%; padding: 5px; margin-left: 10px;"} "Newsletter"]
        [:div {:style "margin-left: 15px; padding: 10px;"}
         [:span "Subscribe: * " (apply str (repeat 4 "&nbsp;"))]
         (if (= 1 (:subscribe user))
           [:input {:name "subscribe" :type "radio" :value "1" :checked "checked"}]
           [:input {:name "subscribe" :type "radio" :value "1"}])
         [:span "Yes " (apply str (repeat 2 "&nbsp;"))]
         (if (= 0 (:subscribe user))
           [:input {:name "subscribe" :type "radio" :value "0" :checked "checked"}]
           [:input {:name "subscribe" :type "radio" :value "0"}]
           )
         [:span "No " (apply str (repeat 2 "&nbsp;"))]
         ]
         [:br][:br][:br]
         [:span (apply str (repeat 24 "&nbsp;"))]
         [:input {:type "checkbox" :name "tos"} (apply str (repeat 2 "&nbsp;")) "I have read and agree to the Terms and Conditions."]
         [:div.rbtns
            [:ul.sf_admin_actions
              [:li.sf_admin_action_save [:input {:type "submit" :value "Save"}]]
              [:li.sf_admin_action_list [:a {:href "/fuser/orders"} "CANCEL"]]]]
         [:br] [:br] [:br] [:br] [:br]
       ]] session)))

(defn edit [id]
  (binding [template/*js-css-files* template/user-files
            template/*sub-nav*
            [:div.subnav
               [:a.newform {:href "/fuser/accounts" :title "accounts"} "Edit Account"]
               [:a.newform {:href "/fuser/orders" :title "accounts"} "Orders"]
               [:a.newuser {:href "/fuser/signup" :title "new user"} "New User"]]]
    (let [user (first (j/query SQLDB
                               (sql/select [:id :username :tel :fax :company :company_id :address :city :post :country_id :region_id :subscribe :email_address :first_name :last_name] :user
                                           (sql/where {:id id}))))]
      (user-design-pages user))))

(defn accounts [session]
  (binding [template/*js-css-files* template/user-files
            template/*sub-nav*
            [:div.subnav
               [:a.newform {:href "/fuser/accounts" :title "accounts"} "Edit Account"]
               [:a.newform {:href "/fuser/orders" :title "accounts"} "Orders"]
               [:a.newuser {:href "/fuser/signup" :title "new user"} "New User"]]]
    (let [user (first (j/query SQLDB
                               (sql/select [:id :username :tel :fax :company :company_id :address :city :post :country_id :region_id :subscribe :email_address :first_name :last_name] :user
                                           (sql/where {:id (:login session)}))))]
      (user-design-pages user session))))

(comment "fun zone"
(use 'clojure.repl)
(use 'clojure.pprint)
(doc j/query)
(def user-id 1)
(j/query SQLDB [(str "select * from cartorder where user_id = 2")])
(j/query SQLDB ["select user_id from cartorder;"])
)

(defn orders
  "show cartorders made by current user"
  [session]
  (let [orders (if (:login session)
        (not-empty (j/query SQLDB ["select id, form_id, user_id, form_name, user_name, total_cost_paid, date_completed, order_content, created_at, updated_at, status, quantity from sa_orders where user_id = ?" (:login session)]))
        (not-empty (j/query SQLDB ["select id, form_id, user_id, form_name, user_name, total_cost_paid, date_completed, order_content, created_at, updated_at, status, quantity from sa_orders where user_id = ?" (:anonymous session)])))]
    (binding [template/*js-css-files* ["/css/main.css" "/css/fcommon.css"]
              template/*sub-nav*
              [:div.subnav
               [:a.newform {:href "/fuser/accounts" :title "accounts"} "Edit Account"]
               [:a.newform {:href "/fuser/orders" :title "accounts"} "Orders"]
               [:a.newuser {:href "/fuser/signup" :title "new user"} "New User"]]]
      (template/pages
        [:dl.txtcont
         [:dt [:div.ltit [:strong "Orders List"]] [:div.clear]]
         [:form {:method "post"}
          [:dd
           [:div.fc_con
            [:table.fcc_tab {:width "100%" :cellspacing "0" :cellpadding "0" :border "0"}
             [:tr
              [:th.sf_admin_list_th "ID"]
              [:th.sf_admin_text.sf_admin_list_th
               "Form Name"]
              [:th.sf_admin_list_th "quantity"]
              [:th.sf_admin_list_th "price"]
              [:th.sf_admin_list_th "Actions"]]
             (for [order orders]
               [:tr
                [:td.sf_admin_text.sf_admin_list_td_form_name (:form_id order)]
                [:td.sf_admin_text.sf_admin_list_td_form_name (:form_name order)]
                [:td.sf_admin_text.sf_admin_list_td_form_name (:quantity order)]
                [:td.sf_admin_text.sf_admin_list_td_form_name "$"(:total_cost_paid order)]
                [:td [:ul.sf_admin_td_actions
                      (if (= 1 (:status order))
                        [:li.sf_admin_action_delete [:a {:href (str "/fuser/" (:id order) "/view/orders")} [:i.fa.fa-search-plus] " view form"]]
                        [:li.sf_admin_action_delete [:a {:href (str "/form/" (:form_id order) "/" (:id order) "/fill")} [:i.fa.fa-pencil] " fill form"]])
                      ]]])
             ]]]]] session))))

(defn signup []
  (binding [template/*js-css-files* template/user-files
            template/*sub-nav*
            [:div.subnav
             [:a.newform {:href "/fuser/accounts" :title "accounts"} "Edit Account"]
             [:a.newform {:href "/fuser/orders" :title "accounts"} "Orders"]
             [:a.newuser {:href "/fuser/signup" :title "new user"} "New User"]]]
    (user-design-pages)))

(defn create [params]
  (if (= 0 (count (j/query SQLDB ["select * from user where username = ?" (:username params)])))
    (let [user (j/insert! SQLDB :user
                          {:username 	(:username params)
                           :tel (:tel params)
                           :fax (:fax params)
                           :company (:company params)
                           :company_id (:company_id params)
                           :address (:address params)
                           :city (:city params)
                           :post (:post params)
                           :country_id (:country params)
                           :region_id (:region params)
                           :subscribe (:subscribe params)
                           :email_address	(:email_address params)
                           :first_name 	(:first_name params)
                           :last_name        (:last_name params)
                           :password         (digest/sha-256 (:password params))
                           :created_at	(.getTime (java.util.Date.))
                           :updated_at	(.getTime (java.util.Date.))})]
      (j/insert! SQLDB :hasrole
                 {:user_id (get_last_id user)
                  :role_id (:id (first (j/query SQLDB ["select id from role where name = 'user'"])))})
      (redirect "/fuser/orders"))
    (binding [template/*js-css-files* order-view-files
              template/*sub-nav* [:div.subnav
                                  [:a.newform {:href "/fuser/accounts" :title "accounts"} "Edit Account"]
                                  [:a.newform {:href "/fuser/orders" :title "accounts"} "Orders"]
                                  [:a.newuser {:href "/fuser/signup" :title "new user"} "New User"]]]
      (template/pages
       [:h3 {:style "color: red;"} "Sorry, username Existed! Please " [:a {:href "/fuser/signup" :style "color: red"} "Register using another name."]]))
    ))

(defn update [params]
  (if (empty? (:password params))
    (j/update! SQLDB :user
               {:username 	(:username params)
                :tel (:tel params)
                :fax (:fax params)
                :company (:company params)
                :company_id (:company_id params)
                :address (:address params)
                :city (:city params)
                :post (:post params)
                :country_id (:country params)
                :region_id (:region params)
                :subscribe (:subscribe params)
                :email_address	(:email_address params)
                :first_name 	(:first_name params)
                :last_name      (:last_name params)
                :updated_at	(.getTime (java.util.Date.))}
              (sql/where {:id (:id params)}))
    (j/update! SQLDB :user
               {:username 	(:username params)
                :tel (:tel params)
                :fax (:fax params)
                :company (:company params)
                :company_id (:company_id params)
                :address (:address params)
                :city (:city params)
                :post (:post params)
                :country_id (:country params)
                :region_id (:region params)
                :subscribe (:subscribe params)
                :email_address	(:email_address params)
                :first_name 	(:first_name params)
                :last_name      (:last_name params)
                :password       (digest/sha-256 (:password params))
                :updated_at	(.getTime (java.util.Date.))}
              (sql/where {:id (:id params)})))
  (redirect "/fuser/orders"))

(def order-view-files ["/css/main.css" "/css/fcommon.css" "/js/jquery-1.11.1.min.js" "/js/layout.js" "/js/control/form/FormAddress.js" "/js/control/form/FormBirthDatePicker.js" "/js/control/form/FormCheckBox.js" "/js/control/form/ContentDateTime.js" "/js/control/form/FormDropDown.js" "/js/control/form/FormClientEmail.js" "/js/control/form/FormEmail.js" "/js/control/form/FormFileUpload.js" "/js/control/form/FormFullName.js" "/js/control/form/ContentHeading.js" "/js/control/form/ContentNumber.js" "/js/control/form/FormPhone.js" "/js/control/form/FormRadioButton.js" "/js/control/form/ContentTextArea.js" "/js/control/form/FormTextBox.js" "/js/control/form/ContentUniqueId.js" "/js/control/form/FormTOS.js" "/js/form_commit.js"])

(defn order-view [id session]
  (let [order (first (j/query SQLDB
                              (sql/select [:form_name :order_content] :sa_orders
                                          (sql/where {:id id}))))]
    (binding [template/*js-css-files* order-view-files
              template/*sub-nav* [:div.subnav
                                  [:a.newform {:href "/fuser/accounts" :title "accounts"} "Edit Account"]
                                  [:a.newform {:href "/fuser/orders" :title "accounts"} "Orders"]
                                  [:a.newuser {:href "/fuser/signup" :title "new user"} "New User"]]]
      (template/pages
        [:div
          [:h2 (:form_name order)]
          [:div.requf_tit.form_control.form_head (:order_content order)]] session))))
