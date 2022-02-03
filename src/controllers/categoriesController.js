const mongoose = require('mongoose');
const Category = mongoose.model('Category');
const Product = mongoose.model('Product');
const { validationResult } = require('express-validator');

// List Categories action
exports.index = function (req, res, next) {
  Category.find({}, function (error, objects) {
    if (error) {
      res.status(422).send({ error: 'Unable to fetch categories ' })
    } else {
      res.status(200).send(objects)
    }
  })
}

// Show Category action
exports.show = function (req, res, next) {
  Category.findOne({ _id: req.params.id })
    .then(category => {
      return res.status(200).send(category);
    })
    .catch(error => {
      return res.status(400).send({ error: 'Unable to find this resource' });
    })
}
// Create Category action
exports.create = function (req, res, next) {
  const category = new Category({
    name: req.body.name,
    isActive: req.body.isActive
  })
  category.save(function (error, savedObject) {
    if (error) {
      return res.status(422).send({ message: 'Unable to save this category', error: error })
    } else {
      return res.status(200).send(savedObject)
    }
  })
}

// Category Products
exports.products = function (req, res, next) {
  console.log(req.params.id)
  // Find category
  Category.findOne({ _id: req.params.id })
    .then(category => {
      Product.find({ category: category }, function (error, objects) {
        if (error) {
          res.status(422).send({ error: 'Unable to fetch products ' })
        } else {
          res.status(200).send(objects)
        }
      })
    })
    .catch(error => {
      return res.status(400).send({ error: 'Unable to find this resource' });
    })
}

// Update Category action
exports.update = async function (req, res) {
  try {
    // destructing these out of the req.body
    const { name, isActive } = req.body;

    const errors = validationResult(req);
    // if errors.isEmpty() is false [i.e. error present] then it'll invert to TRUE and it'll send error message
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const updatedCategory = {};
    // if name exists in the req.body then put it in the updated title
    if (name) { updatedCategory.name = name };
    if (isActive) { updatedCategory.isActive = isActive };

    // console.log(updatedProduct);
    // Searching a product from DB to update it. the id is obtained the req URL params.
    let existingCategory = await Category.findById(req.params.id);
    if (!existingCategory) {
      return res.send(404).send("Not found")
    }

    // ----No need for this `if` condition part as not associating each product with unique users 
    // if product from DB doesn't match with the id sent in the request URL
    // if (existingPoduct.user.toString() !== req.user.id) {
    //   return res.send(401).send("Not allowed to update the note")
    // }

    // 2nd arg is the update parameter
    existingCategory = await Category.findByIdAndUpdate(req.params.id, { $set: updatedCategory }, { new: true })
    // `{new: true})` tells mongoose to return the new latest versin of the document.

    // res.json(updatedProduct)
    res.json({
      "Success": "Category has been updated successfully", "updatedCategory": updatedCategory
    })
  }
  catch (error) {
    console.error("Error :", error.message)
    res.status(500).send("Internal server error occured.")
  }
}

// Delete Category action
exports.destroy = async function (req, res) {
  try {
    const errors = validationResult(req);
    // if errors.isEmpty() is false [i.e. error present] then it'll invert to TRUE and it'll send error message
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Searching a note from DB to delete it. the id is obtained the req URL params.
    let existingCategory = await Category.findById(req.params.id);
    console.log("existingCategory is", existingCategory);
    if (!existingCategory) {
      return res.sendStatus(404).send("Not found")
    }

    // ----No need for this `if` condition part as not associating each product with unique users 
    // if Note from DB doesn't match with the id sent in the request URL
    // if (existingNote.user.toString() !== req.user.id) {
    //   return res.send(401).send("Not allowed to delete the note")
    // }
    // 2nd arg is the update parameter

    existingCategory = await Category.findByIdAndDelete(req.params.id)

    res.json({
      "Success": "Category has been deleted successfully", 'existingCategory': existingCategory
    })
  }
  catch (error) {
    console.error("Error :", error.message)
    res.status(500).send("Internal server error occured.")
  }
}

