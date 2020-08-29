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
            // var ghost = this.element.cloneNode(true) as HTMLElement
            // document.body.appendChild(ghost)
            // ghost.style.position = 'absolute'
            // ghost.style.top = '-5000px'
            // ghost.style.top = '-5000px'
            // ev.dataTransfer.setDragImage(this.element as any,0,0)
        })

        this.element.addEventListener('click',() => {
            this.cb()
        })

        return this.element
    }
}