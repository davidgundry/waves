module Waves {

    export class Trigger {

        position: number;

    }

    export class TriggerEvent extends Trigger{


    }

    export class TriggerThing extends Trigger {

        private _thing: Thing;

        constructor(thing: Thing) {
            super();
            this.thing = thing;
        }

        public get thing(): Thing {
            return this._thing;
        }

    }

}