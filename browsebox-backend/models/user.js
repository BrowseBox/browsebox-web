/**
 * Create user object from database
 */
module.exports = class User {

    constructor (id, name, email, rating, img, admin, active) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.rating = rating;
        this.img = img;
        this.admin = admin;
        this.active = active;
    }
}

// use this line to import class
// const User = require('./models/user');