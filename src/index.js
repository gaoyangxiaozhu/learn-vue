import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './components/App.vue'
import 'font-awesome/css/font-awesome.css'
import 'bootstrap/dist/css/bootstrap.css'

Vue.use(VueRouter)


const router = new VueRouter({
    history: true,
    saveScrollPosition: true,
    suppressTransitionError: true
})

router.map({
    '/':{
        name: 'home',
        component: require('./components/Home/index.vue')
    },
    '/calender': {
        name: 'calendar',
        component: require('./components/Calendar/index.vue')
    },
    '/progressbar':{
        name: 'progressbar',
        component: require('./components/ProgressBar/index.vue')
    }
})

router.start(Vue.extend(App), '#app')
window.router = router
