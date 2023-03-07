const db = require('../util/datapool')
const check = require('../util/checkInput')

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
    !check.checkUsername(username) ||
    !check.checkEmail(email)
  ) {
    res.status(500).send('Bad data. Some field is null, blank or has bad characters.')
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
  let deleteId = req.body.id

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
 * Get all users
 */
exports.getAllUsers = (req, res, next) => {

  // get user info
  db.execute('SELECT * FROM users').then(([rows, fieldData]) =>
    res.status(200).send(rows),
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

  // run checks check
  if (
    !check.checkUsername(user_name) ||
    !check.checkEmail(user_email)
  ) {
    res.status(500).send('Bad data. Some field is null, blank or has bad characters.')
  } else {


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

  
}