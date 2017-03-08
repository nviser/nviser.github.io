var app = angular.module('mainApp', []);

app.run(function () {
    if (localStorage.getItem('items') == undefined) {
        var str = JSON.stringify(dataFactory());
        localStorage.setItem('items', str);
    }
});

app.controller('mainCtrl', ['$scope', function ($scope) {
    var items = JSON.parse(localStorage.getItem('items'));
    $scope.items = items;
    $scope.curItemComments = items[0].comments;
    $scope.id = items[0].id;
    $scope.addItem = function () {
        $scope.items = actFactory().add($scope.newItem);
        $scope.newItem = '';
    }
    $scope.deleteItem = function (item) {
        var isApproved = confirm('Are you sure want to delete this item?');
        if (isApproved) {
            $scope.items = actFactory().delete(item);
            $scope.refresh($scope.items, item.id);
        }
    }
    $scope.details = function (item) {
        $scope.curItemComments = item.comments;
        $scope.id = item.id;
    }
    $scope.addComment = function (id) {
        if($scope.newComment){
            $scope.items = actFactory().newComment(id, $scope.newComment);
            $scope.refresh($scope.items, id);
            $scope.newComment = '';
        }
    }
    $scope.refresh = function (arg, id) {
        angular.forEach(arg, function (val, key) {
            if (val.id == id) {
                $scope.curItemComments = arg[key].comments;
            }
        });
    }
    $scope.subm = function (e, id) {
        if (e.keyCode == 13) {
            e.preventDefault();
            $scope.addComment(id);
        }
    }
}]);

app.service('actFactory', actFactory);
function actFactory() {
    var obj = {
        add: function (item) {
            var id = 0, items = JSON.parse(localStorage.getItem('items'));
            angular.forEach(items, function (val, key) {
                if (val.id > id) id = val.id;
            });
            items.push({ name: item, id: id + 1, quantity: 0, comments: [] });
            localStorage.setItem('items', JSON.stringify(items));
            return items;
        },
        delete: function (item) {
            var index, items = JSON.parse(localStorage.getItem('items'));

            angular.forEach(items, function (val, key) {
                if (val.id == item.id) {
                    index = key;
                }
            });

            items.splice(index, 1);
            localStorage.setItem('items', JSON.stringify(items));
            return items;
        },
        newComment: function (id, comment) {
            var items = JSON.parse(localStorage.getItem('items'));
            angular.forEach(items, function (val, key) {
                if (val.id == id) {
                    items[key].comments.push({ comment: comment });
                    items[key].quantity++;
                }
            });
            localStorage.setItem('items', JSON.stringify(items));
            return items;
        }
    }
    return obj;
}





app.factory('dataFactory', dataFactory);
function dataFactory() {
    var factory = [
        {
            name: "First item with custom name",
            id: 1,
            quantity: 2,
            comments: [
                {
                    comment: "Totally agreed with owner, it's cool"
                },
                {
                    comment: "Yeah, but not cheap.."
                }
            ]
        },
        {
            name: "Second item is active",
            id: 2,
            quantity: 3,
            comments: [
                {
                    comment: "I'm not shure"
                },
                {
                    comment: "+1"
                },
                {
                    comment: "Ok"
                }
            ]
        },
        {
            name: "Third item",
            id: 3,
            quantity: 2,
            comments: [
                {
                    comment: "Ask my partner asap"
                },
                {
                    comment: "I'll be waiting"
                }
            ]
        }
    ]
    return factory;
}