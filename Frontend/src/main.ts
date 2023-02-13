import "bootstrap/dist/css/bootstrap.min.css"
import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import "bootstrap/dist/js/bootstrap.js"
import axios from 'axios'
import VueAxios from 'vue-axios'
import Swal from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'


createApp(App)
.use(router)
.use(VueAxios, axios)
.use(Swal)
.mount('#app')


function runFetch() {
    const options = {
      method:'GET',
      headers:{'Content-Type': 'application/json'}
    }
  
    fetch("https://linky-backend.onrender.com/", options)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          console.log('ok');
        } else {
          console.log('not available');
        }
      })
      .catch(error => console.error(error));
  }
  
  function startInterval() {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const startInterval = 6;
    const endInterval = 20;
  
    if (currentHour >= startInterval && currentHour < endInterval) {
      setInterval(runFetch, 60 * 1000);  //60 * 1000
    } else {
      console.log(`Interval not started, current hour: ${currentHour}`);
    }
  }
  
  startInterval();
  



