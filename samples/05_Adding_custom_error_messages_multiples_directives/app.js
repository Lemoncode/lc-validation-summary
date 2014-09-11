var multipleCustomErrorMessagesApp = angular.module('multipleCustomErrorMessagesApp', ['ngValidationSummary'])
.controller('multipleCustomErrorMessagesController',['$scope', 
	function multipleCustomErrorMessagesController($scope){
		$scope.model = {
			name: '', //Jhon
			alias: '',//LongJhon
			email: '',//jhon.long@lemoncode.net
			phoneNumber: null //9026780
		}

		$scope.customMessages = [
			{ name: 'required', value: "The name is required, you don't know nothing, Jon Snow." },
			{ name: 'minlength', value: "The minimun length is 3, you don't know nothing, Jon Snow."}
		];
	}
]);