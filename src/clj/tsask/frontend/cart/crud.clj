(ns tsask.frontend.cart.crud
  (:use tsask.env
        tsask.util)
  (:require [clojure.java.jdbc :as j]
            [clojure.java.io :as io]
            [ring.util.codec :as codec]
            [clojure.walk :as walk]
            [tsask.order.crud :as order]
            [tsask.frontend.form.crud :as form]
            [tsask.frontend.pages.template-pg :as template]
            [hickory.core :as hy]
            [hickory.select :as hs]
            [hickory.zip :as hz]
            [com.reasonr.scriptjure :as sj]
            [clojure.java.jdbc.sql :as sql]
            [clj-http.client :as client]))

(declare paypal-form)

(defn- redirect [url]
  {:status 302
   :headers {"Location" url}
   :body ""})

(def cart-files  ["/css/fcommon.css" "/css/fix.css" "/js/jquery-1.7.2.js" "/js/cart/quantity_update.js" "/js/DD_belatedPNG.js" "/js/layout.js" "/js/login.js"])

(defn index [session]
  (let [orders (if (:login session)
                 (not-empty (j/query SQLDB
                                     ["select id, form_id, user_id, html, quantity, form_name, payment_amt, created_at from cartorder where user_id = ?" (:login session)]))
                 (not-empty (:orders session)))
        sum (if (:login session)
              (reduce + (for [order orders] (* (:payment_amt order) (:quantity order))))
              (reduce + (for [id (keys orders)] (* (:quantity (id orders)) (:payment_amt (id orders))))))
        ]
    (binding [template/*js-css-files* cart-files
              template/*sub-nav* nil]
      (template/pages
        [:div.txtcont
         [:div [:div.ltit [:strong "Orders in Cart"]]]
         [:form {:method "post" :action "/cart/paypal"}
          [:div.fc_con
           [:table.fcc_tab {:width "100%" :cellspacing "0" :cellpadding "0" :border "0"}
            [:tr
              [:th.sf_admin_list_th "ID"]
              [:th.sf_admin_text.sf_admin_list_th
               "Form Name"]
              [:th.sf_admin_list_th "quantity"]
              [:th.sf_admin_list_th "price"]
              [:th.sf_admin_list_th "Actions"]]
            (if (:login session)
             (for [order orders]
                 [:tr
                  [:td.sf_admin_text.sf_admin_list_td_form_name [:input {:name "id[]" :type "hidden" :value (:form_id order)}] (:form_id order)]
                  [:td.sf_admin_text.sf_admin_list_td_form_name [:input {:name "name[]" :type "hidden" :value (:form_name order)}] (:form_name order)]
                  [:td.sf_admin_text.sf_admin_list_td_form_name [:input.quantity {:name "quantity[]" :id (str (:form_id order) "-quantity") :value (:quantity order) :type "number" :min "1" :max "99"}]]
                  [:td.sf_admin_text.sf_admin_list_td_form_name
                   [:span (str "$" (:payment_amt order))]
                   [:input.price {:name "price[]" :readonly "true" :id (str (:form_id order) "-price") :value (:payment_amt order) :type "hidden"}]]
                  [:td [:ul.sf_admin_td_actions
                        [:li.sf_admin_action_delete [:a {:href (str "/cart/" (:id order) "/preview")} [:i.fa.fa-search-plus] "Preview Form"]]
                        [:li.sf_admin_action_delete [:a {:href (str "/cart/" (:id order) "/delete")} [:i.fa.fa-minus-square] "Remove From Cart"]]]]])
             (for [id (keys orders)]
                 [:tr
                  [:td.sf_admin_text.sf_admin_list_td_form_name [:input {:name "id[]" :type "hidden" :value (name id)}] (:form_id (id orders))]
                  [:td.sf_admin_text.sf_admin_list_td_form_name [:input {:name "name[]" :type "hidden" :value (:form_name (id orders))}] (:form_name (id orders))]
                  [:td.sf_admin_text.sf_admin_list_td_form_name [:input.quantity {:name "quantity[]" :id (str (:form_id (id orders)) "-quantity") :value (:quantity (id orders)) :type "number" :min "1" :max "99"}]]
                  [:td.sf_admin_text.sf_admin_list_td_form_name
                   [:span (str "$" (:payment_amt (id orders)))]
                   [:input.price {:name "price[]" :readonly "true" :id (str (:form_id (id orders)) "-price") :value (:payment_amt (id orders)) :type "hidden"}]]
                  [:td [:ul.sf_admin_td_actions
                        [:li.sf_admin_action_delete [:a {:href (str "/cart/" (name id) "/preview")} [:i.fa.fa-search-plus] "Preview Form"]]
                        [:li.sf_admin_action_delete [:a {:href (str "/cart/" (name id) "/delete")} [:i.fa.fa-minus-square] "Remove From Cart"]]]]]
               ))]]
          [:span "Total Amount: $" [:input#total_price {:name "sum" :type "text" :value sum :readonly "true"}]]
          [:input {:value "Save Cart" :type "submit"}]]] session))))

(defn paypal-form [params session]
  (let [amount (read-string (:sum params))
        tokenid (str "TSASKforms" (rand-int 99999) amount (.getTime (java.util.Date.)))
        res (client/post "https://pilot-payflowpro.paypal.com" ;prod: "https://payflowpro.paypal.com"
                         {:body (str "PARTNER=" (:partner PAYPAL)
                                     "&PWD=" (:password PAYPAL)
                                     "&VENDOR=" (:login PAYPAL)
                                     "&USER=" (:login PAYPAL)
                                     "&TRXTYPE=S&AMT=" amount
                                     "&CREATESECURETOKEN=Y&SECURETOKENID="
                                     tokenid)
                          })
        info (walk/keywordize-keys (codec/form-decode (:body res))) ;:SECURETOKENID,:SECURETOKEN,:RESPMSG,:RESULT
        new-session (if (:login session) 
                      (do (doseq [i (range (count (:id params)))] 
                            (j/update! SQLDB :cartorder {:quantity (Integer/valueOf (nth (:quantity params) i))}
                                      (sql/where {:form_id (nth (:id params) i)}))) 
                          session)
                      (assoc session :orders
                        (into {} 
                              (for [i (range (count (:id params)))] 
                                (let [id (keyword (nth (:id params) i)) 
                                      quantity (nth (:quantity params) i)] 
                                  [id (assoc (id (:orders session)) :quantity (Integer/valueOf quantity))])))))]
     {:status 200 
      :session new-session 
      :body 
      (binding [template/*js-css-files* cart-files template/*sub-nav* nil]
       (template/pages
         (if (= (:RESPMSG info) "Approved")
          [:form {:method "post" :action "https://payflowlink.paypal.com"}
           [:h2 "Your Order Confirmation"]
           [:div.fc_con
            [:table.fcc_tab {:width "100%" :cellspacing "0" :cellpadding "0" :border "0"}
             [:tr
              [:th.sf_admin_list_th "Form Name"]
              [:th.sf_admin_list_th "Quantity"]
              [:th.sf_admin_list_th "Item Total"]]
             (for [i (range (count (:name params)))]
               [:tr
                [:td.sf_admin_text.sf_admin_list_td_form_name (nth (:name params) i)]
                [:td.sf_admin_text.sf_admin_list_td_form_name (nth (:quantity params) i)]
                [:td.sf_admin_text.sf_admin_list_td_form_name "$" (* (Float/valueOf (nth (:price params) i)) (Float/valueOf (nth (:quantity params) i)))]])
             ]]
           [:div "Total Price: $" (str amount)]
           [:input {:name "SECURETOKEN" :value (:SECURETOKEN info) :type "hidden"}]
           [:input {:name "SECURETOKENID" :value tokenid :type "hidden"}]
           [:input {:name "MODE" :value "TEST" :type "hidden"}]
           [:input {:value "Pay" :type "submit"}]
           ]
          [:div "Error: " (:RESPMSG info) ". To Order, Please contact us."]
      ) session))}))

(defn preview [id session]
  (let [order (if (:login session)
                 (first (j/query SQLDB ["select form_name, html from cartorder where id = ?" id]))
                 ((keyword (str id)) (:orders session)))]
    (binding [template/*js-css-files* cart-files]
      (template/view-pages
       [:div
          [:h2 (:form_name order)]
          [:div.requf_tit.form_control.form_head (:html order)]] session))
  ))

;{:COUNTRYTOSHIP "US", :AMT "110.00", :SECURETOKEN "86AW2GORQz0tKEhoKm9ZNigFW", :AVSADDR "Y", :RESPMSG "Approved", :PENDINGREASON "completed", :SECURETOKENID "TSASKforms710011011410917657527", :SHIPTOSTREET "1 Main St", :PAYERID "U2VBKESCQCZDS", :BILLTOEMAIL "gzmask2@gmail.com", :ZIPTOSHIP "95131", :SHIPTOCOUNTRY "US", :TAX "0.00", :NAME "Marina Patzwald", :METHOD "P", :ADDRESSTOSHIP "1 Main St", :BILLTOLASTNAME "Patzwald", :PNREF "B1PP7A1DF085", :CITYTOSHIP "San Jose", :TOKEN "EC-8KP37379PF766232U", :SHIPTOZIP "95131", :TENDER "P", :AVSZIP "Y", :TRXTYPE "S", :AVSDATA "YYY", :STATETOSHIP "CA", :FEEAMT "3.49", :NAMETOSHIP "Marina Patzwald", :TRANSTIME "2014-09-16 18:35:11", :RESULT "0", :TYPE "S", :COUNTRY "US", :LASTNAME "Patzwald", :BILLTONAME "Marina Patzwald", :PAYMENTTYPE "instant", :BILLTOCOUNTRY "US", :SHIPTOCITY "San Jose", :EMAIL "gzmask2@gmail.com", :FIRSTNAME "Marina", :SHIPTOSTATE "CA", :CORRELATIONID "109da695caa97", :BILLTOFIRSTNAME "Marina", :PPREF "3B848896KD899843Y"}
(defn pay
  "after paypal button redirection, paypal gets the user post to this function"
  [params session]
  (let [success? (= (:RESPMSG params) "Approved")
        total-price (if success?
                      (+ (Float/valueOf (:AMT params)) (Float/valueOf (:FEEAMT params)) (Float/valueOf (:TAX params)))
                      0.0)
        db-orders (if (:login session) 
                    (j/query SQLDB ["select id, form_id, user_id, html, quantity, form_name, payment_amt, created_at from cartorder where user_id = ?" (:login session)]) [])
        anonymous-key (if (:anonymous session) (:anonymous session) (+ (* 1000000 (.getTime (java.util.Date.))) (rand-int 99) total-price))
        username (if (:login session) 
                   (:username (first (j/query SQLDB [(str "select username from user where id = " (:login session))])))
                   (str anonymous-key "anonymous"))
        session-orders (:orders session)
        insert-db-order (if (:login session)
                          (doseq [order db-orders]
                            (j/insert! SQLDB :sa_orders
                                       {:form_id (:form_id order)
                                        :user_id (:user_id order)
                                        :form_name (:form_name order)
                                        :user_name username
                                        :total_cost_paid (* (:payment_amt order) (:quantity order))
                                        :date_completed (.getTime (java.util.Date.))
                                        :order_content (:html order)
                                        :created_at (.getTime (java.util.Date.))
                                        :updated_at (.getTime (java.util.Date.))
                                        :status false
                                        :quantity (:quantity order)}))
                          (doseq [id (keys session-orders)]
                            (j/insert! SQLDB :sa_orders
                                       {:form_id (:form_id (id session-orders))
                                        :user_id anonymous-key
                                        :form_name (:form_name (id session-orders))
                                        :user_name username
                                        :total_cost_paid (* (:payment_amt (id session-orders)) (:quantity (id session-orders)))
                                        :date_completed (.getTime (java.util.Date.))
                                        :order_content (:html (id session-orders))
                                        :created_at (.getTime (java.util.Date.))
                                        :updated_at (.getTime (java.util.Date.))
                                        :status false
                                        :quantity (:quantity (id session-orders))})))
        rm-db-cartorder (if (:login session) (j/delete! SQLDB :cartorder (sql/where {:user_id (:login session)})))
        new-session (assoc session :orders {} :anonymous anonymous-key)
        ]
    {:status 200
     :session new-session
     :body (binding [template/*js-css-files* cart-files
                     template/*sub-nav* nil]
             (if success?
               (template/pages [:div "Thank you " (:NAME params) ", your payment of " (:AMT params) " has been processed. Please fill out your " [:a {:href "/fuser/orders"} "ordered forms "] "right now under your account."] new-session)
               (template/pages [:div "We are sorry, your order failed because of the reason " (:RESPMSG params) ". Please contact our customer service."] new-session)))}))

(comment defn pay [params session]
  (let [orders (if (:login session)
                 (not-empty (j/query SQLDB ["SELECT id, form_id, user_id, html, quantity, form_name, payment_amt, created_at FROM cartorder WHERE user_id = ?" (:login session)]))
                 (not-empty (:orders session)))
        responses (map
                    (fn [order] (merge order (form/order_action (merge order params))))
                    orders)
        errors (filter
                  (fn [response] (if (.contains (:body response) "trnApproved=0")
                                   true
                                   false))
                  responses)]
    (binding [template/*js-css-files* cart-files]
      (if (empty? errors)
        (template/commit-page [:div "Thank you, your payment is successful! Tsask will process your request shortly. If you have not received confirmation in a few days please contact us."])
        (template/commit-page
          (for [error errors]
            [:div (str "Payment attempt failed for order:"
                       (:form_name error)
                       " due to reason: "
                       (:body error)
                       "<br>Please contact us and we will help you to submit your payment.")]))))))

(defn delete [id session]
  (if (:login session)
    (do
      (j/delete! SQLDB :cartorder (sql/where {:id id}))
      {:status 302
       :session session
       :headers {"Location" "/carts"}})
    {:status 302
     :session (assoc session :orders (dissoc (:orders session) (keyword id)))
     :headers {"Location" "/carts"}}))
