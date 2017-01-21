var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Waves;
(function (Waves) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.apply(this, arguments);
        }
        Preloader.prototype.preload = function () {
            _super.prototype.preload.call(this);
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
        };
        Preloader.prototype.create = function () {
            _super.prototype.create.call(this);
            this.stage.backgroundColor = 0xEEEEEE; // light grey
            this.game.state.start('MainGame', true, false);
        };
        return Preloader;
    })(Phaser.State);
    Waves.Preloader = Preloader;
})(Waves || (Waves = {}));
//# sourceMappingURL=Preloader.js.map