module Waves {

    export class ChoiceAction {
        response: string;
        callBack: Function;

        constructor(newResponse: string) {
            this.response = newResponse;
        }
    }

    export class StoryEvent {

        constructor(name: string, description: string, button1: string, button2: string, onB1: ChoiceAction, onB2: ChoiceAction = null) {
            this._name = name;
            this._description = description;
            this._button1 = button1;
            this._button2 = button2;
            this._onB1 = onB1;
            this._onB2 = onB2;
        }

        private _name: string;
        public get name(): string {
            return this._name;
        }

        private _description: string;
        public get description(): string {
            return this._description;
        }
        private _button1: string;
        public get button1(): string {
            return this._button1;
        }
        private _button2: string;
        public get button2(): string {
            return this._button2;
        }
        protected _onB1: ChoiceAction
        public get onB1(): string {
            return this._button1;
        }
        protected _onB2: ChoiceAction;
        public get onB2(): string {
            return this._button2;
        }
       

    }


    export class FlyingFishStoryEvent extends StoryEvent
    {
        constructor()
        {
            super("Flying Fish", "You see some totally sweet flying fish.","Try and catch them","Marvel", new ChoiceAction("You waste time and energy"),new ChoiceAction("You feel this is a beautiful world"));
        }


    }
    export class LandStoryEvent extends StoryEvent {
        constructor() {
            super("You've reached land", "You did it, you've reached land and survived.", "Rejoice", "", new ChoiceAction(""));
            this._onB1.callBack = this.onLand.bind(this);
        }
        onLand() {
            alert("Finished");
            // reset some home
        }


    }
}