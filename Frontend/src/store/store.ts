import { reactive } from 'vue'


export const store = reactive({
    authStatus: '',
    token: '',
    action() {
        this.authStatus = 'loggedIn'
    },
    setToken(data: string) {
        this.token = data
    },
})