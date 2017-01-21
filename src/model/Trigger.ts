module Waves {

    export class Trigger {

        private _position: number;

        constructor(position: number) {
            this._position = position;
        }
        public get position(): number {
            return this._position;
        }

    }

    export class EventTrigger extends Trigger{

        constructor(position: number) {
            super(position);
        }

    }

    export class ThingTrigger extends Trigger {

        private _thing: Thing;

        constructor(position: number, thing: Thing) {
            super(position);
            this._thing = thing;
        }

        public get thing(): Thing {
            return this._thing;
        }

    }

}