app.controller('mainCtrl', ['$scope', function ($scope) {
    var items = JSON.parse(localStorage.getItem('items'));
    $scope.items = items;
    $scope.curItemComments = items[0].comments;
    $scope.id = items[0].id;
    $scope.addItem = function () {
        if($scope.newItem){
            $scope.items = actFactory().add($scope.newItem);
            $scope.newItem = '';
        }
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