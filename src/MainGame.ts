module Waves {

    export class MainGame extends Phaser.State {

        
        mainButton: Button;
        milesDisplay: Phaser.Text;

        create() {
            super.create();
            this.mainButton = new Button(this.game, "Paddle with your hands")
            this.mainButton.pressed.add(this.onPress);
            this.milesDisplay = this.game.add.text(300, 10, "Testing 12 12", { font: "30px Arial", fill: '#00f', align: 'right' })
            this.updateMiles();
          
        }
        onPress() {
            //alert("pressed");
            (<Game>this.game).model.world.MoveDistance(1);
            this.updateMiles();
        }
        updateMiles() {
            alert("Miles " + (<Game>this.game).model.world.milesRemaining);
            //this.milesDisplay.text = "You are " + (<Game>this.game).model.world.milesRemaining + " miles from land";
            this.milesDisplay.text = "You are " +5 + " miles from land";

        }

       
        update() {

        }


    }

}   