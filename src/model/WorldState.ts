module Waves {

    export class WorldState {

        static STARTING_MILES: number = 48;
        static WATER_RATE: number = 0.005;
        static FOOD_RATE: number = 0.0025;
        static HEALTH_NO_WATER_RATE: number = 0.003;
        static HEALTH_NO_FOOD_RATE: number = 0.001;
        public static LEAD_DISTANCE: number = 0.1;
        private _position: number = 0;
        private _health: number = 100;
        private _water: number = 5;
        private _food: number = 5;
        private _fuel: number = 0;
        private eventSignal: Phaser.Signal;

        public get milesRemaining(): number {
            return WorldState.STARTING_MILES - this.position;
        }

        public get position(): number {
            return this._position;
        }

        public set position(value: number) {
            this._position = value;
        }
        public get health(): number {
            return this._health;
        }

        public set health(value: number) {
            this._health = value;
        }

        public get water(): number {
            return this._water;
        }

        public set water(value: number) {
            this._water = value;
        }
        public get food(): number {
            return this._food;
        }

        public set food(value: number) {
            this._food= value;
        }
        public get fuel(): number {
            return this._fuel;
        }

        public set fuel(value: number) {
            this._fuel = value;
        }

        private _thingEventCallback: (thing: Thing, position: number) => void;
        public get thingEventCallback() {
            return this._thingEventCallback;
        }

        public set thingEventCallback(callback: (thing: Thing, position: number) => void) {
            this._thingEventCallback = callback;
        }
      

        constructor() {
            this.eventSignal = new Phaser.Signal();
        }
        getEventSignal(onEvent: Function) {
            this.eventSignal.add(onEvent);
        }

        private MoveDistance(miles: number) {
            this.position += miles;
            this.CheckTriggers(this.position);
        }

        public MoveMeters(meters: number) {
            this.MoveDistance(meters / 1609);
        }


        private _triggers: Trigger[] = new Array<Trigger>();
        private _triggersToRemove: Trigger[] = new Array<Trigger>();
        
        public get triggers(): Trigger[] {
            return this._triggers;
        }
        
        private CheckTriggers(position: number) {
            //console.log("check triggers " + this.triggers.length);
            this.triggers.forEach((value: Trigger, index: number, array: Trigger[]) => void this.CheckTrigger(value, position));
            this._triggersToRemove.forEach((value: Trigger, index: number, array: Trigger[]) => this.RemoveTrigger(value));
            this._triggersToRemove = new Array<Trigger>();
        }

        private CheckTrigger(trigger: Trigger, position: number) {
            //console.log("t=" + trigger.position + " " + position);
            if (trigger.position <= position) {
                if (trigger instanceof EventTrigger) {
                    this.TriggerEvent(trigger as EventTrigger);
                    this._triggersToRemove.push(trigger);
                }
            }

            if (trigger.position - WorldState.LEAD_DISTANCE <= position) {
                if (trigger instanceof ThingTrigger) {
                    this.TriggerThing(trigger as ThingTrigger);
                    this._triggersToRemove.push(trigger);
                }
            }
        }

        private RemoveTrigger(trigger: Trigger) {
            this.triggers.splice(this.triggers.indexOf(trigger),1);
        }

        private TriggerEvent(trigger: EventTrigger) {
            console.log(trigger.event.name + " event triggered");
            this.eventSignal.dispatch(trigger.event);
        }

        private TriggerThing(trigger: ThingTrigger) {
            console.log("Thing Triggered");
            if (this.thingEventCallback != null)
                this.thingEventCallback(trigger.thing, trigger.position);
            else
                throw new Error("ThingEventCallback not set");
        }





    }

}