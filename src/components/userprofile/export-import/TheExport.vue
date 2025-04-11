<template>
  <button @click.prevent="downloadFile">Export CSV</button>
</template>

<script lang="ts">
import { store } from '@/store/store';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TheExport.vue',

  methods: {
    async downloadFile() {
      const items = store.items;
      if (!items || items.length === 0) {
        alert('No data to export.');
        return;
      }

      // Extract headers
      const headers = Object.keys(items[0]);
      const csvRows = [];

      // Add headers
      csvRows.push(headers.join(','));

      // Add rows
      for (const item of items) {
        const values = headers.map((header) => {
          const val = item[header];
          const escaped = ('' + val).replace(/"/g, '""'); // escape double quotes
          return `"${escaped}"`;
        });
        csvRows.push(values.join(','));
      }

      // Create CSV Blob
      const csvString = csvRows.join('\n');
      const blob = new Blob([csvString], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);

      // Trigger download
      const a = document.createElement('a');
      a.href = url;
      a.download = 'linkycloud.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },
  },
});
</script>

<style scoped>
button {
  padding: 8px;
  font-size: small;
  background-color: var(--primary-blue-color);
  color: var(--primary-white-color);
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
