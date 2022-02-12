const mongoose = require('mongoose');
const Order_Model = mongoose.model('Order');

exports.create = async (req, res) => {
    try {
        const newOrder = new Order_Model({
            user: req.user.id,
            orderedItem: req.body.orderedItem,
            quantity: req.body.quantity,
            status: req.body.status,
            orderItemTotal: req.body.orderItemTotal,
            discount: req.body.discount,
            grandTotal: req.body.grandTotal,
            paymentMode: req.body.paymentMode,
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
        const order = await Order_Model.find({ user: userId })
        if (!order) {
            return res.send(404).send("Not found")
        }
        else {
            res.send(order)
        }
    }
    catch (error) {
        console.error("Error :", error.message)
        res.status(500).send("Internal server error occured.")
    }
}

// to PATCH user specific order details
exports.update = async (req, res) => {
    try {
        // destructing these out of the req.body
        const { orderedItem, quantity, orderItemTotal, discount, shippingAddress, grandTotal } = req.body;

        const updatedOrder = {};
        // if name exists in the req.body then put it in the updated title
        if (orderedItem) { updatedOrder.orderedItem = orderedItem };
        if (quantity) { updatedOrder.quantity = quantity };
        if (orderItemTotal) { updatedOrder.orderItemTotal = orderItemTotal };
        if (discount) { updatedOrder.discount = discount };
        if (grandTotal) { updatedOrder.grandTotal = grandTotal };

        // console.log(updatedOrder);

        // Searching a banner from DB to update it. the id is obtained the req URL params.
        let existingOrder = await Order_Model.findById(req.params.id);
        if (!existingOrder) {
            return res.send(404).send("Not found")
        }

        // 2nd arg is the update parameter
        existingOrder = await Order_Model.findByIdAndUpdate(req.params.id, { $set: updatedOrder }, { new: true })
        // `{new: true})` tells mongoose to return the new latest versin of the document.

        // res.json(updatedProduct)
        res.json({
            "Success": "Banner has been updated successfully", "updatedOrder": updatedOrder
        })
    }
    catch (error) {
        console.error("Error :", error.message)
        res.status(500).send("Internal server error occured.")
    }
}

// to cancel user specific order 
exports.destroy = async (req, res) => {
    try {
        let existingOrder = await Order_Model.findById(req.params.id);
        // console.log(existingOrder);
        if (!existingOrder) {
            return res.sendStatus(404).send("Not found")
        }
        deletedOrder = await Order_Model.findByIdAndDelete(req.params.id)
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

// to GET products from a single user's all orders
exports.getOrderedProducts = async (req, res) => {
    try {
        userId = req.user.id;
        const order = await Order_Model.find({ user: userId }, { orderedItem: 1 })
        if (!order) {
            return res.send(404).send("Not found")
        }
        else {
            res.send(order)

        }
    }
    catch (error) {
        console.error("Error :", error.message)
        res.status(500).send("Internal server error occured.")
    }
}
