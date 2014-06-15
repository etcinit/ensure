(function () {
    
    var base,
        ensure,
        enforce,
        isNode,
        TypeException;
    
    base = {};
    
    /**
     * Check if object is undefined, null or an empty string
     *
     * @param object
     * @returns {boolean}
     */
    base.isEmpty = function (object) {
        "use strict";
    
        return this.response((object === undefined || object === null || object === ''));
    };
    
    /**
     * Check if the object is a boolean value
     *
     * @param object
     * @returns {boolean}
     */
    base.isBoolean = function (object) {
        "use strict";
    
        return this.response((typeof object === "boolean"));
    };
    
    /**
     * Check if object is a number
     *
     * @param object
     * @returns {boolean}
     */
    base.isNumber = function (object) {
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
    base.isString = function (object) {
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
    base.isInRange = function (object, min, max) {
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
    base.isPositiveNumber = function (object) {
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
    base.isIn = function (needle, haystack) {
        "use strict";
    
        return this.response((haystack.indexOf(needle) >= 0));
    };
    
    /**
     * Check if object is an array
     *
     * @param object
     * @returns {boolean}
     */
    base.isArray = function (object) {
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
    base.isNewThis = function (constructor, context) {
        "use strict";
    
        // Extra check to see if it is the window/global object
        if (context === root) {
            return this.response(false);
        }
    
        // Now check if this matches the constructor
        return this.response(context instanceof constructor);
    };
    
    base.response = function (bool) {
        "use strict";
        
        return bool;
    };
    
    ensure = Object.create(base);
    
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
    
    ensure.not = Object.create(base);
    
    ensure.not.response = function (bool) {
        "use strict";
        
        return !bool;
    };
    
    enforce = Object.create(base);
    
    enforce.response = function (bool) {
        "use strict";
        
        if (!bool) {
            throw new TypeException(undefined, "Invalid type.");
        }
    };
    
    enforce.not = Object.create(base);
    
    enforce.not.response = function (bool) {
        "use strict";
        
        if (bool) {
            throw new TypeException(undefined, "Invalid type.");
        }
    };
    
    TypeException = function (expectedType, message) {
        "use strict";
    
        this.name = 'TypeException';
    
        this.expectedType = expectedType;
    
        this.message = message || 'Invalid type: Expected ' + expectedType.name;
    };
    
    TypeException.prototype = new Error();
    TypeException.prototype.constructor = TypeException;

    isNode = false;

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = ensure;
        isNode = true;
    }

    // Make global
    this.ensure = ensure;
    this.enforce = enforce;
    this.TypeException = TypeException;
})();