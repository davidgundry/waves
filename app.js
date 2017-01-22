var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Waves;
(function (Waves) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, 960, 600, Phaser.CANVAS, 'game');
            this.model = new Waves.Model();
            this.state.add('Boot', Waves.Boot, false);
            this.state.add('Preloader', Waves.Preloader, false);
            this.state.add('MainGame', Waves.MainGame, false);
            this.state.start('Boot');
        }
        Game.prototype.restart = function () {
            this.state.start('MainGame');
        };
        return Game;
    })(Phaser.Game);
    Waves.Game = Game;
})(Waves || (Waves = {}));
window.onload = function () {
    var game = new Waves.Game();
};
var Waves;
(function (Waves) {
    var Boat = (function (_super) {
        __extends(Boat, _super);
        function Boat(game, newX, newY) {
            _super.call(this, game);
            this.position.x = newX;
            this.position.y = newY;
            this.create(0, 0, "boat");
            this.game.add.tween(this).to({ rotation: -0.03 }, 1000, "Sine.easeInOut", true, 0, -1, true);
        }
        return Boat;
    })(Phaser.Group);
    Waves.Boat = Boat;
})(Waves || (Waves = {}));
var Waves;
(function (Waves) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
            this.orientated = false;
        }
        Boot.prototype.preload = function () {
            _super.prototype.preload.call(this);
            this.load.image('preloadBar', 'assets/whiteLoadBar.png');
        };
        Boot.prototype.create = function () {
            _super.prototype.create.call(this);
            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = true;
            if (this.game.device.desktop) {
                this.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
                this.scale.pageAlignHorizontally = true;
                this.scale.pageAlignVertically = true;
            }
            else {
                this.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;
                this.scale.pageAlignHorizontally = true;
                this.scale.pageAlignVertically = true;
                this.scale.refresh();
                var gameElement = document.getElementById('game');
                gameElement.style.overflow = "visible";
            }
            this.game.state.start('Preloader', true, false);
        };
        return Boot;
    })(Phaser.State);
    Waves.Boot = Boot;
    ;
})(Waves || (Waves = {}));
var Waves;
(function (Waves) {
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button(game, label, width, height) {
            if (width === void 0) { width = 250; }
            if (height === void 0) { height = 50; }
            _super.call(this, game);
            this.boxWidth = width;
            this.boxHeight = height;
            this.drawBox();
            this.createText(label);
            this.pressed = new Phaser.Signal();
        }
        Button.prototype.drawBox = function () {
            var boxSprite = this.game.add.sprite(0, 0);
            var graphics = this.game.add.graphics(0, 0);
            boxSprite.addChild(graphics);
            graphics.lineStyle(1, 0x0078C2, 1);
            graphics.beginFill(0xffffff, 1);
            graphics.drawRect(0, 0, this.boxWidth, this.boxHeight);
            graphics.endFill();
            this.addChild(boxSprite);
            boxSprite.inputEnabled = true;
            boxSprite.input.priorityID = 2;
            boxSprite.events.onInputDown.add(this.onPressed, this);
        };
        Button.prototype.setButtonText = function (newText) {
            this.text.text = newText;
        };
        Button.prototype.createText = function (label) {
            this.text = this.game.add.text(10, this.boxHeight * .6, label, { font: "25px biro_script_reducedregular", fill: '#000000', align: 'left' }, this);
            this.text.fontWeight = 'bold';
            //this.text = this.game.add.text(10, this.boxHeight / 2, label, { font: "20px Arial", fill: '#00f', align: 'left' }, this);
            this.text.anchor.set(0, 0.5);
        };
        Button.prototype.onPressed = function () {
            //alert("button " + this.text.text + " pressed");
            this.pressed.dispatch();
        };
        return Button;
    })(Phaser.Group);
    Waves.Button = Button;
})(Waves || (Waves = {}));
var Waves;
(function (Waves) {
    var PopupBox = (function (_super) {
        __extends(PopupBox, _super);
        function PopupBox(game) {
            _super.call(this, game);
            this.boxWidth = 600;
            this.boxHeight = 500;
            this.drawBox();
            this.visible = false;
            this.showing = false;
        }
        PopupBox.prototype.drawBox = function () {
            var boxSprite = this.game.add.sprite(0, 0);
            var graphics = this.game.add.graphics(0, 0);
            boxSprite.addChild(graphics);
            graphics.lineStyle(1, 0x000000, 1);
            graphics.beginFill(0xffffff, 1);
            graphics.drawRect(0, 0, this.boxWidth, this.boxHeight);
            graphics.endFill();
            this.addChild(boxSprite);
        };
        PopupBox.prototype.drop = function (newCallback) {
            if (newCallback === void 0) { newCallback = null; }
            if (!this.showing) {
                this.callback = newCallback;
                this.x = (this.game.world.width - this.boxWidth) / 2;
                this.y = 0;
                this.visible = true;
                this.showing = true;
                this.dropTween = this.game.add.tween(this);
                this.dropTween.to({ y: (this.game.world.height - this.boxHeight) / 2 }, 500, Phaser.Easing.Cubic.Out);
                this.dropTween.start();
            }
        };
        PopupBox.prototype.doneDrop = function () {
            if (this.callback) {
                this.callback();
            }
        };
        PopupBox.prototype.hideMessage = function () {
            this.showing = false;
            this.visible = false;
            this.doneDrop();
        };
        return PopupBox;
    })(Phaser.Group);
    Waves.PopupBox = PopupBox;
})(Waves || (Waves = {}));
/// <reference path="PopupBox.ts" />
var Waves;
(function (Waves) {
    var EventPopup = (function (_super) {
        __extends(EventPopup, _super);
        function EventPopup(game) {
            _super.call(this, game);
            this.createButtons();
            this.createText();
        }
        EventPopup.prototype.setListeners = function (on1, on2, context) {
            this.button1.pressed.removeAll(context);
            this.button2.pressed.removeAll(context);
            if (on1)
                this.button1.pressed.add(on1, context);
            if (on2)
                this.button2.pressed.add(on2, context);
        };
        EventPopup.prototype.createButtons = function () {
            this.button1 = new Waves.Button(this.game, "1", 150, 50);
            this.button2 = new Waves.Button(this.game, "2", 150, 50);
            this.addChild(this.button1);
            this.addChild(this.button2);
            this.button1.position.setTo(100, this.boxHeight * .8);
            this.button2.position.setTo(300, this.boxHeight * .8);
        };
        EventPopup.prototype.createText = function () {
            this.title = this.game.add.text(this.boxWidth / 2, 30, "Title here", { font: "60px biro_script_reducedregular", fill: '#000', align: 'centre', wordWrap: true, wordWrapWidth: 500 }, this);
            this.title.anchor.set(0.5, 0);
            this.bodyText = this.game.add.text(this.boxWidth / 2, this.boxHeight / 2.5, "Body text here", { font: "30px biro_script_reducedregular", fill: '#000', align: 'centre', wordWrap: true, wordWrapWidth: 500 }, this);
            this.bodyText.anchor.set(0.5, 0);
        };
        EventPopup.prototype.show = function (titleText, bodyText, button1, button2, newCallback) {
            if (newCallback === void 0) { newCallback = null; }
            if (!this.showing) {
                this.setText(titleText, bodyText, button1, button2);
            }
            _super.prototype.drop.call(this, newCallback);
        };
        EventPopup.prototype.setText = function (titleText, bodyText, button1, button2) {
            this.button2.visible = false;
            this.title.text = titleText;
            this.bodyText.text = bodyText;
            this.button1.setButtonText(button1);
            if (button2 !== "") {
                this.button2.visible = true;
                this.button2.setButtonText(button2);
            }
        };
        return EventPopup;
    })(Waves.PopupBox);
    Waves.EventPopup = EventPopup;
})(Waves || (Waves = {}));
var Waves;
(function (Waves) {
    var Inventory = (function (_super) {
        __extends(Inventory, _super);
        function Inventory(game, newX, newY) {
            _super.call(this, game);
            this.slotWidth = 100;
            this.slotHeight = 100;
            this.yourHands = new Waves.Thing("hands", "hands", { clickSpeed: 0.01, buttonLabel: "Row with your hands" });
            this._thingUsed = this.yourHands;
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
        Object.defineProperty(Inventory.prototype, "thingUsed", {
            get: function () {
                return this._thingUsed;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Inventory.prototype, "full", {
            get: function () {
                return this.getFirstFreeSlot() == undefined;
            },
            enumerable: true,
            configurable: true
        });
        Inventory.prototype.acceptItemFromDrag = function (item) {
            console.log("accept from drag");
            var x = item.position.x;
            var y = item.position.y;
            if (this.boundsRect.contains(x, y)) {
                var slot = this.getSlot(item.position.x, item.position.y);
                if ((this.slots[slot] === null) || (slot !== item.inventorySlot)) {
                    this.putItemInSlot(item, slot);
                    return true;
                }
            }
            return false;
        };
        Inventory.prototype.acceptItemFromEvent = function (item) {
            console.log("accept item from event");
            var slot = this.getFirstFreeSlot();
            if (slot != undefined) {
                this.putItemInSlot(item, slot);
                this.moveItemToSlot(item, slot);
            }
            else
                throw new Error("Inventory full");
        };
        Inventory.prototype.moveItemToSlot = function (item, slot) {
            item.position = this.getSlotMiddle(slot);
        };
        Inventory.prototype.getFirstFreeSlot = function () {
            for (var i = 0; i < this.slots.length; i++) {
                if (this.slots[i] == null) {
                    console.log("Next free slot " + i);
                    return i;
                }
            }
            return undefined;
        };
        Inventory.prototype.putItemInSlot = function (item, slot) {
            //  console.log("put item in slot");
            this.setItem(item, slot);
            var centre = this.getSlotMiddle(slot);
            this.game.add.tween(item).to({ x: centre.x, y: centre.y }, 100, "Sine.easeIn", true);
        };
        Inventory.prototype.setItem = function (item, slot) {
            //  console.log("set item");
            this.slots[slot] = item;
            if (item.inventorySlot) {
                this.slots[item.inventorySlot] = null;
            }
            item.inventorySlot = slot;
        };
        Inventory.prototype.removeItem = function (item) {
            //  console.log("remove item");
            item.setInUse(false);
            this.slots[item.inventorySlot] = null;
            item.inventorySlot = null;
            if (this._thingUsed == item.baseThing)
                this._thingUsed = this.yourHands;
        };
        Inventory.prototype.getSlot = function (x, y) {
            var slotX = Math.floor((x - this.position.x) / this.slotWidth);
            var slotY = Math.floor((y - this.position.y) / this.slotHeight);
            return (slotY * 3) + slotX;
        };
        Inventory.prototype.getSlotMiddle = function (slotNumber) {
            var x = this.position.x + ((slotNumber % 3) + 0.5) * this.slotWidth;
            var y = this.position.y + (Math.floor(slotNumber / 3) + 0.5) * this.slotHeight;
            return new Phaser.Point(x, y);
        };
        Inventory.prototype.SetInUse = function (usedThing) {
            //  console.log("set in use " + usedThing.displayName);
            //  console.log("before filled slots " + this.filledSlots());
            this._thingUsed = usedThing;
            this.unsetAllItems();
            if (usedThing.inventoryItem != null)
                usedThing.inventoryItem.setInUse(true);
            //  console.log("after filled slots " + this.filledSlots());
        };
        Inventory.prototype.filledSlots = function () {
            var filled = 0;
            for (var i = 0; i < this.slots.length; i++) {
                if (this.slots[i] != null) {
                    filled++;
                }
            }
            return filled;
        };
        Inventory.prototype.setHandsInUse = function () {
            this.SetInUse(this.yourHands);
        };
        Inventory.prototype.unsetAllItems = function () {
            for (var i = 0; i < this.slots.length; i++) {
                if (this.slots[i] != null)
                    this.slots[i].setInUse(false);
            }
        };
        return Inventory;
    })(Phaser.Group);
    Waves.Inventory = Inventory;
})(Waves || (Waves = {}));
var Waves;
(function (Waves) {
    var InventoryItem = (function (_super) {
        __extends(InventoryItem, _super);
        function InventoryItem(game, inventory, newX, newY, dropHandler, thing) {
            _super.call(this, game);
            this._isUsed = false;
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
            this.setDrag(true);
            this.inventory = inventory;
        }
        InventoryItem.prototype.setDrag = function (isEnabled) {
            this.baseSprite.inputEnabled = isEnabled;
            if (isEnabled) {
                this.baseSprite.input.enableDrag();
                this.baseSprite.events.onDragStart.removeAll();
                this.baseSprite.events.onDragStart.add(this.onDragStart.bind(this), this);
                this.baseSprite.events.onDragStop.removeAll();
                this.baseSprite.events.onDragStop.add(this.onDragStop.bind(this), this);
                this.baseSprite.events.onInputUp.removeAll();
                this.baseSprite.events.onInputUp.add(this.onClick.bind(this), this);
            }
            else {
                this.baseSprite.input.disableDrag();
            }
        };
        InventoryItem.prototype.onClick = function () {
            if (this.inventorySlot !== null) {
                if (this.isUsed) {
                    this.inventory.setHandsInUse();
                    this.setInUse(false);
                }
                else {
                    this.inventory.SetInUse(this.baseThing);
                    this.setInUse(true);
                }
            }
        };
        Object.defineProperty(InventoryItem.prototype, "isUsed", {
            get: function () {
                return this._isUsed;
            },
            enumerable: true,
            configurable: true
        });
        InventoryItem.prototype.setInUse = function (isUsed) {
            console.log(isUsed + " item set in use " + this.baseThing.displayName);
            this._isUsed = isUsed;
            this.inUseSprite.visible = isUsed;
        };
        InventoryItem.prototype.onDragStart = function () {
            this.lastPos = new Phaser.Point(this.position.x, this.position.y);
        };
        InventoryItem.prototype.onDragStop = function () {
            this.position.x = this.baseSprite.worldPosition.x;
            this.position.y = this.baseSprite.worldPosition.y;
            this.baseSprite.position.x = 0;
            this.baseSprite.position.y = 0;
            this.dropped.dispatch({ dropItem: this });
        };
        InventoryItem.prototype.returnToPlace = function () {
            this.game.add.tween(this.position).to({ x: this.lastPos.x, y: this.lastPos.y }, 1000, "Sine.easeIn", true);
        };
        InventoryItem.prototype.sink = function () {
            this.game.add.tween(this.position).to({ y: 1000 }, 2000, "Sine.easeIn", true);
        };
        return InventoryItem;
    })(Phaser.Group);
    Waves.InventoryItem = InventoryItem;
})(Waves || (Waves = {}));
var Waves;
(function (Waves) {
    var MainGame = (function (_super) {
        __extends(MainGame, _super);
        function MainGame() {
            _super.apply(this, arguments);
        }
        MainGame.prototype.create = function () {
            _super.prototype.create.call(this);
            this.game.model.world.getEventSignal(this.onEvent.bind(this));
            this.mainButton = new Waves.Button(this.game, "Paddle with your hands");
            this.mainButton.position.setTo(20, 545);
            this.mainButton.pressed.add(this.onPress.bind(this));
            this.milesDisplay = this.game.add.text(310, 10, "Testing 12 12", { font: "60px biro_script_reducedregular", fill: '#0078C2', align: 'right' });
            this.healthDisplay = this.game.add.text(10, 10, "HEALTH: 100%", { font: "28px biro_script_reducedregular", fill: '#0078C2', align: 'left' });
            this.waterDisplay = this.game.add.text(10, 40, "WATER", { font: "28px biro_script_reducedregular", fill: '#0078C2', align: 'left' });
            this.foodDisplay = this.game.add.text(10, 70, "FOOD", { font: "28px biro_script_reducedregular", fill: '#0078C2', align: 'left' });
            this.fuelDisplay = this.game.add.text(10, 110, "FUEL", { font: "28px biro_script_reducedregular", fill: '#0078C2', align: 'left' });
            var graphics = this.game.add.graphics(0, 0);
            // set a fill and line style
            graphics.beginFill(0xFF3300);
            graphics.lineStyle(1, 0x0078C2, 1);
            // draw a line
            graphics.moveTo(300, 0);
            graphics.lineTo(300, 600);
            graphics.endFill();
            graphics.drawRect(0, 0, 960, 600);
            this.updateMiles();
            this.sea = new Waves.Sea(this.game, 320, 280);
            this.boat = new Waves.Boat(this.game, 550, 400);
            this.inventory = new Waves.Inventory(this.game, 10, 220);
            //  this.person = new InventoryItem(this.game, this.inventory, 100, 100, this.onDrop.bind(this), new Thing("person"));
            //   this.oar = new InventoryItem(this.game, this.inventory, 200, 100, this.onDrop.bind(this), new RowThing("oar",100, "Row with an oar"));
            //this.sail = new InventoryItem(this.game, this.inventory, 300, 100, this.onDrop.bind(this), new Thing("sail", { constantSpeed: 5 }));
            this.game.model.world.triggers.push(new Waves.ThingTrigger(0.00001, new Waves.Thing("plastic-bag", "plastic bag and a stick", { constantSpeed: 0.005 })));
            //(<Game>this.game).model.world.triggers.push(new ThingTrigger(0.00042, new Thing("plastic-bag", "plastic bag and a stick", { constantSpeed: 0.005 })));
            this.game.model.world.triggers.push(new Waves.ThingTrigger(0.004, new Waves.Thing("duck", "rubber duck")));
            this.game.model.world.triggers.push(new Waves.ThingTrigger(0.009, new Waves.Thing("plank", "wooden plank", { clickSpeed: 0.5, buttonLabel: "Row with the plank" })));
            this.game.model.world.triggers.push(new Waves.ThingTrigger(0.05, new Waves.Thing("barrel", "barrel of water", { water: 50 })));
            this.game.model.world.triggers.push(new Waves.ThingTrigger(0.1, new Waves.Thing("corpse", "corpse", { clickSpeed: 1, buttonLabel: "Row with the corpse" })));
            this.game.model.world.triggers.push(new Waves.ThingTrigger(0.15, new Waves.Thing("fuel", "can of petrol", { fuel: 50 })));
            this.game.model.world.triggers.push(new Waves.EventTrigger(0.18, new Waves.FlyingFishStoryEvent()));
            this.game.model.world.triggers.push(new Waves.ThingTrigger(0.22, new Waves.Thing("sail", "sail", { constantSpeed: 0.4 })));
            this.game.model.world.triggers.push(new Waves.EventTrigger(0.7, new Waves.NightTimeStoryEvent()));
            this.game.model.world.triggers.push(new Waves.ThingTrigger(1, new Waves.Thing("oar", "oar", { clickSpeed: 4, buttonLabel: "Row with the oar" })));
            this.game.model.world.triggers.push(new Waves.ThingTrigger(1.4, new Waves.Thing("motor", "Motor", { constantSpeed: 2, fuelChange: -0.02 })));
            this.game.model.world.triggers.push(new Waves.EventTrigger(1.6, new Waves.IcebergStoryEvent()));
            this.game.model.world.triggers.push(new Waves.ThingTrigger(1.8, new Waves.Thing("fish", "fish", { food: 50 })));
            this.game.model.world.triggers.push(new Waves.ThingTrigger(3, new Waves.Thing("ship-in-bottle", "ship in a bottle")));
            this.game.model.world.triggers.push(new Waves.EventTrigger(4, new Waves.SharksStoryEvent()));
            this.game.model.world.triggers.push(new Waves.EventTrigger(6.7, new Waves.SailingStoryEvent()));
            this.game.model.world.triggers.push(new Waves.ThingTrigger(7, new Waves.Thing("fuel", "can of petrol", { fuel: 50 })));
            this.game.model.world.triggers.push(new Waves.ThingTrigger(10.4, new Waves.Thing("hat", "dapper hat")));
            this.game.model.world.triggers.push(new Waves.EventTrigger(11, new Waves.WonderStoryEvent()));
            this.game.model.world.triggers.push(new Waves.ThingTrigger(15, new Waves.Thing("fuel", "can of petrol", { fuel: 50 })));
            this.game.model.world.triggers.push(new Waves.ThingTrigger(17, new Waves.Thing("rod", "fishing rod")));
            this.game.model.world.triggers.push(new Waves.EventTrigger(20, new Waves.PirateStoryEvent()));
            this.game.model.world.triggers.push(new Waves.ThingTrigger(24, new Waves.Thing("fuel", "can of petrol", { fuel: 50 })));
            this.game.model.world.triggers.push(new Waves.ThingTrigger(27, new Waves.Thing("chest", "chest of loot")));
            this.game.model.world.triggers.push(new Waves.ThingTrigger(36, new Waves.Thing("fuel", "can of petrol", { fuel: 50 })));
            this.game.model.world.triggers.push(new Waves.ThingTrigger(44, new Waves.Thing("fuel", "can of petrol", { fuel: 50 })));
            this.game.model.world.triggers.push(new Waves.EventTrigger(47.5, new Waves.LandStoryEvent()));
            this.thingsInView = new Waves.ThingsInView(this.game, this.inventory, this.thingFoundCallback.bind(this), this.onDrop.bind(this), new Phaser.Point(this.boat.x + this.boat.width + 30, this.boat.y + this.boat.height / 2), new Phaser.Point(this.boat.x + this.boat.width, this.boat.y));
            this.eventBox = new Waves.EventPopup(this.game);
            //   this.eventBox.setListeners(this.press1, this.press2,this);
            //  this.eventBox.show("You found god", "Do you want to keep or throw back?", "Keep", "Throw back");
            this.game.model.world.MoveMeters(0.01);
            this.game.world.bringToTop(graphics);
            this.onEvent(new Waves.StartEvent());
        };
        MainGame.prototype.press1 = function () {
            this.eventBox.hideMessage();
            alert("Pressed 1");
        };
        MainGame.prototype.press2 = function () {
            this.eventBox.hideMessage();
            alert("Pressed 2");
        };
        MainGame.prototype.onEvent = function (event) {
            this.game.world.bringToTop(this.eventBox);
            this.currentEvent = event;
            this.eventBox.setListeners(this.event1.bind(this), this.event2.bind(this), this);
            this.eventBox.show(event.name, event.description, event.button1, event.button2);
        };
        MainGame.prototype.event1 = function () {
            this.doneEvent(this.currentEvent.onB1);
        };
        MainGame.prototype.event2 = function () {
            this.doneEvent(this.currentEvent.onB2);
        };
        MainGame.prototype.resetGame = function () {
        };
        MainGame.prototype.doneEvent = function (choice) {
            choice.changeWorld(this.game.model.world);
            if (choice.response != "") {
                this.eventBox.setListeners(this.hideEvent, this.hideEvent, this);
                this.eventBox.setText(this.currentEvent.name, choice.response, "Ok", "");
            }
            else {
                this.hideEvent();
            }
            if (choice.callBack) {
                choice.callBack();
            }
            if (choice.endGame) {
                this.game.state.start('MainGame', true, false);
            }
        };
        MainGame.prototype.hideEvent = function () {
            this.eventBox.hideMessage();
        };
        MainGame.prototype.onPress = function () {
            this.rowTheBoat();
        };
        MainGame.prototype.onDrop = function (dropData) {
            var item = dropData["dropItem"];
            if (!this.inventory.acceptItemFromDrag(item)) {
                if (this.sea.thrownIntheSea(item)) {
                    this.inventory.removeItem(item);
                    item.sink();
                }
                else {
                    item.returnToPlace();
                }
            }
        };
        MainGame.prototype.update = function () {
            if (!this.eventBox.showing) {
                this.sailTheBoat();
                if (this.inventory.thingUsed.clickSpeed > 0) {
                    this.mainButton.setButtonText(this.inventory.thingUsed.buttonLabel);
                    this.mainButton.visible = true;
                }
                else {
                    this.mainButton.visible = false;
                }
                this.sea.update();
                this.updateMiles();
                this.foodAndHealth();
                this.updateHealthFoodAndWater();
                this.thingsInView.update();
            }
        };
        MainGame.prototype.rowTheBoat = function () {
            if (this.inventory.thingUsed.clickSpeed > 0)
                this.game.model.world.MoveMeters(this.inventory.thingUsed.clickSpeed);
            else
                this.game.model.world.MoveMeters(0.01);
        };
        MainGame.prototype.sailTheBoat = function () {
            var world = this.game.model.world;
            if ((this.inventory.thingUsed.fuelChange == 0) || (world.fuel > 0))
                this.game.model.world.MoveMeters(this.inventory.thingUsed.constantSpeed);
            world.fuel += this.inventory.thingUsed.fuelChange;
            // if (this.inventory.hasSailThing())
            //   (<Game>this.game).model.world.MoveMeters(this.inventory.sailThing.speed);
        };
        MainGame.prototype.foodAndHealth = function () {
            var world = this.game.model.world;
            if (world.water > 0) {
                world.water -= Waves.WorldState.WATER_RATE;
            }
            else {
                world.health -= Waves.WorldState.HEALTH_NO_WATER_RATE;
            }
            if (world.food > 0) {
                world.food -= Waves.WorldState.FOOD_RATE;
            }
            else {
                world.health -= Waves.WorldState.HEALTH_NO_FOOD_RATE;
            }
            if (world.health <= 0) {
                this.onEvent(new Waves.DeathEvent());
            }
        };
        MainGame.prototype.updateHealthFoodAndWater = function () {
            var world = this.game.model.world;
            this.healthDisplay.text = "HEALTH: " + Math.ceil(world.health) + "%";
            this.foodDisplay.text = "FOOD: " + Math.ceil(world.food);
            this.waterDisplay.text = "WATER: " + Math.ceil(world.water);
            this.fuelDisplay.text = "FUEL: " + Math.ceil(world.fuel);
            this.fuelDisplay.visible = (world.fuel > 0);
        };
        MainGame.prototype.updateMiles = function () {
            //  this.milesDisplay.text = "You are " + (<Game>this.game).model.world.milesRemaining.toFixed(4) + " miles from land"; 
            this.milesDisplay.text = "Miles from land: " + this.game.model.world.milesRemaining.toFixed(4);
        };
        MainGame.prototype.getItem = function (item) {
            var thing = item.baseThing;
            var world = this.game.model.world;
            world.fuel += thing.fuelChangeOnAdd;
            world.food += thing.foodChangeOnAdd;
            world.water += thing.waterChangeOnAdd;
            this.inventory.acceptItemFromEvent(item);
            this.eventBox.hideMessage();
            item.setDrag(true);
        };
        MainGame.prototype.tossItem = function (item) {
            this.eventBox.hideMessage();
            item.sink();
        };
        MainGame.prototype.thingFoundCallback = function (thingPosition) {
            this.eventBox = new Waves.EventPopup(this.game);
            if (!this.inventory.full) {
                this.eventBox.setListeners(this.getItem.bind(this, thingPosition.inventoryItem), this.tossItem.bind(this, thingPosition.inventoryItem), this);
                this.eventBox.show("You found a " + thingPosition.thing.displayName, "Do you want to keep or throw back?", "Keep", "Throw back");
            }
            else {
                this.eventBox.setListeners(this.tossItem.bind(this, thingPosition.inventoryItem), null, this);
                this.eventBox.show("You found a " + thingPosition.thing.displayName, "Oh no! You have no space in your boat!", "Throw back", "");
            }
        };
        return MainGame;
    })(Phaser.State);
    Waves.MainGame = MainGame;
})(Waves || (Waves = {}));
var Waves;
(function (Waves) {
    var Model = (function () {
        function Model() {
            this.world = new Waves.WorldState();
            //inventory: InventoryState = new InventoryState();
            this.resource = new Waves.ResourceState();
        }
        return Model;
    })();
    Waves.Model = Model;
})(Waves || (Waves = {}));
var Waves;
(function (Waves) {
    var ResourceState = (function () {
        function ResourceState() {
        }
        return ResourceState;
    })();
    Waves.ResourceState = ResourceState;
})(Waves || (Waves = {}));
var Waves;
(function (Waves) {
    var ChoiceAction = (function () {
        function ChoiceAction(newResponse) {
            this.healthChange = 0;
            this.positionChange = 0;
            this.waterChange = 0;
            this.foodChange = 0;
            this.endGame = false;
            this.response = newResponse;
        }
        ChoiceAction.prototype.changeWorld = function (world) {
            world.health += this.healthChange;
            world.position += this.positionChange;
            world.water += this.waterChange;
            world.food += this.foodChange;
            if (world.food < 0)
                world.food = 0;
            if (world.water < 0)
                world.water = 0;
            if (world.health < 0)
                world.health = 0;
        };
        return ChoiceAction;
    })();
    Waves.ChoiceAction = ChoiceAction;
    var StoryEvent = (function () {
        function StoryEvent(name, description, button1, button2, onB1, onB2) {
            if (onB2 === void 0) { onB2 = null; }
            this._name = name;
            this._description = description;
            this._button1 = button1;
            this._button2 = button2;
            this._onB1 = onB1;
            this._onB2 = onB2;
        }
        Object.defineProperty(StoryEvent.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StoryEvent.prototype, "description", {
            get: function () {
                return this._description;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StoryEvent.prototype, "button1", {
            get: function () {
                return this._button1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StoryEvent.prototype, "button2", {
            get: function () {
                return this._button2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StoryEvent.prototype, "onB1", {
            get: function () {
                return this._onB1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StoryEvent.prototype, "onB2", {
            get: function () {
                return this._onB2;
            },
            enumerable: true,
            configurable: true
        });
        return StoryEvent;
    })();
    Waves.StoryEvent = StoryEvent;
    var FlyingFishStoryEvent = (function (_super) {
        __extends(FlyingFishStoryEvent, _super);
        function FlyingFishStoryEvent() {
            _super.call(this, "Flying Fish", "You see some totally sweet flying fish.", "Try and catch them", "Marvel", new ChoiceAction("You waste time and energy"), new ChoiceAction("You feel this is a beautiful world"));
            this._onB1.healthChange = -10;
        }
        return FlyingFishStoryEvent;
    })(StoryEvent);
    Waves.FlyingFishStoryEvent = FlyingFishStoryEvent;
    var NightTimeStoryEvent = (function (_super) {
        __extends(NightTimeStoryEvent, _super);
        function NightTimeStoryEvent() {
            _super.call(this, "Night Falls", "It's getting dark", "Sleep", "Keep going", new ChoiceAction("You wake up refreshed"), new ChoiceAction("You keep going"));
            this._onB1.healthChange = +10;
            this._onB1.foodChange = -5;
            this._onB1.waterChange = -10;
        }
        return NightTimeStoryEvent;
    })(StoryEvent);
    Waves.NightTimeStoryEvent = NightTimeStoryEvent;
    var SailingStoryEvent = (function (_super) {
        __extends(SailingStoryEvent, _super);
        function SailingStoryEvent() {
            _super.call(this, "", "You decide you don't like sailing any more.", "It sucks.", "", new ChoiceAction(""));
        }
        return SailingStoryEvent;
    })(StoryEvent);
    Waves.SailingStoryEvent = SailingStoryEvent;
    var WonderStoryEvent = (function (_super) {
        __extends(WonderStoryEvent, _super);
        function WonderStoryEvent() {
            _super.call(this, "", "You wonder if your family misses you", "Yeah", "No", new ChoiceAction("Yeah, they probably do"), new ChoiceAction("They probably haven't noticed"));
        }
        return WonderStoryEvent;
    })(StoryEvent);
    Waves.WonderStoryEvent = WonderStoryEvent;
    var SharksStoryEvent = (function (_super) {
        __extends(SharksStoryEvent, _super);
        function SharksStoryEvent() {
            _super.call(this, "Sharks", "You see some sharks", "Cool", "", new ChoiceAction("Oh no! They shoot lasers at you from their eyes!"));
            this._onB1.healthChange = -10;
        }
        return SharksStoryEvent;
    })(StoryEvent);
    Waves.SharksStoryEvent = SharksStoryEvent;
    var IcebergStoryEvent = (function (_super) {
        __extends(IcebergStoryEvent, _super);
        function IcebergStoryEvent() {
            _super.call(this, "Iceberg", "You're approaching an iceberg. It looks pretty small", "That's fine", "", new ChoiceAction("Oh no! It's much bigger than you expected!"));
        }
        return IcebergStoryEvent;
    })(StoryEvent);
    Waves.IcebergStoryEvent = IcebergStoryEvent;
    var PirateStoryEvent = (function (_super) {
        __extends(PirateStoryEvent, _super);
        function PirateStoryEvent() {
            _super.call(this, "Pirates", "You see a pirate ship", "Attack", "Surrender", new ChoiceAction("You steal their grog"), new ChoiceAction("They plunder your tiny boat but find nothing of value"));
            this._onB1.waterChange = +20;
        }
        return PirateStoryEvent;
    })(StoryEvent);
    Waves.PirateStoryEvent = PirateStoryEvent;
    var LandStoryEvent = (function (_super) {
        __extends(LandStoryEvent, _super);
        function LandStoryEvent() {
            _super.call(this, "You've reached land", "You did it, you've reached land and survived.", "Rejoice", "", new ChoiceAction(""));
            this._onB1.endGame = true;
        }
        return LandStoryEvent;
    })(StoryEvent);
    Waves.LandStoryEvent = LandStoryEvent;
    var DeathEvent = (function (_super) {
        __extends(DeathEvent, _super);
        function DeathEvent() {
            _super.call(this, "You died", "You died of hunger and thirst. You'll float on the sea forever", "Try again", "", new ChoiceAction(""));
            this._onB1.endGame = true;
        }
        return DeathEvent;
    })(StoryEvent);
    Waves.DeathEvent = DeathEvent;
    var StartEvent = (function (_super) {
        __extends(StartEvent, _super);
        function StartEvent() {
            _super.call(this, "You're cast adrift", "You're in boat 48 miles from land. Can you get back to dry land?", "Probably not", "", new ChoiceAction(""));
        }
        return StartEvent;
    })(StoryEvent);
    Waves.StartEvent = StartEvent;
})(Waves || (Waves = {}));
var Waves;
(function (Waves) {
    var Thing = (function () {
        function Thing(name, displayName, parameters) {
            if (parameters === void 0) { parameters = {}; }
            this.waterChangeOnAdd = 0;
            this.foodChangeOnAdd = 0;
            this.fuelChangeOnAdd = 0;
            this.fuelChange = 0;
            this.constantSpeed = 0;
            this.clickSpeed = 0;
            this.buttonLabel = "";
            if (parameters.hasOwnProperty("water"))
                this.waterChangeOnAdd = parameters["water"];
            if (parameters.hasOwnProperty("food"))
                this.foodChangeOnAdd = parameters["food"];
            if (parameters.hasOwnProperty("fuel"))
                this.fuelChangeOnAdd = parameters["fuel"];
            if (parameters.hasOwnProperty("fuelChange"))
                this.fuelChange = parameters["fuelChange"];
            if (parameters.hasOwnProperty("clickSpeed"))
                this.clickSpeed = parameters["clickSpeed"];
            if (parameters.hasOwnProperty("constantSpeed"))
                this.constantSpeed = parameters["constantSpeed"];
            if (parameters.hasOwnProperty("buttonLabel"))
                this.buttonLabel = parameters["buttonLabel"];
            this._spriteName = name;
            this._displayName = displayName;
        }
        Object.defineProperty(Thing.prototype, "inventoryItem", {
            get: function () {
                return this._inventoryItem;
            },
            set: function (newItem) {
                this._inventoryItem = newItem;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Thing.prototype, "spriteName", {
            get: function () {
                return this._spriteName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Thing.prototype, "displayName", {
            get: function () {
                return this._displayName;
            },
            enumerable: true,
            configurable: true
        });
        return Thing;
    })();
    Waves.Thing = Thing;
})(Waves || (Waves = {}));
var Waves;
(function (Waves) {
    var ThingPosition = (function () {
        function ThingPosition(thing, position, inventoryItem) {
            this._thing = thing;
            this._position = position;
            this._inventoryItem = inventoryItem;
        }
        Object.defineProperty(ThingPosition.prototype, "thing", {
            get: function () {
                return this._thing;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ThingPosition.prototype, "position", {
            get: function () {
                return this._position;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ThingPosition.prototype, "inventoryItem", {
            get: function () {
                return this._inventoryItem;
            },
            enumerable: true,
            configurable: true
        });
        return ThingPosition;
    })();
    Waves.ThingPosition = ThingPosition;
})(Waves || (Waves = {}));
var Waves;
(function (Waves) {
    var Trigger = (function () {
        function Trigger(position) {
            this._position = position;
        }
        Object.defineProperty(Trigger.prototype, "position", {
            get: function () {
                return this._position;
            },
            enumerable: true,
            configurable: true
        });
        return Trigger;
    })();
    Waves.Trigger = Trigger;
    var EventTrigger = (function (_super) {
        __extends(EventTrigger, _super);
        function EventTrigger(position, event) {
            _super.call(this, position);
            this._event = event;
        }
        Object.defineProperty(EventTrigger.prototype, "event", {
            get: function () {
                return this._event;
            },
            enumerable: true,
            configurable: true
        });
        return EventTrigger;
    })(Trigger);
    Waves.EventTrigger = EventTrigger;
    var ThingTrigger = (function (_super) {
        __extends(ThingTrigger, _super);
        function ThingTrigger(position, thing) {
            _super.call(this, position);
            this._thing = thing;
        }
        Object.defineProperty(ThingTrigger.prototype, "thing", {
            get: function () {
                return this._thing;
            },
            enumerable: true,
            configurable: true
        });
        return ThingTrigger;
    })(Trigger);
    Waves.ThingTrigger = ThingTrigger;
})(Waves || (Waves = {}));
var Waves;
(function (Waves) {
    var WorldState = (function () {
        function WorldState() {
            this._position = 0;
            this._health = 100;
            this._water = 5;
            this._food = 5;
            this._fuel = 0;
            this._triggers = new Array();
            this._triggersToRemove = new Array();
            this.eventSignal = new Phaser.Signal();
        }
        Object.defineProperty(WorldState.prototype, "milesRemaining", {
            get: function () {
                return WorldState.STARTING_MILES - this.position;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WorldState.prototype, "position", {
            get: function () {
                return this._position;
            },
            set: function (value) {
                this._position = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WorldState.prototype, "health", {
            get: function () {
                return this._health;
            },
            set: function (value) {
                this._health = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WorldState.prototype, "water", {
            get: function () {
                return this._water;
            },
            set: function (value) {
                this._water = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WorldState.prototype, "food", {
            get: function () {
                return this._food;
            },
            set: function (value) {
                this._food = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WorldState.prototype, "fuel", {
            get: function () {
                return this._fuel;
            },
            set: function (value) {
                this._fuel = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WorldState.prototype, "thingEventCallback", {
            get: function () {
                return this._thingEventCallback;
            },
            set: function (callback) {
                this._thingEventCallback = callback;
            },
            enumerable: true,
            configurable: true
        });
        WorldState.prototype.getEventSignal = function (onEvent) {
            this.eventSignal.add(onEvent);
        };
        WorldState.prototype.MoveDistance = function (miles) {
            this.position += miles;
            this.CheckTriggers(this.position);
        };
        WorldState.prototype.MoveMeters = function (meters) {
            this.MoveDistance(meters / 1609);
        };
        Object.defineProperty(WorldState.prototype, "triggers", {
            get: function () {
                return this._triggers;
            },
            enumerable: true,
            configurable: true
        });
        WorldState.prototype.CheckTriggers = function (position) {
            var _this = this;
            //console.log("check triggers " + this.triggers.length);
            this.triggers.forEach(function (value, index, array) { return void _this.CheckTrigger(value, position); });
            this._triggersToRemove.forEach(function (value, index, array) { return _this.RemoveTrigger(value); });
            this._triggersToRemove = new Array();
        };
        WorldState.prototype.CheckTrigger = function (trigger, position) {
            //console.log("t=" + trigger.position + " " + position);
            if (trigger.position <= position) {
                if (trigger instanceof Waves.EventTrigger) {
                    this.TriggerEvent(trigger);
                    this._triggersToRemove.push(trigger);
                }
            }
            if (trigger.position - WorldState.LEAD_DISTANCE <= position) {
                if (trigger instanceof Waves.ThingTrigger) {
                    this.TriggerThing(trigger);
                    this._triggersToRemove.push(trigger);
                }
            }
        };
        WorldState.prototype.RemoveTrigger = function (trigger) {
            this.triggers.splice(this.triggers.indexOf(trigger), 1);
        };
        WorldState.prototype.TriggerEvent = function (trigger) {
            console.log(trigger.event.name + " event triggered");
            this.eventSignal.dispatch(trigger.event);
        };
        WorldState.prototype.TriggerThing = function (trigger) {
            console.log("Thing Triggered");
            if (this.thingEventCallback != null)
                this.thingEventCallback(trigger.thing, trigger.position);
            else
                throw new Error("ThingEventCallback not set");
        };
        WorldState.STARTING_MILES = 48;
        WorldState.WATER_RATE = 0.005;
        WorldState.FOOD_RATE = 0.0025;
        WorldState.HEALTH_NO_WATER_RATE = 0.003;
        WorldState.HEALTH_NO_FOOD_RATE = 0.001;
        WorldState.LEAD_DISTANCE = 0.1;
        return WorldState;
    })();
    Waves.WorldState = WorldState;
})(Waves || (Waves = {}));
var Waves;
(function (Waves) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.apply(this, arguments);
        }
        Preloader.prototype.preload = function () {
            _super.prototype.preload.call(this);
            //
            this.textLoader = this.game.add.text(this.world.centerX, this.world.centerY / 6, "Loading...", { font: "30px Arial", fill: '#00f', align: 'center' });
            this.textLoader.anchor.set(0.5, 0.5);
            //  Set-up our preloader sprite
            this.preloadBar = this.game.add.sprite(this.world.centerX, this.world.centerY / 3, 'preloadBar');
            this.preloadBar.anchor.setTo(0.5, 0.5);
            this.load.setPreloadSprite(this.preloadBar);
            //  Load our actual games assets
            this.game.load.image("plastic-bag", "assets/plastic-bag.png");
            this.game.load.image("sail", "assets/sail.png");
            this.game.load.image("plank", "assets/plank.png");
            this.game.load.image("oar", "assets/oar.png");
            this.game.load.image("corpse", "assets/corpse.png");
            this.game.load.image("motor", "assets/motor.png");
            this.game.load.image("fuel", "assets/fuel.png");
            this.game.load.image("rod", "assets/rod.png");
            this.game.load.image("hat", "assets/hat.png");
            this.game.load.image("ship-in-bottle", "assets/ship-in-bottle.png");
            this.game.load.image("duck", "assets/duck.png");
            this.game.load.image("chest", "assets/chest.png");
            this.game.load.image("fish", "assets/fish.png");
            this.game.load.image("barrel", "assets/barrel.png");
            this.game.load.image("inUse", "assets/InUse.png");
            this.game.load.image("inventory", "assets/inventory.png");
            this.game.load.image("person", "assets/placeholderMan.png");
            this.game.load.image("sea1", "assets/sea-top.png");
            this.game.load.image("sea2", "assets/sea-middle.png");
            this.game.load.image("sea3", "assets/sea-bottom.png");
            this.game.load.image("boat", "assets/boat1.png");
        };
        Preloader.prototype.create = function () {
            _super.prototype.create.call(this);
            this.stage.backgroundColor = 0xffffff; // white
            this.game.state.start('MainGame', true, false);
        };
        return Preloader;
    })(Phaser.State);
    Waves.Preloader = Preloader;
})(Waves || (Waves = {}));
var Waves;
(function (Waves) {
    var Sea = (function (_super) {
        __extends(Sea, _super);
        function Sea(game, newX, newY) {
            _super.call(this, game);
            this.numberOfStrips = 3;
            this.maskWidth = 640;
            this.maskHeight = 330;
            this.position.x = newX;
            this.position.y = newY;
            this.addSeaStrips();
            this.createMask();
            this.boundsRect = new Phaser.Rectangle(this.position.x, this.position.y, this.width, this.height);
        }
        Sea.prototype.addSeaStrips = function () {
            this.strips = [];
            var y = 0;
            for (var i = 1; i <= this.numberOfStrips; i++) {
                var strip = this.create(0, y, "sea" + i);
                y += strip.height;
                this.strips.push(strip);
            }
        };
        Sea.prototype.createMask = function () {
            var mask = this.game.add.graphics(0, 0, this);
            //  Shapes drawn to the Graphics object must be filled.
            mask.beginFill(0xffffff);
            //  Here we'll draw a rectangle for each group sprite
            mask.drawRect(0, 0, this.maskWidth, this.maskHeight * 2); // no idea why it has to be height *2
            // mask.drawRect(330, 0, 140, 200);
            //mask.drawRect(530, 0, 140, 200);
            //  And apply it to the Group itself
            this.mask = mask;
        };
        Sea.prototype.thrownIntheSea = function (item) {
            var x = item.position.x;
            var y = item.position.y;
            return this.boundsRect.contains(x, y);
        };
        Sea.prototype.update = function () {
            for (var i = 0; i < this.numberOfStrips; i++) {
                this.strips[i].position.x -= (i + 1) / 25;
                if ((this.strips[i].position.x + this.strips[i].width) < this.maskWidth) {
                    this.strips[i].position.x = 0;
                }
            }
        };
        return Sea;
    })(Phaser.Group);
    Waves.Sea = Sea;
})(Waves || (Waves = {}));
var Waves;
(function (Waves) {
    var ThingsInView = (function () {
        function ThingsInView(game, inventory, itemFoundHandler, dropHandler, boatSide, boatFrontSide) {
            this.thingsInView = new Array();
            this.thingsInViewToRemove = new Array();
            this._game = game;
            this._boatSide = boatSide;
            this._boatFrontSide = boatFrontSide;
            this._dropHandler = dropHandler;
            this._itemFoundHandler = itemFoundHandler;
            this.inventory = inventory;
            this.game.model.world.thingEventCallback = this.thingEventCallback.bind(this);
        }
        Object.defineProperty(ThingsInView.prototype, "game", {
            get: function () {
                return this._game;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ThingsInView.prototype, "boatSide", {
            get: function () {
                return this._boatSide;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ThingsInView.prototype, "boatFrontSide", {
            get: function () {
                return this._boatFrontSide;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ThingsInView.prototype, "itemFoundHandler", {
            get: function () {
                return this._itemFoundHandler;
            },
            enumerable: true,
            configurable: true
        });
        ThingsInView.prototype.thingEventCallback = function (thing, position) {
            this.addThingInView(thing, position);
        };
        ThingsInView.prototype.update = function () {
            var _this = this;
            this.thingsInView.forEach(function (value) { return void _this.updateThingInView(value); });
            this.thingsInViewToRemove.forEach(function (value) { return void _this.removeThingInView(value); });
            this.thingsInViewToRemove = new Array();
        };
        ThingsInView.prototype.addThingInView = function (thing, position) {
            var screenPosition = this.screenPosition(position);
            var item = new Waves.InventoryItem(this.game, this.inventory, screenPosition.x, screenPosition.y, this._dropHandler, thing);
            item.setDrag(false);
            this.thingsInView.push(new Waves.ThingPosition(thing, position, item));
        };
        ThingsInView.prototype.proportionalDistance = function (position) {
            var relativePosition = position - this.game.model.world.position;
            if (relativePosition <= 0) {
                relativePosition = 0;
            }
            var rPos = (relativePosition / Waves.WorldState.LEAD_DISTANCE);
            return 1 - (Math.pow(1000000000000, 1 - rPos) - 1) / 1000000000000;
        };
        ThingsInView.prototype.screenPosition = function (position) {
            var proportion = this.proportionalDistance(position);
            return new Phaser.Point(proportion * (ThingsInView.THING_ORIGIIN.x - this.boatSide.x) + this.boatSide.x, proportion * (ThingsInView.THING_ORIGIIN.y - this.boatSide.y) + this.boatSide.y);
        };
        ThingsInView.prototype.isAlongside = function (thingPosition) {
            var relativePosition = thingPosition.position - this.game.model.world.position;
            return (relativePosition <= 0);
        };
        ThingsInView.prototype.updateThingInView = function (thingPosition) {
            this.updateThingWorldPosition(thingPosition);
            if (this.isAlongside(thingPosition)) {
                thingPosition.inventoryItem.scale = new Phaser.Point(1, 1);
                this.itemFoundHandler(thingPosition);
                this.thingsInViewToRemove.push(thingPosition);
            }
        };
        ThingsInView.prototype.updateThingWorldPosition = function (thingPosition) {
            var screenPosition = this.screenPosition(thingPosition.position);
            thingPosition.inventoryItem.position.x = screenPosition.x;
            thingPosition.inventoryItem.position.y = screenPosition.y;
            var proportionalDistance = this.proportionalDistance(thingPosition.position);
            thingPosition.inventoryItem.scale = new Phaser.Point((1 - proportionalDistance) / 2, (1 - proportionalDistance) / 2);
        };
        ThingsInView.prototype.removeThingInView = function (thingPosition) {
            this.thingsInView.splice(this.thingsInView.indexOf(thingPosition), 1);
        };
        ThingsInView.THING_ORIGIIN = new Phaser.Point(800, 300);
        return ThingsInView;
    })();
    Waves.ThingsInView = ThingsInView;
})(Waves || (Waves = {}));
//# sourceMappingURL=app.js.map