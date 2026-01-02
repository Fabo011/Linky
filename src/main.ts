import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.js"
import 'sweetalert2/dist/sweetalert2.min.css'
import { createApp } from 'vue'
import Swal from 'vue-sweetalert2'
import App from './App.vue'
import router from './router'
import './style/globalStyle.css'

createApp(App)
.use(router)
.use(Swal)    
.mount('#app')