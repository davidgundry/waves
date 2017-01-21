var Waves;
(function (Waves) {
    var WorldState = (function () {
        function WorldState() {
            this._milesRemaining = WorldState.STARTING_MILES;
        }
        Object.defineProperty(WorldState.prototype, "milesRemaining", {
            get: function () {
                return this._milesRemaining;
            },
            enumerable: true,
            configurable: true
        });
        WorldState.prototype.MoveDistance = function (miles) {
            this._milesRemaining -= miles;
        };
        WorldState.STARTING_MILES = 50;
        return WorldState;
    }());
    Waves.WorldState = WorldState;
})(Waves || (Waves = {}));
//# sourceMappingURL=WorldState.js.map