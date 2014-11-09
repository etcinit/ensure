(function () {
    "use strict";

    var TypeException;

    /**
     * TypeException
     *
     * @param expectedType {*} - Type that was expected in the type check
     * @param message {string} - Error message
     *
     * @constructor
     * @class
     * @memberof ensure
     * @extends Error
     *
     * @property message {string}
     * @property expectedType {*}
     */
    TypeException = function (expectedType, message) {
        this.name = 'TypeException';

        this.expectedType = expectedType;

        if (!message) {
            if (expectedType.hasOwnProperty('name')) {
                message = 'Invalid type: Expected ' + expectedType.name;
            } else {
                message = 'Invalid type';
            }
        }

        this.message = message;
    };

    TypeException.prototype = new Error();
    TypeException.prototype.constructor = TypeException;

    ensure.TypeException = TypeException;
    root.TypeException = TypeException;
})();