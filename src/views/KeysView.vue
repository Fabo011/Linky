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
          <div v-if="key?.length > 20">
            <p>
              Store your digital key in a password manager or encrypted on a usb drive. It's the
              only way to decrypt your data in the cloud. Never lose the key or show to anyone.
            </p>
            <form class="form-data">
              <div class="key-field">
                <input type="password" :placeholder="placeholder" readonly />
                <span class="btn copyBtn" @click.prevent="copyPrivateKey()">Copy Digital Key</span>
              </div>
            </form>
          </div>
          <div v-if="key == null">
            <p>Please copy your digital key into the input field and click the button below.</p>
            <form class="form-data">
              <div class="key-field">
                <input v-model="userKey" type="password" placeholder="Enter Digital Key" />
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

export default defineComponent({
  components: { TheFooter, TheAuthButton },

  data() {
    return {
      store,
      placeholder: '*******************************',
      key: '',
      userKey: '',
    };
  },

  beforeMount() {
    store.authStatusRefresh();
    store.checkUser();
    const key = sessionStorage.getItem('key') as string;
    this.key = key;
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
      // #TODO: Validate the key a bit
      sessionStorage.setItem('key', this.userKey);
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
  background-color: var(--chat-delete-btn);
}

#image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>
