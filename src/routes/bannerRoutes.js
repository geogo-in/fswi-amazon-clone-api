const bannerController = require('../controllers/bannerController');

module.exports = (app) => {
    //adaptive practive routes 
    app.post('/banner/createBanner', bannerController.create);
    app.get('/banner/:id', bannerController.show);
    app.patch('/banner/:id', bannerController.update);
    app.delete('/banner/:id', bannerController.destroy);
    app.get('/banner', bannerController.index);
}
