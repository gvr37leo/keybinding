
class AbilitySlot{
    
    element:HTMLElement
    shortcutelement:HTMLElement

    constructor(
        public id:number,
    ){

    }

    render(){
        this.element = string2html('<div class="abilityslot"><div id="shortcut" style="position:absolute; top:0px; right:4px; cursor:pointer;"></div></div>')
        this.shortcutelement = this.element.querySelector('#shortcut')
        let ownabilities = findbyForeign(abilitieslist,'slotid',this.id)

        let ownactions = findbyForeign(actionslist,'actionslotid',this.id)
        for(let action of ownactions){
            let triggers = findbyForeign(triggerslist,'actionid',action.id) 
            for(let trigger of triggers){
                this.shortcutelement.innerText += trigger.render()
            }
        }
        if(ownactions.length == 0){
            this.shortcutelement.innerText = 'unbound'
        }
        this.shortcutelement.addEventListener('click', e => {
            if(ownactions.length == 0){
                //create new action
                listenonce('keydown', (e:KeyboardEvent) => {
                    var newaction = new Action(actionidcounter++,`trigger actionbar`,this.id)
                    var newtrigger = new Trigger(e.key,newaction.id,e.shiftKey,e.ctrlKey,e.altKey)
                    actionslist.push(newaction)
                    triggerslist.push(newtrigger)
                    renderActionBar()
                })

            }else{

                listenonce('keydown', (e:KeyboardEvent) => {
                    for(let action of ownactions){
                        let triggers = findbyForeign(triggerslist,'actionid',action.id) 
                        for(let trigger of triggers){
                            trigger.char = e.key
                        }
                    }
                    renderActionBar()
                })
                

            }
            
        })
        //find linked actions
        //find action's triggers 


        for(var ability of ownabilities){
            this.element.appendChild(ability.render())
        }

        this.element.addEventListener('dragover', ev => {
            ev.preventDefault()
        })
    
        this.element.addEventListener('drop', ev => {
            let abilityid = parseInt(ev.dataTransfer.getData("abilityid"));
            var srcspell = findbyid(abilitieslist,abilityid)
            var srcspellparentslot = findbyid(slotslist,srcspell.slotid) 

            var ownsspells2 = findbyForeign(abilitieslist,'slotid',this.id)

            ownsspells2.forEach(s => s.slotid = srcspellparentslot.id)
            srcspell.slotid = this.id
            renderActionBar()
        })

        return this.element
        //check which trigger/action triggers this slot(or other way)... have the action add the shortcut?
        //show it in render
        //make it clickable and reassignable

    }
}