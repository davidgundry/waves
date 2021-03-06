﻿module Waves {

    export class Inventory extends Phaser.Group {
        slots: Array<InventoryItem>;
        slotWidth: number = 100;
        slotHeight: number = 100;
        boundsRect: Phaser.Rectangle;

        public yourHands: Thing = new Thing("hands", "hands", { clickSpeed: 0.01, buttonLabel: "Row with your hands"});
        private _thingUsed = this.yourHands;

        public get thingUsed(): Thing {
            return this._thingUsed;
        }

        constructor(game: Phaser.Game, newX: number, newY: number) {
            super(game);
            this.slots = [null, null, null, null, null, null, null, null, null];
            this.position.x = newX;
            this.position.y = newY;
            var graphics = this.game.add.graphics(0, 0);
            this.addChild(graphics);
            // set a fill and line style
            graphics.beginFill(0xFF3300);
            graphics.lineStyle(1, 0x0078C2, 1);

            // draw a line
            graphics.moveTo(90, 0);
            graphics.lineTo(90, 270);
            graphics.moveTo(180, 0);
            graphics.lineTo(180, 270);
            graphics.moveTo(0, 90);
            graphics.lineTo(270, 90);
            graphics.moveTo(0, 180);
            graphics.lineTo(270, 180);
            graphics.endFill();
          //  this.create(0, 0, "inventory");
            this.boundsRect = new Phaser.Rectangle(this.position.x, this.position.y, this.width, this.height);
        }

        public get full() {
            return this.getFirstFreeSlot() == undefined;
        }


        acceptItemFromDrag(item: InventoryItem): boolean {
            console.log("accept from drag");
            var x: number = item.position.x;
            var y: number = item.position.y;
            if (this.boundsRect.contains(x, y)) {
                var slot: number = this.getSlot(item.position.x, item.position.y);
                if ((this.slots[slot] === null) || (slot !== item.inventorySlot)) {
                    this.putItemInSlot(item, slot);
                    return true;
                }
            }
            return false;
        }

        acceptItemFromEvent(item: InventoryItem) {
            console.log("accept item from event");
            var slot: number = this.getFirstFreeSlot();
            if (slot != undefined)
            {
                this.putItemInSlot(item, slot);
                this.moveItemToSlot(item,slot);
            }
            else
                throw new Error("Inventory full");
        }

        moveItemToSlot(item: InventoryItem, slot: number) {
            item.position = this.getSlotMiddle(slot);
        }

        getFirstFreeSlot() : number {
            for (var i: number = 0; i < this.slots.length; i++) {
                if (this.slots[i] == null) {
                    console.log("Next free slot " + i);
                    return i;
                }
            }
            return undefined;
        }

        putItemInSlot(item: InventoryItem, slot: number) {
          //  console.log("put item in slot");
            this.setItem(item, slot);
            var centre: Phaser.Point = this.getSlotMiddle(slot);
            this.game.add.tween(item).to({ x: centre.x, y: centre.y }, 100, "Sine.easeIn", true);
        }

        setItem(item: InventoryItem, slot: number) {
          //  console.log("set item");
            this.slots[slot] = item;
            if (item.inventorySlot) {
                this.slots[item.inventorySlot] = null;
            }
            item.inventorySlot = slot;
            
        }
        removeItem(item: InventoryItem) {
          //  console.log("remove item");
            item.setInUse(false);
            this.slots[item.inventorySlot] = null;
            item.inventorySlot = null;
            if (this._thingUsed == item.baseThing)
                this._thingUsed = this.yourHands;
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

        public SetInUse(usedThing: Thing) {
          //  console.log("set in use " + usedThing.displayName);
          //  console.log("before filled slots " + this.filledSlots());
            this._thingUsed = usedThing;
            this.unsetAllItems();
            if (usedThing.inventoryItem != null)
                usedThing.inventoryItem.setInUse(true);
          //  console.log("after filled slots " + this.filledSlots());
        }

        public filledSlots(): number {
            var filled = 0;
            for (var i = 0; i < this.slots.length; i++) {
                if (this.slots[i] != null) {
                    filled++;
                }
            }
            return filled;
        }

        public setHandsInUse() {
            this.SetInUse(this.yourHands);
        }

        unsetAllItems() {
            for (var i = 0; i < this.slots.length; i++) {
                if (this.slots[i] != null)
                    this.slots[i].setInUse(false);
            }
        }

    }

}       