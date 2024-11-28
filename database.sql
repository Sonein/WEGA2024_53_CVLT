DROP TABLE IF EXISTS info;
DROP TABLE IF EXISTS request;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS posts;

CREATE TABLE users (
    id INTEGER UNIQUE PRIMARY KEY NOT NULL ,
    uid INTEGER UNIQUE NOT NULL ,
    name VARCHAR(50) NOT NULL ,
    surname VARCHAR(50) NOT NULL ,
    username VARCHAR(50) NOT NULL ,
    password VARCHAR(64) NOT NULL ,
    admin INTEGER NOT NULL
);

CREATE TABLE request (
    uid INTEGER UNIQUE NOT NULL ,
    status CHARACTER NOT NULL
);

CREATE TABLE info (
    uid INTEGER UNIQUE NOT NULL ,
    gender VARCHAR(50) NOT NULL ,
    born DATE ,
    reason TEXT
);

CREATE TABLE posts (
    id INTEGER UNIQUE PRIMARY KEY NOT NULL ,
    user VARCHAR(50) NOT NULL ,
    title VARCHAR(100) NOT NULL ,
    tt TEXT
);

INSERT INTO users VALUES (0, 0, 'admin', 'admin', 'admin', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', 1);
INSERT INTO request VALUES (0, 'a');
INSERT INTO info VALUES (0, 'admin', NULL, NULL);
INSERT INTO posts VALUES (0, 'admin', 'About Posts', 'Rules for posts:%25
                                                     1. No disrespect towards our dragon goddess.%25
                                                     2. No disrespect towards admins.%25
                                                     3. No disrespect towards cult practices.%25
                                                     4. We may change rules as we wish.%25
                                                     5. No racism/sexism/hate speech of any kind.%25
                                                     6. Keep topics in appropriate channels, dont spoil things for others, avoid politics and religion where neccesary, and do not undermine anyones identities.');
