const db = require('../util/datapool')

/**
 * Make a user in the database. Take data from front end form.
 * Redirect to login in current user
 */
exports.makeUser = (req, res, next) => {
  // get data from incomming object
  let username = req.body.username
  let email = req.body.email
  let password = req.body.password
  let img = req.body.imageLocation

  if (
    username == null ||
    username.trim() === '' ||
    email == null ||
    email.trim() === '' ||
    password == null ||
    password.trim() === '' ||
    img == null ||
    img.trim() === ''
  ) {
    res.status(500).send('Bad data. Some field is null or blank.')
  } else {
    // database makes all users active and not admin by default. No change here.
    db.execute(
      'INSERT INTO browsebox.users (user_name, user_email, user_password, user_img, user_rating) VALUES (?, ?, ?, ?, ?)',
      [username, email, password, img, 0],
    )
      .then((results) => res.status(200).send('User ' + username + ' has been added to the database'))
      .catch((err) => {
        res.status(500).send(err)
      })
  }
}

/**
 * Delete a user's own account
 */
exports.deleteUser = (req, res, next) => {
  let deleteId = req.params.id // TODO: update when made into POST request

  // delete user from database
  db.execute('DELETE FROM users WHERE user_id = ?', [deleteId])
    .then((results) => res.status(200).send('User ' + deleteId + ' has been deleted from the database'))
    .catch((err) => {
      res.status(500).send(err)
    })
}

/**
 * Log in user
 */
exports.logIn = (req, res, next) => {
  let email = req.body.email
  let password = req.body.password

  function authenticateUser(email, password, callback) {
    const query = `SELECT * FROM users WHERE user_email = '${email}' AND user_password = '${password}'`
    db.pool.query(query, (error, results) => {
      if (error) {
        callback(error, null)
      } else {
        callback(null, results.length > 0)
      }
    })
  }

  authenticateUser(email, password, (error, authenticated) => {
    if (error) {
      res.status(500).send(error)
    } else if (authenticated) {
      db.query(`SELECT user_id FROM users WHERE user_email = '${email}' AND user_password = '${password}'`).then(
        ([rows, fieldData]) => {
          const userId = rows[0].user_id
          // console.log(userId);

          res.status(200).send({
            user_id: userId,
          })
        },
      )
    } else {
      res.status(500).send(error)
    }
  })
}

/**
 * Get user information.
 */
exports.getUserData = (req, res, next) => {
  let id = req.body.id

  // get user info
  db.execute('SELECT * FROM users where user_id=?', [id]).then(([rows, fieldData]) =>
    res.status(200).send({
      user_name: rows[0].user_name,
      user_email: rows[0].user_email,
      user_rating: rows[0].user_rating,
      user_img: rows[0].user_img,
      isActive: rows[0].isActive,
    }),
  )
}

/**
 * Update a user based on ID
 */
exports.updateUser = (req, res, next) => {
  let user_name = req.body.user_name
  let user_email = req.body.email
  let user_img = req.body.img
  let user_password = req.body.password
  let id = req.body.id

  // update user
  db.execute('update users set user_name = ?, user_email = ?, user_password = ? , user_img = ? where user_id=?', [
    user_name,
    user_email,
    user_password,
    user_img,
    id,
  ])
    .then((results) =>
      res.status(200).send({
        user_name: user_name,
        user_email: user_email,
        user_img: user_img,
        id: id,
      }),
    )
    .catch((err) => {
      res.status(500).send(err)
    })
}

/**
 * See reputaion of a user
 * TODO: move into Tyler's review-constoller.js file once he's got it in.
 */
exports.getReviews = (req, res, next) => {
  // id of user to get reviews of
  let userId = req.body.userId
  let userRating

  // get user's review avg
  db.execute('SELECT user_rating FROM browsebox.users WHERE user_id = ?', [userId])
    .then(
      ([ratings, fieldData]) =>
        // TODO test: assign user rating from results
        (userRating = ratings[0].user_rating),
    )
    .catch((err) => {
      res.status(500).send(err)
    })

  // get reviews of user
  db.execute('SELECT * FROM browsebox.reviews where user_id=?', [userId])
    .then(([rows, fieldData]) =>
      // TODO test: return reviews of the user as objects and avg score
      res.status(200).send({
        rows: rows,
        avg: userRating,
      }),
    )
    .catch((err) => {
      res.status(500).send(err)
    })
}
