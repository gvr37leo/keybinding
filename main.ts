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
        public shift:boolean,
        public ctrl:boolean,
        public alt:boolean,
    ){

    }
}


var triggers = []//q,w,e,r,t,y   //rebindable(via menu~ or clicking on the tooltip)
var actions = []//action bar 1,2,3,4,5,6,7

document.addEventListener('keydown', e => {
    
})