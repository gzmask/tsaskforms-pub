(ns tsask.session.log
  (:use tsask.pages.template-pg
        tsask.env
        digest
        hiccup.core
        hiccup.page
        hiccup.util)
  (require [clojure.java.jdbc :as j]
           [clojure.java.jdbc.sql :as sql]))

(defn login []
  (binding [*css-files* ["/css/login.css"]]
  (html5
    [:head
     (apply include-css *css-files*)
     [:title "Technical Safety Authority of Saskatchewan"]]
    [:body
      [:div.loginbox
        [:div.icon_logo
          [:a {:href "/" :title "Technical Safety Authority Interface Design"}
            [:img {:src "/images/icon_logo.jpg" :alt "Technical Safety Authority Interface Design"}]]]
        [:div.logincont
          [:form {:action "/check" :method "post"}
            [:div.lc_box
              [:input.intxt {:name "username" :type "text"}]
              [:input.intxt {:name "password" :type "password"}]
              [:input.inbtnlogin {:type "submit" :value ""}]]
              [:div.clear]]]]])))

(defn check [username password session]
  (let [user (first (j/query SQLDB (sql/select * :user (sql/where {:username username}))))]
    {:status 302
     :session (assoc session :login (if (= (digest/sha-256 password) (:password user))
                                      (:id user)
                                      nil))
     :headers {"Location" "/shopforms"}}))

(defn logout [session]
  {:status 302
   :session (assoc session :login false)
   :headers {"Location" "/shopforms"}})

(comment defn check-tsask [x y session]
  (let [x (Integer/parseInt x)
        y (Integer/parseInt y)]
    {:status 302
     :headers {"Location" "https://www.tsaskforms.ca/backend.php"}
     :session (assoc session :login (= x (int (/ 314 y))))}))
