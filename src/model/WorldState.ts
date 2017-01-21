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
            //this.triggers.forEach({ if(true) this.TriggerEvent();
        //})
        }

        public ThingsInView(): ThingPosition[] {
            return null;
        }



    }

}