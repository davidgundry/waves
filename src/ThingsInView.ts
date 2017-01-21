module Waves {

    export class ThingsInView {

        private _game: Game;
        private _boatSide: Phaser.Point;
        private _thingOrigin: Phaser.Point;

        private thingsInView: ThingPosition[] = new Array<ThingPosition>();

        private get game(): Game {
            return this._game;
        }

        private get boatSide(): Phaser.Point {
            return this._boatSide;
        }

        constructor(game: Game, thingOrigin: Phaser.Point, boatSide: Phaser.Point) {
            this._game = game;
            this._boatSide = boatSide;
            this._thingOrigin = thingOrigin;

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
            var item: InventoryItem = new InventoryItem(this.game, screenPosition.x, screenPosition.y, "thing");
            item.setDrag(false);
            this.thingsInView.push(new ThingPosition(thing, position, item));
        }

        screenPosition(position: number): Phaser.Point{
            var relativePosition: number = position - (<Game>this.game).model.world.position;
            if (relativePosition <= 0) {
                relativePosition = 0;
            }

            var proportion: number = (relativePosition / WorldState.LEAD_DISTANCE);

            return new Phaser.Point(proportion * (this._thingOrigin.x - this.boatSide.x) + this.boatSide.x, proportion * (this._thingOrigin.y - this.boatSide.y) + this.boatSide.y);
        }

        isAlongside(thingPosition: ThingPosition) : boolean {
            var relativePosition: number = thingPosition.position - (<Game>this.game).model.world.position;
            return (relativePosition <= 0)
        }

        updateThingInView(thingPosition: ThingPosition) {
            if (this.isAlongside(thingPosition))
                thingPosition.inventoryItem.setDrag(true);

            var screenPosition: Phaser.Point = this.screenPosition(thingPosition.position);
            thingPosition.inventoryItem.position.x = screenPosition.x;
            thingPosition.inventoryItem.position.y = screenPosition.y;
        }

        removeThingInView(thingPosition: ThingPosition) {
            if (this.thingsInView.indexOf(thingPosition) >= 0)
                this.thingsInView.splice(this.thingsInView.indexOf(thingPosition));
            else
                throw new Error("ThingPosition not found");
        }

    }
}