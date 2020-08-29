class Trigger{
    constructor(
        public char:string,
        public actionid:number,
        public shift:boolean,
        public ctrl:boolean,
        public alt:boolean,
    ){

    }
}

class Action{
    constructor(
        public id:number,
        public description:string,
        public cb:() => void,
        public attachcb:() => void
    ){

    }
}
