ngValidationSummary.directive('validationsummary', [function () {
    return {
        restrict: "A",
        require: "^validationsContainer",
        templateUrl: 'app/common/directives/validationsummary.html',

        link: function (scope, element, attr, ctrl) {
            var valContainer = ctrl;
            var currentSection = parseInt(attr.currentsection);

            scope.currentsection = currentSection;
            scope.validationsSummary = valContainer.getValidationMessages();

        }
    };
}]);
