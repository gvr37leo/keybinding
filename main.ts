/// <reference path="node_modules/vectorx/vector.ts" />
/// <reference path="node_modules/utilsx/utils.ts" />
/// <reference path="table.ts" />
/// <reference path="ability.ts" />
/// <reference path="abilityslot.ts" />
/// <reference path="trigger.ts" />


let container = document.querySelector('#container')

var slotslist:AbilitySlot[] = []
var abilitieslist:Ability2[] = []

var triggeridcounter = 0
var triggerslist = [
    new Trigger('q',triggeridcounter++,false,false,false),
    new Trigger('w',triggeridcounter++,false,false,false),
    new Trigger('e',triggeridcounter++,false,false,false),
    new Trigger('r',triggeridcounter++,false,false,false),
]//q,w,e,r,t,y   //rebindable(via menu~ or clicking on the tooltip)

var actionidcounter = 0
var actionslist = [
    new Action(actionidcounter++, 'trigger actionbar 0', 0),
    new Action(actionidcounter++, 'trigger actionbar 1', 1),
    new Action(actionidcounter++, 'trigger actionbar 2', 2),
    new Action(actionidcounter++, 'trigger actionbar 3', 3),
]//action bar 1,2,3,4,5,6,7




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
    // if(e.key == 'W'){
    //     debugger
    // }
    var hittriggers = triggerslist.filter(t => {
        return t.char == e.key
        && t.ctrl == e.ctrlKey
        && t.shift == e.shiftKey
        && t.alt == e.altKey
    })
    for(var hittrigger of hittriggers){
        // actions.filter(a => a.id == hittrigger.actionid).forEach(a => a.cb())
        // todo trigger action -> abilityslot
        var actionsfortrigger = actionslist.filter(a => a.id == hittrigger.actionid)

        for(var action of actionsfortrigger){
            var slot = slotslist.find(s => s.id == action.actionslotid)
            var abilities = abilitieslist.filter(a => a.slotid == slot.id)

            abilities.forEach(a => a.cb())

        }

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

function listenonce(eventtype:string,cb:(event) => void){
    var listener = (e:KeyboardEvent) => {
        if(e.key != 'Shift' && e.key != 'Control' && e.key != 'Alt'){
            cb(e)
            document.removeEventListener(eventtype,listener)
        }
        
    }

    document.addEventListener(eventtype, listener)
}
