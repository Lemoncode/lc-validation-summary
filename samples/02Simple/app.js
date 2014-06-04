var sampleApp = angular.module('sampleApp', ['ngValidationSummary'])

.config(['validationContainerServiceProvider', function(validationContainerServiceProvider){

    validationContainerServiceProvider.addValidation({ type: 'checktwofieldsmatch', friendlyDescription: 'The fields do not match' });

}])



.controller('sampleController', ['$scope', function sampleController($scope){	
	$scope.model = {
		email:"",
		confirmationEmail:""
	}
}])


.directive('checktwofieldsmatch', function () {

    return {
        require: ["ngModel", "^form"],
        scope: {
            fieldtomatchmodelproperty: '@',
            fieldtomatch: '='
        },

        link: function (scope, elm, attrs, ctrl) {
            var currentControl = ctrl[0];
            var currentForm = ctrl[1];

            var emailMustMatch = function (email, confirmEmail) {
                return (email === confirmEmail);
            };

            currentControl.$parsers.unshift(function (viewValue) {
                if (typeof (viewValue != "undefined")) {
                    currentControl.$setValidity('checktwofieldsmatch', emailMustMatch(scope.fieldtomatch, viewValue));
                }
                return viewValue;
            });

            var propertyToWatch = scope.fieldtomatchmodelproperty;
            scope.$parent.$watch(propertyToWatch, function (value, lastValue) {
                if (typeof (currentControl.$viewValue != "undefined")) {
                    currentControl.$setValidity('checktwofieldsmatch', emailMustMatch(value, currentControl.$viewValue));
                }
            });
        }
    };
});


