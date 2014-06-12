ngValidationSummary.provider('validationContainerService', function () {

    var supportedValidations = [
    {
        type: 'required',
        friendlyDescription: "this field is mandatory"
    },
    {
        type: 'pattern',
        friendlyDescription: "this field doesn't match the pattern set"
    },
    {
        type: 'maxlength',
        friendlyDescription: "this field exceeds the maximum length"
    },
    {
        type: 'minlength',
        friendlyDescription: "this field doesn't reach the minimum length"
    }
    ];

    return {
        removeDefaultSupportedValidations: function() {
            supportedValidations = [];
        },

        addValidation: function(validation) {
            if(validation.type!='undefined'&& validation.friendlyDescription!='undefined'){
                supportedValidations.push(validation);
            }
        },

        $get: ['$log',function($log) {

            function buildValidationItem(validationType, passValidation) {
                var validationItem = {};

                validationItem.validationType = validationType;
                validationItem.passValidation = passValidation;

                return validationItem;
            }

            return {
                extractValidations: function(elementModel) {
                    var validations = [];
                    var validationItem = null;

                    if(typeof elementModel.$error == 'undefined'){
                        $log.warn('The validationBubble has been set to an element with no $error property');
                        return validations;
                    };

                    angular.forEach(supportedValidations, function(supportedValidation, key) {
                        var validationType = supportedValidation.type;
                        if (typeof elementModel.$error[validationType] !== 'undefined') {
                            validationItem = buildValidationItem(validationType,
                                (elementModel.$error[validationType] == false));

                            validations.push(validationItem);
                        }
                    });

                    return validations;
                },

                buildValidationKey: function(controlName, validationType) {
                    return controlName + "$" + validationType;
                },

                buildValidationFriendlyMessage: function(controlFriendlyName, validation) {
                    var validationText = controlFriendlyName + ": ";

                    var validationsLength = supportedValidations.length;
                    var currentIndex = 0;
                    for (currentIndex = 0; currentIndex < validationsLength; currentIndex++) {
                        var currentValidation = supportedValidations[currentIndex];
                        if (validation == currentValidation.type) {
                            validationText += currentValidation.friendlyDescription;
                            break;
                        }
                    }

                    return validationText;
                },

                buildValidationSummaryEntry: function(validationKey, controlFriendlyName, validation, validationCustomErrorDirective, validationCustomErrorMessage) {
                    var item = {};

                    item.key = validationKey;

                    if(typeof validationCustomErrorDirective != 'undefined' && validationCustomErrorDirective == validation) {
                        item.errorMessage = validationCustomErrorMessage;    
                    } else {
                        item.errorMessage = this.buildValidationFriendlyMessage(controlFriendlyName, validation);    
                    }
                    
                    return item;
                }
            };
        }]
    };
});
