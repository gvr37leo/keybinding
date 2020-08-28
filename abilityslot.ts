
class AbilitySlot{
    
    element:HTMLElement
    shortcutelement:HTMLElement

    constructor(
        public id:number,
    ){

    }

    render(){
        this.element = string2html('<div class="abilityslot"><div id="shortcut" style="position:absolute; top:0px; right:4px; cursor:pointer;">s-q</div></div>')
        this.shortcutelement = this.element.querySelector('#shortcut')
        var ownspells = findbyForeign(abilitieslist,'slotid',this.id)
        for(var ability of ownspells){
            this.element.appendChild(ability.render())
        }

        this.element.addEventListener('dragover', ev => {
            console.log('drag over');
            ev.preventDefault()
        })
    
        this.element.addEventListener('drop', ev => {
            console.log('drop');
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