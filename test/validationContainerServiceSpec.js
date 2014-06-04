describe('validationContainerService test', function () {

	var validationContainerServiceProviderTest;

	beforeEach(function () {
        // Initialize the service provider 
        // by injecting it to a fake module's config block
        var fakeModule = angular.module('ngValidationSummary');

        fakeModule.config(['validationContainerServiceProvider', function(validationContainerServiceProvider){
        	validationContainerServiceProviderTest = validationContainerServiceProvider;
        }

        ]);
        // Initialize test.app injector
        //module('app.config', 'ngValidationSummary');

        // Kickstart the injectors previously registered 
        // with calls to angular.mock.module
        //inject(function () {});
    });

    describe('extractValidations with default validations', function(){
    	it('should return an empty array when the control has no validation set', function(){
    		var ctrl;
    		var validations = validationContainerServiceProviderTest.$get().extractValidations(ctrl);
    		//expect(validations).toEqual([]);
    	});
    });
});