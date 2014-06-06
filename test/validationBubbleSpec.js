describe('validationBubble test', function () {

	var compile;
	var scope;
	var html;
	var checkException;


	beforeEach(function(){
    	// Load ngValidationSummaryApp
    	module('ngValidationSummary');

    	// Load $compale and $rootScope modules
    	inject(function($compile, $rootScope){

    		checkException = function(html)
    		{
    			scope = $rootScope.$new();
    			$compile(angular.element(html))(scope);
    		}

    	});
    });

	

	it("shouldn't throw any exception when the html is well formed and no field is missing", function(){

		html = 	
		'<form name=personInformation>'+
		'<input type="text" id="personName" name="personName" ng-model="fields.personName"'+
		'validationbubble="" friendlyname="Name"/'>+
		'</form>';

		expect(checkException(html));

	});

	it("should trhow an exception when form name is missing", function(){

		// Html missing form name
		html =
		'<div validations-container="">'+
		'<form>'+
		'<input type="text" id="personName" name="personName" ng-model="fields.personName"'+
		'validationbubble="" friendlyname="Name"/>'+
		'</form>'+
		'</div>';
		var message="";

		try{
			checkException(html);
		}
		catch(err){
			message=err;
		}
		expect(message).toEqual("validationbubble requires that a name is assigned to the ng-form containing the validated input");

	});

	it("should trhow an exception when attr.name is missing", function(){

		// Html missing form name
		html =
		'<div validations-container="">'+
		'<form name="formName">'+
		'<input type="text" id="personName" ng-model="fields.personName"'+
		'validationbubble="" friendlyname="Name"/>'+
		'</form>'+
		'</div>';
		var message="";

		try{
			checkException(html);
		}
		catch(err){
			message=err;
		}
		expect(message).toEqual("validationbubble must be set on an input element that has a 'name' attribute");

	});

	it("parameters passed to updateValidationResult are correct when modifying form.formName.model.personName.$valid in a correct html code", function(){

		angular.module('ngValidationSummary').directive('validationbubble')

	});


	// beforeEach(function(){
	// 	module("app");
	// 	inject(function($compile, $rootScope){
	// 		scope = $rootScope;
	// 		element=angular.element("<div>{{2+2}}</div>")
	// 		$compile(element)($rootScope)

	// 	})

	// });

	// it("should equal 4", function(){
	// 	scope.$digest();
	// 	expect(element.html()).toEqual("4");

	// })

	// describe("when a control doesnt have any validation set, the method 'extractValidations'",function(){	
	// 	it('should return an empty array',function(){

	// 		// Arrange
	// 		var $injector =angular.injector(['ng','ngValidationSummary']);
	// 		var validationContainerService = $injector.get('validationContainerService');

	// 		// Act
	// 		var ctrl = { $error:{} };
	// 		var validations = validationContainerService.extractValidations(ctrl);

	// 		//Assert
	// 		expect(validations).toEqual([]);

	// 	});

	// });

});