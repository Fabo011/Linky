<template>
    <div class="btn-group dropstart">
      <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" data-bs-auto-close="outside">
        +
      </button>
      <ul class="dropdown-menu">
        <li><TheCreateAndSaveNewLink class="dropdown-item"></TheCreateAndSaveNewLink></li>
        <li><a class="dropdown-item" href="#">Link 2</a></li>
        <li><a class="dropdown-item" href="#">Link 3</a></li>
      </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TheCreateAndSaveNewLink from './TheCreateAndSaveNewLink.vue';

export default defineComponent({
    components: {TheCreateAndSaveNewLink},
    
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
}
</style>

