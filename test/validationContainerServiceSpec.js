describe('validationContainerService test', function () {

	var validationContainerServiceProviderTest;

	beforeEach(function () {
        // Initialize the service provider 
        // by injecting it to a fake module's config block
        var fakeModule = angular.module('test.app.config', function () {});
        fakeModule.config( function(validationContainerServiceProvider)
        	validationContainerServiceProviderTest = validationContainerServiceProvider;

        );
        // Initialize test.app injector
        module('app.config', 'test.app.config');

        // Kickstart the injectors previously registered 
        // with calls to angular.mock.module
        inject(function () {});
    });

    describe('', function(){
    	it('', function(){

    	});
    });
});