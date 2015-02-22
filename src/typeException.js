(function () {
    "use strict";

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
    class TypeException extends Error
    {
        constructor(expectedType, message) {
            this.name = 'TypeException';

            this.expectedType = expectedType;

            this.message = message || 'Invalid type: Expected ' + expectedType.name;
        }
    }

    ensure.TypeException = TypeException;
    root.TypeException = TypeException;
})();
