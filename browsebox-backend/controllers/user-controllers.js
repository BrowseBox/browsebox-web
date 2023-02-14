const db = require("../util/datapool");

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

    let deleteId = req.params.id // TODO: update name of input base on frontend

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

/**
 * Log in user
 */
exports.logIn = (req, res, next) => {

  let username = req.body.username;
  let password = req.body.password;

  function authenticateUser(username, password, callback) {
    const query = `SELECT * FROM users WHERE user_name = '${username}' AND user_password = '${password}'`;
    db.pool.query(query, (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results.length > 0);
      }
    });
}

authenticateUser(username, password, (error, authenticated) => {
  if (error) {
    res.status(500).send(err)
  } else if (authenticated) {
    res.status(200).send(username + " login successful")
  } else {
    res.status(500).send(err)
  }
});

}

/**
 * See reputaion of a user
 * TODO: move into Tyler's reviews.js file
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