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

  let filterIds = [];
  filterIds = req.body.filter_ids;

  if (
    !check.checkUsername(saleName)) {
    res.status(500).send('Bad data.')
  } else {
    // Insert sales item
    db.execute(
      'INSERT INTO sales (sale_name, sale_description, sale_price, sale_image, owner) VALUES (?, ?, ?, ?, ?)',
      [saleName, description, price, img, id]
    )
      .then(results => (
        
        db.execute('select last_insert_id() AS "last_id"').then(([rows, fields]) => {
          let sale_id = rows[0].last_id;
          setFilterFunction(sale_id, filterIds, res);
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
 * Get all sales by date.
 * If 'newest' is true, return newest first. If false, return oldest first.
 */
exports.getSaleByDate = (req, res, next) => {

  // bool. If newest = true, show newest first, else oldest first.
 let newest = req.body.newest === 'true'

  // get all items based on date
  db.execute('SELECT * FROM browsebox.sales ORDER BY sale_date ' + (newest ? 'DESC' : 'ASC' ) )
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
  db.execute('SELECT * FROM browsebox.sales ORDER BY sale_price ASC')
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

  // REQUIRES: an array of the filter IDs
  let catIDs = [];
  catIDs = req.body.filters;

  // start query string with first filter
  let query = 'SELECT * FROM browsebox.sales WHERE sale_id IN (SELECT sale_id FROM browsebox.tag_sales WHERE cat_id = ' + catIDs[0];

  // add all filters
  if (catIDs.length > 1) {
    for (let i = 1; i < catIDs.length; i++) {
      query += ' OR cat_id = ' + catIDs[i];
    }
  }

  // finish query
  query += ')'

  // get all sales with given filter IDs
  db.execute(query)
    .then(([rows, fieldData]) => {
      res.status(200).send(rows);
    })
    .catch(err => {
      res.status(500).send(err);
    });

}


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
  let ownerId = req.body.id;
  let saleName = req.body.saleName;


  // check that the user making the request is the owner of the sale item being deleted
  db.execute("SELECT owner FROM sales WHERE sale_id = ?", [saleId])
    .then(([rows, fieldData]) => {
      if (rows.length === 0 || rows[0].owner !== ownerId) {
        res.status(500).send("user not authorized to delete this item");
      } else {
        // Delete sales item
        db.execute(
          'DELETE FROM sales WHERE sale_id = ?',
          [saleId]
        )
          .then(results => (
            res.status(200).send("Sales item " + saleName + " has been deleted from the database")
          ))
          .catch(err => {
            res.status(500).send(err)
          });
      };
    })
    .catch((err) => {
      res.status(500).send(err);
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

/**
 * Add filters to a sale item by calling function
 * Expects sale_id and an array of filter_ids
 */
exports.setFilters = (req, res, next) => {

  let saleId = req.body.sale_id;
  let filterIds = [];
  filterIds = req.body.filter_ids;

  setFilterFunction(saleId, filterIds, res);
  
}

/**
 * Add filters to bridging table
 */
function setFilterFunction (saleId, filterIds, res) {

  // insert into database - for each filter id
  filterIds.forEach(filter_id => {

    db.execute(
      'INSERT INTO tag_sales (sale_id, cat_id) VALUES (?, ?)',
      [saleId, filter_id]
    ).catch(err => {
      res.status(500).send(err);
    })
    
  });
  res.status(200).send("All filters added.");

}