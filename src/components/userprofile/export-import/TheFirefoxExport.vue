<template>
  <div>
    <button @click="downloadFirefoxHtml">Export for Firefox</button>
  </div>
</template>

<script lang="ts">
import { store } from '@/store/store';
import { defineComponent } from 'vue';

type BookmarkItem = {
  link: string;
  category: string;
};

export default defineComponent({
  name: 'TheFirefoxExport',

  methods: {
    downloadFirefoxHtml() {
      const items: BookmarkItem[] = (store.items as BookmarkItem[]) || [];

      const bookmarksByCategory: Record<string, BookmarkItem[]> = {};
      for (const item of items) {
        const category = item.category || 'Uncategorized';
        if (!bookmarksByCategory[category]) {
          bookmarksByCategory[category] = [];
        }
        bookmarksByCategory[category].push(item);
      }

      const escapeHtml = (text: string) =>
        text
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');

      const now = Math.floor(Date.now() / 1000);

      let htmlContent = `
<!DOCTYPE NETSCAPE-Bookmark-file-1>
<!-- This is an automatically generated file.
     It will be read and overwritten.
     DO NOT EDIT! -->
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmarks</TITLE>
<H1>Bookmarks</H1>
<DL><p>
  <DT><H3 ADD_DATE="${now}" LAST_MODIFIED="${now}" PERSONAL_TOOLBAR_FOLDER="true">Linky</H3>
  <DL><p>
`;

      // Create folders and add bookmarks based on categories
      for (const [category, items] of Object.entries(bookmarksByCategory)) {
        htmlContent += `    <DT><H3 ADD_DATE="${now}">${escapeHtml(category)}</H3>\n    <DL><p>\n`;
        for (const item of items) {
          htmlContent += `      <DT><A HREF="${escapeHtml(item.link)}" ADD_DATE="${now}">${escapeHtml(item.link)}</A>\n`;
        }
        htmlContent += `    </DL><p>\n`;
      }

      // Close the HTML structure
      htmlContent += `  </DL><p>\n</DL><p>\n`;

      // Generate a Blob and create a download link
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'linkycloud-bookmarks.html';
      a.click();
      URL.revokeObjectURL(url);
    },
  },
});
</script>

<style scoped>
button {
  background-color: var(--primary-blue-color);
  color: var(--primary-white-color);
  padding: 8px;
  font-size: small;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 5px;
}
</style>
