'use strict';

angular.module('icssApp')
  .factory('Auth', function Auth($http, User, $cookies, $q) {
    /**
     * Return a callback or noop function
     *
     * @param  {Function|*} cb - a 'potential' function
     * @return {Function}
     */
    var safeCb = function (cb) {
        return (angular.isFunction(cb)) ? cb : angular.noop;
      },

      currentUser = null;

    if ($cookies.get('token')) {
      currentUser = User.get();
    }

    return {

      /**
       * Authenticate user and save token
       *
       * @param  {Object}   user     - login info
       * @param  {Function} callback - optional, function(error, user)
       * @return {Promise}
       */
      login: function (user, callback) {
        return $http.post('/auth/local', {
            email: user.email,
            password: user.password
          })
          .then(function (res) {
            $cookies.put('token', res.data.token);
            currentUser = User.get();
            return currentUser.$promise;
          })
          .then(function (user) {
            safeCb(callback)(null, user);
            return user;
          })
          .catch(function (err) {
            this.logout();
            safeCb(callback)(err.data);
            return $q.reject(err.data);
          }.bind(this));
      },

      /**
       * Delete access token and user info
       */
      logout: function () {
        $cookies.remove('token');
        currentUser = {};
      },

      /**
       * Create a new user
       *
       * @param  {Object}   user     - user info
       * @param  {Function} callback - optional, function(error, user)
       * @return {Promise}
       */
      createUser: function (user, callback) {
        return User.save(user,
          function (data) {
            $cookies.put('token', data.token);
            currentUser = User.get();
            return safeCb(callback)(null, user);
          },
          function (err) {
            this.logout();
            return safeCb(callback)(err);
          }.bind(this)).$promise;
      },

      /**
       * Change password
       *
       * @param  {String}   oldPassword
       * @param  {String}   newPassword
       * @param  {Function} callback    - optional, function(error, user)
       * @return {Promise}
       */
      changePassword: function (oldPassword, newPassword, callback) {
        return User.changePassword({id: currentUser._id}, {
          oldPassword: oldPassword,
          newPassword: newPassword
        }, function () {
          return safeCb(callback)(null);
        }, function (err) {
          return safeCb(callback)(err);
        }).$promise;
      },


      getCurrentUser: getCurrentUser ,

      /**
       * Check if a user is logged in
       *   (synchronous|asynchronous)
       *
       * @param  {Function|*} callback - optional, function(is)
       * @return {Bool|Promise}
       */
      isLoggedIn: function (callback) {
        if (arguments.length === 0) {
          return currentUser && currentUser.hasOwnProperty('roles');
        }

        return this.getCurrentUser(null)
          .then(function (user) {
            var is = currentUser &&  user.hasOwnProperty('roles');
            safeCb(callback)(is);
            return is;
          });
      },

      /**
       * Check if a user is an admin
       *   (synchronous|asynchronous)
       *
       * @param  {Function|*} callback - optional, function(is)
       * @return {Bool|Promise}
       */
      isAdmin: function (callback) {
        if (arguments.length === 0) {
          for (var i in currentUser.roles) {
            return currentUser.roles[i] === 'admin';
          }
          return false;
        }

        return this.getCurrentUser(null)
          .then(function () {

            var is = false;
            for (var i in currentUser.roles) {
              is = currentUser.roles[i] === 'admin';
            }
            safeCb(callback)(is);
            return is;
          });
      },

        /***
         * Returns current user roles
         * @returns {Array|*|Object[]}
         */
      getRoles: function(){
        return currentUser.roles;
      },


      /***
       * Add new contact to current user
       */
      addContact: function(contact, callback){

        var newContact = {
          _contact: contact,
          _session: null
        };

        // Update locally
        currentUser.contacts.push(newContact);

        // update server
        return User.addContact({id: currentUser._id}, {
          contact: newContact
        }, function () {
          return safeCb(callback)(null);
        }, function (err) {
          return safeCb(callback)(err);
        }).$promise;
      },
      /***
       * Add new contact to current user
       */
      getPossibleContacts: function(callback){

        // update server
        return User.getPossibleContacts({id: currentUser._id}, function (users) {
          return safeCb(callback)(users);
        }, function (err) {
          return safeCb(callback)(err);
        }).$promise;
      },

      /***
       * Get possible companies
       */
      getPossibleCompanies: function(){

        var value = (currentUser && currentUser.hasOwnProperty('$promise')) ? currentUser.$promise : currentUser;
        return $q.when(value)
          .then(function (currentUser) {
            return User.getPossibleCompanies({id: currentUser._id}).$promise;
          });
      },

      /**
       * Get auth token
       *
       * @return {String} - a token string used for authenticating
       */
      getToken: function () {
        return $cookies.get('token');
      }
    };

    /**
     * Gets all available info on a user
     *   (synchronous|asynchronous)
     *
     * @param  {Function|*} callback - optional, funciton(user)
     * @return {Object|Promise}
     */
    function getCurrentUser (callback) {
      if (arguments.length === 0) {
        return currentUser;
      }

      var value = (currentUser && currentUser.hasOwnProperty('$promise')) ? currentUser.$promise : currentUser;
      return $q.when(value)
        .then(function (user) {
          safeCb(callback)(user);
          return user;
        }, function () {
          safeCb(callback)({});
          return {};
        });
    }
  });
