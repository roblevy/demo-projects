Router.$inject = ['$urlRouterProvider', '$stateProvider', '$locationProvider'];

function Router($urlRouterProvider, $stateProvider, $locationProvider) {

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: true
  });

  $stateProvider
    .state('home', { // this state's name is `home`
      url: '/', // when the browser has this URL, the home state will be rendered
      templateUrl: 'views/home.html', // this is the template file that will be loaded
      controller: 'HomeCtrl as home' // this is the controller that will be attached to the template
    })
    .state('pic', {
      abstract: true,
      templateUrl: 'views/pics/show.html',
      controller: 'PicsShowCtrl as picsShow'
    })
    .state('pic.show', {
      url: '/pics/:id',
      views: {
        showMain: {
          templateUrl: 'views/pics/showMain.html'
        },
        commentsNew: {
          templateUrl: 'views/comments/new.html'
        },
        commentsIndex: {
          templateUrl: 'views/comments/index.html'
        }
      }
    })
    .state('picsIndex', {
      url: '/pics',
      templateUrl: 'views/pics/index.html',
      controller: 'PicsIndexCtrl as picsIndex'
    });

  $urlRouterProvider.otherwise('/');
}

export default Router;
