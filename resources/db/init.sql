PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE "CSV_report" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "app_name" varchar(255) DEFAULT NULL,
  "address" varchar(255) DEFAULT NULL,
  "phone" varchar(255) DEFAULT NULL,
  "email" varchar(255) DEFAULT NULL,
  "file_no" varchar(255) DEFAULT NULL,
  "reg_class" varchar(255) DEFAULT NULL,
  "app_type" varchar(255) DEFAULT NULL,
  "app_detail" varchar(255) DEFAULT NULL,
  "invoice_id" int(11) DEFAULT NULL,
  "paid_by" varchar(255) DEFAULT NULL,
  "card_type" varchar(255) DEFAULT NULL,
  "payment_amt" float DEFAULT NULL,
  "created_at" datetime NOT NULL,
  "o_id" bigint(20) NOT NULL,
  "invoice_no" varchar(255) DEFAULT NULL
);
CREATE TABLE "Version" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "timestamp" varchar(255) DEFAULT NULL
);
CREATE TABLE "sa_forms" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "form_name" varchar(255) DEFAULT NULL,
  "form_content" longtext, -- this is the form design html that is for form/edit
  "form_published" longtext, -- this is the form html that is published, where is show at form/view
  "created_at" datetime NOT NULL,
  "updated_at" datetime NOT NULL
);
CREATE TABLE "sa_orders" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "form_id" bigint(20) DEFAULT NULL,
  "user_id" bigint(20) DEFAULT NULL,
  "form_name" varchar(255) DEFAULT NULL,
  "user_name" varchar(255) DEFAULT NULL,
  "total_cost_paid" varchar(255) DEFAULT NULL,
  "date_completed" datetime DEFAULT NULL,
  "order_content" longtext,
  "created_at" datetime NOT NULL,
  "updated_at" datetime NOT NULL
);
CREATE TABLE "user" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "first_name" varchar(255),
  "last_name" varchar(255),
  "email_address" varchar(255),
  "username" varchar(128) NOT NULL,
  "password" varchar(128) NOT NULL,
  "last_login" datetime DEFAULT NULL,
  "created_at" datetime,
  "updated_at" datetime
);
INSERT INTO user (id, username, password) VALUES (1, 'admin', 'bang!');
COMMIT;
