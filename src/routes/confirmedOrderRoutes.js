const confirmedOrderController = require('../controllers/confirmedOrderController');

// to require the user ot be logged in as auth-token will required in the header for doing requests with "fetchUser" middleware
const fetchUser = require('../middleware/fetchUser');

module.exports = (app) => {
    //adaptive practive routes 
    app.post('/order/confirmOrder', fetchUser, confirmedOrderController.create);
    app.get('/order/:id', fetchUser, confirmedOrderController.show);
    // app.patch('/order/:id', fetchUser, confirmedOrderController.update);
    // app.delete('/order/:id', confirmedOrderController.destroy);
    // app.get('/order/orderedProducts', fetchUser, confirmedOrderController.getOrderedProducts);
}