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



class SimpleGame {

    constructor() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create });
    }

    game: Phaser.Game;

    preload() {
        this.game.load.image('logo', 'assets/phaser-logo-small.png');
    }

    create() {
        var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        logo.anchor.setTo(0.5, 0.5);
    }

}

window.onload = () => {

    var game = new Game();

};