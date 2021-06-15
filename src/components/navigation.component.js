import {Component} from '../core/component.js'

export class NavigationComponent extends Component {

    constructor(id) {
        super(id)
        this.pages = []
    }

    init() {
        

        //Array.from(this.$el.querySelectorAll('.tab'))

        this.$el.addEventListener('click', tabHandler.bind(this))

    }

    addPage(arrPages) {
        this.pages = arrPages;
    }

    

}

function tabHandler(event) {

    event.preventDefault()
    
    if(event.target.classList.contains('tab')) {

        this.$el.querySelectorAll('.tab').forEach(link => {
            link.classList.remove('active')
        })

        event.target.classList.add('active')

        this.pages.forEach(p => p.component.hide())
        
        let activeTab = event.target.dataset.name
        const activePage = this.pages.find(p => p.name == activeTab)
        activePage.component.show()
    }

}