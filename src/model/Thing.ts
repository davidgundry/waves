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
        public buttonLabel: string = "";

        private _inventoryItem: InventoryItem;

        constructor(name: string, displayName: string, parameters: Object = {}) {
            if (parameters.hasOwnProperty("water")) 
                this.waterChangeOnAdd = parameters["water"];
            if (parameters.hasOwnProperty("food"))
                this.foodChangeOnAdd = parameters["food"];
            if (parameters.hasOwnProperty("fuel"))
                this.fuelChangeOnAdd = parameters["fuel"];
            if (parameters.hasOwnProperty("fuelChange"))
                this.fuelChange = parameters["fuelChange"];
            if (parameters.hasOwnProperty("clickSpeed"))
                this.clickSpeed = parameters["clickSpeed"];
            if (parameters.hasOwnProperty("constantSpeed"))
                this.constantSpeed = parameters["constantSpeed"];
            if (parameters.hasOwnProperty("buttonLabel"))
                this.buttonLabel = parameters["buttonLabel"];
            
            this._spriteName = name;
            this._displayName = displayName;

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
}