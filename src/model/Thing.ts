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

    export class RowThing extends Thing {

        constructor(name: string, speed : number, buttonLabel: string) {
            super(name)
            this._speed = speed;
            this._buttonLabel = buttonLabel;
        }

        private _speed: number;
        public get speed(): number {
            return this._speed;
        }

        private _buttonLabel: string;
        public get buttonLabel(): string {
            return this._buttonLabel;
        }

    }

    export class SailThing extends Thing {

        constructor(name: string, speed: number) {
            super(name)
            this._speed = speed;
        }

        private _speed: number;
        public get speed(): number {
            return this._speed;
        }
    }
}