lcValidationSummary.directive('lcValidationSummary', [function () {
	return {
		restrict: "A",
		require: "^lcValidationsContainer",
		templateUrl: './src/directives/lcValidationSummary.html',

		link: function (scope, element, attr, ctrl) {
			var valContainer = ctrl;
			scope.validationsSummary = valContainer.getValidationMessages();
		}
	};
}]);
