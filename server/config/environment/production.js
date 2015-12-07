'use strict';

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip:       process.env.IP || undefined,

  // Server port
  port:     process.env.PORT || 3000,

  // MongoDB connection options
  mongo: {
    uri:    "mongodb://ninickname:oneXone1@ds061974.mongolab.com:61974/icssyo"
  }
};
