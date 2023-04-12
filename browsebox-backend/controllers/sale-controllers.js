const db = require("../util/datapool");
const check = require('../util/checkInput');

/**
 * Make a sales item in the database. Takes data from front-end form.
 */
exports.makeSale = (req, res, next) => {
  let saleName = req.body.title;
  let description = req.body.description;
  let price = req.body.price;
  let img = req.body.image;
  let owner = req.body.id;
  let caltegory = req.body.catId;

  if (
    !check.checkUsername(saleName)) {
    res.status(500).send('Bad data.')
  } else {
    // Insert sales item
    db.execute(
      'INSERT INTO sales (sale_name, sale_description, sale_price, sale_image, owner, cat_id) VALUES (?, ?, ?, ?, ?, ?)',
      [saleName, description, price, img, owner, caltegory]
    )
      .then(results => (

        // Get back the new item id. Retuned owner's sales, order by newest to oldest. First one is the one just added.
        db.execute(
          'SELECT sale_id FROM sales WHERE owner = ? ORDER BY sale_date DESC',
          [owner]
        ).then(([rows, fields]) => {
          res.status(200).send({
            "message" : "added to database",
            "sale_id": rows[0].sale_id
          })
        }).catch(err => {
          res.status(500).send(err)
        })

        
        
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
  let keyword = req.body.keyword;

  // Search for sales items with the keyword in their name or description
  db.execute(
    'SELECT sale_id, sale_name, owner, sale_description, sale_price, sale_image, sale_date, cat_name FROM browsebox.sales JOIN categories on sales.cat_id=categories.cat_id WHERE sale_name LIKE ? OR sale_description LIKE ?',
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
 * Get a user's sales
 */
exports.searchUserSale = (req, res, next) => {
  let owner = req.body.id;

  // Search for sales items with the keyword in their name or description
  db.execute(
    'SELECT sale_id, sale_name, owner, sale_description, sale_price, sale_image, sale_date, cat_name FROM browsebox.sales JOIN categories on sales.cat_id=categories.cat_id WHERE owner = ?',
    [owner]
  )
    .then(([rows, fields]) => {
      res.status(200).send(rows);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

/**
 * Get a sale by ID
 */
exports.getSaleById = (req, res, next) => {
  let saleId = req.body.id;

  // Search for sales items with the keyword in their name or description
  db.execute(
    'SELECT sale_id, sale_name, owner, sale_description, sale_price, sale_image, sale_date, cat_name FROM browsebox.sales JOIN categories on sales.cat_id=categories.cat_id where sale_id = ?',
    [saleId]
  )
    .then(([rows, fields]) => {
      res.status(200).send(rows);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

/**
 * Get all sales by date.
 * If 'newest' is true, return newest first. If false, return oldest first.
 */
exports.getSaleByDate = (req, res, next) => {

  // bool. If newest = true, show newest first, else oldest first.
 let newest = req.body.newest === 'true'

  // get all items based on date
  db.execute('SELECT sale_id, sale_name, owner, sale_description, sale_price, sale_image, sale_date, cat_name FROM browsebox.sales JOIN categories on sales.cat_id=categories.cat_id ORDER BY sale_date ' + (newest ? 'DESC' : 'ASC' ) )
    .then(([rows, fields]) => {
      res.status(200).send(rows);
    })
    .catch(err => {
      res.status(500).send(err);
    });

}

/**
 * Get all sales by price (cheapest first).
 */
exports.getSaleByCheapest = (req, res, next) => {

  // get all items based on date
  db.execute('SELECT sale_id, sale_name, owner, sale_description, sale_price, sale_image, sale_date, cat_name FROM browsebox.sales JOIN categories on sales.cat_id=categories.cat_id ORDER BY sale_price ASC')
    .then(([rows, fields]) => {
      res.status(200).send(rows);
    })
    .catch(err => {
      res.status(500).send(err);
    });

}


/**
 * Get all sales by filters (category id)
 */
exports.getSaleByFilters = (req, res, next) => {

  let catId = req.body.catId;

  // get all sales with given filter ID
  db.execute('SELECT sale_id, sale_name, owner, sale_description, sale_price, sale_image, sale_date, cat_name FROM browsebox.sales JOIN categories on sales.cat_id=categories.cat_id WHERE cat_id = ?', [catId])
    .then(([rows, fieldData]) => {
      res.status(200).send(rows);
    })
    .catch(err => {
      res.status(500).send(err);
    });

}


/**
 * Update a sales item in the database. Takes data from front-end form.
 * Must have a saleId, but the other values are optional.
 */
exports.updateSale = (req, res, next) => {
  let saleId = req.body.id;
  let saleName = req.body.saleName;
  let description = req.body.description;
  let price = req.body.price;
  let img = req.body.img;
  let catId = req.body.catId;

  // start query and values
  let query = "UPDATE sales SET ";
  let values = [];

  // add to query and values based on filled out fields
  if (saleName != undefined && saleName != null && saleName != "") {
    query += "sale_name = ?, ";
    values.push(saleName);
  }

  if (description != undefined && description != null && description != "") {
    query += "sale_description = ?, ";
    values.push(description);
  }

  if (price != undefined && price != null && price != "") {
    query += "sale_price = ?, ";
    values.push(price);
  }

  if (img != undefined && img != null && img != "") {
    query += "sale_image = ?, ";
    values.push(img);
  }

  if (catId != undefined && catId != null && catId != "") {
    query += "cat_id = ?, ";
    values.push(catId);
  }

  // remove last comma
  let lastIndex = query.lastIndexOf(",");
  query = query.slice(0, lastIndex) + query.slice(lastIndex + 1);
  
  // if there are values that are not null or undefined, excute
  if (values.length > 0) {

    // finish query and add sale id
    query += "WHERE sale_id = ?";
    values.push(saleId);

    // update the sale item
    db.execute(
      query,
      values
    )
      .then((results) =>
        res.status(200).send({
          sale_id: saleId,
          sale_name: saleName,
          sale_description: description,
          sale_price: price,
          sale_image: img,
          cat_id: catId
        })
      )
      .catch((err) => {
        res.status(500).send(err);
      });

  } else {

    res.status(500).send("No new data was entered");
  }


};


/**
 * Delete a sales item from the database
 */
exports.deleteSale = (req, res, next) => {
  let saleId = req.body.id;


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


/**
 * Get all filters with names and IDs
 */
exports.getFilters = (req, res, next) => {

  // get all filters
  db.execute('SELECT * FROM browsebox.categories')
    .then(([rows, fields]) => {
      res.status(200).send(rows);
    })
    .catch(err => {
      res.status(500).send(err);
    });

}