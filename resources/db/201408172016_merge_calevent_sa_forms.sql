ALTER TABLE sa_forms ADD COLUMN
"start" datetime DEFAULT NULL;

ALTER TABLE sa_forms ADD COLUMN
"end" datetime DEFAULT NULL;

DROP TABLE calevent;

insert into Version (timestamp) values ("201408172016");
