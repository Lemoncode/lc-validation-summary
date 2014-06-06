


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

});


describe('validationBubble expected behavior tests', function () {
	var compile;
	var scope;
	var html;

	beforeEach(function(){
		ngValidationSummary.directive('validationsContainer', [function () {
		    return {
		        restrict: "A",
		        link: function (scope, element, attr, ctrl) {

		        },
		        controller: ['$scope', '$element', function ($scope, $element) {
		            $scope.validationMessages = [];

		            this.getValidationMessages = function () {
		                return 
		            },
		            this.$updateValidationResult = function (ctrl, friendlyControlName, customerrordirective, customerrormessage) {
		                return
		            };
		        }]
		    };
		}]);

		
    	// Load ngValidationSummaryApp
    	module('ngValidationSummary');

    	// Load $compale and $rootScope modules
    	inject(function($compile, $rootScope){
    		 scope = $rootScope.$new();
    		 compile = $compile;
    	});



    });

	it("shouldn't throw any exception when the html is well formed and no field is missing", function(){


		// ng-required="true"
		var html = "<div ng-init='person = {name: 2}'>" +
						"<div validations-container=''>" +
							"<form name='personInformation'>"+
							"<input type='text' id='personName' name='personName' ng-model='person.name'"+
							"ng-required='true' validationbubble='' friendlyname='Name'/>"+
							"</form>" +
						"</div>" +
			       "</div>";
			       
    	compile(angular.element(html))(scope);

        //run the compiled view.
        compile(scope);

		scope.$digest();
    	scope.person.name = "test";
    	scope.$digest();
		scope.person.name = "";
		scope.$digest();

		// Assert here 
		scope.validationMessages.length > 0;
	});
});