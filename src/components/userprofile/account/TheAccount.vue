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
            <label><b>Upgrade Account with Crypto</b></label><br>
            <a href="https://plisio.net/donate/BLH2GdX5" target="_blank"
              ><img
                src="https://plisio.net/img/donate/donate_light_icons_color.png"
                alt="Donate Crypto on Plisio"
                width="180"
                height="60"
                id="space-top"
            /></a><br>
            <a
                class="nav-link space-docs"
                href="https://github.com/Fabo011/Linky/wiki/Linky-Cloud-User-Documentation"
                target="_blank"
              >
                <span class="text-decoration-underline"><TheDocuIcon />Documentation</span>
              </a>
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

export default defineComponent({
  name: 'TheSettings.vue',
  components: {
    TheAccountIcon,
    AddBtn,
    LoadingButton,
    CloseModalButton,
    TheDocuIcon
  },

  data() {
    return {
      key: 1,
    };
  },

  methods: {},
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
