const ordersController = require('../controllers/ordersController');

// to require the user ot be logged in as auth-token will required in the header for doing requests with "fetchUser" middleware
const fetchUser = require('../middleware/fetchUser');

module.exports = (app) => {
    //adaptive practive routes 
    app.post('/order/placeOrder', fetchUser, ordersController.create);
    app.get('/order', fetchUser, ordersController.show);
    app.patch('/order/:id', fetchUser, ordersController.update);
    app.delete('/order/:id', ordersController.destroy);
    app.get('/order/orderedProducts', fetchUser, ordersController.getOrderedProducts);
}
