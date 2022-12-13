import { reactive } from 'vue'
import VuexPersist from 'vuex-persist'

const vuexLocalStorage = new VuexPersist({
    
    storage: window.localStorage
})


export const store = reactive({
    authStatus: '',
    token: '',
    username: '',
    password: '',
    action() {
        this.authStatus = 'loggedIn'
    },
    setToken(data: string) {
        this.token = data
    },
    setUsername(username: string) {
        this.username = username
    },
    setPassword(password: string) {
        this.password = password
    },
    plugins: [vuexLocalStorage.plugin]
});