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


// Changing the users password of a logged in account.
// probably dont need this is done through the edit user function
exports.changePassword = (req, res, next) => {

  //alternative npm install alert  let alert = require('alert'); alert("pass changed!")
  //var popup = require('popups');   //this is for potentially adding in npm install popups (which adds popups obv lol)


  let newPassword = req.body.password;
  let userId = req.body.userId;
  let userEmail = req.body.user_email;  //may not need, was considering passing this to the DB(went with id instead)
  let oldPassword;  // orignal password to compare if new is different from old.


  //select user_password from users where user_id = '3'; 
  //to bring back the user_password could use 'user_email' since they have to be unique and checked by google or hotmail
  // query to find the original password to compare to new password
  db.query('SELECT user_password from users where user_id = ?', [userId], function(err, result){
    if(err) {
      //could message back saying "user not found" or something
      //but shouldnt have to, should be getting the Id from a currently logged in user.
      console.log(err);
    }else {
      //console.log("making it to the else statment of password query, 90% sure result wrong");
      oldPassword = result.user_password;
    }
}); 

  if(oldPassword === newPassword) {

    //could swap this out with the 'popup.alert'
    res.status(200).send("Old password the same as newly enter password");

    //return back to the page of the request
    res.redirect('/');
  }

  // checks on if password length (maybe contains symbol? or number?)
  // if(newPassword.length > 8 || ) {}


  // UPDATE users SET user_password = 'pass' WHERE user_id = '3';
  //once password determined to be new 
db.query('UPDATE users SET user_password = ? WHERE user_id= ?', [newPassword, userId], function(err, result){
  if(err) {
    console.log(err);
  }else{
    res.status(200).send("Password has been successfully changed!");
    
    //return back to the page of the request
    res.redirect('/');
  }


});



  /* popup.alert({
      content:'Password succesfully changed!'
  }); */

}