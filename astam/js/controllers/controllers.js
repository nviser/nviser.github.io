angular.module('beautySalon.controllers')

    .controller('MainCtrl', ['$scope', 'getData', 'authService', 'api', '$location', '$anchorScroll', '$timeout', function ($scope, getData, authService, api, $location, $anchorScroll, $timeout) {


        $scope.isModalPhone = true;
        $scope.isModalErr = false;
        $scope.resetModal = function () {
            $scope.isModalPhone = true;
            $scope.isModalErr = false;
        }

        $scope.authorization = function () {
            if ($scope.userPhone) {
                var http = new XMLHttpRequest();
                var url = api + "v1/auth";
                var params = "phone=" + $scope.userPhone;
                http.open("POST", url, true);

                //Send the proper header information along with the request
                http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

                http.onreadystatechange = function () {//Call a function when the state changes.
                    if (http.readyState == 4 && http.status == 200) {
                        $scope.result = JSON.parse(http.responseText);
                        if ($scope.result.code == 1) {
                            $scope.isModalPhone = false;
                        } else {
                            $scope.isModalErr = true;
                        }
                        $scope.$apply();
                    }
                }
                http.send(params);
            } else {

            }
        }

        $scope.sendPass = function () {
            if ($scope.userPass) {
                var http = new XMLHttpRequest();
                var url = api + "v1/auth";
                var params = "phone=" + $scope.userPhone + "&code=" + $scope.userPass;
                http.open("POST", url, true);

                //Send the proper header information along with the request
                http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

                http.onreadystatechange = function () {//Call a function when the state changes.
                    if (http.readyState == 4 && http.status == 200) {
                        $scope.token = JSON.parse(http.responseText);
                        sessionStorage.setItem('token', $scope.token.access_token);
                        $('#myModal').modal('hide');
                        $location.path("/cabinet");
                        $scope.$apply();
                    }
                }
                http.send(params);
            }
        }

        $scope.next = function () {
            $scope.first = false;
            $scope.second = false;
            $scope.third = false;
            $scope.fourth = false;
            $scope.fifth = false;
        }
        $scope.next();
        $scope.getBranches = function () {
            getData.branches().query(function (data) { //get salons from back-end
                $scope.branches = data;
                ymaps.ready(init);
            });
        }
        $scope.getBranches();

        /*----------choose one of salons-----------*/
        $scope.isBranchVis = true;
        $scope.isServiceVis = false;
        $scope.isSpecVis = false;
        $scope.isDateVis = false;
        $scope.chooseBranch = function (item) {
            if (item) {
                $scope.branchId = item.id;
                angular.forEach($scope.branches, function (value, key) {
                    if (value.id == item.id) {
                        value.checked = true;
                        $scope.first = true;
                        sessionStorage.setItem('address', value.address);
                        $scope.getData();
                    } else {
                        value.checked = false;
                    }
                })
            } else {
                var item = { id: false }
                angular.forEach($scope.branches, function (value, key) {
                    value.checked = false;
                })
            }
        };

        /*----------working with map-----------*/

        function init() {
            myMap = new ymaps.Map("map", {
                center: [$scope.branches[0].lat, $scope.branches[0].lng],
                /*center: [55.769575, 37.713935],*/
                zoom: 9,
                controls: []
            });

            angular.forEach($scope.branches, function (val, key) {
                myMap.geoObjects.add(
                    new ymaps.Placemark([val.lat, val.lng], {
                        hintContent: val.name,
                        balloonContentHeader: val.name,
                        balloonContentBody: val.address
                    }, {
                            iconLayout: 'default#image',
                            iconImageHref: 'img/placemark.png',
                            iconImageSize: [32, 37],
                            iconImageOffset: [-5, -38]
                        })
                );

            });

        }

        /*---------- end working with map-----------*/

        /*----------rendering services-----------*/
        $scope.getServices = function () {
            //if(!$scope.checkChange) $scope.checkChange = $scope.branchId;
            $scope.isBranchVis = false;
            
            $scope.second = true;
            if($scope.checkChange !== $scope.branchId){
                $scope.open = false;
                $scope.sum = null;
                $scope.choise = null;
                $scope.secondBtn = false;
                getData.services().query({ item_id: $scope.branchId }, function (data) { //get services from back-end
                    $scope.services = data;
                    $scope.divide();
                    $scope.checkChange = $scope.branchId;
                    /*$location.hash(id);
                    $anchorScroll();*/
                });
            }
            $timeout(function() {$scope.isServiceVis = true;}, 600);
        }
        $scope.backToBranches = function () {
            $scope.isServiceVis = false;             
            $timeout(function() {$scope.isBranchVis = true;}, 600);
        }
        $scope.divider = function (array) {
            var n, arr1, arr2, arr3;
            if (angular.isDefined(array.length)) {
                n = Math.ceil(array.length / 3)
                arr1 = array.slice(0, n);
                arr2 = array.slice(n, 2 * n);
                arr3 = array.slice(2 * n, 3 * n);
            }
            return [arr1, arr2, arr3];
        }
        $scope.divide = function () {
            $scope.services1 = $scope.divider($scope.services)[0];
            $scope.services2 = $scope.divider($scope.services)[1];
            $scope.services3 = $scope.divider($scope.services)[2];
        };


        $scope.open = false;

        $scope.chooseService = function (service, event) {                   // func highlights clicked service
            var clickedEl;
            if (event.target.classList.contains('choose-service__item')) {    //for existing item
                clickedEl = event.target;                                   //if clicked at div
            } else {
                clickedEl = event.target.parentNode;                        //if clicked at i
            }
            if (document.querySelector('.choose-service__active')) {          //deselection previously selected divs
                document.querySelector('.choose-service__active').classList.remove('choose-service__active');
            }
            if (document.querySelector('.fa-angle-up')) {                     //turn all angles-up to angles-down
                var el = document.querySelector('.fa-angle-up');
                el.classList.remove('fa-angle-up');
                el.classList.add('fa-angle-down');
            }
            angular.forEach($scope.services, function (val, key) {          //for selection clicked div
                if (service.id == val.id) {
                    clickedEl.classList.add('choose-service__active');
                    clickedEl.children[0].classList.toggle('fa-angle-down');
                    clickedEl.children[0].classList.toggle('fa-angle-up');
                    $scope.open = true;
                    $scope.innerServices = val.services;
                    var result = $scope.divider(val.services);
                    $scope.service1 = result[0];
                    $scope.service2 = result[1];
                    $scope.service3 = result[2];
                }

            });
        } // end $scope.chooseService func

        $scope.sum = null;
        $scope.choise = null;

        $scope.choose = function (service, event) {
            angular.forEach($scope.innerServices, function (val, key) {
                if (service && service.service_id == val.service_id) {
                    val.checked = true;
                    $scope.secondBtn = true;
                    $scope.sum = val.cost;
                    $scope.choise = val.name;
                    $scope.serviceId = val.service_id;
                    sessionStorage.setItem('serviceId', $scope.serviceId);
                    sessionStorage.setItem('sum', $scope.sum);
                    sessionStorage.setItem('choise', $scope.choise);
                    $scope.getData();
                } else {
                    val.checked = false;
                }
            })

        }

        $scope.refreshTimeBlock = function () {
            var pickedTime = document.querySelectorAll('.time-block');
            for (var i = 0, len = pickedTime.length; i < len; i++) {
                pickedTime[i].addEventListener('click', function (event) {
                    $scope.pickedTime = event.target.innerText;
                    if (document.querySelector('.choose-date__active')) {
                        document.querySelector('.choose-date__active').classList.remove('choose-date__active');
                    }
                    event.target.classList.add('choose-date__active');
                    sessionStorage.setItem('time', $scope.pickedTime);
                    $scope.thirdBtn1 = true;
                    $scope.getData();
                    $scope.$apply();
                });
            }
        }

        $scope.getAvalDate = function () {
            $scope.isSpecVis = false;
            $scope.fifth = true;
            if($scope.specId !== $scope.checkChangeSpecId){
                $scope.checkChangeSpecId = $scope.specId;
                $scope.avalTime = [];
                $scope.pickedTime = null;
                $scope.pickDate = null;
                $scope.pickMonth = null; 
                getData.availableDates().query({ item_id: $scope.branchId, service_id: $scope.serviceId, person_id: $scope.specId }, function (data) { //get services from back-end
                    $scope.specAvalTime = data;
                    $scope.Calendar2("calendar2", new Date().getFullYear(), new Date().getMonth());
                }, function (err) {
                    console.log(err.statusText + ': ' + err.status);
                }
                );
            }
            $timeout(function() {$scope.isDateVis = true;}, 600);
        }
        $scope.backToSpec = function () {
            $scope.isDateVis = false;
            $timeout(function() {$scope.isSpecVis = true;}, 600);
        }

        $scope.months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
        $scope.refresh = function () {
            var pickedDate = document.querySelectorAll('.pickDate');
            for (var i = 0, len = pickedDate.length; i < len; i++) {
                pickedDate[i].addEventListener('click', function (event) {
                    $scope.pickDate = event.target.innerText;
                    if (document.querySelector('.choose-date__date-active')) {
                        document.querySelector('.choose-date__date-active').classList.remove('choose-date__date-active');
                    }
                    event.target.classList.add('choose-date__date-active');
                    $scope.pickYear = document.querySelector('#calendar2 thead td:nth-child(2)').dataset.year;
                    $scope.pickMonth = $scope.months[parseInt(document.querySelector('#calendar2 thead td:nth-child(2)').dataset.month)];
                    $scope.curMonth = parseInt(document.querySelector('#calendar2 thead td:nth-child(2)').dataset.month);
                    sessionStorage.setItem('date', $scope.pickDate + ' ' + $scope.pickMonth);
                    //$scope.curDate = Date.parse(new Date(+$scope.pickYear, +$scope.curMonth, +event.target.innerText));
                    $scope.thirdBtn2 = true;
                    $scope.pickedTime = null;
                    $scope.thirdBtn1 = false;

                    for (var i = 0, len = $scope.specAvalTime.length; i < len; i++) {
                        if (new Date($scope.specAvalTime[i].date).getFullYear() == +$scope.pickYear &&
                            new Date($scope.specAvalTime[i].date).getMonth() == +$scope.curMonth &&
                            new Date($scope.specAvalTime[i].date).getDate() == +event.target.innerText) {
                            $scope.avalTime = $scope.specAvalTime[i].time;
                            $scope.$apply();
                            $scope.refreshTimeBlock();
                            $scope.currentDate = $scope.specAvalTime[i].date;
                            return;
                        } else {
                            $scope.avalTime = [];
                        }
                    }
                    $scope.getData();
                    $scope.$apply();
                });
            }
        }

        $scope.pickedTimeRange = function (arg) { //pick selected time range (format s e.g 14300)
            $scope.pickedTimeSend = arg;
        }

        $scope.nextToSend = function () {
            $scope.isDateVis = false;
            $scope.thirdBtn1 && $scope.thirdBtn2 ? $timeout(function() {$scope.fourth = true;}, 600) : $scope.fourth = false;
        }
        $scope.backToDate = function () {
            $scope.fourth = false; 
            $timeout(function() {$scope.isDateVis = true;}, 600);
        }
        $scope.getSpecialists = function () {
            $scope.isServiceVis = false;
            $scope.third = true;
            if($scope.checkChangeService !== $scope.serviceId){
                $scope.checkChangeService = $scope.serviceId;
                $scope.pickedSpec = null;
                $scope.fourthBtn = false;
                getData.specialists().query({ item_id: $scope.branchId, service_id: $scope.serviceId }, function (data) { //get spec from back-end
                    $scope.specialists = data;
                });
            }
            $timeout(function () {$scope.isSpecVis = true;}, 600);
            /*console.log($scope.third, $scope.sum, $scope.choise, $scope.isSpecVis);*/
        }
        $scope.backToServices = function() {
            $scope.isSpecVis = false;
            $timeout(function () {$scope.isServiceVis = true;}, 600); 
        }

        $scope.chooseSpecialist = function (spec, event) {
            angular.forEach($scope.specialists, function (val, key) {
                if (spec && spec.id == val.id) {
                    val.checked = true;
                    $scope.pickedSpec = val.fullName;
                    $scope.specId = val.id;
                    sessionStorage.setItem('specId', $scope.specId);
                    sessionStorage.setItem('spec', $scope.pickedSpec);
                    $scope.fourthBtn = true;
                } else {
                    val.checked = false;
                }
            })

        }

        /*---------CAlendar-----------*/

        $scope.Calendar2 = function (id, year, month) {
            var Dlast = new Date(year, month + 1, 0).getDate(),
                D = new Date(year, month, Dlast),
                DNlast = new Date(D.getFullYear(), D.getMonth(), Dlast).getDay(),
                DNfirst = new Date(D.getFullYear(), D.getMonth(), 1).getDay(),
                calendar = '<tr>',
                month = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
            if (DNfirst != 0) {
                for (var i = 1; i < DNfirst; i++) calendar += '<td>';
            } else {
                for (var i = 0; i < 6; i++) calendar += '<td>';
            }
            for (var i = 1; i <= Dlast; i++) {
                var count = 0; //variable for determining either available date or not (0 unavailable)
                angular.forEach($scope.specAvalTime, function (val, key) {
                    if (new Date(val.date).getDate() == i && D.getFullYear() == new Date(val.date).getFullYear() && D.getMonth() == new Date(val.date).getMonth()) {
                        count = 1;
                    }
                })
                if (i == new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth() && count) {
                    calendar += '<td class="today pickDate available">' + i;
                } else if (i == new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth() && !count) {
                    calendar += '<td class="today pickDate">' + i;
                } else if (count) {
                    calendar += '<td class="pickDate available">' + i;
                } else {
                    calendar += '<td class="pickDate">' + i;
                }
                if (new Date(D.getFullYear(), D.getMonth(), i).getDay() == 0) {
                    calendar += '<tr>';
                }
            }
            for (var i = DNlast; i < 7; i++) calendar += '<td>&nbsp;';
            document.querySelector('#' + id + ' tbody').innerHTML = calendar;
            document.querySelector('#' + id + ' thead td:nth-child(2)').innerHTML = month[D.getMonth()] + '<br>' + '<p>' + D.getFullYear() + '</p>';
            document.querySelector('#' + id + ' thead td:nth-child(1)').innerHTML = month[D.getMonth() === 0 ? 11 : D.getMonth() - 1] + '<br>' + '<i class="fa fa-angle-left" aria-hidden="true"></i>' + (D.getMonth() === 0 ? D.getFullYear() - 1 : D.getFullYear());
            document.querySelector('#' + id + ' thead td:nth-child(3)').innerHTML = month[D.getMonth() === 11 ? 0 : D.getMonth() + 1] + '<br>' + '<i class="fa fa-angle-right" aria-hidden="true"></i>' + (D.getMonth() === 11 ? D.getFullYear() + 1 : D.getFullYear());
            document.querySelector('#' + id + ' thead td:nth-child(2)').dataset.month = D.getMonth();
            document.querySelector('#' + id + ' thead td:nth-child(2)').dataset.year = D.getFullYear();
            if (document.querySelectorAll('#' + id + ' tbody tr').length < 6) {  // чтобы при перелистывании месяцев не "подпрыгивала" вся страница, добавляется ряд пустых клеток. Итог: всегда 6 строк для цифр
                document.querySelector('#' + id + ' tbody').innerHTML += '<tr><td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;';
            }
            $scope.refresh();
        }

        // переключатель минус месяц
        document.querySelector('#calendar2 thead tr:nth-child(1) td:nth-child(1)').onclick = function () {
            $scope.Calendar2("calendar2", document.querySelector('#calendar2 thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar2 thead td:nth-child(2)').dataset.month) - 1);
            $scope.refresh();
        }
        // переключатель плюс месяц
        document.querySelector('#calendar2 thead tr:nth-child(1) td:nth-child(3)').onclick = function () {
            $scope.Calendar2("calendar2", document.querySelector('#calendar2 thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar2 thead td:nth-child(2)').dataset.month) + 1);
            $scope.refresh();
        }

        $scope.getData = function () {
            $scope.address = sessionStorage.getItem('address');
            $scope.totalSum = sessionStorage.getItem('sum');
            $scope.totalService = sessionStorage.getItem('choise');
            $scope.totalTime = sessionStorage.getItem('time');
            $scope.totalDate = sessionStorage.getItem('date');
            $scope.totalSpec = sessionStorage.getItem('spec');
        }

        $scope.startOver = function () {
            $timeout(function() {$scope.isBranchVis = true;}, 600);
            $scope.fourth = false;
        }
        $scope.correct = function () {
            $timeout(function() {$scope.isBranchVis = true;}, 600);
            /*$scope.isServiceVis = true;
            $scope.isSpecVis = true;
            $scope.isDateVis = true;*/
            $scope.address = null;
            $scope.sum = null;
            $scope.choise = null;
            $scope.pickedTime = null;
            $scope.avalTime = [];
            $scope.pickDate = null;
            $scope.pickedSpec = null;
            $scope.chooseBranch(null);
            $scope.choose(null);
            $scope.next();
            $scope.open = false;
            $scope.first = false;
            $scope.secondBtn = false;
            $scope.thirdBtn1 = false;
            $scope.thirdBtn2 = false;
            $scope.fourthBtn = false;
            document.querySelector('.choose-service__choose-active').classList.remove('choose-service__choose-active');
            document.querySelector('.choose-service__active').classList.remove('choose-service__active');
            document.querySelector('.choose-spesialis_active').classList.remove('choose-spesialis_active');
            document.querySelector('.choose-date__date-active').classList.remove('choose-date__date-active');
            document.querySelector('.choose-date__active').classList.remove('choose-date__active');
            if (document.querySelector('.fa-angle-up')) {                     //turn all angles-up to angles-down
                var el = document.querySelector('.fa-angle-up');
                el.classList.remove('fa-angle-up');
                el.classList.add('fa-angle-down');
            }
            $scope.firstName = '';
            $scope.userPhone2 = '';
            $scope.userEmail = '';
            $scope.branch.checked = false;
            $scope.reminder = 'За 1 час до визита';
        }

        $scope.reminderArr = ['За 1 час до визита', 'За 2 часа до визита', 'За 3 часа до визита', 'За 4 часа до визита'];
        $scope.reminder = $scope.reminderArr[0];
        $scope.sendForm = function () {
            $scope.serviceId = sessionStorage.getItem('serviceId');
            $scope.specId = sessionStorage.getItem('specId');
            var http = new XMLHttpRequest();
            var url = api + "v1/orders";
            var params = "first_name=" + $scope.firstName + "&last_name=" + "&phone=" + $scope.userPhone2 + "&email=" + $scope.userEmail + "&service_id=" + $scope.serviceId + "&person_id=" + $scope.specId + "&date=" + $scope.currentDate + "&start=" + $scope.pickedTimeSend + "&reminder=" + $scope.reminder;
            http.open("POST", url, true);

            //Send the proper header information along with the request
            http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

            http.onreadystatechange = function () {//Call a function when the state changes.
                if (http.readyState == 4 && http.status == 200) {
                    //$scope.result = JSON.parse(http.responseText);
                    //sessionStorage.setItem('token', $scope.result.access_token);
                    //$('#myModal').modal('hide');
                    //$location.path("/cabinet");
                    //$scope.$apply();
                }
            }
            http.send(params);
        }
    }]);


