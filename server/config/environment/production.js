'use strict';

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip:       process.env.OPENSHIFT_NODEJS_IP ||
            process.env.IP ||
            undefined,

  // Server port
  port:     process.env.OPENSHIFT_NODEJS_PORT ||
            process.env.PORT ||
            8080,

  // MongoDB connection options
  mongo: {
    uri: "mongodb://ninickname:oneXone1@ds061974.mongolab.com:61974/icssyo"
    //process.env.MONGOLAB_URI ||
    //process.env.MONGOHQ_URL ||
    //        process.env.OPENSHIFT_MONGODB_DB_URL +
    //          process.env.OPENSHIFT_APP_NAME ||
    //            'mongodb://localhost/generatorangularfullstackmaster'
  }
};
