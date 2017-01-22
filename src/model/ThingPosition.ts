module Waves {

    export class ThingPosition {

        constructor(thing: Thing, position: number, inventoryItem: InventoryItem) {
            this._thing = thing;
            this._position = position;
            this._inventoryItem = inventoryItem;
        }

        private _thing: Thing;
        private _position: number;
        private _inventoryItem: InventoryItem;

        public get thing(): Thing {
            return this._thing;
        }

        public get position(): number {
            return this._position;
        }

        public get inventoryItem(): InventoryItem {
            return this._inventoryItem;
        }

    }

}