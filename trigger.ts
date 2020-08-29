class Trigger{
    constructor(
        public char:string,
        public actionid:number,
        public shift:boolean,
        public ctrl:boolean,
        public alt:boolean,
    ){

    }

    render(){
        var list = []
        if(this.shift){
            list.push('s')
        }
        if(this.ctrl){
            list.push('c')
        }
        if(this.alt){
            list.push('a')
        }
        list.push(this.char)

        return list.join('-')
    }
}

class Action{
    constructor(
        public id:number,
        public description:string,
        public actionslotid:number,
    ){

    }
}
