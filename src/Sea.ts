module Waves {

    export class Sea extends Phaser.Group {
        maskSprite: Phaser.Sprite;
        numberOfStrips: number = 3;
        maskWidth: number = 640;
        maskHeight: number = 330;
        strips: Array<Phaser.Sprite>;
        boundsRect: Phaser.Rectangle;

        constructor(game: Phaser.Game, newX: number, newY:number) {
            super(game);
            this.position.x = newX;
            this.position.y = newY;
            
            this.addSeaStrips();
            this.createMask();
            this.boundsRect = new Phaser.Rectangle(this.position.x, this.position.y, this.width, this.height);
        }
        addSeaStrips() {
          
            
            this.strips = [];
            var y = 0;
            for (var i = 1; i <= this.numberOfStrips; i++) {
                var strip: Phaser.Sprite = this.create(0, y, "sea"+i);
                y += strip.height;

                this.strips.push(strip);
            }
        }


        createMask() {
            var mask = this.game.add.graphics(0, 0,this);

            //  Shapes drawn to the Graphics object must be filled.
            mask.beginFill(0xffffff);

            //  Here we'll draw a rectangle for each group sprite
            mask.drawRect(0, 0, this.maskWidth, this.maskHeight*2); // no idea why it has to be height *2
           // mask.drawRect(330, 0, 140, 200);
            //mask.drawRect(530, 0, 140, 200);

            //  And apply it to the Group itself
            this.mask = mask;
        }
        thrownIntheSea(item: InventoryItem):boolean {
            var x: number = item.position.x;
            var y: number = item.position.y;
            return this.boundsRect.contains(x, y);
        }
        update() {
           
            for (var i = 0; i < this.numberOfStrips; i++) {
                this.strips[i].position.x -=  (i+1)/25
                if ((this.strips[i].position.x + this.strips[i].width) < this.maskWidth) {
                    this.strips[i].position.x = 0;
                }
            }
        }
        



    }

}       