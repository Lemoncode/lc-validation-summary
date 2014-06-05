var sampleApp = angular.module('sampleApp', ['ngValidationSummary'])

.controller('sampleController', ['$scope', function sampleController($scope){	
	$scope.model = {
		alias:"",
		password:"",
		email:"",
		phoneNumber:""
	}
}]);