const mongoose = require('mongoose');
const Category = mongoose.model('Category');
const Product = mongoose.model('Product');
const { validationResult } = require('express-validator');

// List Products action
exports.index = function (req, res, next) {
  Product.find({}, function (error, objects) {
    if (error) {
      res.status(422).send({ error: 'Unable to fetch products ' })
    } else {
      res.status(200).send(objects)
    }
  })
}

// Show Product action
exports.show = function (req, res, next) {
  Product.findOne({ _id: req.params.id })
    .populate('category')
    .then(product => {
      return res.status(200).send(product);
    })
    .catch(error => {
      return res.status(400).send({ error: 'Unable to find this resource' });
    })
}

// Create Product action
exports.create = function (req, res, next) {
  // Find category
  Category.findOne({ _id: req.body.category })
    .then(category => {
      // Create product
      const product = new Product({
        category: category,
        name: req.body.name,
        description: req.body.description,
        mrp: req.body.mrp,
        sellPrice: req.body.sellPrice,
        productImage: req.body.productImage,
        isPublished: req.body.isPublished,
        isPrime: req.body.isPrime,
        currentStock: req.body.currentStock,
        avgRating: req.body.avgRating,
        reviewCount: req.body.reviewCount,
        brandName: req.body.brandName,
        sellerName: req.body.sellerName,
        deliveryCharge: req.body.deliveryCharge,
      })
      product.save(function (error, savedObject) {
        if (error) {
          return res.status(422).send({ message: 'Unable to save this product', error: error })
        } else {
          return res.status(200).send(savedObject)
        }
      })
    })
    .catch(error => {
      return res.status(400).send({ error: 'Invalid Category' });
    })
}

// Update Product action
exports.update = async function (req, res) {
  try {
    // destructing these out of the req.body
    const { category, name, description, mrp, sellPrice, productImage, isPublished, isPrime, currentStock, avgRating, reviewCount, brandName, sellerName, deliveryCharge } = req.body;

    const errors = validationResult(req);
    // if errors.isEmpty() is false [i.e. error present] then it'll invert to TRUE and it'll send error message
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const updatedProduct = {};
    // if name exists in the req.body then put it in the updated title
    if (category) { updatedProduct.category = category };
    if (name) { updatedProduct.name = name };
    if (description) { updatedProduct.description = description };
    if (mrp) { updatedProduct.mrp = mrp };
    if (sellPrice) { updatedProduct.sellPrice = sellPrice };
    if (productImage) { updatedProduct.productImage = productImage };
    if (isPublished) { updatedProduct.isPublished = isPublished };
    if (isPrime) { updatedProduct.isPrime = isPrime };
    if (currentStock) { updatedProduct.currentStock = currentStock };
    if (avgRating) { updatedProduct.avgRating = avgRating };
    if (reviewCount) { updatedProduct.reviewCount = reviewCount };
    if (brandName) { updatedProduct.brandName = brandName };
    if (sellerName) { updatedProduct.sellerName = sellerName };
    if (deliveryCharge) { updatedProduct.deliveryCharge = deliveryCharge };

    // console.log(updatedProduct);
    // Searching a product from DB to update it. the id is obtained the req URL params.
    let existingPoduct = await Product.findById(req.params.id);
    if (!existingPoduct) {
      return res.send(404).send("Not found")
    }

    // 2nd arg is the update parameter
    existingPoduct = await Product.findByIdAndUpdate(req.params.id, { $set: updatedProduct }, { new: true })
    // `{new: true})` tells mongoose to return the new latest versin of the document.

    res.json(updatedProduct)
  }
  catch (error) {
    console.error("Error :", error.message)
    res.status(500).send("Internal server error occured.")
  }
}

// Delete Product action
exports.destroy = async function (req, res) {
  try {
    const errors = validationResult(req);
    // if errors.isEmpty() is false [i.e. error present] then it'll invert to TRUE and it'll send error message
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Searching a note from DB to delete it. the id is obtained the req URL params.
    let existingNote = await Product.findById(req.params.id);
    if (!existingNote) {
      return res.send(404).send("Not found")
    }

    existingNote = await Product.findByIdAndDelete(req.params.id)

    res.json({
      "Success": "Note has been deleted", existingNote: existingNote
    })
  }
  catch (error) {
    console.error("Error :", error.message)
    res.status(500).send("Internal server error occured.")
  }
}
