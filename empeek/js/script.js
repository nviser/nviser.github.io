var app = angular.module('mainApp', []);

app.run(function () {
    var str = JSON.stringify(dataFactory());
    localStorage.setItem('items', str);
});

app.factory('actFactory', actFactory);
function actFactory () {
    var obj = {
        add: function (item) {
            var items = JSON.parse(localStorage.getItem('items'));
            items.push({ name: item, quantity: 0});
            console.log('run');
            localStorage.setItem('items', JSON.stringify(items));
            return items;
        },
        delete: function (item) {
            var items = JSON.parse(localStorage.getItem('items'));
            var index = items.indexOf(item);
            items.splice(index, 1);
            console.log('del ->>');
            localStorage.setItem('items', JSON.stringify(items));
            return items;
        }
    }
    return obj;
}

app.controller('mainCtrl', ['$scope', function($scope) {
    var items = JSON.parse(localStorage.getItem('items'));
    $scope.items = items;
    $scope.addItem = function () {
        $scope.items = actFactory().add($scope.newItem);
        $scope.newItem = '';
    }
     $scope.deleteItem = function (item) {
        $scope.items = actFactory().delete(item); 
     }
}]);



app.factory('dataFactory', dataFactory);
function dataFactory () {
    var factory = [
            {
                name: "First item with custom name",
                quantity: 51
            },
            {
                name: "Second item is active",
                quantity: 3
            },
            {
                name: "Third item",
                quantity: 1
            }
    ]
    return factory;
}