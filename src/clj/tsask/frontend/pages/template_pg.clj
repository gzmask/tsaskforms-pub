(ns tsask.frontend.pages.template-pg
  (:use tsask.env
        tsask.util
        hiccup.core
        hiccup.page
        hiccup.util)
  (:require [clojure.java.jdbc :as j]))

;these are like atoms that can be changed
(def ^:dynamic *js-files* nil)
(def ^:dynamic *css-files* nil)
(def ^:dynamic *js-css-files* nil)
(def ^:dynamic *sub-nav*
  [:div.subnav
   [:a.newform {:href "/form/new" :title "new form"} "New Form"]
   [:a.newuser {:href "/fuser/new" :title "new user"} "New User"]])

(def user-files ["/css/fcommon.css" "/css/fix.css" "/js/jquery-1.7.2.js" "/js/DD_belatedPNG.js" "/js/layout.js" "/js/login.js" "/js/user.js"])

(defn include-js-css [files]
  (for [f files]
    (if (.endsWith f "js")
      (include-js f)
      (include-css f))))

(defn commit-page [page]
   (html5
    [:head
     (apply include-css ["/css/common.css" "/css/fix.css"])
     [:title "technical safety authority of saskatchewan"]]
    [:body
     [:div.wrapper
      [:div.header
       [:div.icon_logo
        [:img {:src "/images/icon_logo.jpg" :alt "technical safety authority interface design" :title "technical safety authority interface design"}]]]
      [:div.container
       [:div.mainbox
        page]]]]))

(defn pages
  "get page by pagename"
  [page & [session]]
  (let [orders (if (:login session)
                 (not-empty (j/query SQLDB
                                     ["select id, form_id, user_id, html, quantity, form_name, payment_amt, created_at from cartorder where user_id = ?" (:login session)]))
                 (not-empty (:orders session)))
        admin (if (role-check session ["admin" "dev"]) 
                [:a {:href "/admin"} [:i.fa.fa-gear.fa-lg] " admin"]
                nil)
        cart-num (count orders)]
    (html5
     [:head
      (apply include-css *css-files*)
      (apply include-js *js-files*)
      (include-js-css *js-css-files*)
      [:link {:href "//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" :rel "stylesheet"}]
      [:title "technical safety authority interface design_login"]]
     [:body
      [:div.wrapper
       [:div.header
        [:div.icon_logo
         [:a {:title "technical safety authority interface design"}
          [:img {:src "/images/icon_logo.jpg" :alt "technical safety authority interface design"}]]] 
         [:div.icon_admin admin]
        [:div.icon_reg
         (if (not (:login session))
           [:a {:href "/fuser/signup" :title "Register"} [:i.fa.fa-user.fa-lg] " Register"])]
        [:div.icon_cart 
         [:a {:href "/carts" :title "shopping cart"} [:i.fa.fa-shopping-cart.fa-lg] (str " " cart-num)]]
        [:div.icon_exit
         (if (:login session)
           [:a {:href "/logout" :title "logout"} [:i.fa.fa-sign-out.fa-lg] " exit"]
           [:a {:href "/login" :title "login"} [:i.fa.fa-sign-in.fa-lg] " sign"])]]
       [:div.container
        (let [nav-list [{:id "shopforms" :content "Form" :title "forms" :href "/shopforms"}
                        {:id "calendar" :content "Calendar" :title "calendar" :href "/calendar"}
                        {:id "carts" :content "Shopping Cart" :title "carts" :href "/carts"}
                        {:id "orders" :content "accounts" :title "accounts" :href "/fuser/orders"}]]
          [:div.mainnav
           [:ul.navlist
            (map (fn [nav] (let [nav-ele (second nav)]
                             [:li [(keyword (str "a.nav" (+ 1 (first nav))))
                                   {:id (:id nav-ele) :href (:href nav-ele) :title (:title nav-ele)}
                                   [:span (:content nav-ele)]]]))
                 (map-indexed vector nav-list))]
           [:div.clear]])
        (include-js "/js/highlight-active-tab.js")
        [:div.mainbox
         *sub-nav*
         page]]]])))

(defn view-pages
  "get page by pagename"
  [page & [session]]
  (binding [*sub-nav* nil]
  (pages page session)))


(comment defn view-pages
  "get page by pagename"
  [page & [session]]
  (html5
   [:head
    (apply include-css *css-files*)
    (apply include-js *js-files*)
    (include-js-css *js-css-files*)
    [:title "technical safety authority interface design_login"]]
   [:body
    [:div.wrapper
     [:div.header
      [:div.icon_logo
       [:a {:href "/" :title "technical safety authority interface design"}
        [:img {:src "/images/icon_logo.jpg" :alt "technical safety authority interface design"}]]]
      [:div.icon_cart
       [:a {:href "/carts" :title "shopping cart"} "shopping cart"]]
      [:div.icon_exit
       (if (:login session)
         [:a {:href "/logout" :title "logout"} "logout"]
         [:a {:href "/login" :title "login"} "login"])]]]
     [:div.container
      (include-js "/js/highlight-active-tab.js")
      [:div.mainbox
       page]]]))

(def error-page
  (pages
   [:dvi
    [:h1 "Ooooops..."]
    [:h3 "Server is busying..."]]))
