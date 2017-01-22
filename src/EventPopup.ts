/// <reference path="PopupBox.ts" />
module Waves {

    export class EventPopup extends PopupBox {
       title: Phaser.Text;
        bodyText: Phaser.Text;
        callback: Function;
        dropTween: Phaser.Tween;
        autoRemove: boolean;
        button1: Button;
        button2: Button;
        showing: boolean;
        //constants
        boxWidth: number;// = 300;
        boxHeight: number;// = 200;


        constructor(game: Phaser.Game) {
            super(game);

           this.createButtons();
          this.createText();

        }
        setListeners(on1: Function, on2: Function, context) {
            this.button1.pressed.removeAll(context);
            this.button2.pressed.removeAll(context);
            if (on1)
                this.button1.pressed.add(on1, context);
            if (on2)
                this.button2.pressed.add(on2, context);
        }

        createButtons() {
            this.button1 = new Button(this.game, "1",150,50);
            this.button2 = new Button(this.game, "2",150,50);
            this.addChild(this.button1);
            this.addChild(this.button2);
            this.button1.position.setTo(100, this.boxHeight * .8);
            this.button2.position.setTo(300, this.boxHeight * .8);
        }

        createText() {
            this.title = this.game.add.text(this.boxWidth / 2, 30, "Title here", { font: "60px biro_script_reducedregular", fill: '#000', align: 'centre', wordWrap: true, wordWrapWidth: 500}, this);
            this.title.anchor.set(0.5, 0);
            this.bodyText = this.game.add.text(this.boxWidth / 2, this.boxHeight / 3, "Body text here", { font: "30px biro_script_reducedregular", fill: '#000', align: 'centre', wordWrap: true, wordWrapWidth: 500 }, this);
            this.bodyText.anchor.set(0.5, 0);
        }
        show(titleText: string, bodyText: string, button1: string, button2: string, newCallback: Function = null) {
            if (!this.showing) {
                this.setText(titleText, bodyText, button1, button2);

            }
            super.drop(newCallback);

        }
        setText(titleText: string, bodyText: string, button1: string, button2: string) {
            this.button2.visible = false;
            this.title.text = titleText;
            this.bodyText.text = bodyText;
            this.button1.setButtonText(button1);
            if (button2 !== "") {
                this.button2.visible = true;
                this.button2.setButtonText(button2);
            }
          
        }
      

    }

}        