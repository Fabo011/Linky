<template>
    <label for="link-description"><b>Link-Description</b> 
           <mark id="mark-counter">{{ linkdescription.length }}/60</mark></label><br>
    <input type="text" v-model="linkdescription" placeholder="Use link description or tags" minlength="3" maxlength="60"
           class="w-100" @input="validate" @click.prevent="resetInput" />
    <p class="text-danger">{{linkdescriptionError}}</p>
 </template>
 
 <script lang="ts">
 import { defineComponent } from 'vue'
 import { store } from '../../../store/store'
 
 export default defineComponent({
     name: "LinkDescription.vue",
 
     data() {
         return {
             linkdescription: "",
             linkdescriptionError: ""
         }
     },
 
     methods: {
       validate() {
         if(this.linkdescription.length < 3 || this.linkdescription.length > 60 ) {
             this.linkdescriptionError = "Link-Description may have between 3 and 60 characters."
         }else {
             this.linkdescriptionError = ""
         }
         store.setLinkdescription(this.linkdescription)
       },
       
       resetInput() {
         this.linkdescriptionError = ""
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