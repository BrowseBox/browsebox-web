const db = require("../util/datapool");

exports.makeUser = (req, res, next) => {

    // update field names to match front-end
    username = req.body.username;
    email = req.body.username;
    password = req.body.username;
    img = req.body.username;

    db.execute(
        'INSERT INTO users (user_name, user_email, user_password, user_img) VALUES (?, ?, ?, ?)',
        [username, email, password, img]
      );
}