angular.module('ngValidationSummary').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('./src/directives/ngValidationSummary.html',
    "<div class='validation-summary-box' ng-show='validationsSummary.length>0'>\n" +
    "  <div class=\"summaryTitle\">\n" +
    "    <h4>Please review the following fields:</h4>\n" +
    "  </div>\n" +
    "  <ul id=\"errorListContainer\">\n" +
    "    <li ng-repeat='item in validationsSummary'>{{item.errorMessage}}</li>\n" +
    "  </ul>\n" +
    "</div>"
  );

}]);
