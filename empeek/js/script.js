var app = angular.module('mainApp', []);

app.run(function () {
    if(localStorage.getItem('items') == undefined) {
        var str = JSON.stringify(dataFactory());
        localStorage.setItem('items', str);
    }
});

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

app.service('actFactory', actFactory);
function actFactory () {
    var obj = {
        add: function (item) {
            var items = JSON.parse(localStorage.getItem('items'));
            items.push({ name: item, quantity: 0});
            localStorage.setItem('items', JSON.stringify(items));
            return items;
        },
        delete: function (item) {
            var index, items = JSON.parse(localStorage.getItem('items'));
            
            angular.forEach(items, function (val, key){
                if(val.name == item.name && val.quantity == item.quantity){
                    index = key;
                }
            });

            items.splice(index, 1);
            localStorage.setItem('items', JSON.stringify(items));
            return items;
        }
    }
    return obj;
}





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