const reviewsController = require('../controllers/reviewsController');

// to require the user ot be logged in as auth-token will required in the header for doing requests with "fetchUser" middleware
const fetchUser = require('../middleware/fetchUser');

module.exports = (app) => {
    //adaptive practive routes 
    app.post('/review/placereview', fetchUser, reviewsController.create);
    app.get('/review/product/:id', reviewsController.index);
    app.get('/review/user/:id', fetchUser, reviewsController.show);
    app.patch('/review/:id', fetchUser, reviewsController.update);
    app.delete('/review/:id', fetchUser, reviewsController.destroy);
}
