const favorites = require("../models/favorite");
const db = require("../util/datapool");


/**
*    Routes concerning actions such as favoriting an item, deleting a favorite or showing favorites
 */
exports.favoriteItem = (req, res, next) => {
    const user_id = req.body.user_id;
    const sale_id = req.body.sale_id;
    res.status(200).send("Recieved");
    // // check if the favorite already exists
    // const checkFavoriteQuery = `SELECT sale_id FROM favorites WHERE user_id = ? AND sale_id = ?`;
    // pool.query(checkFavoriteQuery, [user_id, sale_id], (err, results) => {
    //     if (err) {
    //         console.error(err);
    //         res.status(500).json({ error: 'Server error' });
    //     } else {
    //         if (results.length > 0) {
    //             // favorite already exists, return its id
    //             res.status(200).json({ favorite_id: results[0].id });
    //         } else {
    //             // favorite does not exist, insert it into the database
    //             const addFavoriteQuery = `INSERT INTO favorites (user_id, sale_id) VALUES (?, ?)`;
    //             pool.query(addFavoriteQuery, [user_id, sale_id], (err, results) => {
    //                 if (err) {
    //                     console.error(err);
    //                     res.status(500).json({ error: 'Server error' });
    //                 } else {
    //                     // favorite added successfully, return its id
    //                     res.status(200).json({ favorite_id: results.insertId });
    //                 }
    //             });
    //         }
    //     }
    // });
}


/**
 *  Deletes a favorite from the favorites table
 *
 */
exports.deleteFavorite = (req, res, next) => {
    let user_id = req.body.user_id;
    let sale_id = req.body.sale_id;


    db.execute (
        
        'DELETE FROM favorites where user_id = ? AND sale_id = ?',
        [user_id, sale_id], function(err, result) {
            if(err) {
                console.log(err);
            }
            if(result.affectedRows === 1){
                //may not need the message back
                res.status(200).send("Removed Item as Favorite");

                // res.redirect('/');
            }

        });

}