const db = require("../util/datapool");

exports.makeUser = (req, res, next) => {

    // update field names to match front-end
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let img = req.body.img;

    db.execute(
        'INSERT INTO users (user_name, user_email, user_password, user_img) VALUES (?, ?, ?, ?)',
        [username, email, password, img]
      );
}