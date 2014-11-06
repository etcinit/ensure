(function () {
    "use strict";

    var shield;

    /**
     * Wrap around a function and perform type checks
     *
     * @param argumentSpec
     * @param returnType {*} - Type that the function should return
     * @param innerFunction {Function} - Function to wrap around
     * @param [thisContext] {Object} - `this` context to use for the innerFunction
     * @returns {Function}
     *
     * @memberof ensure
     */
    shield = function (argumentSpec, returnType, innerFunction, thisContext) {
        ensure(argumentSpec, Array);
        ensure(returnType, Function);
        ensure(innerFunction, Function);

        return function () {
            var i,
                returnValue;

            // Check that we got the same number of arguments as specified in the spec
            if (argumentSpec.length !== arguments.length) {
                throw new Error('Function called with an invalid number of arguments');
            }

            // Check that every argument type matches
            for (i in arguments) {
                ensure(arguments[i], argumentSpec[i]);
            }

            // Call function
            thisContext = thisContext || this;
            returnValue = innerFunction.apply(thisContext, arguments);

            // Check return type
            ensure(returnValue, returnType);

            return returnValue;
        };
    };

    ensure.shield = shield;
})();