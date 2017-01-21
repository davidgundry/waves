module Waves {

    export class ThingsInView {

        private _game: Game;
        private _boatSide: Phaser.Point;
        private _boatFrontSide: Phaser.Point;
        private static THING_ORIGIIN: Phaser.Point = new Phaser.Point(800, 300)
        private _dropHandler: Function;

        private thingsInView: ThingPosition[] = new Array<ThingPosition>();

        private get game(): Game {
            return this._game;
        }

        private get boatSide(): Phaser.Point {
            return this._boatSide;
        }

        private get boatFrontSide(): Phaser.Point {
            return this._boatFrontSide;
        }


        constructor(game: Game, dropHandler: Function, boatSide: Phaser.Point, boatFrontSide: Phaser.Point) {
            this._game = game;
            this._boatSide = boatSide;
            this._boatFrontSide = boatFrontSide;
            this._dropHandler = dropHandler;

            (<Game>this.game).model.world.thingEventCallback = this.thingEventCallback.bind(this);
        }   


        thingEventCallback(thing: Thing, position: number) {
            this.addThingInView(thing, position);
        }

        update() {
            this.thingsInView.forEach((value: ThingPosition, index: number, array: ThingPosition[]) => void this.updateThingInView(value));
        }

        addThingInView(thing: Thing, position: number) {
            var screenPosition: Phaser.Point = this.screenPosition(position);
            var item: InventoryItem = new InventoryItem(this.game, screenPosition.x, screenPosition.y, this._dropHandler, new Thing("thing"));
            item.setDrag(false);
            this.thingsInView.push(new ThingPosition(thing, position, item));
        }

        proportionalDistance(position: number): number {
            var relativePosition: number = position - (<Game>this.game).model.world.position;
            if (relativePosition <= 0) {
                relativePosition = 0;
            }

            var rPos : number = (relativePosition / WorldState.LEAD_DISTANCE);
            return 1-(Math.pow(100, 1-rPos) - 1) / 100;
        }

        screenPosition(position: number): Phaser.Point{
            var proportion: number = this.proportionalDistance(position);
            return new Phaser.Point(proportion * (ThingsInView.THING_ORIGIIN.x - this.boatFrontSide.x) + this.boatFrontSide.x, proportion * (ThingsInView.THING_ORIGIIN.y - this.boatFrontSide.y) + this.boatFrontSide.y);
        }

        isAlongside(thingPosition: ThingPosition) : boolean {
            var relativePosition: number = thingPosition.position - (<Game>this.game).model.world.position;
            return (relativePosition <= 0)
        }

        updateThingInView(thingPosition: ThingPosition) {
            var screenPosition: Phaser.Point = this.screenPosition(thingPosition.position);
            thingPosition.inventoryItem.position.x = screenPosition.x;
            thingPosition.inventoryItem.position.y = screenPosition.y;
            var proportionalDistance: number = this.proportionalDistance(thingPosition.position);
            thingPosition.inventoryItem.scale = new Phaser.Point(1 - proportionalDistance, 1 - proportionalDistance);

            if (this.isAlongside(thingPosition)) {

                thingPosition.inventoryItem.setDrag(true);
                thingPosition.inventoryItem.position.x = this.boatSide.x;
                thingPosition.inventoryItem.position.y = this.boatSide.y;
                this.removeThingInView(thingPosition);
            }
        }

        removeThingInView(thingPosition: ThingPosition) {
            if (this.thingsInView.indexOf(thingPosition) >= 0)
                this.thingsInView.splice(this.thingsInView.indexOf(thingPosition));
            else
                throw new Error("ThingPosition not found");
        }

    }
}