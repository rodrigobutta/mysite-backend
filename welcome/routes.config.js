const WelcomeController = require('./controllers/welcome.controller');

exports.routesConfig = function (app) {
    app.get('/', [
        WelcomeController.index
    ]);
    app.get('/welcome', [
        WelcomeController.welcome
    ]);    
};
