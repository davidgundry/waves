module Waves {

    export class WorldState {

        static STARTING_MILES: number = 50;
        private _milesRemaining: number = WorldState.STARTING_MILES;

        public get milesRemaining(): number {
            return this._milesRemaining;
        }

      

      

        constructor() {
            this.triggers.push(new ThingTrigger(40, new Thing("paddle")));
            this.triggers.push(new EventTrigger(45, new FlyingFishStoryEvent()));
        }

        public MoveDistance(miles: number) {
            this._milesRemaining -= miles;
            this.CheckTriggers(this.milesRemaining);
        }

        private _triggers: Trigger[]= new Array<Trigger>();
        
        private get triggers(): Trigger[] {
            return this._triggers;
        }
        
        private CheckTriggers(position: number) {
           this.triggers.forEach((value: Trigger, index: number, array: Trigger[]) => void this.CheckTrigger(value, position));
        }

        private _thingsInView: ThingPosition[] = new Array<ThingPosition>();

        public get thingsInView(): ThingPosition[] {
            return this._thingsInView;
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
            console.log(trigger.event.name + " event triggered");
        }

        private TriggerThing(trigger: ThingTrigger) {
            this.thingsInView.push(new ThingPosition(trigger.thing, trigger.position));
            console.log("Thing Triggered");
        }





    }

}