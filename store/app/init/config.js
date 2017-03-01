angular.module('store').config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: "app/list.component/products.html",
                controller: "productListCtrl",
                resolve: {
                    _products: function () {
                        return storeFactory();
                    }
                }
            })
            .when('/product/:id', {
                templateUrl: "app/prod.component/product.html",
                controller: "productCtrl"
            })
            .when('/create', {
                templateUrl: "app/custom.component/custom.prod.html",
                controller: "customCtrl"
            }).otherwise({
                redirectTo: "/"
            })
    }]);
angular.module('store').run(['storeFactory', function () {
    var str = JSON.stringify(storeFactory());
    localStorage.setItem('products', str);
}]);