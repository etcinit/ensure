var ensure,
    TypeException,
    root;

ensure = function (object, type, soft) {
    "use strict";

    if (type === String) {
        if (ensure.isNotString(object)) {
            if (soft) {
                return false;
            }

            throw new TypeException(String);
        }
    } else if (type === Boolean) {
        if (ensure.isNotBoolean(object)) {
            if (soft) {
                return false;
            }

            throw new TypeException(Boolean);
        }
    } else if (type === Array) {
        if (ensure.isNotArray(object)) {
            if (soft) {
                return false;
            }

            throw new TypeException(Array);
        }
    } else if (type === Number) {
        if (ensure.isNotNumber(object)) {
            if (soft) {
                return false;
            }

            throw new TypeException(Number);
        }
    } else {
        if (! (object instanceof type) ) {
            if (soft) {
                return false;
            }

            throw new TypeException(type);
        }
    }

    return true;
};

/**
 * Check if object is undefined, null or an empty string
 *
 * @param object
 * @returns {boolean}
 */
ensure.isEmpty = function (object) {
    "use strict";

    return (object === undefined || object === null || object === '');
};

/**
 * Check if the object is not undefined, null, or an empty string
 *
 * @param object
 * @returns {boolean}
 */
ensure.isNotEmpty = function (object) {
    "use strict";

    return !this.isEmpty(object);
};

/**
 * Check if the object is a boolean value
 *
 * @param object
 * @returns {boolean}
 */
ensure.isBoolean = function (object) {
    "use strict";

    return (typeof object === "boolean");
};

/**
 * Check if the object is not a boolean value
 *
 * @returns {boolean}
 */
ensure.isNotBoolean = function (object) {
    "use strict";

    return !this.isBoolean(object);
};

/**
 * Check if object is a number
 *
 * @param object
 * @returns {boolean}
 */
ensure.isNumber = function (object) {
    "use strict";

    // Exclude booleans
    if (object === false || object === true) {
        return false;
    }

    return !isNaN(object);
};

/**
 * Check if object is not a number
 *
 * @param object
 * @returns {*}
 */
ensure.isNotNumber = function (object) {
    "use strict";

    return !this.isNumber(object);
};

/**
 * Check if object is a string
 *
 * @param object
 * @returns {boolean}
 */
ensure.isString = function (object) {
    "use strict";

    // Check for when it is instantiated as an object
    if (object instanceof String) {
        return true;
    }

    return (typeof object === "string");
};

/**
 * Check if object is not a string
 *
 * @param object
 * @returns {boolean}
 */
ensure.isNotString = function (object) {
    "use strict";

    return !this.isString(object);
};

/**
 * Check if object is within a numerical range
 *
 * @param object
 * @param min
 * @param max
 * @returns {boolean}
 */
ensure.isInRange = function (object, min, max) {
    "use strict";

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
 * @param object
 * @param min
 * @param max
 * @returns {boolean}
 */
ensure.isNotInRange = function (object, min, max) {
    "use strict";

    return !this.isInRange(object, min, max);
};

/**
 * Check if object is a positive number
 *
 * @param object
 * @returns {boolean}
 */
ensure.isPositiveNumber = function (object) {
    "use strict";

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
 * @param object
 * @returns {boolean}
 */
ensure.isNotPositiveNumber = function (object) {
    "use strict";

    return !this.isPositiveNumber(object);
};

/**
 * Check if the needle is in the haystack (item in array)
 *
 * @param needle
 * @param haystack
 * @returns {boolean}
 */
ensure.isIn = function (needle, haystack) {
    "use strict";

    return (haystack.indexOf(needle) >= 0);
};

/**
 * Check if object is an array
 *
 * @param object
 * @returns {boolean}
 */
ensure.isArray = function (object) {
    "use strict";

    return Array.isArray(object);
};

/**
 * Check if object is not an array
 *
 * @param object
 * @returns {boolean}
 */
ensure.isNotArray = function (object) {
    "use strict";

    return !this.isArray(object);
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
ensure.isNewThis = function (constructor, context) {
    "use strict";

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
 * @param object
 */
ensure.require = function (object) {
    "use strict";

    if (ensure.isEmpty(object)) {
        throw new Error('Expected a defined variable. Got null, undefined, or empty string');
    }
};

// Ensure that an object is an instance of a type
ensure.is = function(object, type, name){
    "use strict";

    if(! (object instanceof type) ){
        throw new Error("Expected an instance " + name ? ("of " + name) : "of some class" + " but got something else.");
    }
}

// Ensure that an object has a specific member.
ensure.has = function(object, member){
    "use strict";

    if(!object || !(object[member])){
        throw new Error("Expected object to have member variable " + member + " but it is does not.");
    }
}

ensure.memberHasType = function(object, member, type, name){
    "use strict";

    ensure.has(object, member);

    var isInstanceType = false;

    if(typeof type === Function){
        isInstanceType = true;
    }

    var predicate = false,
        message = '';

    if(isInstanceType){
        predicate = object[member] instanceof type;
        if(name){
            message = "Expected member " + member + " to be an instance of " + name + " but it isn't.";
        }else{
            message = "Expected member " + member + " to be an instance of some type, but it isn't";
        }
    }else{
        predicate = typeof (object[member]) === type;
        message = "Expected member " + member + " to have type " + type.name + " but it doesn't."
    }

    if(!predicate){
        throw new Error(message);
    }
    return true;
}

ensure.hasFunction = function(object, member){
    "use strict";
    ensure.memberHasType(object, member, Function);
}

ensure.hasString = function(object, member){
    "use strict";

    if(ensure.memberHasType(object, member, 'string')){
        return;
    }

    ensure.memberHasType(object, member, String, true, 'String');
}

ensure.hasNumber = function(object, member){
    "use strict";

    if(ensure.memberHasType(object, member, 'number')){
        return;
    }

    ensure.memberHasType(object, member, Number, true, 'number');
}

ensure.hasObject = function(object, member){
    "use strict";

    if(ensure.memberHasType(object, member, 'object')){
        return;
    }

    ensure.memberHasType(object, member, Object, true, 'object');
}

ensure.hasMemberWithInstance = function(object, member, instanceType, name){
    "use strict";
    
    ensure.memberHasType(object, member, instanceType, name);
}

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
ensure.requireIsNewThis = function (constructor, context) {
    "use strict";

    if (!ensure.isNewThis(constructor, context)) {
        throw new Error('Expected the function to be called as a constructor with the "new" keyword');
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

(function () {

    // Establish the root object, `window` in the browser, or `global` on the server.
    root = this;

    var isNode = false;

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = ensure;
        isNode = true;
    }

    root.ensure = ensure;
    root.TypeException = TypeException;
})();