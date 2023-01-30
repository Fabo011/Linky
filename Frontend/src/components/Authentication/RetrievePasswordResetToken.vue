<template>
  
  <input type="password" :value="passwordResetToken" class="forms-inputs mb-4" />
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: "RetrievePasswordResetToken.vue",
    
    data() {
        return{
           passwordResetToken: '8923iwbc'
        }
    }
});
</script>