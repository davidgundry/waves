module Waves {

    export class ThingPosition {

        constructor(thing: Thing, distance: number) {
            this.thing = thing;
            this.distance = distance;
        }

        private _thing: Thing;
        private _distance: number;

        public get thing(): ThingPosition {
            return this._thing;
        }

        public get distance(): number {
            return this._distance;
        }

    }

}