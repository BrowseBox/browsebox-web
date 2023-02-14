const db = require("../util/datapool");
const User = require("../models/user");

/**
 * Make a user in the database. Take data from front end form.
 * Redirect to login in current user
 */
exports.makeUser = (req, res, next) => {

  // get data from incomming object
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let img = req.body.imageLocation;

    
    if (
      username == null || username.trim() === '' || 
      email == null || email.trim() === '' ||
      password == null || password.trim() === '' ||
      img == null || img.trim() === ''
      ) {
        console.log("Bad data");
      } else {

        // database makes all users active and not admin by default. No change here.
        db.execute(
            'INSERT INTO browsebox.users (user_name, user_email, user_password, user_img, user_rating) VALUES (?, ?, ?, ?, ?)',
            [username, email, password, img, 0]
          ).then(results => (
            
            res.status(200).send("User " + username + " has been added to the database")

            
          )).catch(err => {
            
            res.status(500).send(err)
          });

      }

      
}

/**
 * Delete a user's own account
 */
exports.deleteUser = (req, res, next) => {

    let currentUserId = req.body.currentUserId; // TODO: assign later
    let deleteId = req.body.deleteId; // TODO: update name of input base on frontend

    if (currentUserId === deleteId) {

      // TODO: logout user

      // delete user from database
      db.execute(
        'DELETE FROM users WHERE user_id = ?',
        [deleteId]
      ).then(results => (
        res.status(200).send("User " + deleteId + " has been deleted from the database")

      )).catch(err => {
        res.status(500).send(err)
      });

    }
}

/**
 * See reputaion of a user
 * TODO: move into reviews.js file
 */
exports.getReviews = (req, res, next) => {

  // id of user to get reviews of
  let userId = req.body.userId;
  let userRating;

  // get user's review avg
  db.execute(
    'SELECT user_rating FROM browsebox.users WHERE user_id = ?',
    [userId]
  ).then(([ratings]) => (
    
    // TODO test: assign user rating from results
    userRating = ratings[0]

  )).catch(err => {
    res.status(500).send(err)
  });

  // get reviews of user
  db.execute(
    'SELECT * FROM browsebox.reviews where user_id=?',
    [userId]
  ).then(([rows, fieldData]) => (

    // TODO test: return reviews of the user as objects and avg score
    res.status(200).send({
      "rows": rows, 
      "avg": userRating
    })

  )).catch(err => {
    res.status(500).send(err)
  });

}