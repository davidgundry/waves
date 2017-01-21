module Waves {

    export class MainGame extends Phaser.State {

        
        mainButton: Button;
        milesDisplay: Phaser.Text;
        person: Phaser.Group;//InventoryItem;
        sea: Sea;

        create() {
            super.create();
            this.mainButton = new Button(this.game, "Paddle with your hands")
            this.mainButton.pressed.add(this.onPress.bind(this));
            this.milesDisplay = this.game.add.text(300, 10, "Testing 12 12", { font: "30px Arial", fill: '#00f', align: 'right' })
            this.updateMiles();
           // this.person = new InventoryItem(this.game, 100, 100, 'person');
            this.sea = new Sea(this.game,320,280);
          
        }
        onPress() {
            //alert("pressed");
            (<Game>this.game).model.world.MoveDistance(1);
            this.updateMiles();
        }
        updateMiles() {
            this.milesDisplay.text = "You are " + (<Game>this.game).model.world.milesRemaining + " miles from land";
        }

       
        update() {
           this.sea.update();
        }


    }

}   