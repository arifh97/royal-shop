import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
const Vue = createApp(App)


window.$ = window.jQuery = require('jquery');

// backend CSS
import './assets/backend/css/style.css'
import './assets/backend/vendors/ti-icons/css/themify-icons.css'
import './assets/backend/scss/app.scss'

// frontend css
import './assets/frontend/css/style.css'
import './assets/frontend/css/responsive.css'

// backend js
import 'bootstrap'

// global
Vue.component('NavBar', require('@/components/frontend/NavBar').default)
Vue.component('Footer', require('@/components/frontend/Footer').default)
Vue.component('Modal', require('@/components/Modal.vue').default)
Vue.component('InlinePreloader', require('@/components/InlinePreloader.vue').default)

//sweetalert2
import Swal from 'sweetalert2'
window.Swal = Swal;
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})
window.vToast = Toast;

Vue.use(store).use(router).mount('body')