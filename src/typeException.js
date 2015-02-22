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
        /**
         * Construct an instance of a TypeException
         *
         * @param expectedType {*} - Type that was expected in the type check
         * @param message {string} - Optional error message
         * @param providedType {*} - Type provided
         */
        constructor(expectedType, message, providedType) {
            this.name = 'TypeException';

            this.expectedType = expectedType;
            this.providedType = providedType;

            var expectedTypeName = expectedType.name || 'Function',
                providedTypeName = providedType.name || 'Function',
                providedTypeMessage = 'Invalid type.';

            if (providedType) {
                providedTypeMessage = 'Invalid type: ' + providedTypeName;
            }

            this.message = message
                || providedTypeMessage + 'Expected ' + expectedTypeName;
        }
    }

    ensure.TypeException = TypeException;
    root.TypeException = TypeException;
})();
