angular.module('store').controller('customCtrl', ['$scope',
    function ($scope) {
        $scope.notification = $scope.saved = false;
        var products = JSON.parse(localStorage.getItem('products'));
        $scope.logo = 'noimg.jpg';
        $scope.part = '../../assets/img/';
        $scope.addProd = function (arg) {
            $scope.warn = false;
            $scope.notification = false;
            if ($scope.logo && $scope.id && $scope.name && $scope.description && $scope.price) {
                angular.forEach(products, function (value, key) {
                    if (value.id == $scope.id && $scope.key != key) {
                        $scope.warn = true;
                    }
                });
                if (!$scope.warn) {
                    if (!$scope.fails) {
                        var newProd = {
                            id: $scope.id,
                            name: $scope.name,
                            description: $scope.description,
                            price: $scope.price,
                            img: $scope.logo
                        };
                        $scope.products = JSON.parse(localStorage.getItem('products'));
                        $scope.products.push(newProd);
                        var str = JSON.stringify($scope.products);
                        localStorage.setItem('products', str);
                        $scope.saved = true;
                    } 
                }
            } else {
                $scope.notification = true;
            }
        }
        $scope.saveLogo = function (e) {
            var _URL = window.URL || window.webkitURL;
            $scope.logo = e.files[0].name;
            $scope.fails = false;
            $scope.path = $scope.part + $scope.logo;
            var img = new Image();
            img.onload = function () {
                if (this.width > 400 || this.height > 400) $scope.fails = true;
            }
            img.src = _URL.createObjectURL(e.files[0]);
            $scope.$apply();
        }
        $scope.path = $scope.part + $scope.logo;

    }]);