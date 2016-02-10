(ns tsask.form.crud
  (:use tsask.env
        tsask.util
        hiccup.page
        hiccup.core)
  (:require [tsask.csv.crud :as csv]
            [tsask.file.crud :as file]
            [tsask.pages.template-pg :as template]
            [postal.core :as postal]
            [com.reasonr.scriptjure :as sj]
            [clojure.java.jdbc :as j]
            [tsask.order.crud :as order]
            [clojure.java.jdbc.sql :as sql]
            [clojure.java.io :as io]
            [clj-http.client :as client]))

(defn- redirect [url]
  {:status 302
   :headers {"Location" url}
   :body ""})

(defn index [sort sort-type]
  (let [forms (j/query SQLDB
                       (sql/select [:id :form_name :start :end :created_at :updated_at] :sa_forms
                                   (if sort (sql/order-by {(keyword sort) (keyword sort-type)}))))
        opposite-sort-type {"desc" "asc", "asc" "desc", nil "asc"}]
    (binding [template/*js-css-files* template/forms-files] ;like let, but deeper into function context
      (template/pages
       [:dl.txtcont
        [:dt [:div.ltit [:strong "Froms List"]] [:div.clear]]
        [:form {:method "post" :action "/forms/batch/action"}
         [:dd
          [:div.fc_con
           [:table.fcc_tab {:width "100%" :cellspacing "0" :cesspadding "0" :border "0"}
            [:tr
             [:th#sf_admin_list_batch_actions [:input#sf_admin_list_batch_checkbox {:type "checkbox" :onclick "checkAll()"}]]
             [:th.sf_admin_text.sf_admin_list_th
              [:a {:href (str "/forms?sort=id&sort_type=" (opposite-sort-type sort-type))} "Id"]
              (if (= sort "id") [:img {:src (str "/images/" sort-type ".png")}])]
             [:th.sf_admin_text.sf_admin_list_th
              [:a {:href (str "/forms?sort=form_name&sort_type=" (opposite-sort-type sort-type))} "Form Name"]
              (if (= sort "form_name") [:img {:src (str "/images/" sort-type ".png")}])]
              [:th.sf_admin_text.sf_admin_list_th
              [:a {:href (str "/forms?sort=start&sort_type=" (opposite-sort-type sort-type))} "Start"]
              (if (= sort "start") [:img {:src (str "/images/" sort-type ".png")}])]
             [:th.sf_admin_text.sf_admin_list_th
              [:a {:href (str "/forms?sort=end&sort_type=" (opposite-sort-type sort-type))} "End"]
              (if (= sort "end") [:img {:src (str "/images/" sort-type ".png")}])]
             [:th.sf_admin_text.sf_admin_list_th
              [:a {:href (str "/forms?sort=created_at&sort_type=" (opposite-sort-type sort-type))} "Created At"]
              (if (= sort "created_at") [:img {:src (str "/images/" sort-type ".png")}])]
             [:th.sf_admin_text.sf_admin_list_th
              [:a {:href (str "/forms?sort=updated_at&sort_type=" (opposite-sort-type sort-type))} "Updated At"]
              (if (= sort "updated_at") [:img {:src (str "/images/" sort-type ".png")}])]
             [:th.sf_admin_list_th "Actions"]]
            (for [form forms]
              [:tr
               [:td [:input.sf_admin_batch_checkbox {:type "checkbox" :value (:id form) :name "ids[]"}]]
               [:td.sf_admin_text.sf_admin_list_td_id [:a {:href (str "/form/" (:id form) "/edit")} (:id form)]]
               [:td.sf_admin_text.sf_admin_list_td_form_name (:form_name form)]
               [:td.sf_admin_text.sf_admin_list_td_start (if (instance? Long (:start form)) (strftime "%Y/%m/%d" (:start form)))]
               [:td.sf_admin_text.sf_admin_list_td_end  (if (instance? Long (:end form)) (strftime "%Y/%m/%d" (:end form)))]
               [:td.sf_admin_text.sf_admin_list_td_created_at (strftime "%Y/%m/%d" (:created_at form))]
               [:td.sf_admin_text.sf_admin_list_td_updated_at (strftime "%Y/%m/%d" (:updated_at form))]
               [:td [:ul.sf_admin_td_actions
                     [:li.sf_admin_action_view [:a {:href (str "/form/" (:id form) "/view")} "View"]]
                     [:li.sf_admin_action_delete [:a {:href (str "/form/" (:id form) "/delete")
                                                      :onclick (sj/js (return (confirm "are you sure")))} "Delete"]]
                     [:li.sf_admin_action_edit [:a {:href (str "/form/" (:id form) "/edit")} "Edit"]]
                     [:li.sf_admin_action_copy [:a {:href (str "/form/" (:id form) "/copy")} "Copy"]]]]])]]]]
        [:script {:type "text/javascript"}
         (sj/js (fn checkAll []
               (var checkboxes (.getElementsByName document "ids[]"))
               (doseq [i checkboxes]
                 (set! (.. (aget checkboxes i) checked)
                       (.. (.getElementById document "sf_admin_list_batch_checkbox") checked)))))]]))))

(defn delete [id]
  (j/delete! SQLDB :sa_forms (sql/where {:id id}))
  (redirect "/forms"))

(def form-edit-files ["/css/common.css" "/css/fix.css" "//code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" "/js/jquery-1.7.2.js" "/js/DD_belatedPNG.js" "/js/layout.js" "/js/login.js" "/js/form_design.js" "/js/control/Address.js" "/js/control/BirthDatePicker.js" "/js/control/CheckBox.js" "/js/control/TOS.js" "/js/control/DateTime.js" "/js/control/DropDown.js" "/js/control/ClientEmail.js" "/js/control/Payment.js" "/js/control/Email.js" "/js/control/FileUpload.js" "/js/control/FullName.js" "/js/control/Heading.js" "/js/control/Number.js" "/js/control/Phone.js" "/js/control/RadioButton.js" "/js/control/ResetButton.js" "/js/control/SubmitButton.js" "/js/control/TextArea.js" "/js/control/TextBox.js" "/js/control/UniqueId.js"])

(defn form-design-pages [& [form]]
  (binding [template/*js-css-files* form-edit-files]
  (template/pages
   [:form {:method "post" :action
           (if (:id form) (str "/form/" (:id form) "/update")
             (str "/form/create"))}
    [:input {:type "hidden" :name "sf_method" :value "put"}]
    [:dl.txtcont
     [:dt
      [:div.ltit [:strong "Forms Builder"]]
      [:div.rbtns
       [:label "Begin date: "]
       [:input#start {:type "text" :name "start" :value (:start form)}]
       [:label "End date: "]
       [:input#end {:type "text" :name "end" :value (:end form)}]
       [:a.bsave {:href "#!" :title "save" :onclick "saveForm()"} "SAVE"]
       [:a.bcancle {:href "/forms" :title "cancel"} "CANCLE"]]
      [:div.clear]]
     [:dd
      [:div.forms_cont
       [:div.fc_tit
        [:table.fct_tab {:width "100%" :border "0" :cellspacing "0" :cellpadding "0"}
         [:tr
          [:th {:width "190"} "Form Tools"]
          [:th "Form Design Area"]]]]
       [:div.fc_con.formbuil_box
        [:div.fbnav
         [:div.fbn_list
          (let [elements ["Heading" "TextBox" "TextArea" "DropDown" "RadioButton" "CheckBox" "TOS" "FileUpload" "SubmitButton" "ResetButton" "FullName" "ClientEmail" "Email" "Address" "Phone" "BirthDatePicker" "Number" "DateTime" "UniqueId" "Payment"]
                classes ["icon_heading" "icon_textb" "icon_texta" "icon_dropd" "icon_radio" "icon_check" "icon_check" "icon_file" "icon_submit" "icon_reset" "icon_fullname" "icon_email" "icon_email" "icon_addr" "icon_phone" "icon_bdp" "icon_numb" "icon_datet" "icon_uniid" "icon_pay"]]
            (for [i (range (count elements))]
              (let [element (get elements i)
                    class (get classes i)]
                [:li {:onclick (str "javascript:add" element "();")}
                 [:img {:src "/images/blank.gif" :class class}]
                 (clojure.string/replace element #"(?<=[a-z])(?=[A-Z])" " ")])))]]
        [:div.fb_cont
         [:ul.fbc_head
          [:li.form_name
           [:div.fbc_bar [:div.bar_tit "Form Name"]]
           [:div.fbc_txt
            [:input#form_name.fbc_txt {:name "form_name" :value (:form_name form)}]]]]
         [:ul.fbc_list (:form_content form)]];; where :form_published is for form/view to show form to user, don't confused them!
        [:div.clear]]]]]
    [:input#form_content {:type "hidden" :name "form_content" :value ""}]
    [:input#form_published {:type "hidden" :name "form_published" :value ""}]
    (include-js "//code.jquery.com/jquery-1.9.1.js" "//code.jquery.com/ui/1.10.3/jquery-ui.js" "/js/form_save.js")])))

(defn edit [id]
  (binding [template/*js-css-files* form-edit-files]
    (let [form (first (j/query SQLDB
                               (sql/select [:id :form_name :form_content :start :end] :sa_forms
                                           (sql/where {:id id}))))]
      (form-design-pages form))))

(defn copy [id]
  (let [form (first (j/query SQLDB
                             (sql/select [:form_name :form_content :form_published] :sa_forms
                                         (sql/where {:id id}))))]
    (j/insert! SQLDB :sa_forms {:form_name        (:form_name form)
                                :form_content     (:form_content form)
                                :form_published   (:form_published form)
                                :created_at       (.getTime (java.util.Date.))
                                :updated_at       (.getTime (java.util.Date.))}))
    (redirect "/forms"))


(defn new []
  (binding [template/*js-css-files* template/form-new-files]
    (form-design-pages)))

(defn create [params]
  (let [form_record (j/insert! SQLDB :sa_forms
             {:form_name 	(:form_name params)
              :form_content	(:form_content params)
              :form_published 	(:form_published params)
              :start (:start params)
              :end (:end params)
              :created_at	(.getTime (java.util.Date.))
              :updated_at	(.getTime (java.util.Date.))})]
    (redirect "/forms")))

(defn update [params]
  (j/update! SQLDB :sa_forms
             {:form_name 	(:form_name params)
              :form_content	(:form_content params)
              :form_published 	(:form_published params)
              :updated_at	(.getTime (java.util.Date.))
              :start (:start params)
              :end (:end params)}
             (sql/where {:id (:id params)}))
  (redirect "/forms"))
