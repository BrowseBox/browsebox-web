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

    console.log("Username: " + username);
    console.log("Email: " + email);
    console.log("Password: " + password);
    console.log("Image URL: " + img);

    // TODO: DECIDE how we handle good and bad data.
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
            
            res.status(500).send("Database error")
          });

      }

      
}

/**
 * Delete a user's own account
 */
exports.deleteUser = (req, res, next) => {

    let currentUser = new User(); // TODO: assign later
    let deleteId = req.body.deleteId; // TODO: update name of input base on frontend

    if (currentUser.id === deleteId) {

      // TODO: logout user

      // delete user from database
      db.execute(
        'DELETE FROM users WHERE user_id = ?',
        [deleteId]
      ).then(results => (
        res.status(200).send("User " + deleteId + " has been deleted from the database")

      )).catch(err => {
        // TODO: handle error with login.
        res.status(500).send("Database error")
      });

      // redirect to home page.
      res.redirect('/');

    }
}