(function () {
    var EnsureType = ensure.EnsureType;

    /**
     * Nothing Type
     *
     * An alias for `undefined` for Ensure
     *
     * @memberof ensure
     *
     * @constructor
     */
    class Nothing extends EnsureType
    {
        //
    }

    Nothing.name = 'Nothing';

    ensure.Nothing = Nothing;
})();
