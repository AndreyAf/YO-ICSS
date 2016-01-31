'use strict';

angular.module('icssApp')
  .controller('AdminCtrl', function ($scope, $http, Auth, User) {

    $scope.itemsByPage = 5;
    $scope.displayed = [];

    // Use the User $resource to fetch all users
    //$scope.users = User.query(function (users) {
    //  $scope.displayed = [].concat(users);
    //});

    $scope.viewMode = 'table';

    $scope.sessions = [];
    $scope.clients = [];
    $scope.employees = [];
    $scope.companies = [];
    $scope.departments = [];

    $scope.getUserById = function (id) {

      var users = $scope.employees.concat($scope.clients);

      for (var i = 0; i < users.length; i++) {
        if (users[i].id === id) {
          return users[i];
        }
      }
      return null;
    };

    function generateSessions() {
      var locations = [{
        country: 'Israel',
        city: 'Ashdod',
        address: 'sample address 44'
      }, {
        country: 'Russia',
        city: 'Moscow',
        address: 'sample address 55'
      }];
      $scope.departments = [{
        id: 1,
        name: 'support',
        description: 'best support in the whole world',
        email: 'nick@gmail.com',
        location: locations[0],
        phone: '08-88888888',
        fax: '08-88888889'
      }, {
        id: 2,
        name: 'sales',
        description: 'best support in the whole world',
        email: 'andrey@gmail.com',
        location: locations[1],
        phone: '08-88888888',
        fax: '08-88888889'
      }];

      $scope.companies = [{
        id: 1,
        name: 'demo company #1',
        slogan: 'we are the best company EVERRRR!!!',
        description: 'company sample description',
        departments: $scope.departments,
        logo_url: 'http://www.showthemes.com/tyler-demo/wp-content/uploads/2014/05/company.jpg',
        created_at: Date.now(),
        updated_at: Date.now()
      }, {
        id: 2,
        name: 'demo company #2',
        slogan: 'we are the best company EVERRRR!!!',
        description: 'company sample description',
        departments: $scope.departments,
        logo_url: 'http://www.showthemes.com/tyler-demo/wp-content/uploads/2014/05/company.jpg',
        created_at: Date.now(),
        updated_at: Date.now()
      }];

      function generateMessages(clientId, employeeId) {
        var _messages = [];
        var senders = [clientId, employeeId];
        for (var i = 0; i < (~~(Math.random() * 100000)); i++) {

          var sender = senders[(i) % 2];
          var position = {};

          if (sender === employeeId) {

            if($scope.getUserById(employeeId).companies[0]._company === 1) {

              position = {
                latitude: 31.3271801,
                longitude: 34.6604961,
                created_at: Date.now()
              };
            }
            else {
              position = {
                latitude: 55.7597432,
                longitude: 37.6266636,
                created_at: Date.now()
              };
            }
          }
          else {
            position = {
              latitude: ((~~(Math.random() * 10000000)) % 180) - 90,
              longitude: ((~~(Math.random() * 10000000)) % 360) - 180,
              created_at: Date.now()
            };
          }

          _messages[_messages.length] = {
            _sender: sender,
            content: 'sample message ' + i,
            position: position,
            isReceived: (Math.random() % 2),
            isRead: (Math.random() % 2),
            created_at: Date.now()
          };
        }
        return _messages;
      }

      function generateClient(id) {
        $scope.clients[$scope.clients.length] =
        {
          id: id,
          name: 'sample client name',
          status: 'ONLINE',
          address: {
            country: 'Israel',
            city: 'Ashdod',
            address: 'sample address 44'
          },
          phone: '08-8888888',
          email: 'client@company.com',
          created_at: Date.now(),
          updated_at: Date.now()
        };
      }

      function generateEmployee(id, companyId) {
        $scope.employees[$scope.employees.length] =
        {
          id: id,
          name: 'sample employee name',
          status: 'ONLINE',
          address: {
            country: 'Israel',
            city: 'Ashdod',
            address: 'sample address 44'
          },
          phone: '08-8888888',
          email: 'employee@company.com',
          companies: [{
            _company: companyId,
            role: 'employee'
          }],
          created_at: Date.now(),
          updated_at: Date.now()
        };
      }


      for (var i = 0; i < 100; i = i + 2) {
        generateClient(i);
        generateEmployee(i + 1, (~~(Math.random()*1545454)) % 2)
      }

      for (var i = 0; i < 1000; i++) {

        var client = $scope.clients[(i % $scope.clients.length)];
        var clientReview = {
          stars: (i % 6) + 1,
          title: "No title",
          content: "No content",
          created_at: Date.now()
        };
        var clientParticipant = {
          _participant: client,
          isInitiate: Math.random() % 2,
          review: clientReview
        };

        var employee = $scope.employees[((~~(i * Math.random() * 1000)) % $scope.employees.length)];
        var employeeReview = {
          stars: (i % 6) + 1,
          title: "No title",
          content: "No content",
          created_at: Date.now()
        };
        var employeeParticipant = {
          _participant: employee,
          isInitiate: Math.random() % 2,
          review: employeeReview
        };
        var messages = generateMessages(client.id, employee.id);

        $scope.sessions[$scope.sessions.length] = {
          id: i,
          _company: employee.companies[0]._company,
          _department: (i % $scope.departments.length) + 1,
          client: clientParticipant,
          employee: employeeParticipant,
          messages: messages,
          created_at: Date.now(),
          started_at: Date.now(),
          updated_at: Date.now(),
          isOver: ~~(Math.random() * 1000) % 2
        }
      }
    }

    generateSessions();

    $scope.getCompanyById = function (id) {

      for (var i = 0; i < $scope.companies.length; i++) {
        if ($scope.companies[i].id === id) {
          return $scope.companies[i];
        }
      }
      return null;
    };


    $scope.getDepartmentById = function (id) {

      for (var i = 0; i < $scope.departments.length; i++) {
        if ($scope.departments[i].id === id) {
          return $scope.departments[i];
        }
      }
      return null;
    };



    $scope.delete = function (user) {
      User.remove({id: user._id});
      $scope.users.splice(this.$index, 1);
    };

    $scope.center = {
      lat: 48,
      lng: 4,
      zoom: 4
    };

    $scope.paths = {};

    angular.forEach($scope.sessions, function (session) {

      var sideOneSent = false;
      var firstID = 0;
      var sideTwoSent = false;
      for (var i = 0; i < session.messages.length; i++) {

        var message = session.messages[i];

        if (!sideOneSent) {
          sideOneSent = {
            lat: message.position.latitude * 0.99,
            lng: message.position.longitude * 0.99
          };
          firstID = message._sender;
        }

        if (!sideTwoSent && firstID != message._sender) {
          sideTwoSent = {
            lat: message.position.latitude * 0.99,
            lng: message.position.longitude * 0.99
          }
        }

        if (sideTwoSent && sideOneSent) {


          var color = null;

          if(session._department === 1)
          {
            color = '#F90903';
          }
          else {
            color = '#155950';
          }


          $scope.paths["p" + session.id] = {
            color: color,
            weight: 1,
            latlngs: []
          };

          $scope.paths["p" + session.id].latlngs.push(sideOneSent);
          $scope.paths["p" + session.id].latlngs.push(sideTwoSent);
          break;
        }
      }
    });

    angular.extend($scope, {
      defaults: {
        scrollWheelZoom: false
      }
    });

  });

