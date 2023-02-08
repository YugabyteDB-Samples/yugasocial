DROP DATABASE IF EXISTS `social`;
CREATE SCHEMA `social`;
CREATE TABLE `social`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `coverpic` VARCHAR(100) NULL,
  `profilepic` VARCHAR(100) NULL,
  `city` VARCHAR(45) NULL,
  `website` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

CREATE TABLE `social`.`posts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(200) NULL,
  `img` VARCHAR(200) NULL,
  `userid` INT NOT NULL,
  `createdat` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `userid_idx` (`userid` ASC) VISIBLE,
  CONSTRAINT `userid`
    FOREIGN KEY (`userid`)
    REFERENCES `social`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

CREATE TABLE `social`.`comments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(200) NOT NULL,
  `createdat` DATETIME NULL,
  `userid` INT NOT NULL,
  `postid` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `commentpostid_idx` (`postid` ASC) VISIBLE,
  INDEX `commentuserid_idx` (`userid` ASC) VISIBLE,
  CONSTRAINT `commentuserid`
    FOREIGN KEY (`userid`)
    REFERENCES `social`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `commentpostid`
    FOREIGN KEY (`postid`)
    REFERENCES `social`.`posts` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

CREATE TABLE `social`.`stories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `img` VARCHAR(200) NOT NULL,
  `userid` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `storyuserid_idx` (`userid` ASC) VISIBLE,
  CONSTRAINT `storyuserid`
    FOREIGN KEY (`userid`)
    REFERENCES `social`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE);

CREATE TABLE `social`.`relationships` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `followeruserid` INT NOT NULL,
  `followeduserid` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `followeruser_idx` (`followeruserid` ASC) VISIBLE,
  INDEX `followeduser_idx` (`followeduserid` ASC) VISIBLE,
  CONSTRAINT `followeruser`
    FOREIGN KEY (`followeruserid`)
    REFERENCES `social`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `followeduser`
    FOREIGN KEY (`followeduserid`)
    REFERENCES `social`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

CREATE TABLE `social`.`likes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userid` INT NOT NULL,
  `postid` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `likeuserid_idx` (`userid` ASC) VISIBLE,
  INDEX `likepostid_idx` (`postid` ASC) VISIBLE,
  CONSTRAINT `likeuserid`
    FOREIGN KEY (`userid`)
    REFERENCES `social`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `likepostid`
    FOREIGN KEY (`postid`)
    REFERENCES `social`.`posts` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);


INSERT INTO social.users (`username`,`email`,`password`,`name`, `profilepic`) VALUE ('TomThomas12', 'tom@tomthomas.com', '$2a$10$aazOFhp7IJRwXfrp.9GyzeR8O7S3evYWwsOZQLYWD8Rb73VGUSzy.', 'Tom Thomas', 'tom.jpg');
INSERT INTO social.users (`username`,`email`,`password`,`name`, `profilepic`) VALUE ('RChopra45', 'rajeev@rajeevchopra.com', '$2a$10$2jolg2aIv9OYTzMvTAQUbON7A6zlpPmju0l0nPFvZ4c5jotkQX.Y.', 'Rajeev Chopra', 'rajeev.jpg');
INSERT INTO social.users (`username`,`email`,`password`,`name`, `profilepic`) VALUE ('YanaShev00', 'yana@yanashevchenko.com', '$2a$10$OqOEVBkCbcShNXTS3zQbJu9Pq/lP.TBLt84dYwmW03zk4b6dHYxEu', 'Yana Shevchenko', 'yana.jpg');
INSERT INTO social.users (`username`,`email`,`password`,`name`, `profilepic`) VALUE ('JingXu42', 'jing@jingxu.com', '$2a$10$Ge/zL653Y0Hl6fartjvbteYmNRUIf8F6JQShes3DmchEo2yAVqfze', 'Jing Xu', 'jing.jpg');