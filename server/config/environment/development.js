'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: "mongodb://ninickname:oneXone1@ds061974.mongolab.com:61974/icssyo"
  },
  sequelize: {
    uri: 'sqlite://',
    options: {
      logging: false,
      storage: 'dev.sqlite',
      define: {
        timestamps: false
      }
    }
  },

  seedDB: true
};
