ngValidationSummary.provider('validationContainerService', function () {
    
    var supportedValidations = [
        {
            type: 'required',
            friendlyDescription: "this field is mandatory"
        }
    ];

    return {
        removeDefaultSupportedValidations: function() {
            supportedValidations = [];
        },

        addValidation: function(validation) {
            supportedValidations.push(validation);
        },

        $get: [function() {

            function buildValidationItem(validationType, passValidation) {
                var validationItem = {};

                validationItem.validationType = validationType;
                validationItem.passValidation = passValidation;

                return validationItem;
            }

            return {
                extractValidations: function(ctrl) {
                    var validations = [];
                    var validationItem = null;

                    angular.forEach(supportedValidations, function(supportedValidation, key) {
                        var validationType = supportedValidation.type;

                        if (typeof ctrl.$error[validationType] !== 'undefined') {
                            validationItem = buildValidationItem(validationType,
                                (ctrl.$error[validationType] == false));

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

                buildValidationSummaryEntry: function(validationKey, controlFriendlyName, validation, customerrordirective, customerrormessage) {
                    var item = {};

                    item.key = validationKey;

                    if(typeof customerrordirective != 'undefined' && customerrordirective == validation) {
                        item.errorMessage = customerrormessage;    
                    } else {
                        item.errorMessage = this.buildValidationFriendlyMessage(controlFriendlyName, validation);    
                    }
                    
                    return item;
                }
            };
        }]
    };
});
