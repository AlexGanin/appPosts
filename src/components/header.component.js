import {Component} from '../core/component.js'

export class HeaderComponent extends Component {
    
    constructor(id) {
        super(id)
    }

    init() {

        if(localStorage.getItem('visited')) {
            this.hide()
        }
        
        const $btn = this.$el.querySelector('button')
        $btn.addEventListener('click', buttonHandler.bind(this))

    }

}

function buttonHandler() {
    this.hide()
    localStorage.setItem('visited', true)
}