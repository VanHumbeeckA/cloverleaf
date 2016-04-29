import angular from 'angular';
import components from '../../components/module';

components.directive('backImg', function () {
    return {
        scope: {
            url: '=backImg'
        },
        link: function (scope, element, attrs) {
            element.css({
                'background-image': 'url(' + scope.url + ')',
                'background-size': 'cover'
            });
            scope.$watch('url', (url, oldValue) => {
                if (url != oldValue) {
                    element.css({
                        'background-image': 'url(' + scope.url + ')',
                        'background-size': 'cover'
                    });
                }
            });
        }
    };
});