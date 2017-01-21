module Waves {

    export class WorldState {

        static STARTING_MILES: number = 50;
        private _milesRemaining: number = WorldState.STARTING_MILES;

        public get milesRemaining(): number {
            return this._milesRemaining;
        }

        private _triggers: Trigger[] = new Array<Trigger>();

        private get triggers(): Trigger[] {
            return this._triggers;
        }

        private _thingsInView: ThingPosition[] = new Array <ThingPosition>();

        public get thingsInView(): ThingPosition[] {
            return this._thingsInView;
        }

        constructor() {
            this.triggers.push(new ThingTrigger(40, new Thing("paddle")));
            this.triggers.push(new EventTrigger(45));
        }

        public MoveDistance(miles: number) {
            this._milesRemaining -= miles;
            this.CheckTriggers(this.milesRemaining);
        }

        public PickedUpThing(thingPosition: ThingPosition) {
            if (this.thingsInView.indexOf(thingPosition) >=0)
                this.thingsInView.splice(this.thingsInView.indexOf(thingPosition));
            else
                throw new Error("Thing not found");
        }
        
        private CheckTriggers(position: number) {
           this.triggers.forEach((value: Trigger, index: number, array: Trigger[]) => void this.CheckTrigger(value, position));
        }

        private CheckTrigger(trigger: Trigger, position: number) {
            if (trigger.position >= position) {
                if (trigger instanceof EventTrigger)
                    this.TriggerEvent(trigger as EventTrigger);
                else if (trigger instanceof ThingTrigger)
                    this.TriggerThing(trigger as ThingTrigger);
                this.RemoveTrigger(trigger);
            }
        }

        private RemoveTrigger(trigger: Trigger) {
            this.triggers.splice(this.triggers.indexOf(trigger));
        }

        private TriggerEvent(trigger: EventTrigger) {
            console.log("Event Triggered");
        }

        private TriggerThing(trigger: ThingTrigger) {
            this.thingsInView.push(new ThingPosition(trigger.thing, trigger.position));
            console.log("Thing Triggered");
        }





    }

}