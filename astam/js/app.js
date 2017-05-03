// Declare app level module which depends on views, and components
angular.module('BeautySalon', [
    'ngRoute',
    'ngResource',
    /*'ngAnimate',*/
    'beautySalon.controllers'
])

.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'templates/main-page.html',
                controller: 'MainCtrl'
            })
            .when('/cabinet', {
                templateUrl: 'templates/cabinet.html',
                controller: 'cabinetCtrl'
            })
            .otherwise({redirectTo: '/'});
    }])
.run(['$rootScope', '$location', '$route', function ($rootScope, $location, $route) {
    sessionStorage.clear();
    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        if (!sessionStorage.getItem("token")) {
            $location.path("/");
        }
    })
}]);

angular.module('beautySalon.controllers', []);

