<template>
  <section v-for="item in filteredLinks" :key="item.id" ref="dataComponent">
    <div class="card" id="theCard">
      <h5 class="card-header">
        <img height="18" width="18" :src="baseUrl + item.link" :alt="item.linkname" />
        {{ item.linkname }}
        <mark class="category text-primary"
          ><span id="cat">{{ item.category }}</span></mark
        >
      </h5>
      <div class="card-body">
        <h6 class="card-title">{{ item.link }}</h6>
        <p class="card-text">{{ item.linkdescription }}</p>
        <a :href="item.link" target="_blank" class="btn btn-sm openlink">Open link</a>

        <button class="btn" @click.prevent="shareLink(item)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-share-fill"
            viewBox="0 0 16 16"
          >
            <path
              d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"
            />
          </svg>
        </button>

        <button class="btn btn-danger btn-sm btn-space" @click.prevent="deleteLink(item)">
          Delete
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { store } from '../../../store/store';
import { defineComponent } from 'vue';
import Clipboard from 'clipboard';
import { supabase } from '../../lib/supabaseClient';

export default defineComponent({
  name: 'TheRetrieveAllLinks',

  data() {
    return {
      store,
      baseUrl: 'http://www.google.com/s2/favicons?domain=',
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
    shareLink(item) {
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

    async deleteLink(item) {
      this.$swal({
        icon: 'warning',
        title: 'Warning',
        html: `Do you really want to delete the <b>${item.linkname}</b> link?`,
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        cancelButtonColor: '#0d6efd',
        confirmButtonText: 'Delete',
        confirmButtonColor: '#dc3545',
      }).then(async (result) => {
        if (result.value == true) {
          const username = item.username;
          const link = item.link;
          try {
            await supabase
              .from('link')
              .delete()
              .eq(`username`, username)
              .eq(`link`, link)
              .then(() => {
                store.retieveAllLinks();
              });
          } catch (error) {
            console.log(error);
          }
        } else {
          this.$swal.close();
        } // swal if else
      }); //swal then
    }, //deleteLink
  }, //methods
});
</script>
<style scoped>
#theCard {
  margin: 10px;
}
.card-header {
  background-color: var(--primary-background-color);
  color: var(--primary-white-color);
}
.category {
  float: right;
  background-color: var(--primary-background-color);
  font-size: 12px;
}
.btn-space {
  margin-left: 5px;
}
#cat {
  color: var(--primary-blue-color);
}
.openlink {
  background-color: var(--primary-blue-color);
}
.btn {
  color: var(--primary-background-color);
}
</style>
