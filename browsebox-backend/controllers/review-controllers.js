const db = require('../util/datapool')

/**
 * See reputaion of a user.
 * 
 * Return all reviews of a user and his average rating.
 */
exports.getReviews = (req, res, next) => {
    // id of user to get reviews of
    let userId = req.body.userId
    let userRating

    // get user's review avg
    db.execute('SELECT user_rating FROM browsebox.users WHERE user_id = ?', [userId])
        .then(([ratings, fieldData]) => {
            
            userRating = ratings[0].user_rating
        })
        .catch((err) => {
            res.status(500).send(err)
        })

    // get reviews of user
    db.execute('SELECT * FROM browsebox.reviews where user_id=?', [userId])
        .then(([rows, fieldData]) => {
            
            res.status(200).send({
                rows: rows,
                avg: userRating,
            })
        })
        .catch((err) => {
            res.status(500).send(err)
        })
}




exports.createReview = (res, req) => {

    //shouldnt need reviewID, auto incremented on being placed into database
    //let reviewID = req.body.reviewID;
    let reviewer = req.body.reviewer;
    let userID = req.body.userID;
    let reviewDescription = req.body.reviewDescription;
    let reviewValue = req.body.reviewValue;


    db.execute(
        'INSERT INTO browsebox.users (reviewer, user_id, review_description, review_value) VALUES(?, ?, ?, ?)',
        [reviewer, userID, reviewDescription, reviewValue]
    ).then(results => (

        res.status(200).send("Review Added, Thank you for the Input!")
        /***** res.statusMessage = "Review Added, Thank you for the Input!";
        //console.log("user added");
         res.status(200).end();   ****/
    )).catch(err => {

        res.status(500).send(err)

    });


}