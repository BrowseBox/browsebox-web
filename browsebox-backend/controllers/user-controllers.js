const db = require("../util/datapool");

/**
 * Make a user in the database. Take data from front end form.
 */
exports.makeUser = (req, res, next) => {

    // TODO: update field names to match front-end
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let img = req.body.img;

    // TODO: add verification data is good.

    // database makes all users active and not users by default. No change here.
    db.execute(
        'INSERT INTO users (user_name, user_email, user_password, user_img) VALUES (?, ?, ?, ?)',
        [username, email, password, img]
      ).then(results => (
        // if user is added, redirect a POST request (307) to log-in with same username and password given to log-in the user
        // TODO: upate URL when login abilities are added.
        res.redirect(307, '/login')
      )).catch(err => {
        // TODO: handle error with login.
      });
}

/**
 * Delete a user's own account
 */
exports.deleteUser = (req, res, next) => {

    // TODO: Run checks that user is deleting own account.
    let deleteId = null; // TODO: get value for user to delete

    // delete user from database
    db.execute(
        'DELETE FROM users WHERE user_id = ?',
        [deleteId]
    );

    // redirect to home page, logged out.
    res.redirect('/');

}