angular.module('beautySalon.controllers')

    .controller('cabinetCtrl', ['getData', '$scope','pagination', function (getData, $scope, pagination) {
        /*getData.orders().query(function(data) {
                $scope.items = data;
            }
        );*/
    $scope.showHiddenMenu = false;
    $scope.showHideMenu = function () {
        $scope.showHiddenMenu = !$scope.showHiddenMenu;
    }
    $scope.myTracks = true;
    $scope.forRendering = function (array) {
        pagination.setProducts( array );
        $scope.products = pagination.getPageProducts( $scope.currentPage );
        $scope.paginationList = pagination.getPaginationList();

        $scope.showPage = function(page) {
                    if ( page == 'prev' ) {
                        $scope.products = pagination.getPrevPageProducts();
                    } else if ( page == 'next' ) {
                        $scope.products = pagination.getNextPageProducts();
                    } else {
                        $scope.products = pagination.getPageProducts( page );
                    }
                }

                $scope.currentPageNum = function() {
                    return pagination.getCurrentPageNum();
                }
    }
    

    $scope.impendingSessionsItems = [
            {
                "id": 2,
                "user_id": 1,
                "time_work_id": 2,
                "fullName": "Рита Чобанян",
                "personName": "Свердлова Екатерина",
                "serviceName": "Мытье головы",
                "serviceDetails": {
                    "date": "2017-04-13",
                    "start": 1494655200000,
                    "end": 1494657000000
                },
                "created": "2017-04-13 10:57:28"
            },
            {
                "id": 3,
                "user_id": 1,
                "time_work_id": 3,
                "fullName": "Иван Климов",
                "personName": "Волошина Оксана",
                "serviceName": "Мытье головы",
                "serviceDetails": {
                    "date": "2017-05-13",
                    "start": 1494664200000,
                    "end": 1494666000000
                },
                "created": "2017-04-13 10:57:28"
            },
            {
                "id": 4,
                "user_id": 1,
                "time_work_id": 4,
                "fullName": "Shi Dmi",
                "personName": "Волошина Оксана",
                "serviceName": "Мытье головы",
                "serviceDetails": {
                    "date": "2017-05-13",
                    "start": 1498140000000,
                    "end": 1498141800000
                },
                "created": "2017-04-13 10:57:28"
            },
            {
                "id": 5,
                "user_id": 1,
                "time_work_id": 5,
                "fullName": "Shi Dmi",
                "personName": "Волошина Оксана",
                "serviceName": "Мытье головы",
                "serviceDetails": {
                    "date": "2017-05-13",
                    "start": 32400,
                    "end": 34200
                },
                "created": "2017-04-13 10:57:28"
            },
            {
                "id": 6,
                "user_id": 1,
                "time_work_id": 6,
                "fullName": "Ермаков Азор",
                "personName": "Волошина Оксана",
                "serviceName": "Ботокс",
                "serviceDetails": {
                    "date": "2017-08-02",
                    "start": 1501677000000,
                    "end": 1501680600000
                },
                "created": "2017-04-13 10:57:28"
            }
        ];
    $scope.lastSessionsItems = [
            {
                "id": 2,
                "user_id": 1,
                "time_work_id": 2,
                "fullName": "Shi Dmi",
                "personName": "Волошина Оксана",
                "serviceName": "Мытье головы",
                "serviceDetails": {
                    "date": "2017-04-13",
                    "start": 1494655200000,
                    "end": 1494657000000
                },
                "created": "2017-04-13 10:57:28"
            },
            {
                "id": 3,
                "user_id": 1,
                "time_work_id": 3,
                "fullName": "Shi Dmi",
                "personName": "Волошина Оксана",
                "serviceName": "Мытье головы",
                "serviceDetails": {
                    "date": "2017-05-13",
                    "start": 1494664200000,
                    "end": 1494666000000
                },
                "created": "2017-04-13 10:57:28"
            },
            {
                "id": 4,
                "user_id": 1,
                "time_work_id": 4,
                "fullName": "Shi Dmi",
                "personName": "Волошина Оксана",
                "serviceName": "Мытье головы",
                "serviceDetails": {
                    "date": "2017-05-13",
                    "start": 32400,
                    "end": 34200
                },
                "created": "2017-04-13 10:57:28"
            },
            {
                "id": 5,
                "user_id": 1,
                "time_work_id": 5,
                "fullName": "Shi Dmi",
                "personName": "Волошина Оксана",
                "serviceName": "Мытье головы",
                "serviceDetails": {
                    "date": "2017-05-13",
                    "start": 32400,
                    "end": 34200
                },
                "created": "2017-04-13 10:57:28"
            },
            {
                "id": 6,
                "user_id": 1,
                "time_work_id": 6,
                "fullName": "Shi Dmi",
                "personName": "Волошина Оксана",
                "serviceName": "Мытье головы",
                "serviceDetails": {
                    "date": "2017-05-13",
                    "start": 32400,
                    "end": 34200
                },
                "created": "2017-04-13 10:57:28"
            },
            {
                "id": 7,
                "user_id": 1,
                "time_work_id": 2,
                "fullName": "Shi Dmi",
                "personName": "Волошина Оксана",
                "serviceName": "Мытье головы",
                "serviceDetails": {
                    "date": "2017-04-13",
                    "start": 1494655200000,
                    "end": 1494657000000
                },
                "created": "2017-04-13 10:57:28"
            },
            {
                "id": 8,
                "user_id": 1,
                "time_work_id": 3,
                "fullName": "Shi Dmi",
                "personName": "Волошина Оксана",
                "serviceName": "Мытье головы",
                "serviceDetails": {
                    "date": "2017-05-13",
                    "start": 1494664200000,
                    "end": 1494666000000
                },
                "created": "2017-04-13 10:57:28"
            },
            {
                "id": 9,
                "user_id": 1,
                "time_work_id": 4,
                "fullName": "Ирина Бешлей",
                "personName": "Волошина Оксана",
                "serviceName": "Маникюр",
                "serviceDetails": {
                    "date": "2017-05-13",
                    "start": 1494655200000,
                    "end": 34200
                },
                "created": "2017-04-13 10:57:28"
            },
            {
                "id": 10,
                "user_id": 1,
                "time_work_id": 5,
                "fullName": "Shi Dmi",
                "personName": "Волошина Оксана",
                "serviceName": "Мытье головы",
                "serviceDetails": {
                    "date": "2017-05-13",
                    "start": 32400,
                    "end": 34200
                },
                "created": "2017-04-13 10:57:28"
            },
            {
                "id": 11,
                "user_id": 1,
                "time_work_id": 6,
                "fullName": "Shi Dmi",
                "personName": "Волошина Оксана",
                "serviceName": "Мытье головы",
                "serviceDetails": {
                    "date": "2017-05-13",
                    "start": 32400,
                    "end": 34200
                },
                "created": "2017-04-13 10:57:28"
            }
        ];
        //$scope.sessionsToShow = $scope.impendingSessionsItems;
        //$scope.menuObj = data;
        $scope.lastSessions = function () {
            $scope.cansellation = false;
            $scope.forRendering($scope.lastSessionsItems);
        };
        $scope.impendingSessions = function () {
            $scope.cansellation = true;
            $scope.forRendering($scope.impendingSessionsItems);
        };

        $scope.impendingSessions();

    }]);