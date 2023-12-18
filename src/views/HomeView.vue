<template>
  <PageNav />
  <article>
    <section
      class="position-absolute top-50 start-50 translate-middle w-75 p-3"
      style="color: #333"
    >
      <div
        class="background-container"
        style="background-color: #fff; padding: 20px; border-radius: 10px"
      >
        <h1 class="animated-text" style="color: #333">
          <img class="img" src="../../public/img/startpage.png" />
          Linky Cloud
        </h1>
        <p>
          Linky Cloud offers a premium and secure cloud storage solution for privacy entousiasts.
          Save links, files, images, passwords, stream videos, music and chat content. We do not
          collect personalized data, you and your data remains anonymously.
        </p>
        <div class="features">
          <div class="feature">
            <i class="bi bi-cloud"></i>
            <p>Encrypted Cloud</p>
          </div>
          <div class="feature">
            <i class="bi bi-link"></i>
            <p>Save Links</p>
          </div>
          <div class="feature">
            <i class="bi bi-file"></i>
            <p>Store Files</p>
          </div>
          <div class="feature">
            <i class="bi bi-image"></i>
            <p>Save Images</p>
          </div>
          <div class="feature">
            <i class="bi bi-lock"></i>
            <p>Secure Storage</p>
          </div>
          <div class="feature">
            <i class="bi bi-film"></i>
            <p>Stream Movies</p>
          </div>
          <div class="feature">
            <i class="bi bi-music-note"></i>
            <p>Stream Music</p>
          </div>
          <div class="feature">
            <i class="bi bi-chat"></i>
            <p>Chat</p>
          </div>
        </div>
        <a href="#" class="btn btn-primary" style="background-color: #5f7fff; border-color: #5f7fff"
          >Get Started</a
        >
      </div>
    </section>
    <TheFooter />
  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TheFooter from '../components/lib/TheFooter.vue';
import PageNav from '@/components/navbars/ThePageNav.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default defineComponent({
  name: 'HomeView',
  components: { PageNav, TheFooter },
});
</script>

<style scoped>
body {
  background-image: url('../assets/bg.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  margin: 0;
  font-family: 'Arial', sans-serif;
}

.background-container {
  perspective: 1000px;
  opacity: 0.8;
}

.animated-text {
  font-size: 3em;
  margin: 0;
  display: inline-block;
  position: relative;
  animation: flyIn 1s ease-out forwards;
}

@keyframes flyIn {
  from {
    transform: translateZ(-800px) translateY(-50px);
    opacity: 0;
  }

  to {
    transform: translateZ(0) translateY(0);
    opacity: 1;
  }
}

.features {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.feature {
  text-align: center;
}

.feature i {
  font-size: 2em;
  color: #5f7fff;
  margin-bottom: 10px;
}

.btn-primary {
  color: #fff;
}

.img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
}
</style>
