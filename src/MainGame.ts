module Waves {

    export class MainGame extends Phaser.State {

        
        mainButton: Button;

        create() {
            super.create();
            this.mainButton = new Button(this.game, "Paddle with your hands")
            alert("calling main game");
          
        }


       
        update() {

        }


    }

}   