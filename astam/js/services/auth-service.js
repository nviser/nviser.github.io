angular.module('BeautySalon')
    .factory('authService', ['$resource','api', function ($resource, api) {
        return $resource(api + ':action', {}, {
            auth: {method: 'POST', params: {action: 'v1/auth', phone: '@phone', type: '@type'}},
            /*save: {method: 'PUT', params: {action: 'UdpateStaff'}},
            create: {method: 'POST', params: {action: 'CreateStaff'}},
            remove: {method: 'DELETE', params: {action: 'DeleteStaff'}}*/
        });
    }]);