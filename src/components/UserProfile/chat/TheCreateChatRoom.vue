<template>
  <section>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      fill="#5F7FFF"
      class="bi bi-chat-square-fill"
      viewBox="0 0 16 16"
      data-bs-toggle="modal"
      data-bs-target="#settingsModal"
      id="plus"
    >
      <path
        d="M14 0a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-5l-4 3v-3H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12zm0 2H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h5.293l1.353 1.015a1 1 0 0 0 1.225-1.53L8 11l5-3H14a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z"
      />
    </svg>

    <div
      class="modal fade"
      id="settingsModal"
      tabindex="-1"
      aria-labelledby="linkyModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content shadow p-2 mb-4 bg-body rounded border-0">
          <div class="modal-header">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="#5F7FFF"
              class="bi bi-chat-square-fill"
              viewBox="0 0 16 16"
              data-bs-toggle="modal"
              data-bs-target="#settingsModal"
            >
              <path
                d="M14 0a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-5l-4 3v-3H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12zm0 2H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h5.293l1.353 1.015a1 1 0 0 0 1.225-1.53L8 11l5-3H14a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z"
              />
            </svg>
            <h5 class="modal-title space" id="linkyModalLabel"><b>Create New Chat</b></h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form class="modal-body">
            <p>Comming soon.</p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TheSettings.vue',
  components: {},
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
</style>
