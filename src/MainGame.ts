module Waves {

    export class MainGame extends Phaser.State {

        
        mainButton: Button;
        milesDisplay: Phaser.Text;
        person: Phaser.Group;//InventoryItem;
        sea: Sea;
        thingsInView: ThingPosition[] = new Array<ThingPosition>();
        boat: Boat;

        create() {
            super.create();
            this.mainButton = new Button(this.game, "Paddle with your hands")
            this.mainButton.pressed.add(this.onPress.bind(this));
            this.milesDisplay = this.game.add.text(300, 10, "Testing 12 12", { font: "30px Arial", fill: '#00f', align: 'right' })
            this.updateMiles();
           // this.person = new InventoryItem(this.game, 100, 100, 'person');
            this.sea = new Sea(this.game, 320, 280);
            this.boat = new Boat(this.game, 550, 500);
            (<Game>this.game).model.world.thingEventCallback = this.thingEventCallback.bind(this);
          
        }

        onPress() {
            //alert("pressed");
            (<Game>this.game).model.world.MoveDistance(1);
            this.updateMiles();
            this.updateThingsInWater();
        }

        updateMiles() {
            this.milesDisplay.text = "You are " + (<Game>this.game).model.world.milesRemaining + " miles from land";
        }

        thingEventCallback(thing: Thing, position: number) {
            if (this.game == null)
                alert("null game");
            var item: InventoryItem = new InventoryItem(this.game, 600, 400, "thing");
            item.setDrag(false);
            this.thingsInView.push(new ThingPosition(thing, position, item));
        }

        updateThingsInWater() {
            this.thingsInView.forEach((value: ThingPosition, index: number, array: ThingPosition[]) => void this.updateThingInWater(value));
        }

        updateThingInWater(thingPosition: ThingPosition) {
            var relativePosition: number = thingPosition.position - (<Game>this.game).model.world.position;
            if (relativePosition <= 0) {
                relativePosition = 0;
                thingPosition.inventoryItem.setDrag(true);
            }
            thingPosition.inventoryItem.position.x = this.boat.position.x + this.boat.width + relativePosition
            thingPosition.inventoryItem.position.y = this.boat.position.y + this.boat.height - relativePosition
        }

        removeThingInWater(thingPosition: ThingPosition) {
            if (this.thingsInView.indexOf(thingPosition) >= 0)
                this.thingsInView.splice(this.thingsInView.indexOf(thingPosition));
            else
                throw new Error("ThingPosition not found");
        }

       
        update() {
           this.sea.update();
        }


    }

}   