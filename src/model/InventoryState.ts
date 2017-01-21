module Waves {

    export class InventoryState {

        static STARTING_TOTAL_SPACE = 10;

        private _things: Thing[] = new Array<Thing>();

        public get things(): Thing[] {
            return this._things;
        }

        private _totalSpace: number = InventoryState.STARTING_TOTAL_SPACE;

        public get totalSpace(): number {
            return this._totalSpace;
        }

        public SpaceRemaining(): boolean {
            return (this.totalSpace - this.things.length > 0);
        }

        public ContainsItem(thing: Thing) : boolean {
            return (this.things.indexOf(thing) >= 0);
        }

        public AddItem(newThing: Thing) {
            if (this.SpaceRemaining)
                this.things.push(newThing);
            else
                throw new Error("Inventory full");
        }

        public DiscardItem(thing: Thing) {
            if (this.ContainsItem(thing))
                this.things.splice(this.things.indexOf(thing));
            else
                throw new Error("Thing not in inventory");
        }

        public hasPlayerRowThing(): boolean {
            return false;
        }

        public hasSailThing(): boolean {
            return false;
        }

        public get playerRowThing(): RowThing {
            return null;
        }

        public get sailThing(): SailThing {
            return null;
        }

    }

}