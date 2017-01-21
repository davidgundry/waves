module Waves {

    export class Thing {
        private _spriteName: string;
        private _inventoryItem: InventoryItem;

        constructor(name: string) {
            this._spriteName = name;

        }
        public get inventoryItem(): InventoryItem {
            return this._inventoryItem;
        }
        public set inventoryItem(newItem: InventoryItem) {
            this._inventoryItem = newItem;
        }

        
        public get spriteName() : string {
            return this._spriteName;
        }

    }
}