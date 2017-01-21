module Waves {

    export class Thing {

        constructor(name: string) {
            this._name = name;
        }

        private _name: string;
        public get name() : string {
            return this._name;
        }

    }
}