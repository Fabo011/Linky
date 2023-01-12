<template>
    <label for="link-category"><b>Category</b> 
           <mark id="mark-counter">{{ category.length }}/15</mark></label><br>
    <input type="text" v-model="category" placeholder="linky" minlength="3" maxlength="15"
           class="text-lowercase w-100" @input="validate" @click.prevent="resetInput" />
    <p class="text-danger">{{categoryError}}</p>
 </template>
 
 <script lang="ts">
 import { defineComponent } from 'vue'
 import { store } from '../../../store/store'
 
 export default defineComponent({
     name: "TheCategory.vue",
 
     data() {
         return {
             category: "",
             categoryError: ""
         }
     },
 
     methods: {
       validate() {
         if(this.category.length < 3 || this.category.length > 15 ) {
             this.categoryError = "Category may have between 3 and 15 characters. Only lowercase for better search results."
         }else {
             this.categoryError = ""
         }
         store.setCategory(this.category)
       },
       
       resetInput() {
         this. categoryError= ""
       }
     }
 
 });
 </script>
 <style scoped>
 #mark-counter{
   background-color: #ffff;
   font-size: 10px;
 }
 </style>