(ns tsask.core
    (:gen-class)
    (:use compojure.core
          tsask.env
          ring.adapter.jetty
          tsask.util)
    (:require [compojure.handler :as handler]
              [ring.middleware.session :as session]
              [ring.middleware.params :as params]
              [ring.middleware.json :as json]
              ;[ring.middleware.multipart-params :as mulparams]

              ;[clojure.java.jdbc :as j]
              ;[clojure.java.io :as io]
              ;[clojure.java.jdbc.sql :as sql]

              [compojure.route :as route]

              [tsask.csv.crud :as csv]
              [tsask.session.log :as log]
              [tsask.form.crud :as form]
              [tsask.order.crud :as order]
              [tsask.frontend.cart.crud :as cart]
              [tsask.frontend.calendar.crud :as cal]
              [tsask.frontend.user.crud :as fuser]
              [tsask.frontend.form.crud :as fform]
              [tsask.user.crud :as user]
              [tsask.file.crud :as file]))

(defn test-get [params]
  {:status 200
   :headers {"Content-Type" "text/html"}
   :body (str "Hello, " (:name params))})

(defroutes app-routes
  (route/resources "/")
  (GET "/admin" {session :session} (wrap-session-verify session tsask.pages.template-pg/home-pg))
  (GET "/test-get" {params :params} (test-get params))

  (GET "/login" [] (log/login))
  (GET "/logout" {session :session} (log/logout session))
  (POST "/check" {{username :username password :password} :params session :session} (log/check username password session))

  ;back-end routes
  (GET "/forms" {{sort :sort sort-type :sort_type} :params session :session} (wrap-session-verify-roles ["admin" "dev"] session (form/index sort sort-type)))
  (GET "/form/:id/delete" {{id :id} :params session :session} (wrap-session-verify-roles ["admin" "dev"] session (form/delete id)))
  (GET "/form/:id/edit" {{id :id} :params session :session} (wrap-session-verify-roles ["admin" "dev"] session (form/edit id)))
  (GET "/form/:id/copy" {{id :id} :params session :session} (wrap-session-verify-roles ["admin" "dev"] session (form/copy id)))
  (GET "/form/new" {session :session} (wrap-session-verify-roles ["admin" "dev"] session (form/new)))
  (POST "/form/create" {params :params session :session} (wrap-session-verify-roles ["admin" "dev"] session (form/create params)))
  (POST "/form/:id/update" {params :params session :session} (wrap-session-verify-roles ["admin" "dev"] session (form/update params)))

  (GET "/orders" {{sort :sort sort-type :sort_type page :page} :params session :session} (wrap-session-verify-roles ["admin" "dev"] session (order/index page sort sort-type)))
  (GET "/order/:id/delete" {{id :id} :params session :session} (wrap-session-verify-roles ["admin" "dev"] session (order/delete id)))
  (GET "/order/:id/view" {{id :id} :params session :session} (wrap-session-verify-roles ["admin" "dev"] session) (order/view id))
  (POST "/order/delete-selected" {params :params session :session} (wrap-session-verify-roles ["admin" "dev"] session (order/delete-selected params)))

  (GET "/users" {{sort :sort sort-type :sort_type} :params session :session} (wrap-session-verify-roles ["admin" "dev"] session (user/index sort sort-type)))
  (GET "/user/new" {session :session} (wrap-session-verify-roles ["admin" "dev"] session (user/new)))
  (POST "/user/create" {params :params session :session} (wrap-session-verify-roles ["admin" "dev"] session (user/create params)))
  (POST "/user/:id/create" {params :params session :session} (wrap-session-verify-roles ["admin" "dev"] session (user/update params)))
  (GET "/user/:id/edit" {{id :id} :params session :session} (wrap-session-verify-roles ["admin" "dev"] session (user/edit id)))
  (GET "/user/:id/delete" {{id :id} :params session :session} (wrap-session-verify-roles ["admin" "dev"] session (user/delete id)))

  (GET "/csv/export" {session :session params :params} (wrap-session-verify-roles ["admin" "dev"] session (csv/export params)))
  (GET "/csv/new" {session :session} (wrap-session-verify-roles ["admin" "dev"] session (csv/new)))
  (GET "/csv/payment-report" {session :session} (wrap-session-verify-roles ["admin" "dev"] session (csv/payment-report)))
  (GET "/csv/download/:filename" {params :params session :session} (wrap-session-verify-roles ["admin" "dev"] session (csv/download-csv (:filename params))))
  (POST "/csv/create" {params :params} (csv/create params))

  (GET "/files" {session :session} (wrap-session-verify-roles ["admin" "dev"] session (file/files)))
  (GET "/files/:filename" {params :params session :session} (wrap-session-verify-roles ["admin" "dev"] session (file/view-file (:filename params))))
  (POST "/file/upload" {params :params} (file/upload-file params))

  ;front-end routes
  (GET "/carts" {session :session} (cart/index session))
  (GET "/cart/:id/preview" {{id :id} :params session :session} (cart/preview id session))
  (POST "/cart/pay" {params :params session :session} (cart/pay params session))
  (POST "/cart/paypal" {params :params session :session} (cart/paypal-form params session))
  (GET "/cart/:id/delete" {{id :id} :params session :session} (cart/delete id session))

  (GET "/calendar" {session :session} (cal/index session))
  (GET "/calevents" {params :params session :session} (cal/calevents))

  (GET "/fuser/signup" {session :session} (fuser/signup))
  (POST "/fuser/create" {params :params} (fuser/create params))
  (GET "/fuser/:id/edit" {{id :id} :params session :session} (wrap-session-verify session (fuser/edit id)))
  (GET "/fuser/accounts" {session :session} (wrap-session-verify session (fuser/accounts session)))
  (GET "/fuser/orders" {session :session} (fuser/orders session))
  (GET "/fuser/:id/view/orders" {{id :id} :params session :session} (fuser/order-view id session))
  (POST "/fuser/:id/update" {params :params session :session} (wrap-session-verify session (fuser/update params)))

  (GET "/" {{sort-col :sort sort-type :sort_type} :params session :session} (fform/index sort-col sort-type session))
  (GET "/shopforms" {{sort-col :sort sort-type :sort_type} :params session :session} (fform/index sort-col sort-type session))
  (GET "/form/:id/view" {{id :id} :params session :session} (fform/view id session))
  (GET "/form/:fid/:oid/fill" {{fid :fid oid :oid} :params session :session} (fform/fill fid oid session))
  (POST "/form/commit" {params :params session :session} (fform/commit params session))
  (GET "/form/:id/addcart" {{id :id} :params session :session} (fform/addcart id session))
)

(def app
    (json/wrap-json-response (params/wrap-params (session/wrap-session (handler/site app-routes)))))

(defn -main []
      (run-jetty #'app {:port 80
                        :join? false
                        ;:ssl? true
                        ;:ssl-port 443
                        ;:keystore "/etc/keystore"
                        ;:key-password "melcher.ca123"
                        :client-auth :need}))

(defn start-server []
  (defonce server (ring.adapter.jetty/run-jetty #'app {:port 3000 :join? false}))
  (.start server))


(defn stop-server []
  (.stop server))

;(start-server)
;(stop-server)
