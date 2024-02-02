import "bootstrap/dist/css/bootstrap.min.css"
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/js/bootstrap.js"
import axios from 'axios'
import VueAxios from 'vue-axios'
import Swal from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import './style/globalStyle.css'
import RollbarPlugin from './rollbar'


createApp(App)
.use(router)
.use(VueAxios, axios)
.use(Swal)
.use(RollbarPlugin)    
.mount('#app')