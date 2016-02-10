--DROP TABLE cartorder;

-- only form id and payment info needs to be saved
CREATE TABLE "cartorder" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "form_id" bigint(20) NOT NULL,
  "user_id" bigint(20) NOT NULL,
  "html" longtext,
  "quantity" bigint(20) default 1,
  "form_name" varchar(255),
  "payment_amt" float DEFAULT 0,
  "created_at" datetime NOT NULL
);

insert into Version (timestamp) values ("201407161416");
