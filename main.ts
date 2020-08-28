/// <reference path="node_modules/vectorx/vector.ts" />
/// <reference path="node_modules/utilsx/utils.ts" />
/// <reference path="table.ts" />
/// <reference path="ability.ts" />
/// <reference path="abilityslot.ts" />
/// <reference path="trigger.ts" />


let container = document.querySelector('#container')

var slotslist:AbilitySlot[] = []
var abilitieslist:Ability2[] = []


var triggers = [
    new Trigger('q',0,false,false,false),
    new Trigger('w',1,false,false,false),
    new Trigger('e',2,false,false,false),
    new Trigger('r',3,false,false,false),
]//q,w,e,r,t,y   //rebindable(via menu~ or clicking on the tooltip)

var actions = [
    new Action(0, 'trigger actionbar', () => triggerActionBar(0,0)),
    new Action(1, 'trigger actionbar', () => triggerActionBar(1,1)),
    new Action(2, 'trigger actionbar', () => triggerActionBar(2,2)),
    new Action(3, 'trigger actionbar', () => triggerActionBar(3,3)),
]//action bar 1,2,3,4,5,6,7

function triggerActionBar(actionid:number,index:number){
    var slot = findbyid(slotslist,index)
    var abilities = findbyForeign(abilitieslist,'slotid',slot.id)
    abilities.forEach(a => a.cb())



    //this stuff shoud happen after rerender

    //add display and shortcut to abilityslot
    //when clicked listen for keypress
    //lookup trigger and set key to that keypress
    
    // var owntriggers = findbyForeign(triggers,'actionid',actionid) 
    // slot.shortcutelement.innerText = ''
    // owntriggers.forEach(t => slot.shortcutelement.innerText += t.char)
    // slot.shortcutelement.addEventListener('click', e => {
    //     let listener = (kde:KeyboardEvent) => {
    //         owntriggers.forEach(t => t.char = kde.key)
    //         document.removeEventListener('keydown',listener)
    //     }

    //     document.addEventListener('keydown', listener)

    // })


}


for(var i = 0; i < 10;i++){
    slotslist.push(new AbilitySlot(i))
}

for(let i = 0; i < 5;i++){
    abilitieslist.push(new Ability2(i,i, `ability${i}`, () => {
        console.log(`ability ${i}`);
    }))
}

renderActionBar()

function renderActionBar(){
    container.innerHTML = ''
    for(var slot of slotslist){
        container.appendChild(slot.render())
    }
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

function query(query:string){
    return Array.from(document.querySelectorAll(query)) as HTMLElement[]
}

function findbyid<T>(arr:T[], id:number):T{
    return arr.find((v:any) => v.id == id)
}

function findbyForeign<T>(arr:T[],foreign:string,id:number):T[]{
    return arr.filter(v => v[foreign] == id)
}