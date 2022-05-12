const {register, login} = require("../controllers/user.controller");
//const { authenticate} = require("../config/jwt.config");

module.exports = (app) => {
    app.post('/api/register', register);
    app.post('/api/login', login);
    //app.get('/api/user', authenticate, userController.getAll);
};