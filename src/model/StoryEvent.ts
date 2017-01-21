module Waves {

    export class StoryEvent {

        constructor(name: string, description: string) {
            this._name = name;
            this._description = description;
        }

        private _name: string;
        public get name(): string {
            return this._name;
        }

        private _description: string;
        public get description(): string {
            return this._description;
        }

    }


    export class FlyingFishStoryEvent extends StoryEvent
    {
        constructor()
        {
            super("Flying Fish", "You see some totally sweet flying fish.");
        }


    }
}