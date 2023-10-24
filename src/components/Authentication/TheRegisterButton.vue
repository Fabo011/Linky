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
  name: 'TheRegisterButton.vue',
  components: { LoadingButton, AuthBtn },

  data() {
    return {
      username: '',
      password: '',
      buttonText: 'Register',
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
      const password = store.password;
      const email = username + '@linky.com';

      try {
        const { error } = await supabase.auth.signUp({ email, password });
        if (!error) {
          store.action(this.authStatus);
          store.setPassword(this.reset);
          this.nBtn = true;
          this.loading = false;
          this.$router.push(`/profile/${username}`);
        } else {
          this.errorText = 'This username already exist.';
          this.nBtn = true;
          this.loading = false;
        }
      } catch (error) {
        this.errorText = 'Internal Error.';
        this.nBtn = true;
        this.loading = false;
      }
    },
  },
});
</script>
