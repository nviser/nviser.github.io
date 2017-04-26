angular.module('BeautySalon')
    .factory('authService', ['$resource','api', function ($resource, api) {
        var token;
        var obj = {
            auth: function (phone) {
                var z;
                console.log('go');
                var http = new XMLHttpRequest();
                var url = "http://belisimo.dev-topsu.ru/v1/auth";
                var params = "phone=" + phone;
                http.open("POST", url, true);

                //Send the proper header information along with the request
                http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

                http.onreadystatechange = function() {//Call a function when the state changes.
                    if(http.readyState == 4 && http.status == 200) {
                        z = http.responseText;
                        return z;
                    }
                }
                http.send(params);
                return http.onreadystatechange();            }
        }
        
        return obj;
        /*$resource(api + ':action', {}, {
            auth: {method: 'POST', params: {action: 'v1/auth', phone: '@phone', type: '@type'}},
            save: {method: 'PUT', params: {action: 'UdpateStaff'}},
            create: {method: 'POST', params: {action: 'CreateStaff'}},
            remove: {method: 'DELETE', params: {action: 'DeleteStaff'}}*/
        //});
    }]);