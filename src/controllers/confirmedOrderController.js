const mongoose = require('mongoose');
const ConfirmedOrder_Modal = mongoose.model('ConfirmedOrder');

exports.create = async (req, res) => {
    try {
        const newOrder = new ConfirmedOrder_Modal({
            user: req.user.id,
            order: req.body.order,
            paymentMode: req.body.paymentMode,
            shippingAddress: req.body.shippingAddress,
            paidAmount: req.body.paidAmount,
        })
        newOrder.save((err, savedOrder) => {
            if (err) {
                return res.status(422).send({ message: 'Unable to place this order', err: err })
            } else {
                return res.status(200).send(savedOrder)
            }
        })
    }
    catch (error) {
        console.error("Error :", error.message)
        res.status(500).send("Internal server error occured.")
    }
}

// to GET user specific order details
exports.show = async (req, res) => {
    try {
        userId = req.user.id;
        const order = await ConfirmedOrder_Modal.find({ user: userId }, { order: 1, paymentMode: 1, paidAmount: 1, createdAt: 1 })
        if (!order) {
            return res.send(404).send("Not found")
        }
        else {
            res.json(order)
        }
    }
    catch (error) {
        console.error("Error :", error.message)
        res.status(500).send("Internal server error occured.")
    }
}

// to removw user specific order history 
exports.destroy = async (req, res) => {
    try {
        let existingOrder = await ConfirmedOrder_Modal.findById(req.params.id);
        console.log(existingOrder);
        // console.log(existingOrder);
        if (!existingOrder) {
            return res.sendStatus(404).send("Not found")
        }
        deletedOrder = await ConfirmedOrder_Modal.findByIdAndDelete(req.params.id)
        res.json({
            "success": "Order cancelled successfully", "existingOrder": existingOrder,
            "deletedOrder": deletedOrder
        })
    }
    catch (error) {
        console.error("Error :", error.message)
        res.status(500).send("Internal server error occured.")
    }
}
