(ns tsask.order.crud
  (:use tsask.env
        tsask.util
        tsask.pages.template-pg
        com.reasonr.scriptjure)
  (:require [clojure.java.jdbc :as j]
            [clojure.java.io :as io]
            [clojure.java.jdbc.sql :as sql]))

(defn- redirect [url]
  {:status 302
   :headers {"Location" url}
   :body ""})

(defn index [page sort sort-type]
  (let [orders (j/query SQLDB
                        (sql/select [:id :form_name :created_at :updated_at] :sa_orders
                                    (if sort(sql/order-by {(keyword sort) (keyword sort-type)}) (sql/order-by {"created_at" "desc"}))))
        opposite-sort-type {"desc" "asc", "asc" "desc", nil "asc"}
        total-page (inc (int (/ (count orders) 20.0)))
        current (if (empty? page) 1 (Integer/parseInt page))
        start (* (dec current) 20)
        end (+ start 20)]
    (binding [*js-css-files* orders-files]
      (pages
        [:dl.txtcont
         [:dt [:div.ltit [:strong "Orders List"]] [:div.clear]]
         [:form {:method "post" :action "/order/delete-selected"}
          [:input {:value " Delete Selected " :type "submit" :onclick "updateCheckedIds()"}]
          [:input {:value "0" :type "hidden" :id "selected_ids" :name "ids"}]
          [:dd
           [:div.fc_con
            [:table.fcc_tab {:width "100%" :cellspacing "0" :cellpadding "0" :border "0"}
             [:tr
              [:th#sf_admin_list_batch_actions [:input#sf_admin_list_batch_checkbox {:type "checkbox" :onclick "checkAll()"}]]
              [:th.sf_admin_text.sf_admin_list_th
               [:a {:href (str "/orders?sort=id&sort_type=" (opposite-sort-type sort-type))} "Id"]
               (if (= sort "id") [:img {:src (str "/images/" sort-type ".png")}])]
              [:th.sf_admin_text.sf_admin_list_th
               [:a {:href (str "/orders?sort=fort_name&sort_type=" (opposite-sort-type sort-type))} "Form Name"]
               (if (= sort "form_name") [:img {:src (str "/images/" sort-type ".png")}])]
              [:th.sf_admin_text.sf_admin_list_th
               [:a {:href (str "/orders?sort=created_at&sort_type=" (opposite-sort-type sort-type))} "Created At"]
               (if (= sort "created_at") [:img {:src (str "/images/" sort-type ".png")}])]
              [:th.sf_admin_text.sf_admin_list_th
               [:a {:href (str "/orders?sort=updated_at&sort_type=" (opposite-sort-type sort-type))} "Updated At"]
               (if (= sort "updated_at") [:img {:src (str "/images/" sort-type ".png")}])]
              [:th.sf_admin_list_th "Actions"]]
             (for [order orders
                   :when (and (>= (.indexOf orders order) start) (< (.indexOf orders order) end))]
              [:tr
               [:td [:input.sf_admin_batch_checkbox {:type "checkbox" :value (:id order) :name "ids[]"}]]
               [:td.sf_admin_text.sf_admin_list_td_id [:a (:id order)]]
               [:td.sf_admin_text.sf_admin_list_td_form_name (:form_name order)]
               [:td.sf_admin_text.sf_admin_list_td_created_at (strftime "%Y/%m/%d" (:created_at order))]
               [:td.sf_admin_text.sf_admin_list_td_updated_at (strftime "%Y/%m/%d" (:updated_at order))]
               [:td [:ul.sf_admin_td_actions
                     [:li.sf_admin_action_view [:a {:href (str "/order/" (:id order) "/view")} "View"]]
                     [:li.sf_admin_action_delete [:a {:href (str "/order/" (:id order) "/delete") :onclick (js (return (confirm "are you sure")))} "Delete"]]]]])
             [:tr
              [:th {:colspan "6"}
               [:div.sf_admin_pagination
                [:a {:href "/orders?page=1"}
                 [:img {:alt "Frist Page" :title "First Page" :src "/images/first.png"}] "  "]
                [:a {:href (str "/orders?page=" (if (> current 1) (dec current) 1))}
                 [:img {:alt "Previous Page" :title "Previous Page" :src "/images/previous.png"}] "  "]
                (for [x (range 1 (inc total-page))]
                  [:a {:href (str "/orders?page=" x)} (str x "  ")])
                [:a {:href (str "/orders?page=" (if (< current total-page) (inc current) total-page))}
                 [:img {:alt "Next Page" :title "Next Page" :src "/images/next.png"}] "  "]
                [:a {:href (str "/orders?page=" total-page)}
                 [:img {:alt "Last Page" :title "Last Page" :src "/images/last.png"}] "  "]]
               (str (count orders) \space "results<br>" "(page " current "/" total-page ")")]]]]]]
        [:script {:type "text/javascript"}
         (js (fn checkAll []
               (var checkboxes (.getElementsByName document "ids[]"))
               (doseq [i checkboxes]
                 (set! (.. (aget checkboxes i) checked)
                       (.. (.getElementById document "sf_admin_list_batch_checkbox") checked))))
             (fn updateCheckedIds []
               (var ids_ary [])
               (var j 0)
               (var checkboxes (.getElementsByName document "ids[]"))
               (var hidden (.getElementById document "selected_ids"))
               (doseq [i checkboxes]
                 (if (.. (aget checkboxes i) checked)
                   (.push ids_ary (.. (aget checkboxes i) value))))
               (var ids (.join ids_ary))
               (set! (.. hidden value) ids)))]]))))

(defn create [params]
  (j/insert! SQLDB :sa_orders
             {:order_content (:order_content params)
              :form_name (:form_name params)
              :user_id (:user_id params)
              :created_at (.getTime (java.util.Date.))
              :updated_at (.getTime (java.util.Date.))}))

(defn delete [id]
  (if (.exists (io/file (str "resources/public/files/Invoice-" id ".jpg")))
    (io/delete-file (str "resources/public/files/Invoice-" id ".jpg")))
    (if (.exists (io/file (str "resources/public/files/Invoice-" id ".pdf")))
      (io/delete-file (str "resources/public/files/Invoice-" id ".pdf")))
  (j/delete! SQLDB :sa_orders (sql/where {:id id}))
  (j/delete! SQLDB :CSV_report (sql/where {:o_id id}))
  (redirect "/orders"))

(defn view [id]
  (let [order (first (j/query SQLDB
                              (sql/select [:form_name :order_content] :sa_orders
                                          (sql/where {:id id}))))]
    (binding [*js-css-files* order-view-files]
      (pages
        [:div
          [:h2 (:form_name order)]
          [:div.requf_tit.form_control.form_head (:order_content order)]]))))

(defn delete-selected [params]
  (if (empty? (:ids params)) (redirect "/orders")
    (let [ids_ary (clojure.string/split (:ids params) #",")]
      (do
        (doseq [id ids_ary]
          (do
            (if (.exists (io/file (str "resources/public/files/Invoice-" id ".jpg")))
              (io/delete-file (str "resources/public/files/Invoice-" id ".jpg")))
              (if (.exists (io/file (str "resources/public/files/Invoice-" id ".pdf")))
                (io/delete-file (str "resources/public/files/Invoice-" id ".pdf")))
            (j/delete! SQLDB :sa_orders (sql/where {:id id}))
            (j/delete! SQLDB :CSV_report (sql/where {:o_id id}))))
        (redirect "/orders")))))
