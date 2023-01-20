const db = require("../util/datapool");

module.exports = class User {

    constructor (name, email, rating, img) {
        this.name = name;
        this.email = email;
        this.rating = rating;
        this.img = img;
    }

    addId (id) {
        this.id = id;
    }

}

// use this line to import class
// const User = require('./models/user');