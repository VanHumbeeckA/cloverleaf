import compontents from '../module';

class CalenderCtrl {


    needFood() {
        alert('need food!');
    }

}

compontents.component('calender', {
    templateUrl: 'client/components/calender/calender.html',
    controller: [CalenderCtrl],
    bindings: {
        planning: '='
    }
});