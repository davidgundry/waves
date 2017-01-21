﻿module Waves {

    export class Preloader extends Phaser.State {

        preloadBar: Phaser.Sprite;
        textLoader: Phaser.Text;

        preload() {
            super.preload();

            //
            this.textLoader = this.game.add.text(this.world.centerX, this.world.centerY / 6, "Loading...", { font: "30px Arial", fill: '#00f', align: 'center' });
            this.textLoader.anchor.set(0.5, 0.5);
            //  Set-up our preloader sprite
            this.preloadBar = this.game.add.sprite(this.world.centerX, this.world.centerY / 3, 'preloadBar');

            this.preloadBar.anchor.setTo(0.5, 0.5);

            this.load.setPreloadSprite(this.preloadBar);


            //  Load our actual games assets

            //this.game.load.image('particle', 'assets/particle.png');
           // this.game.load.text('mainText', 'text/NorwoodBuilder.txt');


        }

        create() {
            super.create();
            this.stage.backgroundColor = 0xEEEEEE; // light grey
            this.game.state.start('MainGame', true, false);

        }



    }

}  