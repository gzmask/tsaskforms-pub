(ns tsask.util
  (:use tsask.env)
  (:require [clojure.java.jdbc :as j]
            [clojure.java.jdbc.sql :as sql])
  (:import java.util.Date
           java.util.Calendar))

(defmulti strftime 
  "Format time t according to format string fmt."
  (fn [fmt t] (class t)))

(defmethod strftime Date
  [fmt t]
  ; Convert strftime to String.format format (e.g. %m -> %1$tm)
  (let [fmt (.replaceAll fmt "%([a-zA-Z])" "%1\\$t$1")]
    (format fmt t)))

(defmethod strftime Long
  [fmt t]
  (strftime fmt (Date. t)))

(defmethod strftime Calendar
  [fmt t]
  (strftime fmt (.getTime t)))

(defmacro wrap-session-verify
  [session & handler-bodys]
  `(if (:login ~session)
     ~@handler-bodys
     {:status 302
      :headers {"Location" "/login"}
      :body ""}))

(defn role-check [session roles]
  (reduce #(or %1 %2) false 
          (for [user-role-id (for [hasrole (j/query SQLDB (sql/select * :hasrole (sql/where {:user_id (:login session)})))] 
                               (:role_id hasrole)) 
                role-id (for [role roles] 
                          (:id (first (j/query SQLDB (sql/select * :role (sql/where {:name role}))))))] 
            (= user-role-id role-id))))

(defmacro wrap-session-verify-roles
  [roles session & handler-bodys]
  `(if (role-check ~session ~roles) 
      ~@handler-bodys 
      {:status 302
       :headers {"Location" "/login"}
       :body ""}))

;(macroexpand `(wrap-session-verify-roles ["admin" "user"] {:login 1} (str "yiyi")))

(defmacro wrap-session-verify-role
  [role session & handler-bodys]
  `(if 
     (=
       (:role_id (first (j/query SQLDB (sql/select * :hasrole (sql/where {:user_id (:login ~session)})))))
       (:id (first (j/query SQLDB (sql/select * :role (sql/where {:name ~role}))))))
     ~@handler-bodys
     {:status 302
      :headers {"Location" "/login"}
      :body ""}))

(defmacro wrap-with-try-catch
  [handler & error-handlers]
  `(try
     ~handler
     (catch Exception e#
       (.printStackTrace e#)
       ~@error-handlers)))

(defn empty-to-nil [value]
  (if (empty? value)
    nil
    value))

(defn get_last_id [record]
  ((keyword "last_insert_rowid()") (first record)))
  

(defmacro wrap-error-handler
  [handler]
  `(wrap-with-try-catch ~handler (err-handler)))

(defmacro wrap-error-handler+session-verify
  [handler session]
  `(wrap-error-handler (wrap-session-verify ~handler ~session)))

(defn vec-remove
  "remove elem in coll"
  [coll pos]
  (vec (concat (subvec coll 0 pos) (subvec coll (inc pos)))))
