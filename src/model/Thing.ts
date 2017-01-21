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
}