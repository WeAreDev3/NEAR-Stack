angular.module('mySite.controllers', [])
    .controller('MainController', ['$scope',
        function(scope) {

        }
    ])
    .controller('AboutController', ['$scope',
        function(scope) {

        }
    ]);

angular.module('mySite', ['ngRoute', 'mySite.controllers'])
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: 'partials/main.html',
                controller: 'MainController'
            });
            $routeProvider.when('/about', {
                templateUrl: 'partials/about.html',
                controller: 'AboutController'
            });
            $routeProvider.otherwise({
                redirectTo: '/'
            });
        }
    ]);
