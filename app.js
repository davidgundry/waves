var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        this.SAFE_ZONE_WIDTH = 800;
        this.SAFE_ZONE_HEIGHT = 480;
        _super.call(this, this.SAFE_ZONE_WIDTH, this.SAFE_ZONE_HEIGHT, Phaser.CANVAS, 'game');
        this.state.add('Boot', Boot, false);
        this.state.add('Preloader', Preloader, false);
        this.state.add('MainGame', MainGame, false);
        this.state.start('Boot');
    }
    return Game;
})(Phaser.Game);
exports.Game = Game;
var SimpleGame = (function () {
    function SimpleGame() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create });
    }
    SimpleGame.prototype.preload = function () {
        this.game.load.image('logo', 'assets/phaser-logo-small.png');
    };
    SimpleGame.prototype.create = function () {
        var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        logo.anchor.setTo(0.5, 0.5);
    };
    return SimpleGame;
})();
window.onload = function () {
    var game = new Game();
};
//# sourceMappingURL=app.js.map