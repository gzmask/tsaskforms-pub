(ns tsask.frontend.calendar.crud
  (:use tsask.env
        tsask.util
        hiccup.core
        hiccup.page
        hiccup.util)
  (:require [clojure.java.jdbc :as j]
            [clojure.java.io :as io]
            [ring.util.response :as ut :refer [response]]
            [hickory.core :as hy]
            [hickory.select :as hs]
            [tsask.order.crud :as order]
            [tsask.form.crud :as form]
            [tsask.frontend.pages.template-pg :as template]
            [com.reasonr.scriptjure :as sj]
            [clojure.java.jdbc.sql :as sql]))

(defn- redirect [url]
  {:status 302
   :headers {"Location" url}
   :body ""})

(comment "debug repls"
  (def one-day 86400000)
  (j/query SQLDB (sql/select [:id :title :description :form_id :start :end] :calevent))
  (j/query SQLDB (sql/select [:created_at] :sa_orders))
  (def cal_evt
  (j/insert! SQLDB :calevent
             {:title "form 2"
              :description "this is description of form 2"
              :form_id 1
              :start (- (.getTime (java.util.Date.)) one-day)
              :end (+ (.getTime (java.util.Date.)) one-day)}))
  ((keyword "last_insert_rowid()") (first cal_evt))
  (keyword "last_insert_rowid()")
  (java.util.Date.)
  (type (.getTime (java.util.Date.))))

(defn calevents
  "json response forms that should be in calendar"
  []
  (let [events (j/query SQLDB
                        ["select id, form_name AS title, form_name AS description, id AS form_id, form_published, start, end FROM sa_forms;"])
        response (for [e events]
                   (assoc e
                          :payment_amt
                          (:value (:attrs (first (hs/select (hs/descendant (hs/id :form_payment_cost)) (hy/as-hickory (hy/parse (:form_published e)))))))))]
    (ut/response response)))

(def CLNDR-template
  [:script
   {:type "text/template"
    :id "template-calendar"}
   [:div.clndr-controls
    [:div.clndr-previous-button "&lsaquo;"]
    [:div.clndr-next-button "&rsaquo;"]
    [:div.month "<%= month %>" [:span "&nbsp;<%= year %>"]]
    [:div.clndr-today-button "|Today|"]]
   [:div.clndr-grid
    [:div.days-of-the-week
     "<% _.each(daysOfTheWeek, function(day) { %>"
     [:div.header-day "<%= day %>"]
     "<% }); %>"
     [:div.days
      "<% _.each(days, function(day) { %>"
        "<div class=\"<%= day.classes %>\"><%= day.day %><br />"
        "<% _.each(day.events, function(event) { %>"
          "<i class=\"fa fa-file-text-o\"></i>"
        "<% }); %>"
      "</div><% }); %>"
      ]]]

   [:div.event-listing-month
    [:div.event-listing-title "Events This Month" ]
    "<% _.each(eventsThisMonth, function(event) { %>"
    [:div.event-item
     "<a class=\"event-item-name\" href=\"/form/<%= event.form_id %>/view\"><%= event.title %></a>"]
    "<% }); %>" ]
   [:br]
   [:div#dialog {:title "Basic dialog" :style "display:none;"} [:p#dialog-box [:div "Forms:"][:ul]]] ;oneliner jquery dialog UI template
   [:div.event-listing-day
    [:div.event-listing-title "Events Avilable Today" ]
    "<% _.each(this.options.eventsToday, function(event) { %>"
    [:div.event-item
     "<a class=\"event-item-name\" href=\"/form/<%= event.form_id %>/view\"><%= event.title %></a>"]
    "<% }); %>" ]])

(def calendar-files  ["/css/fcommon.css" "/css/fix.css" "/vendor/clndr.css" "/js/jquery.min.js" "/vendor/jquery-ui.js" "/vendor/jquery-ui.css" "/vendor/jquery-ui.structure.css" "/js/DD_belatedPNG.js" "/vendor/moment.min.js" "/vendor/underscore-min.js" "/vendor/clndr.min.js" "/js/layout.js"])

(defn index [session]
    (binding [template/*js-css-files* calendar-files
              template/*sub-nav* nil]
      (template/pages
       [:div#calendar_target.cal2 "this is calendar. Clndr is ready."
        CLNDR-template
        (include-js "/js/calendar/cal.js")] session)))

