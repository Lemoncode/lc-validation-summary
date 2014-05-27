ngValidationSummary.animation('.animate-repeat', function () {
    return {

        enter: function (element, done) {            
            element.hide().slideDown(500, done);
        },
        move: function (element, done) {        
            element.slideUp(500, done);
        },
        leave: function (element, done) {        
            element.slideUp(200, done);
        }
    };
});
