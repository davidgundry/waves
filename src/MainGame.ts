﻿module Waves {

    export class MainGame extends Phaser.State {

        
        mainButton: Button;
        milesDisplay: Phaser.Text;
        healthDisplay: Phaser.Text;
        waterDisplay: Phaser.Text;
        foodDisplay: Phaser.Text;
        person: InventoryItem;
        oar: InventoryItem;
        sea: Sea;
        thingsInView: ThingsInView;
        boat: Boat;
        sail: Boat;
        inventory: Inventory;
        eventBox: EventPopup;

        create() {
            super.create();
            this.mainButton = new Button(this.game, "Paddle with your hands")
            this.mainButton.setButtonText("Paddle with your nose");
            this.mainButton.pressed.add(this.onPress.bind(this));
            this.milesDisplay = this.game.add.text(300, 10, "Testing 12 12", { font: "30px Arial", fill: '#00f', align: 'right' })
            this.healthDisplay = this.game.add.text(10, 50, "Health: 100%", { font: "20px Arial", fill: '#00f', align: 'left' })
            this.waterDisplay = this.game.add.text(10, 80, "Water", { font: "20px Arial", fill: '#00f', align: 'left' })
            this.foodDisplay = this.game.add.text(10, 110, "Food", { font: "20px Arial", fill: '#00f', align: 'left' })
            this.updateMiles();
            
            this.sea = new Sea(this.game, 320, 280);
            
            this.boat = new Boat(this.game, 550, 400);
            this.inventory = new Inventory(this.game,10, 280);
            this.person = new InventoryItem(this.game, 100, 100, this.onDrop.bind(this), new Thing("person"));
            this.oar = new InventoryItem(this.game, 200, 100, this.onDrop.bind(this), new RowThing("oar",100, "Row with an oar"));
            this.sail = new InventoryItem(this.game, 300, 100, this.onDrop.bind(this), new SailThing("sail",5));

            
            (<Game>this.game).model.world.triggers.push(new ThingTrigger(0.00062, new SailThing("test", 0.5)));
            (<Game>this.game).model.world.triggers.push(new ThingTrigger(0.0062, new SailThing("sail", 0.5)));
            (<Game>this.game).model.world.triggers.push(new ThingTrigger(0.0248, new RowThing("oar", 1, "Row with an oar")));
            (<Game>this.game).model.world.triggers.push(new ThingTrigger(0.087, new SailThing("sail", 3)));
            (<Game>this.game).model.world.triggers.push(new EventTrigger(0.5, new FlyingFishStoryEvent()));
          
            this.thingsInView = new ThingsInView((<Game>this.game), this.thingFoundCallback.bind(this), this.onDrop.bind(this), new Phaser.Point(this.boat.x + this.boat.width + 30, this.boat.y + this.boat.height/2), new Phaser.Point(this.boat.x + this.boat.width, this.boat.y));
            this.eventBox = new EventPopup(this.game);
            this.eventBox.setListeners(this.press1, this.press2,this);
            this.eventBox.show("You found god", "Do you want to keep or throw back?", "Keep", "Throw back");
        }
        press1() {
            this.eventBox.hideMessage();
            alert("Pressed 1");
        }
        press2() {
            this.eventBox.hideMessage();
            alert("Pressed 2");
        }
        onPress() {
            this.rowTheBoat()
        }

        onDrop(dropData: Object) {
            var item: InventoryItem = <InventoryItem>dropData["dropItem"]
            if (!this.inventory.acceptItem(item)) {
                if (this.sea.thrownIntheSea(item)) {
                    this.inventory.removeItem(item);
                    item.sink()
                } else {
                    item.returnToPlace();
                }
            }
        }

        update() {
            this.sailTheBoat();
            if ((<Game>this.game).model.inventory.hasPlayerRowThing()) {
                this.mainButton.setButtonText((<Game>this.game).model.inventory.playerRowThing.buttonLabel);
            } else {
                this.mainButton.setButtonText("Row with your hands");
            }
            this.sea.update();
            this.updateMiles();
            this.foodAndHealth();
            this.updateHealthFoodAndWater();
            this.thingsInView.update();
        }

        rowTheBoat() {
            if ((<Game>this.game).model.inventory.hasPlayerRowThing())
                (<Game>this.game).model.world.MoveMeters((<Game>this.game).model.inventory.playerRowThing.speed);
            else
                (<Game>this.game).model.world.MoveMeters(0.1);
        }

        sailTheBoat() {
            if ((<Game>this.game).model.inventory.hasSailThing())
                (<Game>this.game).model.world.MoveMeters((<Game>this.game).model.inventory.sailThing.speed);
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
        }
        updateHealthFoodAndWater() {
            var world: WorldState = (<Game>this.game).model.world;
            this.healthDisplay.text = "Health: " + Math.ceil(world.health) + "%";
            this.foodDisplay.text = "Food: " + Math.ceil(world.food)
            this.waterDisplay.text = "Water: " + Math.ceil(world.water)
        }
           
        updateMiles() {
                this.milesDisplay.text = "You are " + (<Game>this.game).model.world.milesRemaining.toFixed(4) + " miles from land";   
        }

        thingFoundCallback(thing: Thing) {
            this.eventBox = new EventPopup(this.game);
            this.eventBox.setListeners(this.press1, this.press2, this);
            this.eventBox.show("You found a " + thing.displayName, "Do you want to keep or throw back?", "Keep", "Throw back");
        }

    }

}   