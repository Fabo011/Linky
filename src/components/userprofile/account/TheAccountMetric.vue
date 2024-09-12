<template>
  <section>
    <hr class="container" />
    <label class="space-docs"><b>Account & Utilization</b></label
    ><br />
    <i class="text">
      Account Tariff: <b>{{ tariff }}</b> </i
    ><br />
    <i class="text"> {{ accountMB }}MB of <b>150Mb</b> </i><br />
    <div class="progress-container">
      <div class="progress">
        <div
          class="progress-bar"
          role="progressbar"
          :style="{ width: `${accountMB}%` }"
          :aria-valuenow="accountMB"
          aria-valuemin="0"
          aria-valuemax="100"
        >
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { getAccountSize, tariffCheck } from '@/components/lib/account';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TheAccountMetric.vue',

  data() {
    return {
      key: 1,
      accountMB: 0,
      accountGB: 0,
      tariff: '',
      size: '',
    };
  },

  async beforeMount() {
    const { mb, gb }: any = await getAccountSize();
    this.accountMB = mb;
    this.accountGB = gb;

    const tariff = sessionStorage.getItem('tariff') as string;
    this.tariff = tariff;

    const size = (await tariffCheck()) as string;
    this.size = size;
  },

  methods: {},
});
</script>

<style scoped>
.space {
  margin-left: 3px;
}

.text {
  cursor: pointer;
}

.space-docs {
  margin-top: 12px;
}

.text {
  font-size: 12px;
}

.progress-container {
  margin-top: 5px;
}

.progress {
  width: 90%;
  height: 8px;
}

.container {
  margin-bottom: -5px;
}
</style>
