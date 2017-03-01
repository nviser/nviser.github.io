angular.module('store').controller('productCtrl', ['$scope', '$location', '$routeParams',
    function ($scope, $location, $routeParams) {
        $scope.editProduct = $scope.saved = false;
        $scope.part = '../../assets/img/';
        var id = $routeParams['id'];
        var products = JSON.parse(localStorage.getItem('products'));
        angular.forEach(products, function (value, key) {
            if (value.id == id) {
                $scope.product = value;
                $scope.key = key;
                $scope.logo = value.img;
            }
        });
        $scope.edit = function () {
            $scope.editProduct = true;
            $scope.saved = false;
        }
        $scope.saveLogo = function (e) {
            $scope.logo = e.files[0].name;
            $scope.path = $scope.part + $scope.logo;
            var _URL = window.URL || window.webkitURL;
            $scope.fails = false;
            var img = new Image();
            img.onload = function () {
                if (this.width > 400 || this.height > 400) $scope.fails = true;
            }
            img.src = _URL.createObjectURL(e.files[0]);
            $scope.$apply();
        }
        $scope.path = $scope.part + $scope.logo;
        $scope.addProd = function (arg) {
            $scope.warn = false;
            $scope.notification = false;
            if ($scope.product.id && $scope.product.name && $scope.product.description && $scope.product.price) {
                angular.forEach(products, function (value, key) {
                    if (value.id == $scope.product.id && $scope.key != key) {
                        $scope.warn = true;
                    }
                });
                if (!$scope.warn) {
                    if (!$scope.fails) {
                        var newProd = {
                            id: $scope.product.id,
                            name: $scope.product.name,
                            description: $scope.product.description,
                            price: $scope.product.price,
                            img: $scope.logo
                        };
                        products.splice($scope.key, 1, newProd);
                        var str = JSON.stringify(products);
                        localStorage.setItem('products', str);
                        $scope.editProduct = false;
                        $scope.saved = true;
                    }
                }
            } else {
                $scope.notification = true;
            }
        }
    }]);