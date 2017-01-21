module Waves {

    export class WorldState {

        static STARTING_MILES: number = 50;
        private _milesRemaining: number = WorldState.STARTING_MILES;

        public get milesRemaining(): number {
            return this._milesRemaining;
        }

        public MoveDistance(miles: number) {
            this._milesRemaining -= miles;
        }


    }

}