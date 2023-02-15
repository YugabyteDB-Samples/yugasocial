CREATE SCHEMA social;
CREATE TABLE social.comments (
	id bigserial,
	description varchar(200) NOT NULL,
	createdat timestamp without time zone,
	userid bigint NOT NULL,
	postid bigint NOT NULL,
	PRIMARY KEY (id)
) ;
ALTER SEQUENCE social.comments_id_seq RESTART WITH 1;
ALTER TABLE social.comments ADD UNIQUE (id);


CREATE TABLE social.likes (
	id bigserial,
	userid bigint NOT NULL,
	postid bigint NOT NULL,
	PRIMARY KEY (id)
) ;
ALTER SEQUENCE social.likes_id_seq RESTART WITH 1;
ALTER TABLE social.likes ADD UNIQUE (id);


CREATE TABLE social.posts (
	id bigserial,
	description varchar(200),
	img varchar(200),
	userid bigint NOT NULL,
	createdat timestamp without time zone,
	PRIMARY KEY (id)
) ;
ALTER SEQUENCE social.posts_id_seq RESTART WITH 1;
ALTER TABLE social.posts ADD UNIQUE (id);


CREATE TABLE social.relationships (
	id bigserial,
	followeruserid bigint NOT NULL,
	followeduserid bigint NOT NULL,
	PRIMARY KEY (id)
) ;
ALTER SEQUENCE social.relationships_id_seq RESTART WITH 1;
ALTER TABLE social.relationships ADD UNIQUE (id);


CREATE TABLE social.stories (
	id bigserial,
	img varchar(200) NOT NULL,
	userid bigint NOT NULL,
	PRIMARY KEY (id)
) ;
ALTER SEQUENCE social.stories_id_seq RESTART WITH 1;
ALTER TABLE social.stories ADD UNIQUE (id);


CREATE TABLE social.users (
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
ALTER SEQUENCE social.users_id_seq RESTART WITH 1;
ALTER TABLE social.users ADD UNIQUE (id);
ALTER TABLE social.comments ADD CONSTRAINT commentpostid FOREIGN KEY (postid) REFERENCES social.posts(id) MATCH SIMPLE ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE social.comments ADD CONSTRAINT commentuserid FOREIGN KEY (userid) REFERENCES social.users(id) MATCH SIMPLE ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE social.likes ADD CONSTRAINT likepostid FOREIGN KEY (postid) REFERENCES social.posts(id) MATCH SIMPLE ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE social.likes ADD CONSTRAINT likeuserid FOREIGN KEY (userid) REFERENCES social.users(id) MATCH SIMPLE ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE social.posts ADD CONSTRAINT userid FOREIGN KEY (userid) REFERENCES social.users(id) MATCH SIMPLE ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE social.relationships ADD CONSTRAINT followeduser FOREIGN KEY (followeduserid) REFERENCES social.users(id) MATCH SIMPLE ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE social.relationships ADD CONSTRAINT followeruser FOREIGN KEY (followeruserid) REFERENCES social.users(id) MATCH SIMPLE ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE social.stories ADD CONSTRAINT storyuserid FOREIGN KEY (userid) REFERENCES social.users(id) MATCH SIMPLE ON DELETE NO ACTION ON UPDATE CASCADE;

CREATE INDEX comments_postid ON social.comments (postid);
CREATE INDEX comments_userid ON social.comments (userid);
CREATE INDEX likes_postid ON social.likes (postid);
CREATE INDEX likes_userid ON social.likes (userid);
CREATE INDEX posts_userid ON social.posts (userid);
CREATE INDEX relationships_followeduserid ON social.relationships (followeduserid);
CREATE INDEX relationships_followeruserid ON social.relationships (followeruserid);
CREATE INDEX stories_userid ON social.stories (userid);