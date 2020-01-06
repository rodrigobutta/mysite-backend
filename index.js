
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// logger 
// const fs = require('fs')
const morgan = require('morgan')
const winston = require('winston');
const expressWinston = require('express-winston');
require('winston-loggly-bulk');
// var {Loggly} = require('winston-loggly-bulk');
// const path = require('path')

const AuthorizationRouter = require('./authorization/routes.config');
const UsersRouter = require('./users/routes.config');
const WelcomeRouter = require('./welcome/routes.config');

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.send(200);
    } else {
        return next();
    }
});

app.use(bodyParser.json());

// app.use(morgan('combined'))

// log all requests to access.log
// app.use(morgan('common', {
//     skip: function (req, res) { return res.statusCode < 400 },
//     stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
// }))

const logger =  winston.createLogger({
    transports: [
        new winston.transports.Loggly({
            subdomain: 'rodrigobutta',
            inputToken: '57cf6799-2285-4823-ab46-0edd01d0c1d9',
            json: true,
            tags: ["Winston-Morgan"]
        }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
}),

    loggerstream = {
        write: function (message, encoding) {
            logger.info(message);
        }
    };

app.use(morgan('combined', { "stream": loggerstream }));







AuthorizationRouter.routesConfig(app);
UsersRouter.routesConfig(app);
WelcomeRouter.routesConfig(app);


app.listen(process.env.PORT, function () {
    console.log('APP NAME (just for test ENV):', process.env.APP_NAME);
    console.log('app listening at port %s', process.env.PORT);
});
