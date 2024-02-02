<template>
  <section>
    <label class="space-docs"><b>Account & Utilization</b></label
    ><br />
    <p>
      Account Tariff: <b>{{ tariff }}</b>
    </p>
    <p>
      {{ accountMB }}MB / {{ accountGB }}GB of <b>{{ size }}GB</b>
    </p>
    <div>
      <h6>MB in %</h6>
      <div class="progress">
        <div
          class="progress-bar"
          role="progressbar"
          :style="{ width: `${accountMB}%` }"
          :aria-valuenow="accountMB"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {{ accountMB }}%
        </div>
      </div>
    </div>
    <br />
    <div>
      <h6>GB in %</h6>
      <div class="progress">
        <div
          class="progress-bar"
          role="progressbar"
          :style="{ width: `${accountGB}%` }"
          :aria-valuenow="accountGB"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {{ accountGB }}%
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getAccountSize, tariffCheck } from '@/components/lib/account';

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
</style>
