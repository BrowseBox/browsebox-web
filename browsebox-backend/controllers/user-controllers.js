const User = require("../models/user");
const db = require("../util/datapool");

/**
 * Make a user in the database. Take data from front end form.
 * Redirect to login in current user
 */
exports.makeUser = (req, res, next) => {

    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let img = req.body.img;

    // TODO: UPDATE how we handle good and bad data.
    if (
      username == null || username.trim() == '' || 
      email == null || email.trim() == '' ||
      password == null || password.trim() == '' ||
      img == null || img.trim() == ''
      ) {
        console.log("Bad data");
      } else {
        console.log(username + " " + email + " " + password + " " + img);
        
        /* ADD IN AFTER TESTING WE GET DATA

        // database makes all users active and not admin by default. No change here.
        db.execute(
            'INSERT INTO users (user_name, user_email, user_password, user_img, user_rating) VALUES (?, ?, ?, ?, ?)',
            [username, email, password, img, 0]
          ).then(results => (
            // if user is added, redirect a POST request (307) to log-in with same username and password given to log-in the user

            // TODO: upate URL when login abilities are added.
            res.redirect(307, '/login')
          )).catch(err => {
            // TODO: handle error with login.
          });

        */

      }

      
}

/**
 * Delete a user's own account
 */
exports.deleteUser = (req, res, next) => {

    let currentUser = new User(); // TODO: assign later
    let deleteId = req.body.deleteId; // TODO: update name of input base on frontend

    if (currentUser.id == deleteId) {

      // TODO: logout user

      // delete user from database
      db.execute(
        'DELETE FROM users WHERE user_id = ?',
        [deleteId]
      );

      // redirect to home page.
      res.redirect('/');

    }
}