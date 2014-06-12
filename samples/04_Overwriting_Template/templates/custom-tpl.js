angular.module('ngValidationSummary').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('./src/directives/ngValidationSummary.html',
    "<div class='validation-summary-box'\n" +
    "        ng-show='validationsSummary.length>0'\n" +
    "    >\n" +
    "    <div class=\"jumbotron summaryTitle voffset4\">\n" +
    "        <h4>Please review the following fields:</h4>\n" +
    "    </div>\n" +
    "    <div class=''>\n" +
    "        <div class=\"boxStyle\">\n" +
    "            <ul>              \n" +
    "                <li ng-repeat='item in validationsSummary'>{{item.errorMessage}}</li>                                \n" +
    "            </ul>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "    \n"
  );

}]);