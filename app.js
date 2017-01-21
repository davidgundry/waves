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
            _super.call(this, 800, 480, Phaser.CANVAS, 'game');
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
    }(Phaser.State));
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
    var MainGame = (function (_super) {
        __extends(MainGame, _super);
        function MainGame() {
            _super.apply(this, arguments);
        }
        MainGame.prototype.create = function () {
            _super.prototype.create.call(this);
            this.mainButton = new Waves.Button(this.game, "Paddle with your hands");
            this.mainButton.pressed.add(this.onPress);
        };
        MainGame.prototype.onPress = function () {
            alert("pressed");
        };
        MainGame.prototype.update = function () {
        };
        return MainGame;
    }(Phaser.State));
    Waves.MainGame = MainGame;
})(Waves || (Waves = {}));
var Waves;
(function (Waves) {
    var Model = (function () {
        function Model() {
        }
        return Model;
    }());
    Waves.Model = Model;
})(Waves || (Waves = {}));
var Waves;
(function (Waves) {
    var InventoryState = (function () {
        function InventoryState() {
            this._totalSpace = InventoryState.STARTING_TOTAL_SPACE;
        }
        Object.defineProperty(InventoryState.prototype, "things", {
            get: function () {
                return this._things;
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
        InventoryState.prototype.DiscardItem = function (thing) {
            if (this.ContainsItem(thing))
                this.things.splice(this.things.indexOf(thing));
            else
                throw new Error("Thing not in inventory");
        };
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
    var Thing = (function () {
        function Thing() {
        }
        return Thing;
    })();
    Waves.Thing = Thing;
})(Waves || (Waves = {}));
var Waves;
(function (Waves) {
    var Trigger = (function () {
        function Trigger() {
        }
        return Trigger;
    })();
    Waves.Trigger = Trigger;
})(Waves || (Waves = {}));
var Waves;
(function (Waves) {
    var WorldState = (function () {
        function WorldState() {
            this._milesRemaining = WorldState.STARTING_MILES;
        }
        Object.defineProperty(WorldState.prototype, "milesRemaining", {
            get: function () {
                return this._milesRemaining;
            },
            enumerable: true,
            configurable: true
        });
        WorldState.prototype.MoveDistance = function (miles) {
            this._milesRemaining -= miles;
            this.CheckTriggers(this.milesRemaining);
        };
        Object.defineProperty(WorldState.prototype, "triggers", {
            get: function () {
                return _triggers;
            },
            enumerable: true,
            configurable: true
        });
        WorldState.prototype.CheckTriggers = function (position) {
            this.triggers.forEach({ if: function () { }, true:  });
            this.TriggerEvent();
        };
        WorldState.STARTING_MILES = 50;
        return WorldState;
    })();
    Waves.WorldState = WorldState;
    ThingsInView();
    ThingPosition;
    {
    }
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
    }(Phaser.State));
    Waves.Boot = Boot;
    ;
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
            this.mainButton.pressed.add(this.onPress);
            this.milesDisplay = this.game.add.text(300, 10, "Testing 12 12", { font: "30px Arial", fill: '#00f', align: 'right' });
            this.updateMiles();
        };
        MainGame.prototype.onPress = function () {
            //alert("pressed");
            this.game.model.world.MoveDistance(1);
            this.updateMiles();
        };
        MainGame.prototype.updateMiles = function () {
            alert("Miles " + this.game.model.world.milesRemaining);
            //this.milesDisplay.text = "You are " + (<Game>this.game).model.world.milesRemaining + " miles from land";
            this.milesDisplay.text = "You are " + 5 + " miles from land";
        };
        MainGame.prototype.update = function () {
        };
        return MainGame;
    }(Phaser.State));
    Waves.MainGame = MainGame;
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
            //this.game.load.image('particle', 'assets/particle.png');
            // this.game.load.text('mainText', 'text/NorwoodBuilder.txt');
        };
        Preloader.prototype.create = function () {
            _super.prototype.create.call(this);
            this.stage.backgroundColor = 0xEEEEEE; // light grey
            this.game.state.start('MainGame', true, false);
        };
        return Preloader;
    })(Phaser.State);
    Waves.Preloader = Preloader;
})(Waves || (Waves = {}));
//# sourceMappingURL=app.js.map