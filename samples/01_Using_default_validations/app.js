var sampleApp = angular.module('sampleApp', ['ngValidationSummary'])

.controller('sampleController', ['$scope', function sampleController($scope){	
  $scope.model = {
    nickName:"",
    password:"",
    email:"",
    phoneNumber:""
  }
}]);