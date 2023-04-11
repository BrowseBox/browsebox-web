DROP SCHEMA IF EXISTS  `browsebox`;

CREATE SCHEMA IF NOT EXISTS `browsebox` DEFAULT CHARACTER SET latin1;

USE `browsebox`;

-- ----------------------------------------
-- Table Categories
-- ----------------------------------------

CREATE TABLE IF NOT EXISTS `browsebox`.`categories`  (
	`cat_id`	INT 		NOT NULL AUTO_INCREMENT,
	`cat_name` 	VARCHAR(50) NOT NULL,
	PRIMARY KEY (`cat_id`)
	);


-- ----------------------------------------
-- Table Schools
-- ----------------------------------------
CREATE TABLE IF NOT EXISTS `browsebox`.`schools` (
	`school_id` 	INT 			NOT NULL 	AUTO_INCREMENT,
	`school_name` 	    VARCHAR(50)		NOT NULL,
	`school_link`   	VARCHAR(100),
	PRIMARY KEY (`school_id`)
);

-- ----------------------------------------
-- Table Users
-- ----------------------------------------
CREATE TABLE IF NOT EXISTS `browsebox`.`users` (
	`user_id` 		INT	 			NOT NULL 	AUTO_INCREMENT,
	`user_name`		VARCHAR(100)   	NOT NULL,
	`user_email`	VARCHAR(100)	NOT NULL UNIQUE,
	`user_rating` 	DOUBLE(3,2),
	`user_password`	VARCHAR(30) 	NOT NULL,
	`user_img`		VARCHAR(1024),
	`isActive`		TINYINT(1) NOT NULL DEFAULT '1',
	`isAdmin`		TINYINT(1) NOT NULL DEFAULT '0',
	`school_id` 	INT,
	PRIMARY KEY (`user_id`),
	CONSTRAINT `fk_user_school`
		FOREIGN KEY (`school_id`)
		REFERENCES `browsebox`.`schools` (`school_id`)
);


-- ----------------------------------------
-- Table Reviews
-- ----------------------------------------
CREATE TABLE IF NOT EXISTS `browsebox`.`reviews`  (
	`review_id`				INT 			NOT NULL 	AUTO_INCREMENT,
	`reviewer`				INT 			NOT NULL,
	`user_id`				INT 			NOT NULL,
	`review_description`	VARCHAR(1024),
	`review_value`			DOUBLE(3,2)		NOT NULL,
	PRIMARY KEY (`review_id`),
	CONSTRAINT `fk_review_user_reviewed`
		FOREIGN KEY (`reviewer`)
		REFERENCES `browsebox`.`users` (`user_id`),
	CONSTRAINT `fk_review_user_original`
		FOREIGN KEY (`user_id`)
		REFERENCES `browsebox`.`users` (`user_id`)

);

-- ----------------------------------------
-- Table Sales
-- ----------------------------------------
CREATE TABLE IF NOT EXISTS `browsebox`.`sales` (
	`sale_id`			    INT		    	NOT NULL 	AUTO_INCREMENT,
	`sale_name`				VARCHAR(50)		NOT NULL,
	`owner`				    INT 		    NOT NULL,
	`sale_description`   	VARCHAR(100),
	`sale_price` 		DOUBLE(7,2),
	`sale_image`		VARCHAR(500),
	`sale_date`			TIMESTAMP DEFAULT NOW(),
	`cat_id`			INT,
	PRIMARY KEY (`sale_id`),
	CONSTRAINT `fk_sales_users`
		FOREIGN KEY (`owner`)
		REFERENCES `browsebox`.`users` (`user_id`)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION,
	CONSTRAINT `fk_cat_id`
		FOREIGN KEY (`cat_id`)
		REFERENCES `browsebox`.`categories` (`cat_id`)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
);

-- ON DELETE AND UPDATE SHOULDNT NEED ANYTHING HERE, THEY'LL BE CASCADED
-- FROM THERE PARENT TABLES?
-- ----------------------------------------
-- Table Favorites
-- ----------------------------------------
CREATE TABLE IF NOT EXISTS `browsebox`.`favorites` (
	`user_id` 		INT 		NOT NULL,
	`sale_id`		INT 		NOT NULL,
	PRIMARY KEY (`user_id`, `sale_id`),
	CONSTRAINT `fk_favorites_user`
		FOREIGN KEY (`user_id`)
		REFERENCES `browsebox`.`users` (`user_id`)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION,
	CONSTRAINT `fk_favorites_sales`
		FOREIGN KEY (`sale_id`)
		REFERENCES `browsebox`.`sales` (`sale_id`)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
);

-- ----------------------------------------
-- Table Conversations
-- ----------------------------------------
CREATE TABLE IF NOT EXISTS `browsebox`.`conversations` (
        `conversation_id`    INT             NOT NULL AUTO_INCREMENT,
        `user1_id`           INT             NOT NULL,
        `user2_id`           INT             NOT NULL,
        `sale_id`            INT             NOT NULL,
        PRIMARY KEY (`conversation_id`),
    CONSTRAINT `fk_conversations_user1`
    FOREIGN KEY (`user1_id`)
    REFERENCES `browsebox`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    CONSTRAINT `fk_conversations_user2`
    FOREIGN KEY (`user2_id`)
    REFERENCES `browsebox`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    CONSTRAINT `fk_conversations_sales`
    FOREIGN KEY (`sale_id`)
    REFERENCES `browsebox`.`sales` (`sale_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    );

-- ----------------------------------------
-- Table Messages
-- ----------------------------------------
CREATE TABLE IF NOT EXISTS `browsebox`.`messages` (
        `message_id`         INT             NOT NULL AUTO_INCREMENT,
        `conversation_id`    INT             NOT NULL,
        `speaker_id`         INT             NOT NULL,
        `message_content`    TEXT            NOT NULL,
        `message_timestamp`  TIMESTAMP       DEFAULT NOW(),
    PRIMARY KEY (`message_id`),
    CONSTRAINT `fk_messages_conversations`
    FOREIGN KEY (`conversation_id`)
    REFERENCES `browsebox`.`conversations` (`conversation_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
    CONSTRAINT `fk_messages_speaker`
    FOREIGN KEY (`speaker_id`)
    REFERENCES `browsebox`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    );

-- GRANT ALL PRIVILEGES ON * . * TO 'browsebox'@'localhost';
-- FLUSH PRIVILEGES;
