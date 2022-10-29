<template>
 <nav class="navbar navbar-expand-lg navbar-light bg-light">
   <div class="container-fluid">
     <img class="navbar-brand" src="../assets/linky-logo-128px.png" id="logo" href="#" />
     <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link to="/signin"><a class="nav-link" href="#">SignIn</a></router-link>
        </li>
      </ul>
      <form class="d-flex col-md-10">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" id="s">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
  <router-view/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "TheNavbar.vue"
  
});
</script>

<style scoped>
   #logo{
    width: 50px;
   }
   #s{
    width: 80%;
   }
</style>

