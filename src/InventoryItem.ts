module Waves {
   
    export class InventoryItem extends Phaser.Group {
        baseSprite: Phaser.Sprite;
        lastPos: Phaser.Point;
        dropped: Phaser.Signal;
        inventorySlot: number;
        inUseSprite: Phaser.Sprite;
        baseThing: Thing;
        inventory: Inventory;
        private _isUsed: boolean = false;

        constructor(game: Phaser.Game, inventory: Inventory, newX: number, newY: number, dropHandler: Function, thing: Thing) {
            super(game);
            this.baseThing = thing;
            thing.inventoryItem = this;
            this.baseSprite = this.create(0, 0, thing.spriteName);
            this.baseSprite.anchor.setTo(0.5, 0.5);
            this.inUseSprite = this.create(0, 0, "inUse");
            this.inUseSprite.anchor.setTo(0.5, 0.5);
            this.inUseSprite.visible = false;
            this.position.x = newX;
            this.position.y = newY;
            this.dropped = new Phaser.Signal();
            this.dropped.add(dropHandler);
            this.inventorySlot = null;
            this.setDrag(true)
            this.inventory = inventory;
        }
        setDrag(isEnabled: boolean) {
            this.baseSprite.inputEnabled = isEnabled;
            if (isEnabled) {
                this.baseSprite.input.enableDrag();
                this.baseSprite.events.onDragStart.removeAll();
                this.baseSprite.events.onDragStart.add(this.onDragStart.bind(this), this);
                this.baseSprite.events.onDragStop.removeAll();
                this.baseSprite.events.onDragStop.add(this.onDragStop.bind(this), this);
                this.baseSprite.events.onInputUp.removeAll();
                this.baseSprite.events.onInputUp.add(this.onClick.bind(this), this);

            } else {
                this.baseSprite.input.disableDrag();
            }
           
        }
        onClick() {
            if (this.inventorySlot !== null) {
                if (this.isUsed)
                {
                    this.inventory.setHandsInUse();
                    this.setInUse(false)
                }
                else
                {
                    this.inventory.SetInUse(this.baseThing);
                    this.setInUse(true)
            }
            }
        }
        get isUsed(): boolean {
            return this._isUsed;
        }
        setInUse(isUsed: boolean) {
            console.log(isUsed+" item set in use " + this.baseThing.displayName);
            this._isUsed = isUsed;
            this.inUseSprite.visible = isUsed;
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
        sink() {
            this.game.add.tween(this.position).to({ y: 1000 }, 2000, "Sine.easeIn", true);
        }



    }

}       