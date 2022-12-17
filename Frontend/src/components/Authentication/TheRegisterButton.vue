<template>
    <div class="mb-3"><button type="button" class="btn btn-success w-100" @click.prevent="push">{{buttonText}}</button></div>
                 <p class="text-danger">{{errorText}}</p>
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
            buttonText: "Register",
            authStatus: "loggedIn",
            url: "",
            reset: "",
            store,
            errorText: ""
        };
    },
    
    methods: {
        async push() {
            const username = store.username
            const password = store.password
            const url = globalVaribales[1]

            try {
                await this.axios.post(`${url}`, {
                    username,
                    password
                }).then((res) => {
                    if (res.status === 200 || res.status === 201) {
                        const token = res.data
                        store.action(this.authStatus)
                        store.setToken(token)
                        store.setPassword(this.reset)
                        this.$router.push(`/profile/${username}`)
                    }
                    else {
                        this.errorText = 'Duplicate username, please take other username.'
                    }
                });
            }
            catch (error) {
                this.errorText = 'Duplicate username, please take other username.'
            }
        },
    },

});
</script>