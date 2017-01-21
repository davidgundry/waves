module Waves {

    export class Inventory extends Phaser.Group {
        slots: Array<InventoryItem>;
        slotWidth: number = 100;
        slotHeight: number = 100;
        boundsRect: Phaser.Rectangle;

        constructor(game: Phaser.Game, newX: number, newY: number) {
            super(game);
            this.slots = [null, null, null, null, null, null, null, null, null];
            this.position.x = newX;
            this.position.y = newY;
            this.create(0, 0, "inventory");
            this.boundsRect = new Phaser.Rectangle(this.position.x, this.position.y, this.width, this.height);
        }
        acceptItem(item: InventoryItem): boolean {
            var x: number = item.position.x;
            var y: number = item.position.y;
            if (this.boundsRect.contains(x, y)) {
                var slot: number = this.getSlot(item.position.x, item.position.y);
                    if ((this.slots[slot] === null)  || (slot === item.inventorySlot)) {
                        this.setItem(item, slot);
                    var centre: Phaser.Point = this.getSlotMiddle(slot);
                    this.game.add.tween(item).to({ x: centre.x, y: centre.y }, 1000, "Sine.easeIn",true);
                    return true;
                }
            }
            return false;
        }
        setItem(item: InventoryItem, slot: number) {
            this.slots[slot] = item;
            if (item.inventorySlot) {
                this.slots[item.inventorySlot] = null;
            } else {
                (<Game>this.game).model.inventory.AddItem(item.baseThing);
            }
            item.inventorySlot = slot;
            
        }
        removeItem(item: InventoryItem) {
            (<Game>this.game).model.inventory.DiscardItem(item.baseThing);
            this.slots[item.inventorySlot] = null;
            item.inventorySlot = null;
        }
        getSlot(x: number, y: number): number {
            var slotX: number = Math.floor((x - this.position.x) / this.slotWidth);
            var slotY: number = Math.floor((y - this.position.y) / this.slotHeight);
            return (slotY * 3) + slotX;
        }
        getSlotMiddle(slotNumber: number): Phaser.Point {
            var x: number = this.position.x + ((slotNumber % 3) + 0.5) * this.slotWidth;
            var y: number = this.position.y + (Math.floor(slotNumber / 3) + 0.5) * this.slotHeight;
            return new Phaser.Point(x, y);
        }







    }

}       