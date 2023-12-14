<template>
  <section class="container mt-5">
    <div class="row d-flex justify-content-center">
      <div class="col-md-6">
        <div class="card px-4 py-5 shadow p-3 mb-5 bg-body rounded border-0" id="form1">
          <h3>
            <b>Important </b>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="red"
              class="bi bi-heart-fill"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
              />
            </svg>
          </h3>
          <hr />
          <p>
            Store your private and public key in a password manager. If you switch browsers or clear
            cookies, it's the only way to ensure you can still decrypt your data. Please never lose
            these keys.
          </p>
          <form class="form-data">
            <div class="key-field">
              <input type="text" :placeholder="placeholder" readonly />
              <span class="btn copyBtn" @click.prevent="copyPrivateKey()">Copy Private Key</span>
            </div>

            <div class="key-field">
              <input type="text" :placeholder="placeholder" readonly />
              <span class="btn copyBtn" @click.prevent="copyPublicKey()">Copy Public Key</span>
            </div>
            <TheAuthButton @click.prevent="toAccount()" />
          </form>
        </div>
      </div>
    </div>
  </section>
  <TheFooter />
</template>

<script lang="ts">
import { store } from '../store/store';
import { defineComponent } from 'vue';
import Clipboard from 'clipboard';
import TheFooter from '../components/lib/TheFooter.vue';
import TheAuthButton from '@/components/buttons/TheAuthButton.vue';
import { supabase } from '@/components/lib/supabaseClient';

export default defineComponent({
  components: { TheFooter, TheAuthButton },

  data() {
    return {
      store,
      placeholder: '*******************************',
    };
  },

  created() {
    this.checkUser();
  },

  methods: {
    async checkUser() {
      const storedToken = localStorage.getItem('sb-ycsymeeovppvwzcfdddr-auth-token');
      const token = storedToken ? JSON.parse(storedToken) : null;

      if (!token || !token.user || !token.user.email) {
        console.log('Token or user email is missing.');
        this.$router.push('signin');
        return;
      }

      try {
        const { data } = await supabase.auth.getUser();

        if (!data || !data.user || !data.user.email || data.user.email !== token.user.email) {
          console.log('You are logged out.');
          this.$router.push('signin');
        } else {
          console.log(data.user);
          console.log('Hi');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        this.$router.push('signin');
      }
    },

    copyPrivateKey() {
      const privateKey = this.store.getPrivateKey();

      /*new Clipboard('.btn', {
        text: () => {
          return privateKey;
        },
      });
      this.$swal({
        icon: 'success',
        text: 'You copied the private key to your clipboard.',
        timer: 1500,
        showConfirmButton: false,
      });
    },

    copyPublicKey() {
      const publicKey = this.store.getPublicKey();
      new Clipboard('.btn', {
        text: () => {
          return publicKey;
        },
      });
      this.$swal({
        icon: 'success',
        text: 'You copied the public key to your clipboard.',
        timer: 1500,
        showConfirmButton: false,
      });*/
    },

    copyPublicKey() {
     console.log('Haöllo');
     
    },

    toAccount() {
      const username = this.store.username;
      this.$router.push(`/profile/${username}`);
    },
  },
});
</script>

<style scoped>
.key-field {
  display: flex;
  align-items: center;
  margin: 10px 0;
}

.key-field input {
  flex: 1;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 80%;
}

.key-field span {
  cursor: pointer;
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border-radius: 5px;
  margin-left: 10px;
}

.copyBtn {
  max-width: 30%;
  background-color: var(--chat-delete-btn);
}
</style>
