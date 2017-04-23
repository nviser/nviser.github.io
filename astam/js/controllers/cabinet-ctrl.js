angular.module('beautySalon.controllers')

    .controller('cabinetCtrl', function ($rootScope, $scope, $timeout) {
    $scope.items = [
            {
                id: '1',
                name: 'Ведущий VIP педикюр.маникюр',
                address: 'ул. 1-я Владимирская д.14'
            },
            {
                id: '2',
                name: 'Ведущий VIP гель-лак',
                address: 'ул. 1-я Владимирская д.14'
            },
            {
                id: '3',
                name: 'VIP Шелак',
                address: 'ул. 1-я Владимирская д.14'
            },
            {
                id: '4',
                name: 'Детские стрижки',
                address: 'ул. 1-я Владимирская д.14'
            },
            {
                id: '5',
                name: 'Ведущий VIP гостевой сервис',
                address: 'ул. 1-я Владимирская д.14'
            }
        ];
});