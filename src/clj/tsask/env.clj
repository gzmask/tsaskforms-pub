(ns tsask.env
  (:use tsask.pages.template-pg))

(comment def SQLDB {:subprotocol "mysql"
                              :subname "//127.0.0.1:3306/authority"
                              :user "root"
                              :password "abcdefg"})

(def SQLDB {:classname "org.sqlite.JDBC"
                :subprotocol "sqlite"
                :subname "resources/db/database.sqlite"})

(defn err-handler
  [& [opts]]
  error-page)

(def CSV_ROOT_PATH "resources")

(def MAIL_TEMPLATE
  ^{:host "mail.melcher.ca"
    :user "ray@melcher.ca"
    :pass "abcdefg"}
  {:from "Ray Lei"})

(def PAYPAL {:login "TSASKadmin"
             :partner "PayPalCA"
             :password "abcdefg"
             })
