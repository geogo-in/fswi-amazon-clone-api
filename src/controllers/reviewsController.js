const mongoose = require('mongoose');
const Reviews_Model = mongoose.model('Reviews');

exports.create = async (req, res) => {
    try {
        const newReview = new Reviews_Model({
            user: req.user.id,
            product: req.body.product,
            review: req.body.review,
            rating: req.body.rating
        })
        newReview.save((err, savedReview) => {
            if (err) {
                return res.status(422).send({ message: 'Unable to post this review', err: err })
            } else {
                return res.status(200).send(savedReview)
            }
        })
    }
    catch (error) {
        console.error("Error :", error.message)
        res.status(500).send("Internal server error occured.")
    }
}

// to GET all reviews of a specific product
exports.index = async (req, res) => {
    try {
        productId = req.body.product;
        const review = await Reviews_Model.find(productId)
        if (!review) {
            return res.send(404).send("Not found")
        }
        else {
            res.send(review)
        }
    }
    catch (error) {
        console.error("Error :", error.message)
        res.status(500).send("Internal server error occured.")
    }
}


// to GET user specific review details
exports.show = async (req, res) => {
    try {
        userId = req.user.id;
        const reviews = await Reviews_Model.find({ user: userId })
        if (!reviews) {
            return res.send(404).send("Not found")
        }
        else {
            res.send(reviews)
        }
    }
    catch (error) {
        console.error("Error :", error.message)
        res.status(500).send("Internal server error occured.")
    }
}

// to PATCH user specific review details
exports.update = async (req, res) => {
    try {
        // destructing these out of the req.body
        const { review, rating } = req.body;

        const updatedReview = {};
        if (review) { updatedReview.review = review };
        if (rating) { updatedReview.rating = rating };

        let existingReview = await Reviews_Model.findById(req.params.id);
        if (!existingReview) {
            return res.send(404).send("Not found")
        }

        // 2nd arg is the update parameter
        existingReview = await Reviews_Model.findByIdAndUpdate(req.params.id, { $set: updatedReview }, { new: true })
        // `{new: true})` tells mongoose to return the new latest versin of the document.

        // res.json(updatedProduct)
        res.json({
            "Success": "Review has been updated successfully", "updatedReview": updatedReview
        })
    }
    catch (error) {
        console.error("Error :", error.message)
        res.status(500).send("Internal server error occured.")
    }
}

// to cancel user specific review 
exports.destroy = async (req, res) => {
    try {
        let existingReview = await Reviews_Model.findById(req.params.id);
        // console.log(existingReview);
        if (!existingReview) {
            return res.sendStatus(404).send("Not found")
        }
        deletedReview = await Reviews_Model.findByIdAndDelete(req.params.id)
        res.json({
            "success": "Review deleted successfully", "existingReview": existingReview,
            "deletedReview": deletedReview
        })
    }
    catch (error) {
        console.error("Error :", error.message)
        res.status(500).send("Internal server error occured.")
    }
}

''