var config = module.exports = {};

config.HOST = 'localhost/';

// ports
config.PORT = {};
//config.PORT.HTTP = '8080';
config.PORT.HTTPS = '8443';

// paths
config.PUBLIC_PATH = '/client';
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
config.MONGOOSE.DB = 'angddular-registration';
config.MONGOOSE.CONNECT = config.MONGOOSE.PROTOCOL + config.HOST + config.MONGOOSE.DB;
