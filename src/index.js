import {HeaderComponent} from './components/header.component.js'
import {NavigationComponent} from './components/navigation.component.js'

import {CreateComponent} from './components/create.component.js'
import {PostComponent} from './components/post.component.js'
import {FavoriteComponent} from './components/favorite.component.js'
import {Loader} from './components/loader.component.js'


new HeaderComponent('header')

const navigationComponent = new NavigationComponent('navigation')

const loader = new Loader('loader')

const createComponent = new CreateComponent('create')
const postComponent = new PostComponent('posts', {loader})
const favoriteComponent = new FavoriteComponent('favorite', {loader})

navigationComponent.addPage([
    {name: 'create', component: createComponent},
    {name: 'posts', component: postComponent},
    {name: 'favorite', component: favoriteComponent}
])



