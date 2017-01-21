module Waves {

    export class WorldState {

        STARTING_MILES: number = 50;
        private _milesRemaining: number = STARTING_MILES;

        public get milesRemaining(): number {
            return _milesRemaining;
        }

        public MoveDistance(miles: number) {
            _milesRemaining -= miles;
        }


    }

}