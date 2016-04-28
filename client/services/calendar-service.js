var myModule = angular.module('cloverleaf', []);


myModule.service('calendar-service', function() {
    var accessToken = 
    this.getCalendar = function ($http){
        var options = {
            method: 'GET',
            url: 'https://www.googleapis.com/calendar/v3/users/me/calendarList',
            data: 'Authorization: Bearer '
        }

        $http({

        });
    }
});