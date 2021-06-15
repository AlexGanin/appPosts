import {Component} from '../core/component.js'
import {apiService} from '../services/api.service.js'
import {renderPost} from '../templates/post.template.js'


export class FavoriteComponent extends Component {

    constructor(id, {loader}) {
        super(id)
        this.loader = loader
    }

    init() {

        this.$el.addEventListener('click', linkClickHandler.bind(this))


    }

    onShow() {

        const favorites = JSON.parse(localStorage.getItem('favorites')) || []
        const html = renderList(favorites)
        this.$el.insertAdjacentHTML('afterbegin', html)
    }

    onHide() {
        this.$el.innerHTML = ''
    }

}

function renderList(list = []) {
    if(list && list.length) {
        return `
        <ul>
            ${list.map(i => `<li><a href="#" class="js-link" data-id="${i.id}">${i.title}</a></li>`).join('')}
        </ul>
        `
    }
    return `<p class="center">Вы пока ничего не добавили</p>`
}

async function linkClickHandler(event) {

    event.preventDefault()

    if(event.target.classList.contains('js-link')) {

        this.loader.show()
        const postId = event.target.dataset.id
        const post = await apiService.fetchPostById(postId)
        
        const html = renderPost(post)
        this.$el.innerHTML = html
        this.loader.hide()
        
    }
   
}