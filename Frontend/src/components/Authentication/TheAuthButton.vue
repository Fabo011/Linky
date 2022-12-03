<template>
    <div class="mb-3"><button class="btn btn-success w-100" @click.prevent="push">Login</button></div>
                 <p class="text-danger" v-if="error">{{errorText}}</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { store } from '../../store/store'
import globalVaribales from '../../globalVariables'


export default defineComponent({
    name: "TheAuthButton.vue",

    data() {
        return {
            username: "",
            password: "",
            url: "",
            reset: "",
            store,
            error: false,
            errorText: ""
        };
    },
    beforeMount(){
       const currentRoute = this.$route.name 
       if(currentRoute === 'signin'){
          this.url = globalVaribales[0]
          this.errorText = 'Wrong username or password'
       }else if(currentRoute === 'signup'){
          this.url = globalVaribales[1]
          this.errorText = 'Invalid username or password!'
       }
    },
    methods: {
        async push() {
            const username = store.username
            const password = store.password

            try {
                await this.axios.post(`${this.url}`, {
                    username,
                    password
                }).then((res) => {
                    if (res.status === 200 || res.status === 201) {
                        const token = res.data
                        store.action()
                        store.setToken(token)
                        store.setPassword(this.reset)
                        this.$router.push(`/profile/${username}`)
                    }
                    else {
                        this.error = true
                    }
                });
            }
            catch (error) {
                this.error = true
            }
        },
    },

});
</script>