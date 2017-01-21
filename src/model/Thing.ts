module Waves {

    export class Thing {

        constructor(name: string) {
            this._spriteName = name;
        }

        private _spriteName: string;
        public get spriteName() : string {
            return this._spriteName;
        }

    }

    export class RowThing extends Thing {

        constructor(name: string, speed : number) {
            super(name)
            this._speed = speed;
        }

        private _speed: number;
        public get speed(): number {
            return this._speed;
        }

    }

    export class SailThing extends Thing {

        constructor(name: string, speed: number) {
            super(name)
            this._speed = speed;
        }

        private _speed: number;
        public get speed(): number {
            return this._speed;
        }
    }
}