module Waves {

    export class WorldState {

        static STARTING_MILES: number = 50;
        public static LEAD_DISTANCE: number = 1;
        private _position: number = 0;

        public get milesRemaining(): number {
            return WorldState.STARTING_MILES - this.position;
        }

        public get position(): number {
            return this._position;
        }

        public set position(value: number) {
            this._position = value;
        }

        private _thingEventCallback: (thing: Thing, position: number) => void;
        public get thingEventCallback() {
            return this._thingEventCallback;
        }

        public set thingEventCallback(callback: (thing: Thing, position: number) => void) {
            this._thingEventCallback = callback;
        }
      

        constructor() {
            this.triggers.push(new ThingTrigger(1, new Thing("paddle")));
            this.triggers.push(new EventTrigger(0.5, new FlyingFishStoryEvent()));
        }

        private MoveDistance(miles: number) {
            this.position += miles;
            this.CheckTriggers(this.position);
        }

        public MoveMeters(meters: number) {
            this.MoveDistance(meters / 1609);
        }


        private _triggers: Trigger[]= new Array<Trigger>();
        
        private get triggers(): Trigger[] {
            return this._triggers;
        }
        
        private CheckTriggers(position: number) {
           this.triggers.forEach((value: Trigger, index: number, array: Trigger[]) => void this.CheckTrigger(value, position));
        }

        private CheckTrigger(trigger: Trigger, position: number) {
            if (trigger.position <= position) {
                if (trigger instanceof EventTrigger)
                    this.TriggerEvent(trigger as EventTrigger);
                this.RemoveTrigger(trigger);
            }

            if (trigger.position - WorldState.LEAD_DISTANCE <= position) {
                if (trigger instanceof ThingTrigger)
                    this.TriggerThing(trigger as ThingTrigger);
                this.RemoveTrigger(trigger);
            }
        }

        private RemoveTrigger(trigger: Trigger) {
            this.triggers.splice(this.triggers.indexOf(trigger));
        }

        private TriggerEvent(trigger: EventTrigger) {
            console.log(trigger.event.name + " event triggered");
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