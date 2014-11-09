(function () {
    var Nothing,

        EnsureType = ensure.EnsureType;

    /**
     * Nothing Type
     *
     * An alias for `undefined` for Ensure
     *
     * @memberof ensure
     *
     * @constructor
     */
    Nothing = function () {

    };

    Nothing.name = 'Nothing';

    /**
     * Extend ensure type
     *
     * @type {ensure.EnsureType}
     */
    Nothing.prototype = new EnsureType();

    ensure.Nothing = Nothing;
})();