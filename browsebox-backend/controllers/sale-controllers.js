const db = require("../util/datapool");
const check = require('../util/checkInput');

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

    if (
        !check.checkUsername(saleName) ||
        !check.checkUsername(description) ||
        !check.checkPrice(price) ||
        img === null || img.trim() === ""
      ) {
        res.status(500).send('Bad data.')
      } else {
        
        // insert sale item
        db.execute(
            'INSERT INTO sales (sale_name, sale_description, sale_price, sale_image, owner) VALUES (?, ?, ?, ?, ?)',
            [saleName, description, price, img, id]
          ).then(results => (
    
            res.status(200).send("Sales " + saleName + " has been added to the database")

          )).catch(err => {
            res.status(500).send(err)
          });

        

      }
    }



/**
 * get all item from database
 */
exports.getItems = function(req, res, next) {
  db.query("SELECT * FROM sales").then(([rows, fields]) => {
    // console.log(rows);
    res.status(200).send(rows);
  });

  // Can removw after testing function as is.
  /*
  db.query(retrieveDataQuery, function(err, results) {
    if (err) {
      res.status(500).send({ error: 'Error retrieving items' });
      return;
    }

    res.status(200).send({ sales: results });

    // console.log({ sales: results });
  });
  */

};




// test insert into database

// db.execute(
//   'INSERT INTO sales (sale_name, owner, sale_description, sale_price, sale_image) VALUES (?, ?, ?, ?, ?)',
//   ["saleName",3, "description", 12, "img"]
// );

      

