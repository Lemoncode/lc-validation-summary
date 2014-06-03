ngValidationSummary.directive('validationbubble', function () {

    var checkDirectivePrerequisites = function (attr, form, validationsContainer) {
        if (!attr.name) {
            throw "validationbubble must be set on an input element that has a 'name' attribute";
        }

        if (!attr.friendlyname) {
            throw "validationbubble must define a 'friendlyname' attribute for the control (this friendly name will be displayed in the validationSummary)";
        }


        if (!form || !form.$name) {
            throw "validationbubble requires that a name is assigned to the ng-form containing the validated input";
        }

        if (!validationsContainer) {
            throw "validationsContainer directive not found";
        }

    };

    return {
        require: ['ngModel', '^form', "^validationsContainer"],
        restrict: "A",

        link: function (scope, element, attr, ctrls) {
            var model = ctrls[0];
            var form = ctrls[1];        
            var validationsContainer = ctrls[2];
            var friendlyname = attr.friendlyname;
            var customerrordirective =  attr.customerrordirective;
            var customerrormessage = attr.customerrormessage;

            checkDirectivePrerequisites(attr, form, validationsContainer);
            
            var propertyToWatch = form.$name + "." + model.$name + ".$valid";

            scope.$watch(propertyToWatch, function (isValid, lastValue) {
                if (typeof isValid !== "undefined") {
                    validationsContainer.$updateValidationResult(model, friendlyname, customerrordirective, customerrormessage);
                }
            });
        }
    };
});