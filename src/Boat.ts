﻿module Waves {

    export class Boat extends Phaser.Group {
      
        constructor(game: Phaser.Game, newX: number, newY: number) {
            super(game);
            this.position.x = newX;
            this.position.y = newY;
            this.create(0, 0, "boat");
           
        }
       




    }

}       