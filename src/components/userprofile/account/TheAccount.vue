<template>
  <section>
    <hr />

    <TheAccountIcon data-bs-target="#createAccountModal" data-bs-toggle="modal" class="text" />
    <i class="text" data-bs-target="#createAccountModal" data-bs-toggle="modal">
      <b> Manage Account</b></i
    >
    <div
      class="modal fade"
      id="createAccountModal"
      tabindex="-1"
      aria-labelledby="accountModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content shadow p-2 mb-4 bg-body rounded border-0">
          <div class="modal-header">
            <TheAccountIcon />
            <h5 class="modal-title space" id="accountModalLabel"><b>Account</b></h5>
            <CloseModalButton />
          </div>
          <form class="modal-body">
            <label><b>Get Secure File Upload | €20 Annually</b></label>
            <br />
            <a href="https://www.buymeacoffee.com/linkycloudstorage/membership" target="_blank"
              ><img
                src="https://cdn.buymeacoffee.com/buttons/v2/arial-blue.png"
                alt="Buy Me A Coffee"
                style="height: 60px !important; width: 217px !important"
            /></a>
            <hr />
            <TheAccountUpgrade />
            <hr />

            <label class="space-docs"><b>Docs</b></label
            ><br />
            <a
              class="nav-link"
              href="https://github.com/Fabo011/Linky/wiki/Linky-Cloud-User-Documentation"
              target="_blank"
            >
              <span class="text-decoration-underline"><TheDocuIcon />Documentation</span>
            </a>
            <hr />
            <TheAccountMetric />
            <hr />
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TheAccountIcon from '@/assets/svg/TheAccountIcon.vue';
import AddBtn from '../../buttons/TheAddBtn.vue';
import LoadingButton from '../../buttons/TheLoadingButton.vue';
import CloseModalButton from '../../buttons/TheCloseModalBtn.vue';
import TheDocuIcon from '@/assets/svg/TheDocuIcon.vue';
import TheAccountMetric from '@/components/userprofile/account/TheAccountMetric.vue';
import TheAccountUpgrade from './TheAccountUpgrade.vue';

export default defineComponent({
  name: 'TheAccount.vue',
  components: {
    TheAccountIcon,
    AddBtn,
    LoadingButton,
    CloseModalButton,
    TheDocuIcon,
    TheAccountMetric,
    TheAccountUpgrade,
  },

  data() {
    return {
      key: 1,
    };
  },
});
</script>

<style scoped>
#plus {
  cursor: pointer;
  background-color: var(--primary-background-color);
  border-radius: 5%;
}

#space-top {
  margin-top: 6px;
}

#mark-security {
  background-color: #ffff;
  font-size: 10px;
  margin-top: 10px;
}

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
