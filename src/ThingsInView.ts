module Waves {

    export class ThingsInView {

        private _game: Game;
        boatSide: Phaser.Point;

        private get game(): Game {
            return this._game;
        }

        constructor(game: Game, boatSide: Phaser.Point) {
            this._game = game;
            this.boatSide = boatSide;

            (<Game>this.game).model.world.thingEventCallback = this.thingEventCallback.bind(this);
        }   

        thingsInView: ThingPosition[] = new Array<ThingPosition>();

        thingEventCallback(thing: Thing, position: number) {
            if (this.game == null)
                alert("null game");
            var item: InventoryItem = new InventoryItem(this.game, 600, 400, "thing");
            item.setDrag(false);
            this.thingsInView.push(new ThingPosition(thing, position, item));
        }

        update() {
            this.thingsInView.forEach((value: ThingPosition, index: number, array: ThingPosition[]) => void this.updateThingInWater(value));
        }

        updateThingInWater(thingPosition: ThingPosition) {
            var relativePosition: number = thingPosition.position - (<Game>this.game).model.world.position;
            if (relativePosition <= 0) {
                relativePosition = 0;
                thingPosition.inventoryItem.setDrag(true);
            }
            thingPosition.inventoryItem.position.x = this.boatSide.x + relativePosition
            thingPosition.inventoryItem.position.y = this.boatSide.y - relativePosition
        }

        removeThingInWater(thingPosition: ThingPosition) {
            if (this.thingsInView.indexOf(thingPosition) >= 0)
                this.thingsInView.splice(this.thingsInView.indexOf(thingPosition));
            else
                throw new Error("ThingPosition not found");
        }

    }
}