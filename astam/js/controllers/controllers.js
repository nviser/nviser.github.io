angular.module('beautySalon.controllers')

    .controller('MainCtrl',['$scope', 'getData', function ($scope, getData) {

        $scope.branches = getData.branches(); //get salons from back-end


        /*----------choose one of salons-----------*/

        $scope.chooseBranch = function (item) {
            if (item) {
                angular.forEach($scope.branches, function (value, key) {
                    if (value.id == item.id) {
                        value.checked = true;
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
            
        ymaps.ready(init);

        function init() {
            myMap = new ymaps.Map("map", {
                center: [$scope.branches[1].lat, $scope.branches[1].long],
                zoom: 9,
                controls: []
            });

        angular.forEach($scope.branches, function(val, key) {
            myMap.geoObjects.add(
                    new ymaps.Placemark([val.lat, val.long], {
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

        $scope.services = getData.services(); //get services from back-end

        $scope.divider = function(array) {
            var n, arr1, arr2, arr3;
            if(array.length) {
                n = Math.ceil(array.length/3)
                arr1 = array.slice(0, n);
                arr2 = array.slice(n, 2*n);
                arr3 = array.slice(2*n, 3*n);
            }
            return [arr1, arr2, arr3];
        }

        $scope.services1 = $scope.divider($scope.services)[0];
        $scope.services2 = $scope.divider($scope.services)[1];
        $scope.services3 = $scope.divider($scope.services)[2];


        $scope.open = false;

        $scope.chooseService = function(service, event) {                   // func highlights clicked service
            var clickedEl;
            if(event.target.classList.contains('choose-service__item')){    //for existing item
                clickedEl = event.target;                                   //if clicked at div
            } else {
                clickedEl = event.target.parentNode;                        //if clicked at i
            }
            if(document.querySelector('.choose-service__active')){          //deselection previously selected divs
                document.querySelector('.choose-service__active').classList.remove('choose-service__active');
            }
            if(document.querySelector('.fa-angle-up')){                     //turn all angles-up to angles-down
                var el = document.querySelector('.fa-angle-up');
                el.classList.remove('fa-angle-up');
                el.classList.add('fa-angle-down');
            }
            angular.forEach($scope.services, function (val, key) {          //for selection clicked div
            if(service.id == val.id){
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

        $scope.choose = function(service, event) {
            angular.forEach($scope.innerServices, function(val, key) {
                if(service && service.id == val.id) {
                    val.checked = true;
                    $scope.sum = val.price;
                    $scope.choise = val.name;
                    sessionStorage.setItem('sum', $scope.sum);
                    sessionStorage.setItem('choise', $scope.choise);
                    $scope.getData();
                    console.log('if');
                } else {
                    val.checked = false;
                    console.log('else');
                }
            })
        
        }


        var pickedTime = document.querySelectorAll('.time-block');
        for (var i = 0, len = pickedTime.length; i < len; i++) {
            pickedTime[i].addEventListener('click', function (event) {
                $scope.pickedTime = event.target.innerText;
                if (document.querySelector('.choose-date__active')) {
                    document.querySelector('.choose-date__active').classList.remove('choose-date__active');
                }
                event.target.classList.add('choose-date__active');
                sessionStorage.setItem('time', $scope.pickedTime);
                $scope.getData();
                $scope.$apply();
            });
        }

        $scope.months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
        $scope.refresh = function () {
            var pickedDate = document.querySelectorAll('.pickDate');
            for (var i = 0, len = pickedDate.length; i < len; i++) {
                pickedDate[i].addEventListener('click', function (event) {
                    $scope.pickDate = event.target.innerText;
                    if(document.querySelector('.choose-date__date-active')) {
                        document.querySelector('.choose-date__date-active').classList.remove('choose-date__date-active');
                    }
                    event.target.classList.add('choose-date__date-active');
                    $scope.pickYear = document.querySelector('#calendar2 thead td:nth-child(2)').dataset.year;
                    $scope.pickMonth = $scope.months[parseInt(document.querySelector('#calendar2 thead td:nth-child(2)').dataset.month)];
                    sessionStorage.setItem('date', $scope.pickDate + ' ' + $scope.pickMonth);
                    $scope.getData();
                    $scope.$apply();
                });
            }
        }
        window.onload = function () {
            $scope.refresh();
        }


        var pickedSpec = document.querySelectorAll('.choose-spesialist_wrap');
        for (var i = 0, len = pickedSpec.length; i < len; i++) {
            pickedSpec[i].addEventListener('click', function (event) {
                $scope.pickedSpec = event.target.children[0].innerText;
                sessionStorage.setItem('spec', $scope.pickedSpec);
                if (document.querySelector('.choose-spesialis_active')) {
                    document.querySelector('.choose-spesialis_active').classList.remove('choose-spesialis_active');
                }
                event.target.parentNode.parentNode.classList.toggle('choose-spesialis_active');
                $scope.getData();
                $scope.$apply();
            });
        }
        /*---------CAlendar-----------*/

        function Calendar2(id, year, month) {
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
                if (i == new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()) {
                    calendar += '<td class="today pickDate">' + i;
                } else {
                    calendar += '<td class="pickDate">' + i;
                }
                if (new Date(D.getFullYear(), D.getMonth(), i).getDay() == 0) {
                    calendar += '<tr>';
                }
            }
            for (var i = DNlast; i < 7; i++) calendar += '<td>&nbsp;';
            document.querySelector('#' + id + ' tbody').innerHTML = calendar;
            document.querySelector('#' + id + ' thead td:nth-child(2)').innerHTML = month[D.getMonth()] + '<br>' + D.getFullYear();
            document.querySelector('#' + id + ' thead td:nth-child(1)').innerHTML = month[D.getMonth() === 0 ? 11 : D.getMonth() - 1] + '<br>' + (D.getMonth() === 0 ? D.getFullYear() - 1 : D.getFullYear());
            document.querySelector('#' + id + ' thead td:nth-child(3)').innerHTML = month[D.getMonth() === 11 ? 0 : D.getMonth() + 1] + '<br>' + (D.getMonth() === 11 ? D.getFullYear() + 1 : D.getFullYear());
            document.querySelector('#' + id + ' thead td:nth-child(2)').dataset.month = D.getMonth();
            document.querySelector('#' + id + ' thead td:nth-child(2)').dataset.year = D.getFullYear();
            if (document.querySelectorAll('#' + id + ' tbody tr').length < 6) {  // чтобы при перелистывании месяцев не "подпрыгивала" вся страница, добавляется ряд пустых клеток. Итог: всегда 6 строк для цифр
                document.querySelector('#' + id + ' tbody').innerHTML += '<tr><td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;';
            }
        }
        Calendar2("calendar2", new Date().getFullYear(), new Date().getMonth());
        // переключатель минус месяц
        document.querySelector('#calendar2 thead tr:nth-child(1) td:nth-child(1)').onclick = function () {
            Calendar2("calendar2", document.querySelector('#calendar2 thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar2 thead td:nth-child(2)').dataset.month) - 1);
            $scope.refresh();
        }
        // переключатель плюс месяц
        document.querySelector('#calendar2 thead tr:nth-child(1) td:nth-child(3)').onclick = function () {
            Calendar2("calendar2", document.querySelector('#calendar2 thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar2 thead td:nth-child(2)').dataset.month) + 1);
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

        $scope.correct = function () {
            $scope.address = null;
            $scope.sum = null;
            $scope.choise = null;
            $scope.pickedTime = null;
            $scope.pickedDate = null;
            $scope.pickedSpec = null;
            $scope.chooseBranch(null);
            $scope.choose(null);
            document.querySelector('.choose-service__choose-active').classList.remove('choose-service__choose-active');
            document.querySelector('.choose-service__active').classList.remove('choose-service__active');
            document.querySelector('.choose-spesialis_active').classList.remove('choose-spesialis_active');
            document.querySelector('.choose-date__date-active').classList.remove('choose-date__date-active');
            document.querySelector('.choose-date__active').classList.remove('choose-date__active');
            console.log('choose');
        }


    }]);


