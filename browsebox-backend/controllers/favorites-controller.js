const favorites = require("../models/favorite");
const db = require("../util/datapool");


/**
*    Routes concerning actions such as favoriting an item, deleting a favorite or showing favorites
 */
exports.favoriteItem = (req, res, next) => {
    
    // userId maybe wrong
    let user_id = req.body.user_id;
    let sale_id = req.body.sale_id;
    // res.status(200).send("Recieved");

    // could hide the favorite button on the front end so users who arent 
    // logged in cant favorite OR this is a check for it as well
    // could split into two seperate statements for better messages back to frontend
    // example "not logged in cant favorite" , "item cannot be located, might have been deleted"
    if(user_id === null || sale_id === null || user_id === '' || sale_id === '') {

        res.status(500).send("Null or empty field");

    } else {

        db.execute(
            'SELECT * from browsebox.favorites where user_id = ? AND sale_id = ?',
            [user_id, sale_id]).then( ([result, fieldData]) => {
                
                if(result.length > 0) {
                    res.status(200).send("item already favorited");
                } else {
                    db.execute (
                        'INSERT INTO browsebox.favorites(user_id, sale_id) VALUES (?, ?)',
                        [user_id, sale_id]).then( ([result, fieldData]) => {
                            //could change to just  else {  
                            if (result.affectedRows === 1) { 
                                //may not need a message? 
                                res.status(200).send("Item successfully favorited");
                            } else { 
                                res.status(500).send("Item wasn't favorited");
                            }
                        }).catch(err => {
                            res.status(500).send(err)
                        });

                }
        })
        .catch(err => {
            res.status(500).send(err)
        });

    }

    



    
}


/**
 *  Deletes a favorite from the favorites table
 *
 */
exports.deleteFavorite = (req, res, next) => {
    let user_id = req.body.user_id;
    let sale_id = req.body.sale_id;


    db.execute (
        
        'DELETE FROM browsebox.favorites where user_id = ? AND sale_id = ?',
        [user_id, sale_id]).then( ([result, fieldData]) => {
            if(result.affectedRows === 1){
                //may not need the message back
                res.status(200).send("Removed Item as Favorite");
            }

        }).catch(err => {
            res.status(500).send(err);
        });

}