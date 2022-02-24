const mongoose = require('mongoose');
const Banner_Model = mongoose.model('Banner');

exports.create = async (req, res) => {
    try {
        const newBanner = new Banner_Model({
            name: req.body.name,
            bannerImage: req.body.bannerImage,
            isActive: req.body.isActive,
            linkedToUrl: req.body.linkedToUrl
        })
        newBanner.save((err, savedBanner) => {
            if (err) {
                return res.status(422).send({ message: 'Unable to save this banner', error: error })
            } else {
                return res.status(200).send(savedBanner)
            }
        })
    }
    catch (error) {
        console.error("Error :", error.message)
        res.status(500).send("Internal server error occured.")
    }
}

// to GET banner details
exports.show = async (req, res) => {
    try {
        // bannerId = req.params.id
        const banner = await Banner_Model.findById(req.params.id)
        if (!banner) {
            return res.send(404).send("Not found")
        }
        else {
            res.send(banner)
        }
    }
    catch (error) {
        console.error("Error :", error.message)
        res.status(500).send("Internal server error occured.")
    }
}

exports.update = async (req, res) => {
    try {
        // destructing these out of the req.body
        const { name, bannerImage, isActive, linkedToUrl } = req.body;
        const updatedBanner = {};
        // if name exists in the req.body then put it in the updated title
        if (isActive) { updatedBanner.isActive = isActive };
        if (name) { updatedBanner.name = name };
        if (bannerImage) { updatedBanner.bannerImage = bannerImage };
        if (linkedToUrl) { updatedBanner.linkedToUrl = linkedToUrl };

        // Searching a banner from DB to update it. the id is obtained the req URL params.
        let existingBanner = await Banner_Model.findById(req.params.id);
        if (!existingBanner) {
            return res.send(404).send("Not found")
        }

        // 2nd arg is the update parameter
        existingBanner = await Banner_Model.findByIdAndUpdate(req.params.id, { $set: updatedBanner }, { new: true })
        // `{new: true})` tells mongoose to return the new latest versin of the document.

        // res.json(updatedProduct)
        res.json({
            "Success": "Banner has been updated successfully", "updatedBanner": updatedBanner
        })
    }
    catch (error) {
        console.error("Error :", error.message)
        res.status(500).send("Internal server error occured.")
    }
}

exports.destroy = async (req, res) => {
    try {
        let existingBanner = await Banner_Model.findById(req.params.id);
        // console.log(existingBanner);
        if (!existingBanner) {
            return res.sendStatus(404).send("Not found")
        }
        deletedBanner = await Banner_Model.findByIdAndDelete(req.params.id)
        res.json({
            "success": "Banner deleted successfully", "existingBanner": existingBanner,
            "deletedBanner": deletedBanner
        })
    }
    catch (error) {
        console.error("Error :", error.message)
        res.status(500).send("Internal server error occured.")
    }
}

// To get only ACTIVE banners ie. with isActive=true

exports.index = async (req, res) => {
    try {
        // ------helpful for nodejs MONGODB queris v 
        // https://www.codegrepper.com/code-examples/whatever/nodejs+mongodb+find+by+filter+filds+of+fild 
        // and
        // https://docs.mongodb.com/manual/tutorial/project-fields-from-query-results/

        let allBanners = await Banner_Model.find({ isActive: "true" }, { _id: 0, name: 1, isActive: 1, bannerImage: 1, linkedToUrl: 1 });
        // Meaning -> SELECT name, isActive, bannerImage, linkedToUrl from Banner_Model WHERE isActive=true

        // console.log(allBanners);
        if (!allBanners) {
            return res.sendStatus(404).send("Not found")
        }
        res.json(allBanners)
    }
    catch (error) {
        console.error("Error :", error.message)
        res.status(500).send("Internal server error occured.")
    }
}