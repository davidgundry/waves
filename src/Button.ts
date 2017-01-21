module Waves {

    export class Button extends Phaser.Group {
        text: Phaser.Text;
        pressed: Phaser.Signal;
        //constants
        boxWidth: number;// = 300;
        boxHeight: number;// = 200;


        constructor(game: Phaser.Game, label: string) {
            super(game);
            this.boxWidth = 100;
            this.boxHeight = 40;
            this.drawBox();
            this.createText(label);
            this.pressed = new Phaser.Signal();

        }
        drawBox() {
            var boxSprite: Phaser.Sprite = this.game.add.sprite(0, 0);
            var graphics: Phaser.Graphics = this.game.add.graphics(0, 0);
            boxSprite.addChild(graphics);
            graphics.lineStyle(1, 0x000000, 1);
            graphics.beginFill(0x333333, 1);
            graphics.drawRect(0, 0, this.boxWidth, this.boxHeight);
            graphics.endFill();
            this.addChild(boxSprite);
            boxSprite.inputEnabled = true;
            boxSprite.input.priorityID = 2;
            boxSprite.events.onInputDown.add(this.onPressed, this);

        }
        createText(label: string) {
            this.text = this.game.add.text(10, this.boxHeight / 2, label, { font: "20px Arial", fill: '#00f', align: 'left' }, this);
            this.text.anchor.set(0, 0.5);

        }
        onPressed() {
            //alert("button " + this.text.text + " pressed");
            this.pressed.dispatch();
        }




    }

}        