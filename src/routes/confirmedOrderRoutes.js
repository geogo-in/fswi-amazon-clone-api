const confirmedOrderController = require('../controllers/confirmedOrderController');

// to require the user ot be logged in as auth-token will required in the header for doing requests with "fetchUser" middleware
const fetchUser = require('../middleware/fetchUser');

module.exports = (app) => {
    //adaptive practive routes 
    app.post('/order/confirmOrder', fetchUser, confirmedOrderController.create);
    app.get('/order/confirmedOrder', fetchUser, confirmedOrderController.show);
    // app.patch('/order/:id', fetchUser, confirmedOrderController.update);
    app.delete('/order/confirmedOrder/:id', fetchUser, confirmedOrderController.destroy);
}
