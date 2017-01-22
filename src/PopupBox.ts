module Waves {

    export class PopupBox extends Phaser.Group {

        callback: Function;
        dropTween: Phaser.Tween;
        autoRemove: boolean;
        showing: boolean;
        //constants
        boxWidth: number;// = 300;
        boxHeight: number;// = 200;

        constructor(game: Phaser.Game) {
            super(game);
            this.boxWidth = 600;
            this.boxHeight = 400;
            this.drawBox();
            this.visible = false;
            this.showing = false;
        }

        drawBox() {
            var boxSprite: Phaser.Sprite = this.game.add.sprite(0, 0);
            var graphics: Phaser.Graphics = this.game.add.graphics(0, 0);
            boxSprite.addChild(graphics);
            graphics.lineStyle(1, 0x000000, 1);
            graphics.beginFill(0xffffff, 1);
            graphics.drawRect(0, 0, this.boxWidth, this.boxHeight);
            graphics.endFill();
            this.addChild(boxSprite);
        }

        drop(newCallback: Function = null) {
            if (!this.showing) {
                this.callback = newCallback;
                this.x = (this.game.world.width - this.boxWidth) / 2;
                this.y = 0;
                this.visible = true;
                this.showing = true;
                this.dropTween = this.game.add.tween(this);
                this.dropTween.to({ y: (this.game.world.height - this.boxHeight) / 2 }, 500, Phaser.Easing.Cubic.Out);
                this.dropTween.start();
            }
        }

        doneDrop() {
            if (this.callback) {
                this.callback();
            }
        }
        hideMessage() {
            this.showing = false;
            this.visible = false;
            this.doneDrop();
        }


    }

}        