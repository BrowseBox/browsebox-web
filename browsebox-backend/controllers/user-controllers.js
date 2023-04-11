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
  db.execute('SELECT * FROM users where user_id=?', [id]).then(([rows, fieldData]) => {

    if (rows[0] != null && rows[0] !== undefined) {
      res.status(200).send({
        user_name: rows[0].user_name,
        user_email: rows[0].user_email,
        user_rating: rows[0].user_rating,
        user_img: rows[0].user_img,
        isActive: rows[0].isActive,
        school: rows[0].school_id
      })

    }

    
  })

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
  let school = req.body.school

    // start query and values
    let query = "UPDATE users SET ";
    let values = [];

    // add to query and values based on filled out fields
    if (user_name != undefined && user_name != null && user_name != "") {
      query += "user_name = ?, ";
      values.push(user_name);
    }

    if (user_email != undefined && user_email != null && user_email != "") {
      query += "user_email = ?, ";
      values.push(user_email);
    }

    if (user_img != undefined && user_img != null && user_img != "") {
      query += "user_img = ?, ";
      values.push(user_img);
    }

    if (user_password != undefined && user_password != null && user_password != "") {
      query += "user_password = ?, ";
      values.push(user_password);
    }

    if (school != undefined && school != null && school != "") {
      query += "school_id = ?, ";
      values.push(school);
    }

    // remove last comma
    let lastIndex = query.lastIndexOf(",");
    query = query.slice(0, lastIndex) + query.slice(lastIndex + 1);


    // update user
    if (values.length > 0) {

      // finish query and add sale id
      query += "WHERE user_id = ?";
      values.push(id);

      db.execute(query, values)
      .then((results) =>
        res.status(200).send({
          user_name: user_name,
          user_email: user_email,
          user_img: user_img,
          id: id,
          school: school
        }),
      )
      .catch((err) => {
        res.status(500).send(err)
      })
    } else {
      res.status(500).send("No new data was entered");
    }


  

  
}


/**
 * Get all schools
 */
exports.getSchools = (req, res, next) => {

  // get all schools
  db.execute('SELECT * FROM browsebox.schools')
    .then(([rows, fields]) => {
      res.status(200).send(rows);
    })
    .catch(err => {
      res.status(500).send(err);
    });

}

/**
 * Get school data
 */
exports.getSchoolData = (req, res, next) => {

  let ID = req.body.school_id;

  db.execute('SELECT * FROM browsebox.schools WHERE school_id=?', [ID])
    .then(([rows, fields]) => {
      res.status(200).send(rows);
    })
    .catch(err => {
      res.status(500).send(err);
    });

}