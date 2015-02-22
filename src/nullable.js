(function () {
    "use strict";

    var Nullable,

        EnsureType = ensure.EnsureType;

    /**
     * Nullable type factory
     *
     * @memberof ensure
     *
     * @param type {EnsureType} - Expected type when not null
     * @returns {NullableInstance} - NullableInstance with the expected type
     * @constructor
     */
    Nullable = function (type) {
        ensure(type, EnsureType);

        return new NullableInstance(type);
    };

    /**
     * A Nullable type
     *
     * Nullable types are used internally by Ensure.js to allow
     * type checks of a value that can either be null or of a type
     *
     * If no value is specified, it defaults to null
     *
     * @memberof ensure
     *
     * @param type {EnsureType} - Expected type when not null
     * @param value {*} - Internal value
     * @class
     */
    class NullableInstance extends EnsureType
    {
        constructor(type, value) {
            ensure.requireIsNewThis(NullableInstance, this);
            ensure(type, EnsureType);

            this.type = type;

            this.value = null;

            if (value !== undefined) {
                this.setValue(value);
            }
        }

        /**
         * Set the value
         *
         * @name ensure.NullableInstance#setValue
         * @function
         *
         * @param value {null|*} - Internal value
         */
        setValue(value) {
            if (value === null) {
                this.value = value;
            } else {
                ensure(value, this.type);

                this.value = value;
            }
        }

        /**
         * Get the value
         *
         * @name ensure.NullableInstance#getValue
         * @function
         *
         * @returns {null|*} Internal value
         */
        getValue() {
            return this.value;
        }

        /**
         * Get whether the value is null
         *
         * @name ensure.NullableInstance#isNull
         * @function
         *
         * @returns {boolean} True if the internal value is null
         */
        isNull() {
            return (this.value === null);
        }

        /**
         * Get the expected type when not null
         *
         * @name ensure.NullableInstance#getType
         * @function
         *
         * @returns {*} Type when not null
         */
        getType() {
            return this.type;
        };
    }

    ensure.Nullable = Nullable;
    ensure.NullableInstance = NullableInstance;
})();
