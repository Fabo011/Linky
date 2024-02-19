<template>
  <section v-for="item in filteredLinks" :key="item.id" ref="dataComponent">
    <div class="card" id="theCard">
      <TheRetrieveAllLinksHeader :item="item" />

      <div class="card-body">
        <div v-if="item.type !== 'file'">
          <h6 class="card-title card-title text-truncate">
            <i class="bi bi-link-45deg icons"></i>{{ item.link }}
          </h6>
        </div>

        <div v-if="item.type !== 'file'">
          <p class="card-text"><i class="bi bi-tags icons"></i>{{ item.linkdescription }}</p>
        </div>

        <TheRetrieveAllLinksLinksOnly :item="item" />

        <TheRetrieveAllLinksChatOnly :item="item" />

        <TheDownloadFile v-if="item.type === 'file'" :item="item" />
      </div>
    </div>
  </section>
</template>

<script>
import { store } from '../../../store/store';
import { defineComponent } from 'vue';
import TheTrashIcon from '@/assets/svg/TheTrashIcon.vue';
import TheClipboardIcon from '@/assets/svg/TheClipboardIcon.vue';
import TheCopyPasswordIcon from '@/assets/svg/TheCopyPasswordIcon.vue';
import TheChatBtnIcon from '@/assets/svg/TheChatBtnIcon.vue';
import TheShareChat from '../chat/TheShareChat.vue';
import TheUsernameIcon from '@/assets/svg/TheUsernameIcon.vue';
import TheDownloadFile from '../filearchive/TheDownloadFile.vue';
import TheRetrieveAllLinksHeader from './linkchildcomponents/TheRetrieveAllLinksHeader.vue';
import TheRetrieveAllLinksChatOnly from './linkchildcomponents/TheRetrieveAllLinksChatOnly.vue';
import TheRetrieveAllLinksLinksOnly from './linkchildcomponents/TheRetrieveAllLinksLinksOnly.vue';

export default defineComponent({
  name: 'TheRetrieveAllLinks',
  components: {
    TheTrashIcon,
    TheClipboardIcon,
    TheCopyPasswordIcon,
    TheChatBtnIcon,
    TheShareChat,
    TheUsernameIcon,
    TheDownloadFile,
    TheRetrieveAllLinksHeader,
    TheRetrieveAllLinksChatOnly,
    TheRetrieveAllLinksLinksOnly,
  },

  data() {
    return {
      store,
      toast: true,
    };
  },

  created() {
    store.retieveAllLinks();
  },

  computed: {
    filteredLinks: function () {
      return this.store.items.filter((item) => {
        return (
          item.linkname.match(store.searchValue) ||
          item.linkdescription.match(store.searchValue) ||
          item.category.match(store.searchValue) ||
          item.link.match(store.searchValue)
        );
      });
    },
  },

  methods: {
    setItem(item) {
      store.editButtonActive = false;
      store.item = item;
    },
  }, //methods
});
</script>
<style scoped>
.card {
  margin-top: 10px;
}
.category {
  background-color: var(--primary-white-darker-background);
  font-size: 12px;
}
.btn-space {
  margin-left: 1px;
  background-color: var(--chat-delete-btn);
  border: none;
  opacity: 0.5;
  float: right;
  padding: 2px;
}
#cat {
  color: var(--primary-pink);
}
.openlink {
  background-color: var(--primary-blue-color);
}
.btn {
  color: var(--primary-background-color);
  color: var(--primary-white-color);
}
.share {
  color: var(--primary-background-color);
}

.clipboard {
  margin: 0;
  font-size: 8px;
}
.icons {
  margin-right: 3px;
}
</style>
