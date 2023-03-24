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