var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Waves;
(function (Waves) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, 800, 480, Phaser.CANVAS, 'game');
            this.state.add('Boot', Waves.Boot, false);
            this.state.add('Preloader', Waves.Preloader, false);
            this.state.add('MainGame', Waves.MainGame, false);
            this.state.start('Boot');
        }
        return Game;
    })(Phaser.Game);
    Waves.Game = Game;
})(Waves || (Waves = {}));
/*

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

}*/
window.onload = function () {
    var game = new Waves.Game();
};
//# sourceMappingURL=app.js.map