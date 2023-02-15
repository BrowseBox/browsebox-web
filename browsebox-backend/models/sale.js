/**
 * Create sale object from database
 */
module.exports = class Sale {

    constructor (sale_id, sale_name, sale_description, sale_price, sale_img, user_id, sale_status, post_date) {
        this.sale_id = sale_id;
        this.sale_name = sale_name;
        this.sale_description = sale_description;
        this.sale_price = sale_price;
        this.sale_img = sale_img;
        this.user_id = user_id;
        this.sale_status = sale_status;
        this.post_date = post_date;
    }
}

// use this line to import class
// const Item = require('./models/sale');