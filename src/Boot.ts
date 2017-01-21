module Waves {

    export class Boot extends Phaser.State {
        orientated: boolean = false;

        preload() {
            super.preload();
            this.load.image('preloadBar', 'assets/whiteLoadBar.png');

        }

        create() {
            super.create();

            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = true;

            if (this.game.device.desktop) {
                this.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
                this.scale.pageAlignHorizontally = true;
                this.scale.pageAlignVertically = true;
            }
            else {

                this.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;
                this.scale.pageAlignHorizontally = true;
                this.scale.pageAlignVertically = true;
                this.scale.refresh();
                var gameElement: HTMLElement = document.getElementById('game');
                gameElement.style.overflow = "visible";
            }

            this.game.state.start('Preloader', true, false);
        }

    };

}
