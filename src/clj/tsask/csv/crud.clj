(ns tsask.csv.crud
  (:use compojure.core
        tsask.env
        tsask.util
        tsask.pages.template-pg
        hiccup.page
        ring.util.response
        incanter.core
        incanter.excel)
  (:require [clojure.java.jdbc :as j]
            [clojure.java.jdbc.sql :as sql]
            [clojure.java.io :as io]))

(comment
(defn export [params]
  (let [begin (if (empty? (:begin params)) "2013-01-01 00:00:00" (str (:begin params) " 00:00:00"))
        end (if (empty? (:end params)) "9999-01-01 00:00:00" (str (:end params) " 23:59:59"))
        reports 
        (j/query SQLDB ["select * from CSV_report where created_at > ? and created_at < ?" begin  end])
        csv_rows (for [r reports] (str (:id r) "," (:o_id r) "," (:app_name r) "," (:reg_class r) "," 
                                       (:address r) "," (:phone r) "," (:email r) "," 
                                       (:app_type r) "," (:app_detail r) "," (:invoice_id r) "," 
                                       (:paid_by r) "," (:card_type r) "," (:payment_amt r) ",\n"))
        csv_str (reduce 
                  (fn [r1 r2] 
                    (str r1 r2)) 
                  (str "id," "order_id," "applicant name," "registration class," "address," 
                       "phone number," "email address," "application type," 
                       "application detail," "invoice id," "paid by," 
                       "card type," "payment amount," "\n") 
                  csv_rows)]
    (do
      (spit (str CSV_ROOT_PATH "/export.csv") csv_str :append false)
      {:status 302
       :headers {"Location" "/csv/download/export.csv"}
       :body ""}))) 
)

(defn export [params]
  (let [begin (if (empty? (:begin params)) 0 (Long. (:begin params)))
        end (if (empty? (:end params)) 0 (Long. (:end params)))
        reports (j/query SQLDB ["select * from CSV_report where created_at > ? and created_at < ?" begin end])
        data-set (dataset (vec ["Id" "Order Id" "Invoice Number" "Applicant Name" "Registration Class" "Address" 
                                   "Phone Number" "Email Address" "File Number" "Application Type" "Application Detail" 
                                   "Invoice Id" "Paid By" "Card Type" "Payment Amount" "Created At"]) 
                             (vec (for [r reports] (vec [(:id r) 
                                                         (:o_id r)
                                                         (if (empty? (:invoice_no r)) " " (:invoice_no r))
                                                         (if (empty? (:app_name r)) " " (:app_name r)) 
                                                         (if (empty? (:reg_class r)) " " (:reg_class r))
                                                         (if (empty? (:address r)) " " (:address r)) 
                                                         (if (empty? (:phone r)) " " (:phone r)) 
                                                         (if (empty? (:email r)) " " (:email r))
                                                         (if (empty? (:file_no r)) " " (:file_no r))
                                                         (if (empty? (:app_type r)) " " (:app_type r)) 
                                                         (if (empty? (:app_detail r)) " " (:app_detail r)) 
                                                         (if (empty? (:invoice_id r)) " " (:invoice_id r))
                                                         (if (empty? (:paid_by r)) " " (:paid_by r)) 
                                                         (if (empty? (:card_type r)) " " (:card_type r)) 
                                                         (if (nil? (:payment_amt r)) " " (:payment_amt r)) 
                                                         (strftime "%Y/%m/%d" (Long. (:created_at r)))]))))]
    (do
      (save-xls data-set (str CSV_ROOT_PATH "/export.xls"))
      {:status 302
       :headers {"Location" "/csv/download/export.xls"}
       :body ""}))) 

(defn download-csv [filename]
  {:status 200
   :headers {"Content-Disposition" "attachment; filename=export.xls"}
   :body (io/file (str CSV_ROOT_PATH "/export.xls"))})

(defn create [params]
  (j/insert! SQLDB :CSV_report 
           {:app_name    (:app_name    params) 
            :invoice_no  (:invoice_no  params)
            :address     (:address     params) 
            :phone       (:phone       params) 
            :email       (:email       params) 
            :file_no     (:file_no     params)
            :reg_class   (:reg_class   params)
            :app_type    (:app_type    params) 
            :app_detail  (:app_detail  params) 
            :invoice_id  (empty-to-nil (:invoice_id  params)) 
            :paid_by     (:paid_by     params) 
            :card_type   (:card_type   params) 
            :payment_amt (empty-to-nil (:payment_amt params))
            :created_at  (.getTime (java.util.Date.))
            :o_id        (:o_id params)}))


(defn new []
  (binding [*css-files* ["/css/form.css" "/css/common.css" "/css/main.css"]]
  (pages
    [:div
     [:form {:action "/csvs/create" :method "post"}
      [:table {}
       (map (fn [lable input] [:tr [:td [:lable lable]] [:td [:input {:type "text" :name (name input)}]]])
            (map #(str (name %) ": ")
                 [:app_name :address :phone :email :app_type :app_detail :invoice_id :paid_by :card_type :payment_amt])
            [:app_name :address :phone :email :app_type :app_detail :invoice_id :paid_by :card_type :payment_amt])
       [:tr
        [:td {:colspan "2" :align ""}
         [:input {:type "submit" :value "submit"}]]]]]])))


(defn payment-report []
  (binding [*css-files* ["/css/common.css" "/css/main.css" "//code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css"]]
  (pages
   [:dl.txtcont
    [:dt [:div.ltit [:strong "Export"]] [:div.clear]]
    [:form {:method "get" :action "/csv/export"}
      [:label "Begin date: "]
      [:input#begin {:type "text" :name "begin"}] 
      [:label "End date: "]
      [:input#end {:type "text" :name "end"}]
      [:div.fc_con {:style "margin-top: 15px;"} 
        [:dd [:input {:type "submit" :value "" :style "background: url(/images/export.png); width:89px; height:29px; border: none;"}]]]]
     (include-js "//code.jquery.com/jquery-1.9.1.js" "//code.jquery.com/ui/1.10.3/jquery-ui.js" "/js/csv.js")])))
