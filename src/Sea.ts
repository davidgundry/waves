module Waves {

    export class Sea extends Phaser.Group {
        maskSprite: Phaser.Sprite;
        numberOfStrips: number = 3;
        width: number = 640;
        height: number = 330;
        strips: Array<Phaser.Sprite>;

        constructor(game: Phaser.Game, newX: number, newY:number) {
            super(game);
            this.position.x = newX;
            this.position.y = newY;
            this.createMask();
        }
        addSeaStrips() {
            this.strips = [];
            var y = 0;
            for (var i = 1; i <= this.numberOfStrips; i++) {
                var strip: Phaser.Sprite = this.create(0, y, "sea" + i);
                y += strip.height;
                this.strips.push(strip);
            }
        }


        createMask() {
            var mask = this.game.add.graphics(0, 100);

            //  Shapes drawn to the Graphics object must be filled.
            mask.beginFill(0xffffff);

            //  Here we'll draw a rectangle for each group sprite
            mask.drawRect(0, 0, this.width, this.height);
           // mask.drawRect(330, 0, 140, 200);
            //mask.drawRect(530, 0, 140, 200);

            //  And apply it to the Group itself
            this.mask = mask;
        }
        



    }

}       