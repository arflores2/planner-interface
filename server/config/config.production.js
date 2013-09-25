var config = require('./config.global');

config.HOST = {}
config.HOST.PORT= process.env.PORT || 8080;
config.HOST.IP = process.env.IP || '0.0.0.0';
console.log('production', process.env.PORT, config.HOST.PORT, process.env.IP, config.HOST.IP);

// paths
config.PUBLIC_PATH = __dirname + '/../../client';
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
config.MONGOOSE.DB = 'planner-interface';
config.MONGOOSE.CONNECT = config.MONGOOSE.PROTOCOL + config.HOST.IP + '/' + config.MONGOOSE.DB;

module.exports = config;