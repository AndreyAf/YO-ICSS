/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';

User.find({}).removeAsync()
  .then(function () {
    User.createAsync({
        provider: 'local',
        name: 'Test User',
        email: 'test@example.com',
        password: 'test'
      }, {
        provider: 'local',
        roles: ['admin'],
        name: 'Admin',
        email: 'admin@example.com',
        password: 'admin'
      }, {
        provider: 'local',
        roles: ['client'],
        name: 'Client',
        email: 'client@example.com',
        password: 'client'
      }, {
        provider: 'local',
        roles: ['employee'],
        name: 'Employee',
        email: 'employee@example.com',
        password: 'employee'
      }, {
        provider: 'local',
        roles: ['manager'],
        name: 'Manager',
        email: 'manager@example.com',
        password: 'manager'
      }, {
        provider: 'local',
        roles: ['manager','client','employee'],
        name: 'Very_long_user_name Very_long_user_name Very_long_user_name',
        email: 'manager@example.com',
        password: 'manager'
      })
      .then(function () {
        console.log('finished populating users');
      });
  });
