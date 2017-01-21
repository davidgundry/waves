module Waves {
   
    export class InventoryItem extends Phaser.Group {
        baseSprite: Phaser.Sprite;
        lastPos: Phaser.Point;
        dropped: Phaser.Signal;
        inventorySlot: number;

        constructor(game: Phaser.Game,  newX: number, newY: number,spriteName:string) {
            super(game);
            this.baseSprite = this.create(0, 0, spriteName);
            this.baseSprite.anchor.setTo(0.5, 0.5);
            this.position.x = newX;
            this.position.y = newY;
            this.dropped = new Phaser.Signal();
            this.inventorySlot = null;
            this.setDrag(true)
        }
        setDrag(isEnabled: boolean) {
            this.baseSprite.inputEnabled = isEnabled;
            if (isEnabled) {
                this.baseSprite.input.enableDrag();
                this.baseSprite.events.onDragStart.add(this.onDragStart.bind(this), this);
                this.baseSprite.events.onDragStop.add(this.onDragStop.bind(this), this);
            } else {
                this.baseSprite.input.disableDrag();
            }
           
        }
        onDragStart() {
            this.lastPos = new Phaser.Point(this.position.x, this.position.y);

        }
        onDragStop() {
            this.position.x = this.baseSprite.worldPosition.x;
            this.position.y = this.baseSprite.worldPosition.y;
            this.baseSprite.position.x = 0;
            this.baseSprite.position.y = 0;
            this.dropped.dispatch({ dropItem: this });
        }
        returnToPlace() {
            this.game.add.tween(this.position).to({ x: this.lastPos.x, y: this.lastPos.y }, 1000, "Sine.easeIn",true);
        }



    }

}       