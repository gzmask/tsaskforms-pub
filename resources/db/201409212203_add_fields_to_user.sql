ALTER TABLE user ADD COLUMN
"tel" varchar(20);
ALTER TABLE user ADD COLUMN
"fax" varchar(20);
ALTER TABLE user ADD COLUMN
"company" varchar(255);
ALTER TABLE user ADD COLUMN
"company_id" varchar(255);
ALTER TABLE user ADD COLUMN
"address" varchar(255);
ALTER TABLE user ADD COLUMN
"city" varchar(128);
ALTER TABLE user ADD COLUMN
"post" varchar(64);
ALTER TABLE user ADD COLUMN
"country_id" bigint(20);
ALTER TABLE user ADD COLUMN
"region_id" bigint(20);
ALTER TABLE user ADD COLUMN
"subscribe" BOOLEAN DEFAULT 0;

CREATE TABLE "country" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "name" varchar(255)
);

CREATE TABLE "region" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "name" varchar(255)
);

insert into country (name) values ("Canada");
insert into country (name) values ("United States");

insert into region (name) values ("-----Canada----");
insert into region (name) values ("Alberta");
insert into region (name) values ("British Columbia");
insert into region (name) values ("Manitoba");
insert into region (name) values ("New Brunswick");
insert into region (name) values ("Newfoundland and Labrador");
insert into region (name) values ("Northwest Territories");
insert into region (name) values ("Nova Scotia");
insert into region (name) values ("Nunavut");
insert into region (name) values ("Ontario");
insert into region (name) values ("Prince Edward Island");
insert into region (name) values ("Quebec");
insert into region (name) values ("Saskatchewan");
insert into region (name) values ("Yukon");
insert into region (name) values ("-----United States----");
insert into region (name) values ("Alabama");
insert into region (name) values ("Alaska");
insert into region (name) values ("American Samoa");
insert into region (name) values ("Arizona");
insert into region (name) values ("Arkansas");
insert into region (name) values ("Armed Forces Americas");
insert into region (name) values ("Armed Forces Europe");
insert into region (name) values ("Armed Forces Pacific");
insert into region (name) values ("California");
insert into region (name) values ("Colorado");
insert into region (name) values ("Connecticut");
insert into region (name) values ("Delaware");
insert into region (name) values ("District of Columbia");
insert into region (name) values ("Florida");
insert into region (name) values ("Georgia");
insert into region (name) values ("Guam");
insert into region (name) values ("Hawaii");
insert into region (name) values ("Idaho");
insert into region (name) values ("Illinois");
insert into region (name) values ("Indiana");
insert into region (name) values ("Iowa");
insert into region (name) values ("Kansas");
insert into region (name) values ("Kentucky");
insert into region (name) values ("Louisiana");
insert into region (name) values ("Maine");
insert into region (name) values ("Maryland");
insert into region (name) values ("Massachusetts");
insert into region (name) values ("Michigan");
insert into region (name) values ("Minnesota");
insert into region (name) values ("Mississippi");
insert into region (name) values ("Missouri");
insert into region (name) values ("Montana");
insert into region (name) values ("Nebraska");
insert into region (name) values ("Nevada");
insert into region (name) values ("New Hampshire");
insert into region (name) values ("New Jersey");
insert into region (name) values ("New Mexico");
insert into region (name) values ("New York");
insert into region (name) values ("North Carolina");
insert into region (name) values ("North Dakota");
insert into region (name) values ("Northern Marianas");
insert into region (name) values ("Ohio");
insert into region (name) values ("Oklahoma");
insert into region (name) values ("Oregon");
insert into region (name) values ("Palau");
insert into region (name) values ("Pennsylvania");
insert into region (name) values ("Puerto Rico");
insert into region (name) values ("Rhode Island");
insert into region (name) values ("South Carolina");
insert into region (name) values ("South Dakota");
insert into region (name) values ("Tennessee");
insert into region (name) values ("Texas");
insert into region (name) values ("Utah");
insert into region (name) values ("Vermont");
insert into region (name) values ("Virgin Islands");
insert into region (name) values ("Virginia");
insert into region (name) values ("Washington");
insert into region (name) values ("West Virginia");
insert into region (name) values ("Wisconsin");
insert into region (name) values ("Wyoming");

insert into Version (timestamp) values ("201409212203");
