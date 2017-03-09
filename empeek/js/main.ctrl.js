app.controller('mainCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
    var items = JSON.parse(localStorage.getItem('items'));
    $scope.items = items;
    $scope.init = function () {
        if ($scope.items.length === 0) {
            $scope.curItemComments = [];
            $scope.id = '';
        } else {
            $scope.curItemComments = items[0].comments;
            $scope.id = items[0].id;
        }
    }
    $scope.init();
    $scope.addItem = function () {
        if ($scope.newItem) {
            $scope.items = actFactory().add($scope.newItem);
            $scope.newItem = '';
            if($scope.items.length == 1){
                $scope.details($scope.items[0]);
            }
        }
    }
    $scope.deleteItem = function (item) {
        var isApproved = confirm('Are you sure want to delete this item?');
        if (isApproved) {
            $scope.items = actFactory().delete(item);
            $scope.refresh($scope.items, item.id, true, item);
        }
    }
    $scope.details = function (item) {
        $scope.curItemComments = item.comments;
        $scope.id = item.id;
    }
    $scope.addComment = function (id) {
        if ($scope.newComment) {
            $scope.items = actFactory().newComment(id, $scope.newComment);
            $scope.refresh($scope.items, id, false);
            $scope.newComment = '';
        }
    }
    $scope.refresh = function (arg, id, isDel, item) {
        if (!arg.length) {
            $scope.curItemComments = [];
            $scope.id = '';
            return;
        }
        if(isDel && $scope.id == item.id) {
            $scope.details($scope.items[0]);
            return;
        }
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