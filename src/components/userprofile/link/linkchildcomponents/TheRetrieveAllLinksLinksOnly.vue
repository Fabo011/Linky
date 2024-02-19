<template>
  <button v-if="item.category !== 'chat' && item.type !== 'file'" class="btn share">
    <a :href="item.link" target="_blank" class="btn btn-sm openlink">
      <TheChatBtnIcon /><br />
      <span class="clipboard">Link</span>
    </a>
  </button>

  <button
    v-if="item.category !== 'chat' && item.type !== 'file'"
    class="btn share"
    @click.prevent="copyLink(item)"
  >
    <TheClipboardIcon /><br />
    <span class="clipboard">Copy Link</span>
  </button>

  <button
    v-if="item.linkusername !== '' && item.category !== 'chat'"
    class="btn share"
    @click.prevent="copyUsername(item)"
  >
    <TheUsernameIcon /><br />
    <span class="clipboard">Copy Username</span>
  </button>

  <button
    v-if="item.linkpassword !== '' && item.category !== 'chat'"
    class="btn share"
    @click.prevent="copyPassword(item)"
  >
    <TheCopyPasswordIcon /><br />
    <span class="clipboard">Copy Password</span>
  </button>

  <button v-if="item.category !== 'chat' && item.type !== 'file'" class="btn share" @click.prevent="updateLink(item)">
    <TheLinkIcon /><br>
    <span class="clipboard">Edit Link</span>
  </button>
</template>
<script>
import { store } from '../../../../store/store';
import { defineComponent } from 'vue';
import { copiedtoast } from '@/components/toasts/toasts';
import { decryptString } from '@/components/crypto/crypto';
import TheClipboardIcon from '@/assets/svg/TheClipboardIcon.vue';
import TheUsernameIcon from '@/assets/svg/TheUsernameIcon.vue';
import TheCopyPasswordIcon from '@/assets/svg/TheCopyPasswordIcon.vue';
import Clipboard from 'clipboard';
import TheChatBtnIcon from '@/assets/svg/TheChatBtnIcon.vue';
import swal from 'sweetalert2';
import TheLinkName from '../TheLinkName.vue';
import TheLinkIcon from '@/assets/svg/TheLinkIcon.vue';
import { encryptString } from '@/components/crypto/crypto';
import { supabase } from '@/components/lib/supabaseClient';

export default defineComponent({
  name: 'TheRetrieveAllLinksLinksOnly',
  components: {
    TheClipboardIcon,
    TheUsernameIcon,
    TheCopyPasswordIcon,
    TheChatBtnIcon,
    TheLinkName,
    TheLinkIcon
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

    copyPassword(item) {
      const linkPassword = item.linkpassword;
      const decryptedPassword = decryptString(linkPassword);
      new Clipboard('.btn', {
        text: () => {
          return decryptedPassword;
        },
      });
      copiedtoast();
    },

    async updateLink(item) {
      swal.fire({
        html: `
      <div style="max-width: 500px; max-height: 300px; overflow-y: auto;">
      <h3>Edit Link</h3>
      <p>Edit the field you intend to change.</p>
      <input id="input1" class="swal2-input" style="max-height=2px;" placeholder="Linkname" minlength="3" maxlength="20">
      <input id="input2" class="swal2-input" placeholder="Tags" minlength="3" maxlength="60">
      <input id="input3" class="swal2-input" placeholder="Category" minlength="3" maxlength="15">
      <input id="input4" class="swal2-input" placeholder="Link" minlength="4" maxlength="801">
      <input id="input5" class="swal2-input" placeholder="Link Username" minlength="6" maxlength="200">
      <input id="input6" class="swal2-input" placeholder="LinkPassword" minlength="6" maxlength="3000">
    </div>
        `,
        confirmButtonText: 'Send Update',
        confirmButtonColor: '#5F7FFF',
        preConfirm: async () => {
           const username = store.username;
          const newlinkname = document.getElementById('input1').value;
          const newlinkdescription = document.getElementById('input2').value;
          const newcategory = document.getElementById('input3').value;
          const newlink = document.getElementById('input4').value;
          const newlinkUsername = document.getElementById('input5').value;
          const newlinkPassword = document.getElementById('input6').value;
          const email = username.toLowerCase() + '@linky.com';
          const id = item.id;

          if (newlinkname !== item.linkname && newlinkname !== '') {
            this.linkname = newlinkname;
          } else {
            this.linkname = item.linkname;
          }

          if (newlinkdescription !== item.linkdescription && newlinkdescription !== '') {
            this.linkdescription = newlinkdescription;
          } else {
            this.linkdescription = item.linkdescription;
          }

          if (newlink !== item.link && newlink !== '') {
            this.link = newlink;
          } else {
            this.link = item.link;
          }

          if (newcategory !== item.category && newcategory !== '') {
            this.category = newcategory;
          } else {
            this.category = item.category;
          }

          if (newlinkUsername !== item.linkUsername && newlinkUsername !== '') {
            this.linkusername = newlinkUsername;
          } else {
            this.linkusername = item.linkUsername;
          }

          if (newlinkPassword !== item.linkPassword && newlinkPassword !== '') {
            const excryptedLinkPass = encryptString(newlinkPassword);
            this.linkpassword = excryptedLinkPass;
          } else {
            this.linkpassword = item.linkPassword;
          }

          const data = {
            linkname: this.linkname,
            linkdescription: this.linkdescription,
            link: this.link,
            category: this.category,
            linkusername: this.linkusername,
            linkpassword: this.linkpassword,
          };

          const updateData = {
            username: username,
            email: email,
            linkname: this.linkname,
            linkdescription: this.linkdescription,
            link: this.link,
            category: this.category,
            linkusername: this.linkusername,
            linkpassword: this.linkpassword,
          };

          for (const key in updateData) {
            if (updateData[key] == null) {
              delete updateData[key];
            }
          }

          try {
            await supabase
              .from('link')
              .update(data)
              .eq(`id`, id)
              .eq(`username`, username)
              .then(() => {
                swal
                  .fire({
                    icon: 'success',
                    text: `You´ve successfully updated the link ${this.linkname}.`,
                    timer: 1500,
                    showConfirmButton: false,
                  })
                  .then(() => {
                    store.retieveAllLinks();
                  });
              });
          } catch (error) {
            throw new Error('editLinkBtn Error: ' + error);
          }
        }
      })
    }
  },
});
</script>
<style scoped>
.btn {
  color: var(--primary-background-color);
  color: var(--primary-white-color);
  height: 50px;
}
.share {
  color: var(--primary-background-color);
}
.clipboard {
  margin: 0;
  font-size: 8px;
}
.openlink {
  background-color: var(--primary-blue-color);
}
</style>
