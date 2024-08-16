<template>
  <section v-for="item in filteredLinks" :key="item.id">
    <div class="card" id="theCard">
      <TheRetrieveAllLinksHeader :item="item" />

      <div class="card-body">
        <div>
          <h6 class="card-title card-title text-truncate">
            <i class="bi bi-link-45deg icons"></i>{{ item.link }}
          </h6>
        </div>

        <div>
          <p class="card-text"><i class="bi bi-tags icons"></i>{{ item.linkdescription }}</p>
        </div>

        <div class="accordion">
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button"
                :class="{ collapsed: !isAccordionOpen(item.id) }"
                type="button"
                @click="toggleAccordion(item.id)"
                :aria-expanded="isAccordionOpen(item.id)"
              >
                More
              </button>
            </h2>
            <div
              :id="'collapse' + item.id"
              class="accordion-collapse collapse"
              :class="{ show: isAccordionOpen(item.id) }"
              :aria-labelledby="'heading' + item.id"
            >
              <div class="accordion-body">
                <TheRetrieveNotes :item="item" />
                <TheRetrieveContacts :item="item" />
                <TheRetrieveAllLinksLinksOnly :item="item" />
                <TheDownloadFile v-if="item.filename" :item="item" />
              </div>
            </div>
          </div>
        </div>
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
import TheUsernameIcon from '@/assets/svg/TheUsernameIcon.vue';
import TheDownloadFile from '../filearchive/TheDownloadFile.vue';
import TheRetrieveAllLinksHeader from './linkchildcomponents/TheRetrieveAllLinksHeader.vue';
import TheRetrieveAllLinksLinksOnly from './linkchildcomponents/TheRetrieveAllLinksLinksOnly.vue';
import TheRetrieveContacts from './linkchildcomponents/TheRetrieveContacts.vue';
import TheRetrieveNotes from './linkchildcomponents/TheRetrieveNotes.vue';

export default defineComponent({
  name: 'TheRetrieveAllLinks',
  components: {
    TheTrashIcon,
    TheClipboardIcon,
    TheCopyPasswordIcon,
    TheChatBtnIcon,
    TheUsernameIcon,
    TheDownloadFile,
    TheRetrieveAllLinksHeader,
    TheRetrieveAllLinksLinksOnly,
    TheRetrieveContacts,
    TheRetrieveNotes,
  },

  data() {
    return {
      toast: true,
      openAccordionId: null,
    };
  },

  created() {
    store.retieveAllLinks();
  },

  computed: {
    filteredLinks: function () {
      return store.items?.filter((item) => {
        return (
          item.linkname?.match(store.searchValue) ||
          item.linkdescription?.match(store.searchValue) ||
          item.category?.match(store.searchValue) ||
          item.link?.match(store.searchValue) ||
          item.contactname?.match(store.searchValue) ||
          item.contactphonenumber?.match(store.searchValue) ||
          item.contactemail?.match(store.searchValue)
        );
      });
    },
  },

  methods: {
    setItem(item) {
      store.item = item;
    },

    toggleAccordion(id) {
      this.openAccordionId = this.openAccordionId === id ? null : id;
    },
    isAccordionOpen(id) {
      return this.openAccordionId === id;
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

.accordion {
  margin-top: 10px;
}
.accordion-button {
  transition: background-color 0.3s ease;
}

.accordion-button:focus {
  background-color: var(--primary-blue-color);
  color: var(--primary-white-color);
}
</style>
