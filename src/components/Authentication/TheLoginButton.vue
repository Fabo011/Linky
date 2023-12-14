<template>
  <div class="mb-3">
    <AuthBtn v-if="nBtn" @click.prevent="push" />
    <LoadingButton v-if="loading" />
  </div>
  <p class="text-danger">{{ errorText }}</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { store } from '../../store/store';
import { supabase } from '../lib/supabaseClient';
import LoadingButton from '../buttons/TheLoadingButton.vue';
import AuthBtn from '../buttons/TheAuthButton.vue';

export default defineComponent({
  name: 'TheLoginButton.vue',
  components: { LoadingButton, AuthBtn },

  data() {
    return {
      username: '',
      password: '',
      buttonText: 'Login',
      authStatus: 'loggedIn',
      url: '',
      reset: '',
      store,
      errorText: '',
      nBtn: true,

      // loading
      loading: false,
    };
  },

  methods: {
    async push() {
      this.nBtn = false;
      this.loading = true;
      const username = store.username;
      const email = username + '@linky.com';
      const password = store.password;

      try {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (!error) {
          store.action(this.authStatus);
          store.setPassword(this.reset);
          this.nBtn = true;
          this.loading = false;
          this.$router.push(`/profile/${username}`);
        } else {
          this.nBtn = true;
          this.loading = false;
          this.errorText = 'Wrong username or password.';
        }
      } catch (error) {
        // Add rollbar
        this.nBtn = true;
        this.loading = false;
        this.errorText = 'Internal Error.';
      }
    },
  },
});
</script>
