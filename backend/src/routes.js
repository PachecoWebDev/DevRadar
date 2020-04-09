const {Router} = require('express');
const Devcontroller = require('./controllers/DevController');
const Searchcontroller = require('./controllers/Searchcontroller');


const routes = Router();

routes.post('/devs', Devcontroller.store);
routes.get('/devs', Devcontroller.index);
routes.delete('/devs', Devcontroller.destroy);
routes.put('/devs', Devcontroller.update);

routes.get('/search', Searchcontroller.index);

module.exports = routes;