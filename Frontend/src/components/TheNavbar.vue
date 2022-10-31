<template>
 <nav class="navbar navbar-expand-lg navbar-light bg-light">
   <div class="container-fluid">
     <img class="navbar-brand" src="../assets/linky-logo-128px.png" id="logo" href="/" @click.prevent="home" />
     <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <nav v-if="store.authStatus !== 'loggedIn'" class="collapse navbar-collapse" id="navbarTogglerDemo02">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link to="/signin"><a class="nav-link" href="#">SignIn</a></router-link>
        </li>
      </ul>
    </nav>
    <nav v-else-if="store.authStatus == 'loggedIn'" class="collapse navbar-collapse" id="navbarTogglerDemo02">
      <form class="d-flex col-md-12">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <!--<button class="btn btn-outline-success" type="submit">Search</button>-->
      </form>
    </nav>

  </div>
</nav>
<!--class="collapse navbar-collapse" id="navbarTogglerDemo02"-->
  <router-view/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { store } from '../store/store';

export default defineComponent({
  name: "TheNavbar.vue",

data() {
  return{
     store
  }
},
  
methods: {
  home(){
    this.$router.push(`/`);
  }

  }
});
</script>

<style scoped>
   #logo{
    width: 50px;
   }
</style>

