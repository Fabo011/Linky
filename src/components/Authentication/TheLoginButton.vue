<template>
    <div class="mb-3">
      <button v-if="nBtn" type="button" class="btn btn-success w-100" @click.prevent="push">{{buttonText}}</button>
        <button v-if="loading" class="btn btn-success w-100" type="button" disabled>
            <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
               Loading ...
        </button>
    </div>
                 <p class="text-danger">{{errorText}}</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { store } from '../../store/store'
import { supabase } from '../lib/supabaseClient'


export default defineComponent({
    name: "TheAuthButton.vue",

    data() {
        return {
            username: "",
            password: "",
            buttonText: "Login",
            authStatus: "loggedIn",
            url: "",
            reset: "",
            store,
            errorText: "",
            nBtn: true,

            // loading
            loading: false
        };
    },
    
    methods: {
        async push() {
            this.nBtn = false
            this.loading = true
            const username = store.username
             const email = username+'@linky.com'
            const password = store.password

            try {
                const { data } = await supabase.auth.getUser()
                if (!data.user) {
                    const { error } = await supabase.auth.signUp({ email, password })

                    if (!error) {
                        store.action(this.authStatus)
                        store.setPassword(this.reset)
                        this.$router.push(`/profile/${username}`)
                    } else {
                        this.errorText = 'Duplicate username, please take other username.'
                    }
                } else {
                    const { error } = await supabase.auth.signInWithPassword({ email, password })
                    if (!error) {
                        store.action(this.authStatus)
                        store.setPassword(this.reset)
                        this.$router.push(`/profile/${username}`)
                    } else {
                        this.errorText = 'Wrong username or password.'
                    }
                }
            }
            catch (error) {
                this.errorText = 'Wrong username or password.'
            }
        },
    },

});
</script>