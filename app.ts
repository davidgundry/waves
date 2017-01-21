module Waves {
    export class Game extends Phaser.Game {
        SAFE_ZONE_WIDTH: number;
        SAFE_ZONE_HEIGHT: number;
        static pausePlay: boolean; // we may need this later

        constructor() {
            super(800, 480, Phaser.CANVAS, 'game');

            this.state.add('Boot', Boot, false);
            this.state.add('Preloader', Preloader, false);
            this.state.add('MainGame', MainGame, false);
            this.state.start('Boot');
        }

    }

}


window.onload = () => {

    var game = new Waves.Game();

};