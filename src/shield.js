(function () {
    "use strict";

    var shield,

        EnsureType = ensure.EnsureType,
        NullableInstance = ensure.NullableInstance,
        Nothing = ensure.Nothing;

    /**
     * Wrap around a function and perform type checks
     *
     * @param argumentSpec {Array} - Array of the types of each argument in the function, in the same order
     * @param returnType {*} - Type that the function should return
     * @param innerFunction {Function} - Function to wrap around
     * @param [thisContext] {Object} - `this` context to use for the innerFunction
     * @returns {Function}
     *
     * @memberof ensure
     *
     * @example
     * // First we create our shielded function
     * var myShieldFunction = ensure.shield([Boolean, Array], Number, function (arg1, arg2) {
     *     if (arg1) {
     *         return {};
     *     }
     *
     *     return 1337;
     * });
     *
     * // This works fine
     * myShieldFunction(false, []);
     *
     * // This throws an error
     * myShieldFunction([], []);
     *
     * // This also throws an error since the return value is not a number
     * myShieldFunction(true, []);
     */
    shield = function (argumentSpec, returnType, innerFunction, thisContext) {
        ensure(argumentSpec, Array);
        ensure(returnType, EnsureType);
        ensure(innerFunction, Function);

        var nullableCount = 0,
            minArgCount = 0,
            maxArgCount = 0;

        // Count how many items in the spec are nullable
        argumentSpec.forEach(function (specItem) {
            if (specItem instanceof NullableInstance) {
                nullableCount++;
            }
        });

        // Compute min and max number of arguments allowed
        maxArgCount = argumentSpec.length;
        minArgCount = maxArgCount - nullableCount;

        return function () {
            var i,
                returnValue;

            // Check that we got the same number of arguments as specified in the spec
            if (maxArgCount < arguments.length || minArgCount > arguments.length) {
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
            if (returnType !== Nothing) {
                ensure(returnValue, returnType);
            } else if (returnValue !== undefined) {
                throw new Error('Function returned a value when nothing was expected');
            }

            return returnValue;
        };
    };

    ensure.shield = shield;
})();