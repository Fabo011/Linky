<template>
  <TheCreateAndSaveNewLink />
</template>

<script lang="ts">
import TheArchiveIcon from '@/assets/svg/TheArchiveIcon.vue';
import TheAccount from '@/components/userprofile/account/TheAccount.vue';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { defineComponent } from 'vue';
import TheCreateAndSaveNewLink from './link/TheCreateAndSaveNewLink.vue';

export default defineComponent({
  components: {
    TheCreateAndSaveNewLink,
    TheArchiveIcon,
    TheAccount,
  },

  methods: {
    openArchive() {
      this.$router.push('archive');
    },
  },
});
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content button {
  background-color: transparent;
  border: none;
  padding: 10px;
  width: 100%;
  text-align: left;
  cursor: pointer;
}

.dropdown-content button:hover {
  background-color: #ddd;
}
.btn {
  margin-left: 3px;
  margin-right: 3px;
  background-color: var(--primary-blue-color);
}
.cur {
  cursor: pointer;
}

.dropdown-item {
  cursor: pointer;
}
</style>
