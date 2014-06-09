// =validationBubble Exception tests
describe('validationBubble Exception tests', function () {

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
		// Arrange
		html = 	
		'<div validations-container="">'+
		'<form name=personInformation>'+
		'<input type="text" id="personName" name="personName" ng-model="fields.personName"'+
		'validationbubble="" friendlyname="Name"/'>+
		'</form>'+
		'</div>';
		
		// Act & Assert
		expect(checkException(html));
	});

	it("should trhow an exception when form name is missing", function(){
		//Arrange 
		html =
		'<div validations-container="">'+
		'<form>'+
		'<input type="text" id="personName" name="personName" ng-model="fields.personName"'+
		'validationbubble="" friendlyname="Name"/>'+
		'</form>'+
		'</div>';
		var message="";

		//Act
		try{
			checkException(html);
		}
		catch(err){
			message=err;
		}

		//Assert
		expect(message).toEqual("validationbubble requires that a name is assigned to the ng-form containing the validated input");
	});

	it("should trhow an exception when attr.name is missing", function(){

		// Arrange
		html =
		'<div validations-container="">'+
		'<form name="formName">'+
		'<input type="text" id="personName" ng-model="fields.personName"'+
		'validationbubble="" friendlyname="Name"/>'+
		'</form>'+
		'</div>';
		var message="";

		// Act
		try{
			checkException(html);
		}
		catch(err){
			message=err;
		}

		// Assert
		expect(message).toEqual("validationbubble must be set on an input element that has a 'name' attribute");
	});
});
// #validationBubble Exception tests

// =validationBubble Behaviour tests
describe('validationBubble expected behavior tests', function () {
	var compile;
	var scope;
	var html;

	beforeEach(function(){
    	// Load ngValidationSummaryApp
    	module('ngValidationSummary');

    	// Load $compale and $rootScope modules
    	inject(function($compile, $rootScope){
    		 scope = $rootScope.$new();
    		 compile = $compile;
    	});
    });

	it("should generate a validation message when the validation of the input is set to 'ng-required' and the model of the field is set from dirty to blank", function(){
		// Arrange
		var html = "<div ng-init='person = {name: 2}'>" +
						"<div validations-container=''>" +
							"<form name='personInformation'>"+
							"<input type='text' id='personName' name='personName' ng-model='person.name'"+
							"ng-required='true' validationbubble='' friendlyname='Name'/>"+
							"</form>" +
						"</div>" +
			       "</div>";
		
		// Act			       
    	compile(angular.element(html))(scope);
		scope.$digest();
    	scope.person.name = "test";
    	scope.$digest();
		scope.person.name = "";
		scope.$digest();

		// Assert 
		expect(1).toEqual(scope.validationMessages.length);
	});

	it("should generate two validation messages when the validation of the input is set to 'ng-required' and 'minlength' and the model of the field is set from dirty to blank", function(){
		// Arrange
		var html = "<div ng-init='person = {name: Peter}'>" +
						"<div validations-container=''>" +
							"<form name='personInformation'>"+
							"<input type='text' id='personName' name='personName' ng-model='person.name'"+
							"ng-minlength='2' validationbubble='' friendlyname='Name'/>"+
							"</form>" +
						"</div>" +
			       "</div>";
		
		// Act			       
    	compile(angular.element(html))(scope);
		scope.$digest();
    	scope.person.name = "test";
    	scope.$digest();
		scope.person.name = "t";
		scope.$digest();

		// Assert 
		expect(1).toEqual(scope.validationMessages.length);
	});
});
// #validationBubble Behaviour tests