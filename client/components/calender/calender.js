import compontents from '../module';

class CalenderCtrl {

    viewGoogleCalender() {
        
    }


}

compontents.component('calender', {
    templateUrl: 'client/components/calender/calender.html',
    controller: [CalenderCtrl],
    bindings: {
        planning: '='
    }
});