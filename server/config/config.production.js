var config = require('./config.global');

config.HOST = 'localhost/';

config.PORT.HTTPS = '8443';

// paths
config.PUBLIC_PATH = __dirname + '/client';
config.CERT_PATH = '/server/cert';

//cert
config.CERT = {};
config.CERT.KEY = config.CERT_PATH + 'server-key.pem';
config.CERT.KEY = config.CERT_PATH + 'server-cert.pem';

// session
config.SESSION_SECRET = 'my private secret';

// mongoose
config.MONGOOSE = {};
config.MONGOOSE.PROTOCOL = 'mongodb://';
config.MONGOOSE.DB = 'angular-registration';
config.MONGOOSE.CONNECT = config.MONGOOSE.PROTOCOL + config.HOST + config.MONGOOSE.DB;
console.log(config.MONGOOSE.CONNECT);

module.exports = config;