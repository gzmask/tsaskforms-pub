(ns tsask.pages.template-pg
  (:use hiccup.core
        hiccup.page
        hiccup.util))

;these are like atoms that can be changed
(def ^:dynamic *js-files* nil)
(def ^:dynamic *css-files* nil)
(def ^:dynamic *js-css-files* nil)
(def ^:dynamic *main-nav*
  (let [nav-list [{:id "forms" :content "Form" :title "forms" :href "/forms"}
                  {:id "orders" :content "Order" :title "orders" :href "/orders"}
                  {:id "users" :content "User" :title "users" :href "/users"}
                  {:id "payment-report" :content "Payment Report" :title "payment report" :href "/csv/payment-report"}
                  {:id "shopforms" :content "Front End" :title "Front End" :href "/shopforms"}]]
    [:div.mainnav
     [:ul.navlist
      (map (fn [nav] (let [nav-ele (second nav)]
                       [:li [(keyword (str "a.nav" (+ 1 (first nav))))
                             {:id (:id nav-ele) :href (:href nav-ele) :title (:title nav-ele)}
                             [:span (:content nav-ele)]]]))
           (map-indexed vector nav-list))]
     [:div.clear]]))
(def ^:dynamic *sub-nav*
  [:div.subnav
   [:a.newform {:href "/form/new" :title "new form"} "New Form"]
   [:a.newuser {:href "/user/new" :title "new user"} "New User"]])

(def home-files ["/css/common.css" "/css/fix.css" "/js/jquery-1.7.2.js" "/js/DD_belatedPNG.js" "/js/layout.js" "/js/login.js"])
(def form-view-files ["/css/main.css" "/css/common.css" "/js/jquery-1.11.1.min.js" "/js/layout.js" "/js/control/form/FormAddress.js" "/js/control/form/FormBirthDatePicker.js" "/js/control/form/FormCheckBox.js" "/js/control/form/ContentDateTime.js" "/js/control/form/FormDropDown.js" "/js/control/form/FormClientEmail.js" "/js/control/form/FormEmail.js" "/js/control/form/FormFileUpload.js" "/js/control/form/FormFullName.js" "/js/control/form/ContentHeading.js" "/js/control/form/ContentNumber.js" "/js/control/form/FormPhone.js" "/js/control/form/FormRadioButton.js" "/js/control/form/ContentTextArea.js" "/js/control/form/FormTextBox.js" "/js/control/form/ContentUniqueId.js" "/js/control/form/FormTOS.js" "/js/form_commit.js"])
(def form-new-files  ["/css/common.css" "/css/fix.css" "/js/jquery-1.7.2.js" "/js/DD_belatedPNG.js" "/js/layout.js" "/js/login.js" "/js/form_design.js" "/js/control/Address.js" "/js/control/BirthDatePicker.js" "/js/control/CheckBox.js" "/js/control/TOS.js" "/js/control/DateTime.js" "/js/control/DropDown.js" "/js/control/ClientEmail.js" "/js/control/Email.js" "/js/control/FileUpload.js" "/js/control/FullName.js" "/js/control/Heading.js" "/js/control/Number.js" "/js/control/Phone.js" "/js/control/RadioButton.js" "/js/control/ResetButton.js" "/js/control/SubmitButton.js" "/js/control/TextArea.js" "/js/control/TextBox.js" "/js/control/UniqueId.js"])
(def forms-files  ["/css/common.css" "/css/fix.css" "/js/jquery-1.7.2.js" "/js/DD_belatedPNG.js" "/js/layout.js" "/js/login.js" "/js/form_design.js" "/js/control/Address.js" "/js/control/BirthDatePicker.js" "/js/control/CheckBox.js" "/js/control/TOS.js" "/js/control/DateTime.js" "/js/control/DropDown.js" "/js/control/ClientEmail.js" "/js/control/Email.js" "/js/control/FileUpload.js" "/js/control/FullName.js" "/js/control/Heading.js" "/js/control/Number.js" "/js/control/Phone.js" "/js/control/RadioButton.js" "/js/control/ResetButton.js" "/js/control/SubmitButton.js" "/js/control/TextArea.js" "/js/control/TextBox.js" "/js/control/UniqueId.js"])
(def orders-files  ["/css/common.css" "/css/fix.css" "/js/jquery-1.7.2.js" "/js/DD_belatedPNG.js" "/js/layout.js" "/js/login.js"])
(def order-view-files form-new-files)

(defn include-js-css [files]
  (for [f files]
    (if (.endsWith f "js")
      (include-js f)
      (include-css f))))

(defn pages
  "get page by pagename"
  [page]
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
       [:a {:title "technical safety authority interface design"}
        [:img {:src "/images/icon_logo.jpg" :alt "technical safety authority interface design"}]]]
      [:div.icon_exit
       [:a {:href "/logout" :title "log out"} "Logout"]]]
     [:div.container
      *main-nav*
      (include-js "/js/highlight-active-tab.js")
      [:div.mainbox
       *sub-nav*
       page]]]]))

(def home-pg
  (binding [*js-css-files* home-files]
    (pages nil)))

(def error-page
  (pages
   [:dvi
    [:h1 "Ooooops..."]
    [:h3 "Server is busying..."]]))
