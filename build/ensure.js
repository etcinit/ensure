"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var ensure, ensureFunction, TypeException, root;

root = global || undefined;

(function () {
    "use strict";

    ensureFunction = function (object, type, soft) {
        if (ensure.enforce === false && soft !== false) {
            return true;
        }

        if (type === String) {
            if (ensure.isNotString(object)) {
                return throwTypeException(String, soft);
            }
        } else if (type === Boolean) {
            if (ensure.isNotBoolean(object)) {
                return throwTypeException(Boolean, soft);
            }
        } else if (type === Array) {
            if (ensure.isNotArray(object)) {
                return throwTypeException(Array, soft);
            }
        } else if (type === Number) {
            if (ensure.isNotNumber(object)) {
                return throwTypeException(Number, soft);
            }
        } else if (type === Object) {
            if (ensure.isNotObject(object)) {
                return throwTypeException(Object, soft);
            }
        } else if (type === ensure.Nothing) {
            if (object !== undefined) {
                return throwTypeException(Nothing, soft);
            }
        } else if (type instanceof ensure.NullableInstance) {
            if (!(object instanceof ensure.NullableInstance) && object !== null) {
                ensure(object, type.getType());
            }
        } else if (type === ensure.EnsureType) {
            if (!object instanceof Function || ensure.isNotIn(object, ensure.getSupportedTypes())) {
                return throwTypeException(ensure.EnsureType, soft);
            }
        } else {
            if (object instanceof type === false) {
                return throwTypeException(type, soft);
            }
        }

        return true;
    };

    function throwTypeException(type, soft) {
        if (soft) {
            return false;
        }

        throw new ensure.TypeException(type);
    }

    ensure = ensureFunction;

    ensure.enforce = true;

    ensure.getSupportedTypes = function () {
        return [String, Boolean, Number, Array, Object, Function, ensure.Nothing];
    };

    ensure.isEmpty = function (object) {
        return object === undefined || object === null || object === "";
    };

    ensure.isNotEmpty = function (object) {
        return !this.isEmpty(object);
    };

    ensure.isBoolean = function (object) {
        return typeof object === "boolean";
    };

    ensure.isNotBoolean = function (object) {
        return !this.isBoolean(object);
    };

    ensure.isNumber = function (object) {
        if (object === false || object === true) {
            return false;
        }

        return !isNaN(object);
    };

    ensure.isNotNumber = function (object) {
        return !this.isNumber(object);
    };

    ensure.isString = function (object) {
        if (object instanceof String) {
            return true;
        }

        return typeof object === "string";
    };

    ensure.isNotString = function (object) {
        return !this.isString(object);
    };

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

    ensure.isNotInRange = function (object, min, max) {
        return !this.isInRange(object, min, max);
    };

    ensure.isPositiveNumber = function (object) {
        if (!this.isNumber(object)) {
            return false;
        }

        if (!this.isInRange(object, 0, null)) {
            return false;
        }

        return true;
    };

    ensure.isNotPositiveNumber = function (object) {
        return !this.isPositiveNumber(object);
    };

    ensure.isIn = function (needle, haystack) {
        ensure(haystack, Array, false);

        return haystack.indexOf(needle) >= 0;
    };

    ensure.isNotIn = function (needle, haystack) {
        return !ensure.isIn(needle, haystack);
    };

    ensure.isArray = function (object) {
        return Array.isArray(object);
    };

    ensure.isNotArray = function (object) {
        return !this.isArray(object);
    };

    ensure.isObject = function (object) {
        return object === Object(object);
    };

    ensure.isNotObject = function (object) {
        return !ensure.isObject(object);
    };

    ensure.isNewThis = function (constructor, context) {
        if (context === root) {
            return false;
        }

        return context instanceof constructor;
    };

    ensure.require = function (object) {
        if (ensure.isEmpty(object)) {
            throw new Error("Expected a defined variable. Got null, undefined, or empty string");
        }
    };

    ensure.has = function (object, property, type, soft) {
        if (ensure.isEmpty(soft)) {
            soft = true;
        }

        if (object === undefined) {
            if (soft) {
                return false;
            }

            throw new Error("Expected object to have property \"" + property + "\" but the object is undefined");
        }

        if (object[property] === undefined) {
            if (soft) {
                return false;
            }

            throw new Error("Expected object to have property \"" + property + "\" but it is undefined");
        }

        if (type !== undefined) {
            return ensure(object[property], type, soft);
        }

        return true;
    };

    ensure.hasFunction = function (object, property, soft) {
        return ensure.has(object, property, Function, soft);
    };

    ensure.hasString = function (object, property, soft) {
        return ensure.has(object, property, String, soft);
    };

    ensure.hasNumber = function (object, property, soft) {
        return ensure.has(object, property, Number, soft);
    };

    ensure.hasObject = function (object, property, soft) {
        return ensure.has(object, property, Object, soft);
    };

    ensure.requireIsNewThis = function (constructor, context) {
        if (!ensure.isNewThis(constructor, context)) {
            throw new Error("Expected the function to be called as a constructor with the \"new\" keyword");
        }
    };

    ensure.one = function (option) {
        var args = Array.prototype.slice.call(arguments),
            result = null;

        if (args.length < 1) {
            return null;
        }

        args.forEach(function (argument) {
            if (argument !== undefined && argument !== null && result === null) {
                result = argument;
            }
        });

        return result;
    };

    ensure.EnsureType = function () {};

    var isNode = false;

    if (typeof module !== "undefined" && module.exports) {
        module.exports = ensure;
        isNode = true;
    }

    root.ensure = ensure;
})();

