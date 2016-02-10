-- false is pending, true is completed
ALTER TABLE sa_orders ADD COLUMN
"status" BOOLEAN DEFAULT 0;

insert into Version (timestamp) values ("201408181611");
