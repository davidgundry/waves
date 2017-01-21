module Waves {

    export class ThingPosition {

        constructor(thing: Thing, distance: number) {
            this._thing = thing;
            this._distance = distance;
        }

        private _thing: Thing;
        private _distance: number;

        public get thing(): ThingPosition {
            return this.thing;
        }

        public get distance(): number {
            return this._distance;
        }

    }

}