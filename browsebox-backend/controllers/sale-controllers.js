const Item = require("../models/sale");
const db = require("../util/datapool");

/**
 * Make a user in the database. Take data from front end form.
 * Redirect to login in current user
 */
exports.makeSale = (req, res, next) => {

    let saleName = req.body.saleName;
    let description = req.body.description;
    let price = req.body.price;
    let img = req.body.img;
    let id = req.body.id;
    

    // console.log("saleName: " + saleName);
    // console.log("description: " + description);
    // console.log("price: " + price);
    // console.log("Image URL: " + img);

    // TODO: UPDATE how we handle good and bad data.
    if (
        itemName == null || itemName.trim() === '' || 
        description == null || description.trim() === '' ||
        price == null || price.trim() === '' ||
      img == null || img.trim() === ''
      ) {
        console.log("Bad data");
      } else {
        
        


        // database makes all users active and not admin by default. No change here.
        db.execute(
            'INSERT INTO sales (sale_name, sale_description, sale_price, sale_image, owner) VALUES (?, ?, ?, ?, ?)',
            [saleName, description, price, img, id]
          ).then(results => (
    
            // console.log("Sales " + saleName + " has been created")
            res.status(200).send("Sales " + saleName + " has been added to the database")

            // res.status(200).redirect(307, '/login')
          )).catch(err => {
            res.status(500).send("Database error")
          });

        

      }
    }
//test get all item from database

exports.getItems = function(req, res, next) {
  db.query("SELECT * FROM sales").then(([rows, fields]) => {
    console.log(rows);
  });

  db.query(retrieveDataQuery, function(err, results) {
    if (err) {
      res.status(500).send({ error: 'Error retrieving items' });
      return;
    }

    res.status(200).send({ sales: results });

    // console.log({ sales: results });
  });
};




// test insert into database

// db.execute(
//   'INSERT INTO sales (sale_name, owner, sale_description, sale_price, sale_image) VALUES (?, ?, ?, ?, ?)',
//   ["saleName",3, "description", 12, "img"]
// );

      

