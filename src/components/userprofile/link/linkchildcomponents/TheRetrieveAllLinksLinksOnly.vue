<template>
  <div class="actions">
    <a
      v-if="item.category !== 'chat' && item.type !== 'file' && item.link !== '*' && item.link !== ''"
      :href="item.link"
      target="_blank"
      class="action-pill action-pill--primary"
    >
      <i class="bi bi-box-arrow-up-right"></i>
      <span>Open</span>
    </a>

    <button
      v-if="item.category !== 'chat' && item.type !== 'file' && item.link !== '*' && item.link !== ''"
      class="action-pill"
      @click.prevent="copyLink(item)"
    >
      <i class="bi bi-clipboard"></i>
      <span>Copy URL</span>
    </button>

    <button
      v-if="item.linkusername !== '' && item.category !== 'chat'"
      class="action-pill"
      @click.prevent="copyUsername(item)"
    >
      <i class="bi bi-person-fill"></i>
      <span>User</span>
    </button>

    <div v-if="item.category !== 'chat' && item.type !== 'file'" class="action-edit-wrap">
      <TheEditLink :item="item" />
    </div>
  </div>
</template>
<script>
import { copiedtoast } from '@/components/toasts/toasts';
import Clipboard from 'clipboard';
import { defineComponent } from 'vue';
import { store } from '../../../../store/store';
import TheEditLink from '../TheEditLink.vue';

export default defineComponent({
  name: 'TheRetrieveAllLinksLinksOnly',
  components: {
    TheEditLink,
  },

  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      store,
    };
  },

  methods: {
    copyLink(item) {
      const link = item.link;
      new Clipboard('.btn', {
        text: () => {
          return link;
        },
      });
      this.$swal({
        icon: 'success',
        text: 'You copied the link to your clipboard.',
        timer: 1500,
        showConfirmButton: false,
      });
    },

    copyUsername(item) {
      const linkUsername = item.linkusername;
      new Clipboard('.btn', {
        text: () => {
          return linkUsername;
        },
      });
      copiedtoast();
    },
  },
});
</script>
<style scoped>
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 12px;
  padding-top: 10px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.action-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 13px;
  border: 1.5px solid rgba(95, 127, 255, 0.28);
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: #5F7FFF;
  background: transparent;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.15s, border-color 0.15s;
  height: auto;
  line-height: 1.4;
}

.action-pill:hover {
  background: rgba(95, 127, 255, 0.08);
  border-color: #5F7FFF;
  color: #5F7FFF;
  text-decoration: none;
}

.action-pill--primary {
  background: #5F7FFF;
  color: #fff;
  border-color: #5F7FFF;
}

.action-pill--primary:hover {
  background: #4a6ef5;
  border-color: #4a6ef5;
  color: #fff;
}

.action-edit-wrap {
  display: inline-flex;
  align-items: center;
}
</style>
