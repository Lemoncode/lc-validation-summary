var sampleApp = angular.module('sampleApp', ['lcValidationSummary'])

.controller('sampleController', ['$scope', function sampleController($scope){	
  $scope.model = {
    nickName:"",
    password:"",
    email:"",
    phoneNumber:""
  }
}]);