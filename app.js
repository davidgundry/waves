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
        function Button(game, label) {
            _super.call(this, game);
            this.boxWidth = 300;
            this.boxHeight = 40;
            this.drawBox();
            this.createText(label);
            this.pressed = new Phaser.Signal();
        }
        Button.prototype.drawBox = function () {
            var boxSprite = this.game.add.sprite(0, 0);
            var graphics = this.game.add.graphics(0, 0);
            boxSprite.addChild(graphics);
            graphics.lineStyle(1, 0x000000, 1);
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
            this.text = this.game.add.text(10, this.boxHeight / 2, label, { font: "20px Arial", fill: '#00f', align: 'left' }, this);
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
    var Inventory = (function (_super) {
        __extends(Inventory, _super);
        function Inventory(game, newX, newY) {
            _super.call(this, game);
            this.slotWidth = 100;
            this.slotHeight = 100;
            this.slots = [null, null, null, null, null, null, null, null, null];
            this.position.x = newX;
            this.position.y = newY;
            this.create(0, 0, "inventory");
            this.boundsRect = new Phaser.Rectangle(this.position.x, this.position.y, this.width, this.height);
        }
        Inventory.prototype.acceptItem = function (item) {
            var x = item.position.x;
            var y = item.position.y;
            if (this.boundsRect.contains(x, y)) {
                var slot = this.getSlot(item.position.x, item.position.y);
                if ((this.slots[slot] === null) || (slot === item.inventorySlot)) {
                    this.setItem(item, slot);
                    var centre = this.getSlotMiddle(slot);
                    this.game.add.tween(item).to({ x: centre.x, y: centre.y }, 1000, "Sine.easeIn", true);
                    return true;
                }
            }
            return false;
        };
        Inventory.prototype.setItem = function (item, slot) {
            this.slots[slot] = item;
            if (item.inventorySlot) {
                this.slots[item.inventorySlot] = null;
            }
            else {
                this.game.model.inventory.AddItem(item.baseThing);
            }
            item.inventorySlot = slot;
        };
        Inventory.prototype.removeItem = function (item) {
            this.game.model.inventory.DiscardItem(item.baseThing);
            this.slots[item.inventorySlot] = null;
            item.inventorySlot = null;
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
        return Inventory;
    })(Phaser.Group);
    Waves.Inventory = Inventory;
})(Waves || (Waves = {}));
var Waves;
(function (Waves) {
    var InventoryItem = (function (_super) {
        __extends(InventoryItem, _super);
        function InventoryItem(game, newX, newY, dropHandler, thing) {
            _super.call(this, game);
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
        }
        InventoryItem.prototype.setDrag = function (isEnabled) {
            this.baseSprite.inputEnabled = isEnabled;
            if (isEnabled) {
                this.baseSprite.input.enableDrag();
                this.baseSprite.events.onDragStart.add(this.onDragStart.bind(this), this);
                this.baseSprite.events.onDragStop.add(this.onDragStop.bind(this), this);
                this.baseSprite.events.onInputDown.add(this.onClick.bind(this), this);
            }
            else {
                this.baseSprite.input.disableDrag();
            }
        };
        InventoryItem.prototype.onClick = function () {
            if (this.inventorySlot !== null) {
                this.game.model.inventory.SetInUse(this.baseThing);
            }
        };
        InventoryItem.prototype.setInUse = function (isUsed) {
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
            this.mainButton = new Waves.Button(this.game, "Paddle with your hands");
            this.mainButton.setButtonText("Paddle with your nose");
            this.mainButton.pressed.add(this.onPress.bind(this));
            this.milesDisplay = this.game.add.text(300, 10, "Testing 12 12", { font: "30px Arial", fill: '#00f', align: 'right' });
            this.updateMiles();
            this.sea = new Waves.Sea(this.game, 320, 280);
            this.boat = new Waves.Boat(this.game, 550, 400);
            this.inventory = new Waves.Inventory(this.game, 10, 280);
            this.person = new Waves.InventoryItem(this.game, 100, 100, this.onDrop.bind(this), new Waves.Thing("person"));
            this.oar = new Waves.InventoryItem(this.game, 200, 100, this.onDrop.bind(this), new Waves.RowThing("oar", 100));
            this.sail = new Waves.InventoryItem(this.game, 300, 100, this.onDrop.bind(this), new Waves.SailThing("sail", 5));
            this.thingsInView = new Waves.ThingsInView(this.game, this.onDrop.bind(this), new Phaser.Point(this.boat.x + this.boat.width, this.boat.y + this.boat.height), new Phaser.Point(this.boat.x + this.boat.width, this.boat.y));
        };
        MainGame.prototype.onPress = function () {
            this.rowTheBoat();
        };
        MainGame.prototype.onDrop = function (dropData) {
            var item = dropData["dropItem"];
            if (!this.inventory.acceptItem(item)) {
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
            this.sailTheBoat();
            this.sea.update();
            this.updateMiles();
            this.thingsInView.update();
        };
        MainGame.prototype.rowTheBoat = function () {
            if (this.game.model.inventory.hasPlayerRowThing())
                this.game.model.world.MoveMeters(this.game.model.inventory.playerRowThing.speed);
        };
        MainGame.prototype.sailTheBoat = function () {
            if (this.game.model.inventory.hasSailThing())
                this.game.model.world.MoveMeters(this.game.model.inventory.sailThing.speed);
        };
        MainGame.prototype.updateMiles = function () {
            this.milesDisplay.text = "You are " + this.game.model.world.milesRemaining.toFixed(4) + " miles from land";
        };
        return MainGame;
    })(Phaser.State);
    Waves.MainGame = MainGame;
})(Waves || (Waves = {}));
var Waves;
(function (Waves) {
    var InventoryState = (function () {
        function InventoryState() {
            this._things = new Array();
            this._totalSpace = InventoryState.STARTING_TOTAL_SPACE;
        }
        Object.defineProperty(InventoryState.prototype, "things", {
            get: function () {
                return this._things;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InventoryState.prototype, "thingUsed", {
            get: function () {
                return this._thingUsed;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InventoryState.prototype, "totalSpace", {
            get: function () {
                return this._totalSpace;
            },
            enumerable: true,
            configurable: true
        });
        InventoryState.prototype.SpaceRemaining = function () {
            return (this.totalSpace - this.things.length > 0);
        };
        InventoryState.prototype.ContainsItem = function (thing) {
            return (this.things.indexOf(thing) >= 0);
        };
        InventoryState.prototype.AddItem = function (newThing) {
            if (this.SpaceRemaining)
                this.things.push(newThing);
            else
                throw new Error("Inventory full");
        };
        InventoryState.prototype.SetInUse = function (usedThing) {
            this._thingUsed = usedThing;
            for (var i = 0; i < this._things.length; i++) {
                this.things[i].inventoryItem.setInUse(false);
            }
            usedThing.inventoryItem.setInUse(true);
        };
        InventoryState.prototype.DiscardItem = function (thing) {
            if (this.ContainsItem(thing))
                this.things.splice(this.things.indexOf(thing));
            else
                throw new Error("Thing not in inventory");
        };
        InventoryState.prototype.hasPlayerRowThing = function () {
            return (this.thingUsed instanceof Waves.RowThing);
        };
        InventoryState.prototype.hasSailThing = function () {
            return (this.thingUsed instanceof Waves.SailThing);
        };
        Object.defineProperty(InventoryState.prototype, "playerRowThing", {
            get: function () {
                return this.thingUsed;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InventoryState.prototype, "sailThing", {
            get: function () {
                return this.thingUsed;
            },
            enumerable: true,
            configurable: true
        });
        InventoryState.STARTING_TOTAL_SPACE = 10;
        return InventoryState;
    })();
    Waves.InventoryState = InventoryState;
})(Waves || (Waves = {}));
var Waves;
(function (Waves) {
    var Model = (function () {
        function Model() {
            this.world = new Waves.WorldState();
            this.inventory = new Waves.InventoryState();
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
    var StoryEvent = (function () {
        function StoryEvent(name, description) {
            this._name = name;
            this._description = description;
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
        return StoryEvent;
    })();
    Waves.StoryEvent = StoryEvent;
    var FlyingFishStoryEvent = (function (_super) {
        __extends(FlyingFishStoryEvent, _super);
        function FlyingFishStoryEvent() {
            _super.call(this, "Flying Fish", "You see some totally sweet flying fish.");
        }
        return FlyingFishStoryEvent;
    })(StoryEvent);
    Waves.FlyingFishStoryEvent = FlyingFishStoryEvent;
})(Waves || (Waves = {}));
var Waves;
(function (Waves) {
    var Thing = (function () {
        function Thing(name) {
            this._spriteName = name;
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
        return Thing;
    })();
    Waves.Thing = Thing;
    var RowThing = (function (_super) {
        __extends(RowThing, _super);
        function RowThing(name, speed) {
            _super.call(this, name);
            this._speed = speed;
        }
        Object.defineProperty(RowThing.prototype, "speed", {
            get: function () {
                return this._speed;
            },
            enumerable: true,
            configurable: true
        });
        return RowThing;
    })(Thing);
    Waves.RowThing = RowThing;
    var SailThing = (function (_super) {
        __extends(SailThing, _super);
        function SailThing(name, speed) {
            _super.call(this, name);
            this._speed = speed;
        }
        Object.defineProperty(SailThing.prototype, "speed", {
            get: function () {
                return this._speed;
            },
            enumerable: true,
            configurable: true
        });
        return SailThing;
    })(Thing);
    Waves.SailThing = SailThing;
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
                return this.thing;
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
            this._triggers = new Array();
            this.triggers.push(new Waves.ThingTrigger(1, new Waves.Thing("paddle")));
            this.triggers.push(new Waves.EventTrigger(0.5, new Waves.FlyingFishStoryEvent()));
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
            this.triggers.forEach(function (value, index, array) { return void _this.CheckTrigger(value, position); });
        };
        WorldState.prototype.CheckTrigger = function (trigger, position) {
            if (trigger.position <= position) {
                if (trigger instanceof Waves.EventTrigger)
                    this.TriggerEvent(trigger);
                this.RemoveTrigger(trigger);
            }
            if (trigger.position - WorldState.LEAD_DISTANCE <= position) {
                if (trigger instanceof Waves.ThingTrigger)
                    this.TriggerThing(trigger);
                this.RemoveTrigger(trigger);
            }
        };
        WorldState.prototype.RemoveTrigger = function (trigger) {
            this.triggers.splice(this.triggers.indexOf(trigger));
        };
        WorldState.prototype.TriggerEvent = function (trigger) {
            console.log(trigger.event.name + " event triggered");
        };
        WorldState.prototype.TriggerThing = function (trigger) {
            console.log("Thing Triggered");
            if (this.thingEventCallback != null)
                this.thingEventCallback(trigger.thing, trigger.position);
            else
                throw new Error("ThingEventCallback not set");
        };
        WorldState.STARTING_MILES = 50;
        WorldState.LEAD_DISTANCE = 1;
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
            this.game.load.image("sail", "assets/sailPlaceHolder.png");
            this.game.load.image("inUse", "assets/InUse.png");
            this.game.load.image("inventory", "assets/inventory.png");
            this.game.load.image("person", "assets/placeholderMan.png");
            this.game.load.image("oar", "assets/oarPlaceHolder.png");
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
        function ThingsInView(game, dropHandler, boatSide, boatFrontSide) {
            this.thingsInView = new Array();
            this._game = game;
            this._boatSide = boatSide;
            this._boatFrontSide = boatFrontSide;
            this._dropHandler = dropHandler;
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
        ThingsInView.prototype.thingEventCallback = function (thing, position) {
            this.addThingInView(thing, position);
        };
        ThingsInView.prototype.update = function () {
            var _this = this;
            this.thingsInView.forEach(function (value, index, array) { return void _this.updateThingInView(value); });
        };
        ThingsInView.prototype.addThingInView = function (thing, position) {
            var screenPosition = this.screenPosition(position);
            var item = new Waves.InventoryItem(this.game, screenPosition.x, screenPosition.y, this._dropHandler, new Waves.Thing("thing"));
            item.setDrag(false);
            this.thingsInView.push(new Waves.ThingPosition(thing, position, item));
        };
        ThingsInView.prototype.proportionalDistance = function (position) {
            var relativePosition = position - this.game.model.world.position;
            if (relativePosition <= 0) {
                relativePosition = 0;
            }
            var rPos = (relativePosition / Waves.WorldState.LEAD_DISTANCE);
            return 1 - (Math.pow(100, 1 - rPos) - 1) / 100;
        };
        ThingsInView.prototype.screenPosition = function (position) {
            var proportion = this.proportionalDistance(position);
            return new Phaser.Point(proportion * (ThingsInView.THING_ORIGIIN.x - this.boatFrontSide.x) + this.boatFrontSide.x, proportion * (ThingsInView.THING_ORIGIIN.y - this.boatFrontSide.y) + this.boatFrontSide.y);
        };
        ThingsInView.prototype.isAlongside = function (thingPosition) {
            var relativePosition = thingPosition.position - this.game.model.world.position;
            return (relativePosition <= 0);
        };
        ThingsInView.prototype.updateThingInView = function (thingPosition) {
            var screenPosition = this.screenPosition(thingPosition.position);
            thingPosition.inventoryItem.position.x = screenPosition.x;
            thingPosition.inventoryItem.position.y = screenPosition.y;
            var proportionalDistance = this.proportionalDistance(thingPosition.position);
            thingPosition.inventoryItem.scale = new Phaser.Point(1 - proportionalDistance, 1 - proportionalDistance);
            if (this.isAlongside(thingPosition)) {
                thingPosition.inventoryItem.setDrag(true);
                thingPosition.inventoryItem.position.x = this.boatSide.x;
                thingPosition.inventoryItem.position.y = this.boatSide.y;
                this.removeThingInView(thingPosition);
            }
        };
        ThingsInView.prototype.removeThingInView = function (thingPosition) {
            if (this.thingsInView.indexOf(thingPosition) >= 0)
                this.thingsInView.splice(this.thingsInView.indexOf(thingPosition));
            else
                throw new Error("ThingPosition not found");
        };
        ThingsInView.THING_ORIGIIN = new Phaser.Point(800, 300);
        return ThingsInView;
    })();
    Waves.ThingsInView = ThingsInView;
})(Waves || (Waves = {}));
//# sourceMappingURL=app.js.map