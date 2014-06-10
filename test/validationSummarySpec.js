describe('validationSummary test', function () {

	var scope;
	var compile;

	beforeEach(function(){

		module('ngValidationSummary');

		inject(function($compile, $rootScope){
			scope = $rootScope.$new();
			compile = $compile;
		});

	});

	it('', function(){
		// Arrange
		var html = 
		"<div validations-container=''>" +
		"<div ng-init='personName=Peter'>" +
		"<form name='personInformation'>"+
		"<input type='text' id='personName' name='personName' ng-model='person.name'"+
		"ng-required='true' validationbubble='' friendlyname='Name'/>"+
		"</form>"+
		"</div>" +
		"</div>" +
		"</div>" +
		"<div id='validationBox' validationsummary=''></div>";
		var element = angular.element(html);
		// Act
		var compiled = compile(element)(scope);
		scope.$digest(); 

		// Assert
		expect(element[1].find('#validationBox').length).toBe(1);
	});

});