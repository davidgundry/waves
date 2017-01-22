module Waves {

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
            this.game.load.image("plastic-bag", "assets/plastic-bag.png");
            this.game.load.image("sail", "assets/sail.png");

            this.game.load.image("plank", "assets/plank.png");
            this.game.load.image("oar", "assets/oar.png");
            this.game.load.image("corpse", "assets/corpse.png");

            this.game.load.image("motor", "assets/motor.png");
            this.game.load.image("fuel", "assets/fuel.png");

            this.game.load.image("rod", "assets/rod.png");
            this.game.load.image("hat", "assets/hat.png");
            this.game.load.image("ship-in-bottle", "assets/ship-in-bottle.png");
            this.game.load.image("duck", "assets/duck.png");
            this.game.load.image("chest", "assets/chest.png");
            this.game.load.image("food", "assets/food.png");
            this.game.load.image("barrel", "assets/barrel.png");

            this.game.load.image("inUse", "assets/InUse.png");
            this.game.load.image("inventory", "assets/inventory.png");
            this.game.load.image("person", "assets/placeholderMan.png");
            
            this.game.load.image("sea1", "assets/sea-top.png");
            this.game.load.image("sea2", "assets/sea-middle.png");
            this.game.load.image("sea3", "assets/sea-bottom.png");
            this.game.load.image("boat", "assets/boat1.png");



        }

        create() {
            super.create();
            this.stage.backgroundColor = 0xffffff; // white
            this.game.state.start('MainGame', true, false);

        }



    }

}  