const db = require("../util/datapool");
const check = require('../util/checkInput');

/**
 * Make a sales item in the database. Takes data from front-end form.
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
    // Insert sales item
    db.execute(
      'INSERT INTO sales (sale_name, sale_description, sale_price, sale_image, owner) VALUES (?, ?, ?, ?, ?)',
      [saleName, description, price, img, id]
    )
    .then(results => (
      res.status(200).send("Sales " + saleName + " has been added to the database")
    ))
    .catch(err => {
      res.status(500).send(err)
    });
  }
};

/**
 * Search for sales items in the database by keyword
 */
exports.searchSale = (req, res, next) => {
  let keyword = req.query.keyword;

  // Search for sales items with the keyword in their name or description
  db.execute(
    'SELECT * FROM sales WHERE sale_name LIKE ? OR sale_description LIKE ?',
    [`%${keyword}%`, `%${keyword}%`]
  )
  .then(([rows, fields]) => {
    res.status(200).send(rows);
  })
  .catch(err => {
    res.status(500).send(err);
  });
};

/**
 * Update a sales item in the database. Takes data from front-end form.
 */
exports.updateSale = (req, res, next) => {
  let saleId = req.params.id;
  let ownerId = req.body.id;
  let saleName = req.body.saleName;
  let description = req.body.description;
  let price = req.body.price;
  let img = req.body.img;


    // check that the user making the request is the owner of the sale item being updated
    db.execute("SELECT owner FROM sales WHERE sale_id = ?", [saleId])
      .then(([rows, fieldData]) => {
        if (rows.length === 0 || rows[0].owner !== ownerId) {
          res.status(500).send("item not found or user not authorized");
        } else {
          // update the sale item
          db.execute(
            "UPDATE sales SET sale_name = ?, sale_description = ?, sale_price = ?, sale_image = ? WHERE sale_id = ?",
            [saleName, description, price, img, saleId]
          )
            .then((results) =>
              res.status(200).send({
                sale_id: saleId,
                sale_name: saleName,
                sale_description: description,
                sale_price: price,
                sale_image: img,
              })
            )
            .catch((err) => {
              res.status(500).send(err);
            });
        }
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  
};


/**
 * Delete a sales item from the database
 */
exports.deleteSale = (req, res, next) => {
  let saleId = req.params.id;

  // Delete sales item
  db.execute(
    'DELETE FROM sales WHERE sale_id = ?',
    [saleId]
  )
  .then(results => (
    res.status(200).send("Sales item " + saleId + " has been deleted from the database")
  ))
  .catch(err => {
    res.status(500).send(err)
  });
};

