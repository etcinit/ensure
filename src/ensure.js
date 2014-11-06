/**
 * @name ensure
 * @namespace ensure
 */
var ensure,
    TypeException,
    root;

// Establish the root object, `window` in the browser, or `global` on the server.
root = this;

(function () {
    "use strict";

    /**
     * Ensure function
     *
     * Checks the type of an object matches an expected type
     *
     * A TypeException is thrown if the type is not matched
     *
     * If soft is set to true, a boolean is returned instead
     *
     * @param object {*} - Object to be checked
     * @param type {Function} - Type to compare the object to
     * @param soft {boolean} - If set to false, an exception is thrown if the type check fails
     * @throws {ensure.TypeException}
     * @lends ensure
     * @returns {boolean}
     */
    ensure = function (object, type, soft) {
        if (type === String) {
            if (ensure.isNotString(object)) {
                if (soft) {
                    return false;
                }

                throw new ensure.TypeException(String);
            }
        } else if (type === Boolean) {
            if (ensure.isNotBoolean(object)) {
                if (soft) {
                    return false;
                }

                throw new ensure.TypeException(Boolean);
            }
        } else if (type === Array) {
            if (ensure.isNotArray(object)) {
                if (soft) {
                    return false;
                }

                throw new ensure.TypeException(Array);
            }
        } else if (type === Number) {
            if (ensure.isNotNumber(object)) {
                if (soft) {
                    return false;
                }

                throw new ensure.TypeException(Number);
            }
        } else if (type === Object) {
            if (ensure.isNotObject(object)) {
                if (soft) {
                    return false;
                }

                throw new ensure.TypeException(Object);
            }
        } else {
            if ((object instanceof type) === false) {
                if (soft) {
                    return false;
                }

                throw new ensure.TypeException(type);
            }
        }

        return true;
    };

    /**
     * Check if object is undefined, null or an empty string
     *
     * @param object {*} - Object to be checked
     * @returns {boolean} True if the object is null, undefined or an empty string
     */
    ensure.isEmpty = function (object) {
        return (object === undefined || object === null || object === '');
    };

    /**
     * Check if the object is not undefined, null, or an empty string
     *
     * @param object {*} - Object to be checked
     * @returns {boolean} True if the object is not null, undefined or an empty string
     */
    ensure.isNotEmpty = function (object) {
        return !this.isEmpty(object);
    };

    /**
     * Check if the object is a boolean value
     *
     * @param object {*} - Object to be checked
     * @returns {boolean} True if the object is a boolean value
     */
    ensure.isBoolean = function (object) {
        return (typeof object === "boolean");
    };

    /**
     * Check if the object is not a boolean value
     *
     * @param object {*} - Object to be checked
     * @returns {boolean} True if the object is not a boolean value
     */
    ensure.isNotBoolean = function (object) {
        return !this.isBoolean(object);
    };

    /**
     * Check if object is a number
     *
     * @param object {*} - Object to be checked
     * @returns {boolean} True if the object is a numerical value
     */
    ensure.isNumber = function (object) {
        // Exclude booleans
        if (object === false || object === true) {
            return false;
        }

        return !isNaN(object);
    };

    /**
     * Check if object is not a number
     *
     * @param object {*} - Object to be checked
     * @returns {boolean} True if the object is not a numeric value
     */
    ensure.isNotNumber = function (object) {
        return !this.isNumber(object);
    };

    /**
     * Check if object is a string
     *
     * @param object {*} - Object to be checked
     * @returns {boolean} True if the object is a string
     */
    ensure.isString = function (object) {
        // Check for when it is instantiated as an object
        if (object instanceof String) {
            return true;
        }

        return (typeof object === "string");
    };

    /**
     * Check if object is not a string
     *
     * @param object {*} - Object to be checked
     * @returns {boolean} True if the object is not a string
     */
    ensure.isNotString = function (object) {
        return !this.isString(object);
    };

    /**
     * Check if object is within a numerical range
     *
     * @param object {*} - Object to be checked
     * @param min {Number} - Start number of the range
     * @param max {Number} - End number of the range
     * @returns {boolean} True if the object is within the numerical range
     */
    ensure.isInRange = function (object, min, max) {
        if (!this.isEmpty(min)) {
            if (Number(object) < min) {
                return false;
            }
        }

        if (!this.isEmpty(max)) {
            if (Number(object) > max) {
                return false;
            }
        }

        return true;
    };

    /**
     * Check if object is not within a numerical range
     *
     * @param object {*} - Object to be checked
     * @param min {Number} - Start number of the range
     * @param max {Number} - End number of the range
     * @returns {boolean} True if the object is not within the numerical range
     */
    ensure.isNotInRange = function (object, min, max) {
        return !this.isInRange(object, min, max);
    };

    /**
     * Check if object is a positive number
     *
     * @param object {*} - Object to be checked
     * @returns {boolean} True if the object is a positive number
     */
    ensure.isPositiveNumber = function (object) {
        if (!this.isNumber(object)) {
            return false;
        }

        if (!this.isInRange(object, 0, null)) {
            return false;
        }

        return true;
    };

    /**
     * Check if object is not a positive number
     *
     * @param object {*} - Object to be checked
     * @returns {boolean} True if the object is not a positive number
     */
    ensure.isNotPositiveNumber = function (object) {
        return !this.isPositiveNumber(object);
    };

    /**
     * Check if the needle is in the haystack (item in array)
     *
     * @param needle {*} - Element we are looking for
     * @param haystack {Array} - Array to look in
     * @returns {boolean} True if the element is in the array
     */
    ensure.isIn = function (needle, haystack) {
        ensure(haystack, Array);

        return (haystack.indexOf(needle) >= 0);
    };

    /**
     * Check if the needle is not in the haystack (item in array)
     *
     * @param needle {*} - Element we are looking for
     * @param haystack {Array} - Array to look in
     * @returns {boolean} True if the element is not in the array
     */
    ensure.isNotIn = function (needle, haystack) {
        return !ensure.isIn(needle, haystack);
    };

    /**
     * Check if object is an array
     *
     * @param object {*} - Object to be checked
     * @returns {boolean} True if the object is an array
     */
    ensure.isArray = function (object) {
        return Array.isArray(object);
    };

    /**
     * Check if object is not an array
     *
     * @param object {*} - Object to be checked
     * @returns {boolean} True if the object is not an array
     */
    ensure.isNotArray = function (object) {
        return !this.isArray(object);
    };

    /**
     * Check if it is an object
     *
     * @param object {*} - Object to be checked
     * @returns {boolean} True if the object is an object
     */
    ensure.isObject = function (object) {
        return object === Object(object);
    };

    /**
     * Check if it is not an object
     *
     * @param object {*} - Object to be checked
     * @returns {boolean} True if the object is not an object
     */
    ensure.isNotObject = function (object) {
        return !ensure.isObject(object);
    };

    /**
     * Check whether or not the specified object is the root (window, global) object
     *
     * Useful for checking if a constructor function is being called without the new
     * keyword.
     *
     * @param constructor {Function} - The constructor function of the object
     * @param context {Object} - The this context (inside the constructor function)
     */
    ensure.isNewThis = function (constructor, context) {
        // Extra check to see if it is the window/global object
        if (context === root) {
            return false;
        }

        // Now check if this matches the constructor
        return context instanceof constructor;
    };

    /**
     * Check if an object is defined, fail otherwise
     *
     * Checks if the object provided is null, undefined or an empty string
     * If it is, an exception is thrown
     *
     * @param object {*} - Object to check
     * @throws {Error} Thrown when the object is null, undefined or an empty string
     */
    ensure.require = function (object) {
        if (ensure.isEmpty(object)) {
            throw new Error('Expected a defined variable. Got null, undefined, or empty string');
        }
    };

    /**
     * Check if an object has a certain property defined. (Type check is optional)
     *
     * @param object {Object} - Object to be checked
     * @param property {string} - Property name
     * @param [type] {*} - Type to be checked
     * @param [soft=true] {boolean} If true, exceptions will not be thrown
     */
    ensure.has = function (object, property, type, soft) {
        // Default value for soft
        if (ensure.isEmpty(soft)) {
            soft = true;
        }

        if (object === undefined) {
            if (soft) {
                return false;
            }

            throw new Error('Expected object to have property "' + property + '" but the object is undefined');
        }

        if (object[property] === undefined) {
            if (soft) {
                return false;
            }

            throw new Error('Expected object to have property "' + property + '" but it is undefined');
        }

        // Check type if provided
        if (type !== undefined) {
            return ensure(object[property], type, soft);
        }

        return true;
    };

    /**
     * Check if an object has a certain Function property defined
     *
     * @param object
     * @param property
     */
    ensure.hasFunction = function (object, property) {
        ensure.has(object, property, Function);
    };

    /**
     * Check if an object has a certain String property defined
     *
     * @param object
     * @param property
     */
    ensure.hasString = function (object, property) {
        ensure.has(object, property, String);
    };

    /**
     * Check if an object has a certain Number property defined
     *
     * @param object
     * @param property
     */
    ensure.hasNumber = function (object, property) {
        ensure.has(object, property, Number);
    };

    /**
     * Check if an object has a certain Object property defined
     *
     * @param object {Object}
     * @param property {string}
     */
    ensure.hasObject = function (object, property) {
        ensure.has(object, property, Object);
    };

    /**
     * Check if a constructor was called with the "new" keyword
     *
     * Useful during development for preventing constructor functions messing up
     * the global context when they are called without the new keyword
     *
     * This function will throw an error when your object is constructed without using new
     *
     * @param constructor {Function} - Constructor function to protect
     * @param context {Object} - `this` context of the object
     */
    ensure.requireIsNewThis = function (constructor, context) {
        if (!ensure.isNewThis(constructor, context)) {
            throw new Error('Expected the function to be called as a constructor with the "new" keyword');
        }
    };

    var isNode = false;

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = ensure;
        isNode = true;
    }

    root.ensure = ensure;
})();