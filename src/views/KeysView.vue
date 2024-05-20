<template>
  <section class="container mt-5">
    <div class="row d-flex justify-content-center">
      <div class="col-md-6">
        <div class="card px-4 py-5 shadow p-3 mb-5 bg-body rounded border-0" id="form1">
          <h3>
            <b>Digital Key </b>
            <img src="../assets//key.png" alt="cat waiting for key" id="image" />
          </h3>
          <hr />
          <div v-if="state !== 'authenticatedUser'">
            <p>
              Copy and store your digital key savely. It's the
              only way to decrypt your data in the cloud. Never lose the key or show to anyone. Save your key secure on a usb drive as backup.
            </p>
            <form class="form-data">
              <div class="key-field">
                <input type="password" :placeholder="placeholder" readonly />
                <span class="btn copyBtn" @click.prevent="copyPrivateKey()">Copy Key</span>
              </div>
               <TheAuthButton @click.prevent="toAccountAfterSignUp()" />
            </form>
          </div>
          <div v-if="state === 'authenticatedUser'">
            <p>Please paste your digital key into the input field to decrypt your data and click the "Go To Account" button.</p>
            <form class="form-data">
              <div class="key-field">
                <input v-model="userKey" type="password" placeholder="Paste Digital Key" />
              </div>
            </form>
            <TheAuthButton @click.prevent="toAccount()" />
          </div>
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
import { savedigitalkeytoast } from '@/components/toasts/toasts';
import { getUserTariff, setUserTariffAfterSignUp } from '@/components/lib/account';

export default defineComponent({
  components: { TheFooter, TheAuthButton },

  data() {
    return {
      store,
      placeholder: '*******************************',
      key: '',
      userKey: '',
      state: '',
    };
  },

  beforeMount() {
    const key = sessionStorage.getItem('key') as string;
    this.key = key;
  },

  async created() {
    const state = await getUserTariff();
    this.state = state;
  },

  methods: {
    copyPrivateKey() {
      const key = this.key;

      new Clipboard('.btn', {
        text: (): any => {
          return key;
        },
      });
      savedigitalkeytoast();
    },

    toAccount() {
      sessionStorage.setItem('key', this.userKey);
      this.$router.push(`/profile`);
    },

    async toAccountAfterSignUp() {
      await setUserTariffAfterSignUp()
      this.$router.push(`/profile`);
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
  height: 35px;
  background-color: var(--primary-blue-color) !important;
}

#image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

#signup {
  color: var(--chat-delete-btn)
}

#signin {
  color: green;
}

.container {
  margin-bottom: 10%;
}
</style>
