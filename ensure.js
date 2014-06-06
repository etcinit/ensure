var ensure,
    TypeException;

ensure = function (object, type) {
    "use strict";

    if (type === String) {
        if (ensure.isNotString(object)) {
            throw new TypeException(String);
        }
    } else if (type === Boolean) {
        if (ensure.isNotBoolean(object)) {
            throw new TypeException(Boolean);
        }
    } else if (type === Array) {
        if (ensure.isNotArray(object)) {
            throw new TypeException(Array);
        }
    } else if (type === Number) {
        if (ensure.isNotNumber(object)) {
            throw new TypeException(Number);
        }
    } else {
        if (!object instanceof type) {
            throw new TypeException(type);
        }
    }
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

    return isNaN(object);
};

/**
 * Check if object is a string
 *
 * @param object
 * @returns {boolean}
 */
ensure.isString = function (object) {
    "use strict";

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
    var root = this;

    var isNode = false;

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = ensure;
        isNode = true;
    }

    root.ensure = ensure;
    root.TypeException = TypeException;
})();