var sampleApp = angular.module('sampleApp', [])

.controller('sampleController', ['$scope', function sampleController($scope){
	$scope.testBinding = "test";

	$scope.model = {
		name: 'John',
		lastname: 'Doe'
	}
}]);