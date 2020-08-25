/// <reference path="node_modules/vectorx/vector.ts" />
/// <reference path="node_modules/utilsx/utils.ts" />

let container = document.querySelector('#container')

for(let i = 0; i < 10;i++){
    container.insertAdjacentHTML('beforeend',`<div class="hotbar"><div id="spell${i}" class="spell" draggable="true">${i}</div></div>`)
}

let spells = Array.from(document.querySelectorAll('.spell')) as HTMLElement[]
for(let spell of spells){
    spell.addEventListener('dragstart', ev => {
        console.log('drag start');
        ev.dataTransfer.setData("text", ev.target.id);
    })
}

let hotbars = Array.from(document.querySelectorAll('.hotbar')) as HTMLElement[]
for(let hotbar of hotbars){
    hotbar.addEventListener('dragover', ev => {
        console.log('drag over');
        ev.preventDefault()
    })

    hotbar.addEventListener('drop', ev => {
        console.log('drop');
        let data = ev.dataTransfer.getData("text");
        ev.currentTarget.appendChild(document.getElementById(data));
    })
}

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
    ){

    }
}


var triggers = [
    new Trigger('q',0,false,false,false),
    new Trigger('w',1,false,false,false),
    new Trigger('e',2,false,false,false),
    new Trigger('r',3,false,false,false),
]//q,w,e,r,t,y   //rebindable(via menu~ or clicking on the tooltip)

var actions = [
    new Action(0, 'trigger actionbar', () => triggerActionBar(0)),
    new Action(1, 'trigger actionbar', () => triggerActionBar(1)),
    new Action(2, 'trigger actionbar', () => triggerActionBar(2)),
    new Action(3, 'trigger actionbar', () => triggerActionBar(3)),
]//action bar 1,2,3,4,5,6,7

function triggerActionBar(index:number){
    console.log(index);
    //find hotbar
    //get spell
    //trigger spell
}

document.addEventListener('keydown', e => {
    
    var hittriggers = triggers.filter(t => {
        return t.char == e.key
        && t.ctrl == e.ctrlKey
        && t.shift == e.shiftKey
        && t.alt == e.altKey
    })
    for(var hittrigger of hittriggers){
        actions.filter(a => a.id == hittrigger.actionid).forEach(a => a.cb())
    }

})