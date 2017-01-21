module Waves {

    export class WorldState {

        static STARTING_MILES: number = 50;
        private _milesRemaining: number = WorldState.STARTING_MILES;

        public get milesRemaining(): number {
            return this._milesRemaining;
        }

        public MoveDistance(miles: number) {
            this._milesRemaining -= miles;
            this.CheckTriggers(this.milesRemaining);
        }

        private _triggers: Trigger[];
        
        private get triggers(): Trigger[] {
            return this._triggers;
        }
        
        private CheckTriggers(position: number) {
           // this.triggers.forEach((value: Trigger, index: number, array: Trigger[]) => void { this.CheckTrigger(value, position); });
        }

        private _thingsInView: ThingPosition[];

        public get thingsInView(): ThingPosition[] {
            return this.thingsInView;
        }

        private CheckTrigger(trigger: Trigger, position: number) {
            if (trigger.position <= position) {
                if (trigger instanceof TriggerEvent)
                    this.TriggerEvent(trigger as TriggerEvent);
                else if (trigger instanceof TriggerThing)
                    this.TriggerThing(trigger as TriggerThing);
            }
        }

        private TriggerEvent(trigger: TriggerEvent) {

        }

        private TriggerThing(trigger: TriggerThing) {
            //this.thingsInView.push(trigger.thing);
        }



    }

}