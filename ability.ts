class Ability2{
    
    element:HTMLElement

    constructor(
        public id:number,
        public slotid:number,
        public name:string,
        public cb:() => void
    ){

    }

    render(){
        this.element = string2html(`<div class="ability" draggable="true">${this.name}</div>`)
        this.element.addEventListener('dragstart', ev => {
            ev.dataTransfer.setData("abilityid", this.id as any);
        })

        this.element.addEventListener('click',() => {
            this.cb()
        })

        return this.element
    }
}