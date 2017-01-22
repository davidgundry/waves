module Waves {

    export class Boat extends Phaser.Group {
        noSail: Phaser.Sprite;
        sail: Phaser.Sprite;

      
        constructor(game: Phaser.Game, newX: number, newY: number) {
            super(game);
            this.position.x = newX;
            this.position.y = newY;
            this.noSail = this.create(0, 0, "boat");
            this.sail = this.create(0, 0, "boatWithSail");
            this.game.add.tween(this).to({ rotation: -0.03 }, 1000, "Sine.easeInOut", true, 0, -1, true);
        }
        setSail(isSail: boolean) {
            this.sail.visible = isSail;
            this.noSail.visible = !isSail;
        }
        
       




    }

}       