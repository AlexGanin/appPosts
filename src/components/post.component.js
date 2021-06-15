import {Component} from '../core/component.js'
import {apiService} from '../services/api.service.js'
import {TransformService} from '../services/transform.service.js'
import {renderPost} from '../templates/post.template.js'

export class PostComponent extends Component {

    constructor(id, {loader}) {
        super(id)
        this.loader = loader
    }

    init() {
       this.$el.addEventListener('click', buttonHandler.bind(this))
    }

    async onShow() {
        this.loader.show()
        const data = await apiService.fetchPosts()
        const posts = TransformService.fbObjectToArray(data)
        const html = posts.map(post => renderPost(post, {showButton: true}))
        this.loader.hide()
        this.$el.insertAdjacentHTML('afterbegin', html.join(' '))
        
    }

    onHide() {
        this.$el.innerHTML = ''
    }


}



function buttonHandler(event) {

    let $el = event.target
    let id = $el.dataset.id
    let title = $el.dataset.title

    if(id) {

        let favorites = JSON.parse(localStorage.getItem('favorites')) || []
        let pretend = favorites.filter(i => i.id == id)

        if(pretend.length) {
            //Delete
            $el.textContent = 'Сохранить'
            $el.classList.remove('button-danger')
            $el.classList.add('button-primary')

            favorites = favorites.filter(el => el.id != id)
        } else {
            //Add
            $el.textContent = 'Удалить'
            $el.classList.remove('button-primary')
            $el.classList.add('button-danger')

            favorites.push({id, title})
        }
        
        localStorage.setItem('favorites', JSON.stringify(favorites))

    }

}