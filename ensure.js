(function () {
    
    var ensure,
        base,
        TypeException;
    
    base = function () {};
    
    /**
     * Check if object is undefined, null or an empty string
     *
     * @param object
     * @returns {boolean}
     */
    base.prototype.isEmpty = function (object) {
        "use strict";
    
        return this.response((object === undefined || object === null || object === ''));
    };
    
    /**
     * Check if the object is a boolean value
     *
     * @param object
     * @returns {boolean}
     */
    base.prototype.isBoolean = function (object) {
        "use strict";
    
        return this.response((typeof object === "boolean"));
    };
    
    /**
     * Check if object is a number
     *
     * @param object
     * @returns {boolean}
     */
    base.prototype.isNumber = function (object) {
        "use strict";
    
        // Exclude booleans
        if (object === false || object === true) {
            return this.response(false);
        }
    
        return this.response(!isNaN(object));
    };
    
    /**
     * Check if object is a string
     *
     * @param object
     * @returns {boolean}
     */
    base.prototype.isString = function (object) {
        "use strict";
    
        // Check for when it is instantiated as an object
        if (object instanceof String) {
            return this.response(true);
        }
    
        return this.response((typeof object === "string"));
    };
    
    /**
     * Check if object is within a numerical range
     *
     * @param object
     * @param min
     * @param max
     * @returns {boolean}
     */
    base.prototype.isInRange = function (object, min, max) {
        "use strict";
    
        if (!ensure.isEmpty(min)) {
            if (Number(object) < min) {
                return this.response(false);
            }
        }
    
        if (!ensure.isEmpty(max)) {
            if (Number(object) > max) {
                return this.response(false);
            }
        }
    
        return this.response(true);
    };
    
    /**
     * Check if object is a positive number
     *
     * @param object
     * @returns {boolean}
     */
    base.prototype.isPositiveNumber = function (object) {
        "use strict";
    
        if (!ensure.isNumber(object)) {
            return this.response(false);
        }
    
        if (!ensure.isInRange(object, 0, null)) {
            return this.response(false);
        }
    
        return this.response(true);
    };
    
    /**
     * Check if the needle is in the haystack (item in array)
     *
     * @param needle
     * @param haystack
     * @returns {boolean}
     */
    base.prototype.isIn = function (needle, haystack) {
        "use strict";
    
        return this.response((haystack.indexOf(needle) >= 0));
    };
    
    /**
     * Check if object is an array
     *
     * @param object
     * @returns {boolean}
     */
    base.prototype.isArray = function (object) {
        "use strict";
    
        return this.response(Array.isArray(object));
    };
    
    /**
     * Check whether or not the specified object is the root (window, global) object
     *
     * Useful for checking if a constructor function is being called without the new
     * keyword.
     *
     * @param constructor - The constructor function of the object
     * @param context - The this context (inside the constructor function)
     */
    base.prototype.isNewThis = function (constructor, context) {
        "use strict";
    
        // Extra check to see if it is the window/global object
        if (context === root) {
            return this.response(false);
        }
    
        // Now check if this matches the constructor
        return this.response(context instanceof constructor);
    };
    
    /**
     * Check if an object is defined, fail otherwise
     *
     * @param object
     */
    base.prototype.require = function (object) {
        "use strict";
    
        if (ensure.isEmpty(object)) {
            throw new Error('Expected a defined variable. Got null, undefined, or empty string');
        }
    };
    
    /**
     * Check if a constructor was called with the "new" keyword
     *
     * Useful during development for preventing constructor functions messing up
     * the global context when they are called without the new keyword
     *
     * This function will throw an error when your object is constructed without using new
     *
     * @param constructor
     * @param context
     */
    base.prototype.requireIsNewThis = function (constructor, context) {
        "use strict";
    
        if (!ensure.isNewThis(constructor, context)) {
            throw new Error('Expected the function to be called as a constructor with the "new" keyword');
        }
    };
    
    base.prototype.response = function (bool) {
        return bool;
    };
    
    ensure = Object.create(base.prototype);
    
    ensure.is = function (object, type, soft) {
        "use strict";
    
        if (type === String) {
            if (ensure.not.isString(object)) {
                if (soft) {
                    return false;
                }
    
                throw new TypeException(String);
            }
        } else if (type === Boolean) {
            if (ensure.not.isBoolean(object)) {
                if (soft) {
                    return false;
                }
    
                throw new TypeException(Boolean);
            }
        } else if (type === Array) {
            if (ensure.not.isArray(object)) {
                if (soft) {
                    return false;
                }
    
                throw new TypeException(Array);
            }
        } else if (type === Number) {
            if (ensure.not.isNumber(object)) {
                if (soft) {
                    return false;
                }
    
                throw new TypeException(Number);
            }
        } else {
            if (!object instanceof type) {
                if (soft) {
                    return false;
                }
    
                throw new TypeException(type);
            }
        }
    
        return true;
    };
    
    ensure.not = Object.create(base.prototype);
    
    ensure.not.response = function (bool) {
        return !bool;
    };
    
    enforce = Object.create(base.prototype);
    
    enforce.response = function (bool) {
        if (!bool) {
            throw new TypeException(undefined, "Invalid type.");
        }
        // return bool;
    };
    
    enforce.not = Object.create(base.prototype);
    
    enforce.not.response = function (bool) {
        if (bool) {
            throw new TypeException(undefined, "Invalid type.");
        }
        // return !bool;
    };
    
    TypeException = function (expectedType, message) {
        "use strict";
    
        this.name = 'TypeException';
    
        this.expectedType = expectedType;
    
        this.message = message || 'Invalid type: Expected ' + expectedType.name;
    };
    
    TypeException.prototype = new Error();
    TypeException.prototype.constructor = TypeException;

    var isNode = false;

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = ensure;
        isNode = true;
    }

    // Make global
    this.ensure = ensure;
    this.TypeException = TypeException;
})();