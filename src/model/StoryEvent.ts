module Waves {

    export class ChoiceAction {
        response: string;
        healthChange: number = 0;
        positionChange: number = 0;
        waterChange: number = 0;
        foodChange: number = 0;
        endGame: boolean = false;
        callBack: Function;

        constructor(newResponse: string) {
            this.response = newResponse;
        }
        changeWorld(world: WorldState) {
            world.health += this.healthChange;
            world.position += this.positionChange;
            world.water += this.waterChange;
            world.food += this.foodChange;
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
        public get onB1(): ChoiceAction {
            return this._onB1;
        }
        protected _onB2: ChoiceAction;
        public get onB2(): ChoiceAction {
            return this._onB2;
        }
       

    }


    export class FlyingFishStoryEvent extends StoryEvent
    {
        constructor() {
            super("Flying Fish", "You see some totally sweet flying fish.", "Try and catch them", "Marvel", new ChoiceAction("You waste time and energy"), new ChoiceAction("You feel this is a beautiful world"));
            this._onB1.healthChange = -10;
        }
    }

    export class NightTimeStoryEvent extends StoryEvent {
        constructor() {
            super("Night Falls", "It's getting dark", "Sleep", "Keep going", new ChoiceAction("You wake up refreshed"), new ChoiceAction("You keep going"));
            this._onB1.healthChange = +10;
            this._onB1.foodChange = -5;
            this._onB1.waterChange = -10;
        }
    }

    export class SailingStoryEvent extends StoryEvent {
        constructor() {
            super("", "You decide you don't like sailing any more.", "It sucks.", "", new ChoiceAction(""));
        }
    }

    export class WonderStoryEvent extends StoryEvent {
        constructor() {
            super("", "You wonder if your family misses you", "Yeah", "No", new ChoiceAction("Yeah, they probably do"), new ChoiceAction("They probably haven't noticed"));
        }
    }

    export class SharksStoryEvent extends StoryEvent {
        constructor() {
            super("Sharks", "You see some sharks", "Cool", "", new ChoiceAction("Oh no! They shoot lasers at your from their eyes!"));
            this._onB1.healthChange = -10;
        }
    }




    export class LandStoryEvent extends StoryEvent {
        constructor() {
            super("You've reached land", "You did it, you've reached land and survived.", "Rejoice", "", new ChoiceAction(""));
            this._onB1.endGame = true;
        }
    }
    export class DeathEvent extends StoryEvent {
        constructor() {
            super("You died", "You died of hunger and thirst. You'll float on the sea forever", "Try again", "", new ChoiceAction(""));
            this._onB1.endGame = true;
        }
    }
    export class StartEvent extends StoryEvent {
        constructor() {
            super("You're cast adrift", "You're in boat 48 miles from land. Can you get back to dry land", "Maybe not", "", new ChoiceAction(""));
        }
    }
}