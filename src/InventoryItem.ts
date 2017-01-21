module Waves {
   
    export class InventoryItem extends Phaser.Group {
        baseSprite: Phaser.Sprite;

        constructor(game: Phaser.Game,  newX: number, newY: number,spriteName:string) {
            super(game);
            this.baseSprite = this.create(0, 0, spriteName);
            this.position.x = newX;
            this.position.y = newY;
            this.setDrag(true)
        }
        setDrag(isEnabled: boolean) {
            this.baseSprite.inputEnabled = isEnabled;
            if (isEnabled) {
                this.baseSprite.input.enableDrag();
                this.baseSprite.events.onDragStart.add(this.onDragStart.bind(this), this);
                this.baseSprite.events.onDragStop.add(this.onDragStart.bind(this), this);
            } else {
                this.baseSprite.input.disableDrag();
            }
           
        }
        onDragStart() {
       

        }
        onDragStop() {
            this.position.x = this.baseSprite.position.x;
            this.position.y = this.baseSprite.position.y;
            this.baseSprite.position.x = 0;
            this.baseSprite.position.y = 0;
        }



    }

}       