<template>
  <input
    autocomplete="off"
    type="text"
    minlength="17"
    maxlength="17"
    class="w-100"
    v-model="number"
    placeholder="Payment Code what you get after payment"
  /><br />
  <button type="button" class="btn w-100" @click.prevent="upgradeAccount">
    Redeem Payment Code
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { checkPaymentNumber, upgradeUser } from '@/components/lib/account';

export default defineComponent({
  name: 'TheAccountUpgrade.vue',
  components: {},

  data() {
    return {
      key: 1,
      number: '',
    };
  },

  methods: {
    async upgradeAccount() {
      const check = await checkPaymentNumber(this.number);

      if (check === true) {
        const result = await upgradeUser(this.number);

        if (result === true) {
          alert(
            'Account successfully upgraded. Click on Ok, come back and check your Account Tariff.',
          );
          window.location.reload();
        } else {
          alert('Wrong number. Make sure that you take the number from your payment.');
        }
      }
    },
  },
});
</script>

<style scoped>
.btn {
  background-color: var(--primary-blue-color);
  color: var(--primary-white-color);
  margin-top: 3px;
}
</style>
