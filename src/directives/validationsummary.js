ngValidationSummary.directive('validationsummary', [function () {
    return {
        restrict: "A",
        require: "^validationsContainer",
        templateUrl: './src/directives/validationsummary.html',

        link: function (scope, element, attr, ctrl) {
            var valContainer = ctrl;
            
            scope.validationsSummary = valContainer.getValidationMessages();

        }
    };
}]);
