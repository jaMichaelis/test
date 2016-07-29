angular.module('trelloApp.routes', ['ionicUIRouter'])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

   .state('tabsController.boards', {
      url: '/boards',
      views: {
        'tab1': {
          templateUrl: 'templates/boards.html',
          controller: 'boardsCtrl'
        }
      }
    })

    .state('tabsController', {
      url: '/tabs',
      templateUrl: 'templates/tabsController.html',
      abstract:true
    })

    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
    })
    .state('tabsController.lists', {
      url: '/lists',
      views: {
        'tab2': {
          templateUrl: 'templates/lists.html',
          controller: 'listsCtrl'
        }
      }
    })


  $urlRouterProvider.otherwise('#/tabs/boards')


});
