CREATE TABLE "hasrole" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "user_id" bigint(20) NOT NULL,
  "role_id" bigint(20) NOT NULL
);

CREATE TABLE "role" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "name" varchar(255) NOT NULL
);

INSERT INTO role (id, name) VALUES (1, 'admin');
INSERT INTO role (id, name) VALUES (2, 'dev');
INSERT INTO role (id, name) VALUES (3, 'user');

INSERT INTO user (id, username, password) VALUES (2, 'gzmask', '3ea87a56da3844b420ec2925ae922bc731ec16a4fc44dcbeafdad49b0e61d39c');
INSERT INTO user (id, username, password) VALUES (3, 'tester', '3ea87a56da3844b420ec2925ae922bc731ec16a4fc44dcbeafdad49b0e61d39c');

INSERT INTO hasrole (user_id, role_id) VALUES (1, 1);
INSERT INTO hasrole (user_id, role_id) VALUES (2, 2);
INSERT INTO hasrole (user_id, role_id) VALUES (3, 3);

insert into Version (timestamp) values ("201407082130");
