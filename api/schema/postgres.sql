CREATE SCHEMA social;
ALTER ROLE yugabyte SET search_path TO social;
ALTER ROLE postgres SET search_path TO social;
SET search_path TO social;

CREATE TABLE comments (
	id bigserial,
	description varchar(200) NOT NULL,
	createdat timestamp without time zone,
	userid bigint NOT NULL,
	postid bigint NOT NULL,
	PRIMARY KEY (id)
) ;
ALTER SEQUENCE comments_id_seq RESTART WITH 1;
ALTER TABLE comments ADD UNIQUE (id);


CREATE TABLE likes (
	id bigserial,
	userid bigint NOT NULL,
	postid bigint NOT NULL,
	PRIMARY KEY (id)
) ;
ALTER SEQUENCE likes_id_seq RESTART WITH 1;
ALTER TABLE likes ADD UNIQUE (id);


CREATE TABLE posts (
	id bigserial,
	description varchar(200),
	img varchar(200),
	userid bigint NOT NULL,
	createdat timestamp without time zone,
	PRIMARY KEY (id)
) ;
ALTER SEQUENCE posts_id_seq RESTART WITH 1;
ALTER TABLE posts ADD UNIQUE (id);


CREATE TABLE relationships (
	id bigserial,
	followeruserid bigint NOT NULL,
	followeduserid bigint NOT NULL,
	PRIMARY KEY (id)
) ;
ALTER SEQUENCE relationships_id_seq RESTART WITH 1;
ALTER TABLE relationships ADD UNIQUE (id);


CREATE TABLE stories (
	id bigserial,
	img varchar(200) NOT NULL,
	userid bigint NOT NULL,
	PRIMARY KEY (id)
) ;
ALTER SEQUENCE stories_id_seq RESTART WITH 1;
ALTER TABLE stories ADD UNIQUE (id);


CREATE TABLE users (
	id bigserial,
	username varchar(45) NOT NULL,
	email varchar(45) NOT NULL,
	"password" varchar(200) NOT NULL,
	name varchar(45) NOT NULL,
	coverpic varchar(100),
	profilepic varchar(100),
	city varchar(45),
	website varchar(45),
	PRIMARY KEY (id)
) ;
ALTER SEQUENCE users_id_seq RESTART WITH 1;
ALTER TABLE users ADD UNIQUE (id);
ALTER TABLE comments ADD CONSTRAINT commentpostid FOREIGN KEY (postid) REFERENCES posts(id) MATCH SIMPLE ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE comments ADD CONSTRAINT commentuserid FOREIGN KEY (userid) REFERENCES users(id) MATCH SIMPLE ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE likes ADD CONSTRAINT likepostid FOREIGN KEY (postid) REFERENCES posts(id) MATCH SIMPLE ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE likes ADD CONSTRAINT likeuserid FOREIGN KEY (userid) REFERENCES users(id) MATCH SIMPLE ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE posts ADD CONSTRAINT userid FOREIGN KEY (userid) REFERENCES users(id) MATCH SIMPLE ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE relationships ADD CONSTRAINT followeduser FOREIGN KEY (followeduserid) REFERENCES users(id) MATCH SIMPLE ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE relationships ADD CONSTRAINT followeruser FOREIGN KEY (followeruserid) REFERENCES users(id) MATCH SIMPLE ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE stories ADD CONSTRAINT storyuserid FOREIGN KEY (userid) REFERENCES users(id) MATCH SIMPLE ON DELETE NO ACTION ON UPDATE CASCADE;

CREATE INDEX comments_postid ON comments (postid);
CREATE INDEX comments_userid ON comments (userid);
CREATE INDEX likes_postid ON likes (postid);
CREATE INDEX likes_userid ON likes (userid);
CREATE INDEX posts_userid ON posts (userid);
CREATE INDEX relationships_followeduserid ON relationships (followeduserid);
CREATE INDEX relationships_followeruserid ON relationships (followeruserid);
CREATE INDEX stories_userid ON stories (userid);