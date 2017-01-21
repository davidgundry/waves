var Waves;
(function (Waves) {
    var WorldState = (function () {
        function WorldState() {
            this.STARTING_MILES = 50;
            this._milesRemaining = STARTING_MILES;
        }
        Object.defineProperty(WorldState.prototype, "milesRemaining", {
            get: function () {
                return _milesRemaining;
            },
            enumerable: true,
            configurable: true
        });
        WorldState.prototype.MoveDistance = function (miles) {
            _milesRemaining -= miles;
        };
        return WorldState;
    })();
    Waves.WorldState = WorldState;
})(Waves || (Waves = {}));
//# sourceMappingURL=WorldState.js.map