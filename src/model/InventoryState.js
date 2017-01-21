var Waves;
(function (Waves) {
    var InventoryState = (function () {
        function InventoryState() {
        }
        Object.defineProperty(InventoryState.prototype, "things", {
            get: function () {
                return this.things;
            },
            enumerable: true,
            configurable: true
        });
        return InventoryState;
    }());
    Waves.InventoryState = InventoryState;
})(Waves || (Waves = {}));
//# sourceMappingURL=InventoryState.js.map