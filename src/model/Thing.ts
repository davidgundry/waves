module Waves {

    export class Thing {
        private _spriteName: string;
        private _displayName: string;
        public waterChangeOnAdd: number = 0;
        public foodChangeOnAdd: number = 0;
        public fuelChangeOnAdd: number = 0;
        public fuelChange: number = 0;
        public constantSpeed: number = 0;
        public clickSpeed: number = 0;

        private _inventoryItem: InventoryItem;

        constructor(name: string, parameters: Object = {}) {
            if (parameters.hasOwnProperty("water")) 
                this.waterChangeOnAdd = parameters["water"];
            if (parameters.hasOwnProperty("food"))
                this.waterChangeOnAdd = parameters["food"];
            if (parameters.hasOwnProperty("fuel"))
                this.waterChangeOnAdd = parameters["fuel"];
            if (parameters.hasOwnProperty("fuelChange"))
                this.waterChangeOnAdd = parameters["fuelChange"];
            if (parameters.hasOwnProperty("clickSpeed"))
                this.waterChangeOnAdd = parameters["clickSpeed"];
            if (parameters.hasOwnProperty("constantSpeed"))
                this.waterChangeOnAdd = parameters["constantSpeed"];
            
            this._spriteName = name;
            this._displayName = name;

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

        public get displayName(): string {
            return this._displayName;
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