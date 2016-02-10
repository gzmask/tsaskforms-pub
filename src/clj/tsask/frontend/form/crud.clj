(ns tsask.frontend.form.crud
  (:use tsask.env
        tsask.util
        hiccup.page
        hiccup.core)
  (:require [tsask.csv.crud :as csv]
            [tsask.file.crud :as file]
            [tsask.frontend.pages.template-pg :as template]
            [postal.core :as postal]
            [com.reasonr.scriptjure :as sj]
            [clojure.java.jdbc :as j]
            [tsask.order.crud :as order]
            [clojure.java.jdbc.sql :as sql]
            [hickory.core :as hy]
            [hickory.select :as hs]
            [hickory.zip :as hz]
            [clojure.zip :as zip]
            [clojure.java.io :as io]
            [clj-http.client :as client]))

(defn- redirect [url]
  {:status 302
   :headers {"Location" url}
   :body ""})

(def index-files
  ["/css/fcommon.css" "/css/fix.css" "/js/jquery-1.7.2.js" "/js/DD_belatedPNG.js" "/js/layout.js" "/js/login.js"])

(defn index [sort-col sort-type & [session]]
  (let [forms (j/query SQLDB
                       [(if sort-col
                          (str "SELECT id, form_name, created_at, form_published, start, end FROM sa_forms WHERE start IS NULL OR start = '' OR end IS NULL OR end = '' ORDER BY " sort-col " " sort-type)
                          "SELECT id, form_name, created_at, form_published, start, end FROM sa_forms WHERE start IS NULL OR start = '' OR end IS NULL OR end = ''")])
        opposite-sort-type {"desc" "asc", "asc" "desc", nil "asc"}]
    (binding [template/*js-css-files* index-files
              template/*sub-nav* nil] ;like let, but deeper into function context
      (template/pages
       [:dl.txtcont
        [:dt [:div.ltit [:strong "Froms List"]] [:div.clear]]
        [:form {:method "post" :action "/forms/batch/action"}
         [:dd
          [:div.fc_con
           [:table.fcc_tab {:width "100%" :cellspacing "0" :cesspadding "0" :border "0"}
            [:tr
             [:th.sf_admin_text.sf_admin_list_th
              [:a {:href (str "/shopforms?sort=id&sort_type=" (opposite-sort-type sort-type))} "Id"]
              (if (= sort-col "id") [:img {:src (str "/images/" sort-type ".png")}])]
             [:th.sf_admin_text.sf_admin_list_th
              [:a {:href (str "/shopforms?sort=form_name&sort_type=" (opposite-sort-type sort-type))} "Form Name"]
              (if (= sort-col "form_name") [:img {:src (str "/images/" sort-type ".png")}])]
             [:th.sf_admin_text.sf_admin_list_th
              [:a {:href (str "/shopforms?sort=created_at&sort_type=" (opposite-sort-type sort-type))} "Date"]
              (if (= sort-col "created_at") [:img {:src (str "/images/" sort-type ".png")}])]
             [:th.sf_admin_text.sf_admin_list_th "Price"]
             [:th.sf_admin_list_th "Actions"]]
            (for [form forms]
              (let [parse-html (hy/as-hickory (hy/parse (:form_published form)))
                    form_payment_cost (if (and (not-empty (hs/select (hs/descendant (hs/id :form_payment_cost)) parse-html))
                                       (not-empty (:value (:attrs (first (hs/select (hs/descendant (hs/id :form_payment_cost)) parse-html))))))
                                        (read-string (:value (:attrs (first (hs/select (hs/descendant (hs/id :form_payment_cost)) parse-html))))) 0.0)]
              [:tr
               [:td.sf_admin_text.sf_admin_list_td_id [:a {:href (str "/form/" (:id form) "/view")} (:id form)]]
               [:td.sf_admin_text.sf_admin_list_td_form_name (:form_name form)]
               [:td.sf_admin_text.sf_admin_list_td_created_at (strftime "%Y/%m/%d" (:created_at form))]
               [:td.sf_admin_text.sf_admin_list_td_updated_at (str "$" form_payment_cost)]
               [:td [:ul.sf_admin_td_actions
                     [:li.sf_admin_action_view [:a {:href (str "/form/" (:id form) "/view")} [:i.fa.fa-search-plus] " view"]]
                     [:li.sf_admin_action_view [:a {:href (str "/form/" (:id form) "/addcart")} [:i.fa.fa-shopping-cart] " add to cart"]]]]]))]]]]
        [:script {:type "text/javascript"}
         (sj/js (fn checkAll []
               (var checkboxes (.getElementsByName document "ids[]"))
               (doseq [i checkboxes]
                 (set! (.. (aget checkboxes i) checked)
                       (.. (.getElementById document "sf_admin_list_batch_checkbox") checked)))))]] session))))

(def form-view-files
  ["/css/fcommon.css" "/css/fix.css" "/js/jquery-1.7.2.js" "/js/DD_belatedPNG.js" "/js/layout.js" "/js/login.js" "/js/control/form/FormAddress.js" "/js/control/form/FormBirthDatePicker.js" "/js/control/form/FormCheckBox.js" "/js/control/form/ContentDateTime.js" "/js/control/form/FormDropDown.js" "/js/control/form/FormClientEmail.js" "/js/control/form/FormEmail.js" "/js/control/form/FormFileUpload.js" "/js/control/form/FormFullName.js" "/js/control/form/ContentHeading.js" "/js/control/form/ContentNumber.js" "/js/control/form/ContentPayment.js" "/js/control/form/FormPhone.js" "/js/control/form/FormRadioButton.js" "/js/control/form/ContentTextArea.js" "/js/control/form/FormTextBox.js" "/js/control/form/ContentUniqueId.js" "/js/control/form/FormTOS.js" "/js/form_commit.js"])

(defn fill [fid oid &[session]]
  (let [form (some identity (j/query SQLDB
                             (sql/select [:form_name :form_published] :sa_forms
                                         (sql/where {:id fid}))))]
    (binding [template/*js-css-files* form-view-files]
      (template/view-pages
       [:form {:method "post" :action "/form/commit" :enctype "multipart/form-data" :id "form_user" :onsubmit "return validateForm()"}
        [:dl.txtcont.requtxt
         ;; title
         [:dt [:div.ltit [:strong (:form_name form)]]
          [:input#form_name {:type "hidden" :value (:form_name form) :name "form_name"}]
          [:input#order_content {:type "hidden" :name "order_content"}]
          [:input#user_id {:type "hidden" :name "user_id" :value (:login session)}]
          [:input#user_id {:type "hidden" :name "order_id" :value oid}]
          [:input#form_id {:type "hidden" :value fid :name "form_id"}] [:div.clear]]
         ;; main content
         [:dd (:form_published form)] ;; where :form_content is for form edit design view, don't confused them!
         ]] session))))

(defn view [id &[session]]
  (let [form (some identity (j/query SQLDB
                             (sql/select [:form_name :form_published] :sa_forms
                                         (sql/where {:id id}))))]
    (binding [template/*js-css-files* form-view-files]
      (template/view-pages
       [:form {:method "post" :action "/form/commit" :enctype "multipart/form-data" :id "form_user" :onsubmit "return validateForm()"}
        [:dl.txtcont.requtxt
         ;; title
         [:dt [:div.ltit [:strong (:form_name form)]]
          [:input#form_name {:type "hidden" :value (:form_name form) :name "form_name"}]
          [:input#order_content {:type "hidden" :name "order_content"}]
          [:input#user_id {:type "hidden" :name "user_id" :value (:login session)}]
          [:input#form_id {:type "hidden" :value id :name "form_id"}] [:div.clear]]
         ;; main content
         [:dd (:form_published form)] ;; where :form_content is for form edit design view, don't confused them!
         ]] session))))

(defn addcart
  "add to cart when in shopform"
  [id session]
  (let [form (some identity (j/query SQLDB
                             (sql/select [:form_name :form_published] :sa_forms
                                         (sql/where {:id id}))))
        parse-html (hy/as-hickory (hy/parse (:form_published form)))
        form_payment_cost (if (and (not-empty (hs/select (hs/descendant (hs/id :form_payment_cost)) parse-html))
                                   (not-empty (:value (:attrs (first (hs/select (hs/descendant (hs/id :form_payment_cost)) parse-html))))))
                            (read-string (:value (:attrs (first (hs/select (hs/descendant (hs/id :form_payment_cost)) parse-html))))) 0.0)
        orders (if (:orders session) (:orders session) {})
        order {:id id
               :form_id id
               :html (:form_published form);nil flags this form as not filled by user
               :quantity 1
               :form_name (:form_name form)
               :payment_amt form_payment_cost}]
    (do
      (if (and (:login session) (empty? (j/query SQLDB ["select * from cartorder where form_id = ?" id])))
        (j/insert! SQLDB :cartorder
                   {:form_id id
                    :user_id (:login session)
                    :html (:form_published form);nil flags this form as not filled by user
                    :quantity 1
                    :form_name (:form_name form)
                    :payment_amt form_payment_cost
                    :created_at (.getTime (java.util.Date.))}))
    {:status 302
     :session (assoc session :orders
                     (if-not (:login session)
                       (assoc orders (keyword id) order)
                       nil))
     :headers {"Location" "/carts"}}
    )))

(defn commit
  [params session]
  (let [update-order (j/update! SQLDB :sa_orders 
                                {:order_content (:order_content params) 
                                 :updated_at (.getTime (java.util.Date.))
                                 :status 1} 
                                (sql/where {:id (:order_id params)}))]
    (binding [template/*js-css-files* index-files
                template/*sub-nav* nil] ;like let, but deeper into function context
      (template/pages (:order_content params) session))))

(comment defn commit
  "save cartorder when submiting the form"
  [params session]
  (let [orders (if (:orders session) (:orders session) {})
        form_payment_cost (if (empty? (:_cost params)) 0 (read-string (:_cost params)))
        order {:id (:form_id params)
               :form_id (:form_id params)
               :html (:order_content params) ;this will not be there without commit js action. thus add to cart will has nothing
               :quantity 1
               :form_name (:form_name params)
               :payment_amt form_payment_cost}]
    (do
      (j/delete! SQLDB :cartorder (sql/where {:form_id (:form_id params) :user_id (:login session)}))
      (if (:login session)
        (j/insert! SQLDB :cartorder
                   {:form_id (:form_id params)
                    :user_id (:login session)
                    :html (:order_content params)
                    :quantity 1
                    :form_name (:form_name params)
                    :payment_amt form_payment_cost
                    :created_at (.getTime (java.util.Date.))}))
    {:status 302
     :session (assoc session :orders
                     (if-not (:login session)
                       (assoc orders (keyword (:form_id order)) order)
                       nil))
     :headers {"Location" "/carts"}})))

(defn order_action
  "primarily handels single form submission, but used for batch order submssion as well"
  [params]
    (let [order_record (order/create {:order_content (:order_content params)
                                      :form_name (:form_name params)})
          payment-info {:app_name    (:ordName    params)
                        :invoice_no  (:InvoiceNumber params)
                        :address     (str (:ordAddress1 params) \space (:ordAddress2 params))
                        :phone       (:ordPhoneNumber       params)
                        :email       (:ordEmailAddress       params)
                        :file_no     (:file_no     params)
                        :reg_class   (:reg_class   params)
                        :app_type    (:form_name   params)
                        :app_detail  (:app_detail  params)
                        :invoice_id  (not-empty (:invoice_id  params))
                        :paid_by     (:trnCardOwner     params)
                        :card_type   (:trnCardType   params)
                        :payment_amt (not-empty (:trnAmount params))
                        :o_id (get_last_id order_record)}
          file (:real_input params)
          upload_file  (if (not-empty (:filename file)) (io/copy (io/file (:tempfile file)) (io/file (str "resources/public/files/Invoice-" (:last_insert_rowid() order_record) (if (= "image/jpeg" (:content-type file)) ".jpg" (if (= "application/pdf" (:content-type file)) ".pdf"))))))
          csv_record   (csv/create payment-info)
          query-params {:ordName         (:ordName params)
                        :ordPhoneNumber  (:ordPhoneNumber params)
                        :ordAddress1     (:ordAddress1 params)
                        :ordAddress2     (:ordAddress2 params)
                        :ordCity         (:ordCity params)
                        :ordProvince     (:ordProvince params)
                        :ordPostalCode   (:ordPostalCode params)
                        :ordCountry      (:ordCountry params)
                        :ordEmailAddress (:ordEmailAddress params)
                        :trnOrderNumber  (:trnOrderNumber params)
                        :trnAmount       (:trnAmount params)
                        :trnCardOwner    (:trnCardOwner params)
                        :trnCardType     (:trnCardType params)
                        :trnCardNumber   (:trnCardNumber params)
                        :trnExpMonth     (:trnExpMonth params)
                        :trnExpYear      (:trnExpYear params)}
          response (client/get "https://www.beanstream.com/scripts/process_transaction.asp" {:query-params (assoc query-params :requestType "BACKEND" :merchant_id "257900000")})
          ]
      response))

(defn submit [params]
  (binding [template/*js-css-files* form-view-files]
    (let [response (order_action params)
          email (postal/send-message
                  (assoc MAIL_TEMPLATE
                         :to "chao@melcher.com"
                         :subject "subject"
                         :body "body"))]
            (if (.contains (:body response) "trnApproved=0")
              (template/commit-page [:div (str "Payment attempt failed due to reason: " (:body response) "<br>Please contact us and we will help you to submit your payment.")])
              (template/commit-page [:div "Thank you, your payment is successful! Tsask will process your request shortly. If you have not received confirmation in a few days please contact us."])))))

(comment
(use 'clojure.repl)
(use 'clojure.pprint)
(keyword "1")
(doc some)
(def aform (some identity (j/query SQLDB
                             (sql/select [:form_name :form_published] :sa_forms
                                         (sql/where {:id 103})))))
(def html-frag (hy/parse (:form_published aform))) ; need to parse this thing
(prn html-frag)
(def hy-ary (hy/as-hickory html-frag))
(hs/select (hs/and (hs/id :form_heading_label)) hy-ary)
(def inputs (hs/select (hs/descendant (hs/tag :input)) hy-ary))
(def inputs (hs/select (hs/descendant (hs/id :form_payment_cost)
                                      ) hy-ary))
(read-string (:value (:attrs (first inputs))))
(pprint inputs)
(doseq [input inputs]
  (println input))
(pprint (first (j/query SQLDB ["select * from cartorder"])))
(prn order)
(client/get "http://google.com")
(client/get "https://api-3t.sandbox.paypal.com/nvp"
  {:headers {
             "USER" "tsask",
             "foo" ["bar" "baz"], "eggplant" "quux"}})
)
