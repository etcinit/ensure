(function () {
    "use strict";

    var TypeException;

    TypeException = function (expectedType, message) {
        this.name = 'TypeException';

        this.expectedType = expectedType;

        this.message = message || 'Invalid type: Expected ' + expectedType.name;
    };

    TypeException.prototype = new Error();
    TypeException.prototype.constructor = TypeException;

    ensure.TypeException = TypeException;
    root.TypeException = TypeException;
})();