(function () {
    var EnsureType = ensure.EnsureType;

    var Nothing = (function (EnsureType) {
        function Nothing() {
            _classCallCheck(this, Nothing);

            if (EnsureType != null) {
                EnsureType.apply(this, arguments);
            }
        }

        _inherits(Nothing, EnsureType);

        return Nothing;
    })(EnsureType);

    Nothing.name = "Nothing";

    ensure.Nothing = Nothing;
})();

(function () {
    "use strict";

    var Nullable,
        EnsureType = ensure.EnsureType;

    Nullable = function (type) {
        ensure(type, EnsureType);

        return new NullableInstance(type);
    };

    var NullableInstance = (function (EnsureType) {
        function NullableInstance(type, value) {
            _classCallCheck(this, NullableInstance);

            ensure.requireIsNewThis(NullableInstance, this);
            ensure(type, EnsureType);

            this.type = type;

            this.value = null;

            if (value !== undefined) {
                this.setValue(value);
            }
        }

        _inherits(NullableInstance, EnsureType);

        _prototypeProperties(NullableInstance, null, {
            setValue: {
                value: function setValue(value) {
                    if (value === null) {
                        this.value = value;
                    } else {
                        ensure(value, this.type);

                        this.value = value;
                    }
                },
                writable: true,
                configurable: true
            },
            getValue: {
                value: function getValue() {
                    return this.value;
                },
                writable: true,
                configurable: true
            },
            isNull: {
                value: function isNull() {
                    return this.value === null;
                },
                writable: true,
                configurable: true
            },
            getType: {
                value: function getType() {
                    return this.type;
                },
                writable: true,
                configurable: true
            }
        });

        return NullableInstance;
    })(EnsureType);

    ensure.Nullable = Nullable;
    ensure.NullableInstance = NullableInstance;
})();

(function () {
    "use strict";

    var EnsureRecord;

    EnsureRecord = function (spec) {
        var record, key;

        ensure(spec, Object);

        record = function (values) {
            var recordProperties = {},
                self = this;

            ensure(values, Object);

            Object.keys(spec).forEach(function (key) {
                if (key === "prototype") {
                    return;
                }

                var keyClone = key.substr();

                if (spec.hasOwnProperty(key)) {
                    Object.defineProperty(self, keyClone, {
                        enumerable: true,
                        get: function get() {
                            return recordProperties[keyClone];
                        },
                        set: function set(value) {
                            ensure(value, spec[keyClone]);

                            recordProperties[keyClone] = value;
                        }
                    });
                }
            });

            for (key in values) {
                if (spec.hasOwnProperty(key) && values.hasOwnProperty(key)) {
                    this[key] = values[key];
                }
            }

            Object.freeze(this);
        };

        record.prototype = new EnsureRecordInstance();

        return Object.freeze(record);
    };

    var EnsureRecordInstance = function EnsureRecordInstance() {
        _classCallCheck(this, EnsureRecordInstance);
    };

    ensure.EnsureRecord = EnsureRecord;
    ensure.EnsureRecordInstance = EnsureRecordInstance;
})();

(function () {
    "use strict";

    var shield,
        EnsureType = ensure.EnsureType,
        NullableInstance = ensure.NullableInstance,
        Nothing = ensure.Nothing;

    shield = function (argumentSpec, returnType, innerFunction, thisContext) {
        ensure(argumentSpec, Array);
        ensure(returnType, EnsureType);
        ensure(innerFunction, Function);

        var nullableCount = 0,
            minArgCount = 0,
            maxArgCount = 0;

        argumentSpec.forEach(function (specItem) {
            if (specItem instanceof NullableInstance) {
                nullableCount++;
            }
        });

        maxArgCount = argumentSpec.length;
        minArgCount = maxArgCount - nullableCount;

        return function () {
            var i, returnValue;

            if (maxArgCount < arguments.length || minArgCount > arguments.length) {
                throw new Error("Function called with an invalid number of arguments");
            }

            for (i in arguments) {
                ensure(arguments[i], argumentSpec[i]);
            }

            thisContext = thisContext || this;
            returnValue = innerFunction.apply(thisContext, arguments);

            if (returnType !== Nothing) {
                ensure(returnValue, returnType);
            } else if (returnValue !== undefined) {
                throw new Error("Function returned a value when nothing was expected");
            }

            return returnValue;
        };
    };

    ensure.shield = shield;
})();
(function () {
    "use strict";

    var TypeException = (function (Error) {
        function TypeException(expectedType, message) {
            _classCallCheck(this, TypeException);

            this.name = "TypeException";

            this.expectedType = expectedType;

            this.message = message || "Invalid type: Expected " + expectedType.name;
        }

        _inherits(TypeException, Error);

        return TypeException;
    })(Error);

    ensure.TypeException = TypeException;
    root.TypeException = TypeException;
})();