<template>
    <div class="import-container">
      <label class="upload-label" for="csv-upload">
        Import CSV
      </label>
      <input id="csv-upload" type="file" accept=".csv" @change="handleFileUpload" />
    </div>
  </template>
  
  <script lang="ts">
  import { encryptString } from '@/components/crypto/crypto';
import { supabase } from '@/components/lib/supabaseClient';
import { store } from '@/store/store';
import Papa from 'papaparse';
import swal from 'sweetalert2';
import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'TheImport',
  
    methods: {
      async handleFileUpload(event: Event) {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (!file) return;
  
        Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          complete: async (results: any) => {
            const data: Record<string, string>[] = results.data;
  
            for (const row of data) {
              try {
                const encrypted = {
                  linkname: encryptString(row.linkname || ''),
                  linkdescription: encryptString(row.linkdescription || ''),
                  link: encryptString(row.link || ''),
                  category: encryptString(row.category || ''),
                  linkusername: encryptString(row.linkusername || ''),
                  linkpassword: encryptString(row.linkpassword || ''),
                  contactname: encryptString(row.contactname || ''),
                  contactphonenumber: encryptString(row.contactphonenumber || ''),
                  contactemail: encryptString(row.contactemail || ''),
                  notes: encryptString(row.notes || ''),
                  filename: encryptString(row.filename || ''),
                };
  
                await supabase.from('link').insert(encrypted);
              } catch (err) {
                console.error('Import failed for row:', row, err);
                swal.fire({
                  icon: 'error',
                  title: 'Import Failed',
                  text: 'An error occurred while importing a row.',
                });
                return;
              }
            }
  
            store.retieveAllLinks();
  
            swal.fire({
              icon: 'success',
              title: 'Import Successful',
              text: `${data.length} links have been imported successfully.`,
              timer: 2000,
              showConfirmButton: false,
            });
          },
          error: (err: any) => {
            console.error('CSV parsing error:', err);
            swal.fire({
              icon: 'error',
              title: 'File Error',
              text: 'Could not parse the file. Make sure it’s a valid CSV.',
            });
          },
        });
      },
    },
  });
  </script>
  
  <style scoped>
  .import-container {
    display: flex;
    flex-direction: column;
    align-items: start;
    margin: 1rem 0;
  }
  
  input[type='file'] {
    display: none;
  }
  
  .upload-label {
    background-color: var(--primary-blue-color);
    color: white;
    padding: 0.6rem 1.2rem;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 500;
    user-select: none;
    display: inline-block;
  }
  </style>
  
