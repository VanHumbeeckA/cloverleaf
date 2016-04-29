import angular from 'angular';
import components from '../../components/module';

components.directive('backImg', function(){
    return function(scope, element, attrs){
        var url = attrs.backImg;
        console.log(url);
        element.css({
            'background-image': 'url(' + url +')',
            'background-size' : 'cover'
        });
    };
});