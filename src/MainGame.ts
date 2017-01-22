module Waves {

    export class MainGame extends Phaser.State {

        
        mainButton: Button;
        milesDisplay: Phaser.Text;
        healthDisplay: Phaser.Text;
        waterDisplay: Phaser.Text;
        foodDisplay: Phaser.Text;
        fuelDisplay: Phaser.Text;
        person: InventoryItem;
        oar: InventoryItem;
        sea: Sea;
        thingsInView: ThingsInView;
        boat: Boat;
        sail: Boat;
        inventory: Inventory;
        currentEvent: StoryEvent;
        eventBox: EventPopup;

        create() {
            super.create();
            (<Game>this.game).model.world.getEventSignal(this.onEvent.bind(this));
            this.mainButton = new Button(this.game, "Paddle with your hands")
            this.mainButton.position.setTo(10, 550);
            this.mainButton.pressed.add(this.onPress.bind(this));
            this.milesDisplay = this.game.add.text(300, 10, "Testing 12 12", { font: "60px biro_script_reducedregular", fill: '#0078C2', align: 'right' })
            this.healthDisplay = this.game.add.text(10, 10, "HEALTH: 100%", { font: "28px biro_script_reducedregular", fill: '#0078C2', align: 'left' })
            this.waterDisplay = this.game.add.text(10, 40, "WATER", { font: "28px biro_script_reducedregular", fill: '#0078C2', align: 'left' })
            this.foodDisplay = this.game.add.text(10, 70, "FOOD", { font: "28px biro_script_reducedregular", fill: '#0078C2', align: 'left' })
            this.fuelDisplay = this.game.add.text(10, 110, "FUEL", { font: "28px biro_script_reducedregular", fill: '#0078C2', align: 'left' })
            this.updateMiles();

            
            this.sea = new Sea(this.game, 320, 280);
            
            this.boat = new Boat(this.game, 550, 400);
            this.inventory = new Inventory(this.game, 10, 220);
          //  this.person = new InventoryItem(this.game, this.inventory, 100, 100, this.onDrop.bind(this), new Thing("person"));
         //   this.oar = new InventoryItem(this.game, this.inventory, 200, 100, this.onDrop.bind(this), new RowThing("oar",100, "Row with an oar"));
            //this.sail = new InventoryItem(this.game, this.inventory, 300, 100, this.onDrop.bind(this), new Thing("sail", { constantSpeed: 5 }));

            
            (<Game>this.game).model.world.triggers.push(new ThingTrigger(0.00042, new Thing("plastic-bag", "plastic bag and a stick", { constantSpeed: 0.005 })));
            (<Game>this.game).model.world.triggers.push(new ThingTrigger(0.004, new Thing("duck", "rubber duck")));
            (<Game>this.game).model.world.triggers.push(new ThingTrigger(0.007,  new Thing("plank", "wooden plank", { clickSpeed: 0.2, buttonLabel: "Row with the plank"  })));
            (<Game>this.game).model.world.triggers.push(new ThingTrigger(0.015, new Thing("oar", "oar", { clickSpeed: 0.8, buttonLabel: "Row with the oar" })));
            (<Game>this.game).model.world.triggers.push(new ThingTrigger(0.03, new Thing("sail", "sail", { constantSpeed: 0.1 })));
            (<Game>this.game).model.world.triggers.push(new ThingTrigger(0.1, new Thing("corpse", "corpse", { clickSpeed: 1, buttonLabel: "Row with the corpse" })));

            (<Game>this.game).model.world.triggers.push(new ThingTrigger(0.2, new Thing("ship-in-bottle", "ship in a bottle")));

            (<Game>this.game).model.world.triggers.push(new ThingTrigger(0.0002, new Thing("motor", "Motor", { speed: 1, fuelChange: -1 })));

            (<Game>this.game).model.world.triggers.push(new ThingTrigger(0.00001, new Thing("fuel", "fuel", { fuelChangeOnAdd: 0.5 })));
            (<Game>this.game).model.world.triggers.push(new ThingTrigger(0.0001, new Thing("barrel", "barrel of water", { waterChangeOnAdd: 0.5 })));
            (<Game>this.game).model.world.triggers.push(new ThingTrigger(0.0002, new Thing("fish", "fish", { foodChangeOnAdd: 0.5 })));
            (<Game>this.game).model.world.triggers.push(new ThingTrigger(0.2, new Thing("hat", "hat")));
            (<Game>this.game).model.world.triggers.push(new ThingTrigger(0.2, new Thing("chest", "chest")));
            (<Game>this.game).model.world.triggers.push(new ThingTrigger(0.2, new Thing("rod", "rod")));

            //     (<Game>this.game).model.world.triggers.push(new EventTrigger(0.5, new FlyingFishStoryEvent()));
            (<Game>this.game).model.world.triggers.push(new EventTrigger(47.5, new LandStoryEvent()));
          
            this.thingsInView = new ThingsInView((<Game>this.game), this.inventory, this.thingFoundCallback.bind(this), this.onDrop.bind(this), new Phaser.Point(this.boat.x + this.boat.width + 30, this.boat.y + this.boat.height/2), new Phaser.Point(this.boat.x + this.boat.width, this.boat.y));
            this.eventBox = new EventPopup(this.game);
         //   this.eventBox.setListeners(this.press1, this.press2,this);
          //  this.eventBox.show("You found god", "Do you want to keep or throw back?", "Keep", "Throw back");

            (<Game>this.game).model.world.MoveMeters(0.01);
        }
        press1() {
            this.eventBox.hideMessage();
            alert("Pressed 1");
        }
        press2() {
            this.eventBox.hideMessage();
            alert("Pressed 2");
        }
        onEvent(event: StoryEvent) {
            this.currentEvent = event;
            this.eventBox.setListeners(this.event1.bind(this), this.event2.bind(this), this);
            this.eventBox.show(event.name, event.description, event.button1, event.button2);   
        }
        event1() {
            this.doneEvent(this.currentEvent.onB1);
        }
        event2() {
            this.doneEvent(this.currentEvent.onB2);
        }
        resetGame() {


        }
        doneEvent(choice: ChoiceAction) {
            choice.changeWorld((<Game>this.game).model.world);
            if (choice.response != "") {
                this.eventBox.setListeners(this.hideEvent, this.hideEvent, this);
                this.eventBox.setText(this.currentEvent.name, this.currentEvent.onB1.response, "Ok", "");
            } else {
                this.hideEvent();
            }
            if (choice.callBack) {
                choice.callBack();
            }
            if (choice.endGame) {
                this.game.state.start('MainGame', true, false);
            }
        }

        hideEvent() {
            this.eventBox.hideMessage();
        }
        onPress() {
            this.rowTheBoat()
        }

        onDrop(dropData: Object) {
            var item: InventoryItem = <InventoryItem>dropData["dropItem"]
            if (!this.inventory.acceptItemFromDrag(item)) {
                if (this.sea.thrownIntheSea(item)) {
                    this.inventory.removeItem(item);
                    item.sink()
                } else {
                    item.returnToPlace();
                }
            }
        }

        update() {
            if (!this.eventBox.showing) {
                this.sailTheBoat();
                if (this.inventory.thingUsed.clickSpeed > 0) {
                    this.mainButton.setButtonText(this.inventory.thingUsed.buttonLabel);
                    this.mainButton.visible = true;
                } else {
                    this.mainButton.visible = false;
                }
                this.sea.update();
                this.updateMiles();
                this.foodAndHealth();

                this.updateHealthFoodAndWater();
                this.thingsInView.update();
            }
        }

        rowTheBoat() {
            if (this.inventory.thingUsed.clickSpeed > 0)
                (<Game>this.game).model.world.MoveMeters(this.inventory.thingUsed.clickSpeed);
            else
                (<Game>this.game).model.world.MoveMeters(0.01);
        }

        sailTheBoat() {
            var world: WorldState = (<Game>this.game).model.world;
            if ((this.inventory.thingUsed.fuelChange == 0) || (world.fuel>0))
                (<Game>this.game).model.world.MoveMeters(this.inventory.thingUsed.constantSpeed);

            world.fuel += this.inventory.thingUsed.fuelChange;
           // if (this.inventory.hasSailThing())
             //   (<Game>this.game).model.world.MoveMeters(this.inventory.sailThing.speed);
        }

        foodAndHealth() {
            var world: WorldState = (<Game>this.game).model.world;
            if (world.water > 0) {
                world.water -= WorldState.WATER_RATE;
            } else {
                world.health -= WorldState.HEALTH_NO_WATER_RATE;
            }
            if (world.food > 0) {
                world.food -= WorldState.FOOD_RATE;
            } else {
                world.health -= WorldState.HEALTH_NO_FOOD_RATE;
            }
            if (world.health <= 0) {
                this.onEvent(new DeathEvent());
            }
        }
        updateHealthFoodAndWater() {
            var world: WorldState = (<Game>this.game).model.world;
            this.healthDisplay.text = "HEALTH: " + Math.ceil(world.health) + "%";
            this.foodDisplay.text = "FOOD: " + Math.ceil(world.food)
            this.waterDisplay.text = "WATER: " + Math.ceil(world.water)
            this.fuelDisplay.text = "FUEL: " + Math.ceil(world.fuel);
            this.fuelDisplay.visible = (world.fuel > 0);
        }
           
        updateMiles() {
          //  this.milesDisplay.text = "You are " + (<Game>this.game).model.world.milesRemaining.toFixed(4) + " miles from land"; 
            this.milesDisplay.text = "Miles from land:" + (<Game>this.game).model.world.milesRemaining.toFixed(4) 
        }

        getItem(item: InventoryItem) {
            var thing: Thing = item.baseThing;
            var world: WorldState = (<Game>this.game).model.world;
            world.fuel += thing.fuelChangeOnAdd;
            world.food += thing.foodChangeOnAdd;
            world.water += thing.waterChangeOnAdd;
            this.inventory.acceptItemFromEvent(item);
            this.eventBox.hideMessage();
            item.setDrag(true);
        }

        tossItem(item: InventoryItem) {
            this.eventBox.hideMessage();
            item.sink();
        }

        thingFoundCallback(thingPosition: ThingPosition) {
            this.eventBox = new EventPopup(this.game);
            if (!this.inventory.full) {
                this.eventBox.setListeners(this.getItem.bind(this, thingPosition.inventoryItem), this.tossItem.bind(this, thingPosition.inventoryItem), this);
                this.eventBox.show("You found a " + thingPosition.thing.displayName, "Do you want to keep or throw back?", "Keep", "Throw back");
            }
            else {
                this.eventBox.setListeners(this.tossItem.bind(this, thingPosition.inventoryItem),null, this);
                this.eventBox.show("You found a " + thingPosition.thing.displayName, "Oh no! You have no space in your boat!","Throw back","");
            }
        }

    }

}   