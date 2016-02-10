-- false is pending, true is completed
ALTER TABLE sa_orders ADD COLUMN
"quantity" bigint(20) DEFAULT 1;

insert into Version (timestamp) values ("201409172035");
