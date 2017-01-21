module Waves {

    export class MainGame extends Phaser.State {

        
        mainButton: Button;
        milesDisplay: Phaser.Text;
        person: InventoryItem;
        oar: InventoryItem;
        sea: Sea;
        thingsInView: ThingsInView;
        boat: Boat;
        inventory: Inventory;



        create() {
            super.create();
            this.mainButton = new Button(this.game, "Paddle with your hands")
            this.mainButton.pressed.add(this.onPress.bind(this));
            this.milesDisplay = this.game.add.text(300, 10, "Testing 12 12", { font: "30px Arial", fill: '#00f', align: 'right' })
            this.updateMiles();
            
            this.sea = new Sea(this.game, 320, 280);
            
            this.boat = new Boat(this.game, 550, 400);
            this.inventory = new Inventory(this.game,10, 280);
            this.person = new InventoryItem(this.game, 100, 100, this.onDrop.bind(this), 'person');
            this.oar = new InventoryItem(this.game, 200, 100, this.onDrop.bind(this),'oar');

          
            this.thingsInView = new ThingsInView((<Game>this.game), this.onDrop.bind(this),  new Phaser.Point(this.boat.x + this.boat.width, this.boat.y + this.boat.height));

        }

        onPress() {
            //alert("pressed");
            (<Game>this.game).model.world.MoveDistance(1);
            this.updateMiles();
            this.thingsInView.update();
        }
        onDrop(dropData: Object) {
            var item: InventoryItem = <InventoryItem>dropData["dropItem"]
            if (!this.inventory.acceptItem(item)) {
               item.returnToPlace();
            }
        }
        updateMiles() {
            this.milesDisplay.text = "You are " + (<Game>this.game).model.world.milesRemaining + " miles from land";
        }

        update() {
           this.sea.update();
        }


    }

}   