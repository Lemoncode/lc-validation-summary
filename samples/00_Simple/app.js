var sampleApp = angular.module('simmpleValidationApp', ['ngValidationSummary'])

.controller('simmpleValidationController', ['$scope', function sampleController($scope){	
	$scope.model = {
		name: 'John',
		lastname: 'Doe'
	}
}]);