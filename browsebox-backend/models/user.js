module.exports = class User {

    constructor (id, name, email, rating, img) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.rating = rating;
        this.img = img;
    }

}

// use this line to import class
// const User = require('./models/user');