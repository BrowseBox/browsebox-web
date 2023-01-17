/*
* Reset average review score when new review is created.
*/
CREATE TRIGGER review_score_air
    AFTER INSERT 
    ON Reviews
    FOR EACH ROW
UPDATE Users
SET user_rating = (
    SELECT AVG(review_value)
    FROM Reviews
    WHERE user_id = NEW.user_id
    GROUP BY user_id
)
WHERE user_id = NEW.user_id;


/*
* Reset average review score when review is deleted.
*/
CREATE TRIGGER review_score_adr
    AFTER DELETE 
    ON Reviews
    FOR EACH ROW
UPDATE Users
SET user_rating = (
    SELECT AVG(review_value)
    FROM Reviews
    WHERE user_id = OLD.user_id
    GROUP BY user_id
)
WHERE user_id = OLD.user_id;


/*
* Reset average review score when review is updated.
*/
CREATE TRIGGER review_score_aur
    AFTER UPDATE
    ON Reviews
    FOR EACH ROW
UPDATE Users
SET user_rating = (
    SELECT AVG(review_value)
    FROM Reviews
    WHERE user_id = NEW.user_id
    GROUP BY user_id
)
WHERE user_id = NEW.user_id;