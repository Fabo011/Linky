<template>
  <PageNav />
  <article class="container">
    <section
      class="position-absolute top-50 start-50 translate-middle w-70 p-3 section-con"
      style="color: #333"
    >
      <div
        class="background-container"
        style="background-color: #fff; padding: 20px; border-radius: 10px"
      >
        <h1 class="animated-text" style="color: #333">
          <img class="img" src="../assets/startpage.png" />
          Linky Cloud
        </h1>
        <p>
          Linky Cloud is a non-profit, free, open-source, zero-trust solution designed to securely
          store web URLs and related metadata such as tags, categories, notes, and contact
          information. Built for privacy-focused users, all data is encrypted client-side and can
          only be decrypted using your personal digital key. The platform enables safe access to
          your links across all devices and browsers, helping users always open URLs from Linky
          instead of clicking potentially malicious links. With no tracking, no personal data
          collection, and a decentralized architecture, Linky Cloud keeps both you and your
          information private, anonymous, and searchable at all times.
        </p>
        <div class="features">
          <div class="feature">
            <i class="bi bi-link"></i>
            <p>Save Web Links</p>
          </div>
          <div class="feature">
            <i class="bi bi-person-lines-fill"></i>
            <p>Save Contacts</p>
          </div>
          <div class="feature">
            <i class="bi bi-card-text"></i>
            <p>Notes</p>
          </div>
          <div class="feature">
            <i class="bi bi-file-earmark-bar-graph"></i>
            <p>Metadata for better search</p>
          </div>
        </div>
        <a
          @click.prevent="openRegister()"
          class="btn btn-primary"
          style="background-color: #5f7fff; border-color: #5f7fff"
          >Get Started</a
        >
        <a @click.prevent="openDocs()" class="btn btn-info" style="color: #fff; margin-left: 5px"
          >Need more Infos</a
        >
      </div>
    </section>
  </article>
  <TheFooter />
</template>

<script lang="ts">
import PageNav from '@/components/navbars/ThePageNav.vue';
import { defineComponent } from 'vue';
import TheFooter from '../components/lib/TheFooter.vue';

export default defineComponent({
  name: 'HomeView',
  components: { PageNav, TheFooter },

  methods: {
    openRegister() {
      this.$router.push('signin');
    },

    openDocs() {
      this.$router.push('docs');
    },
  },
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
  perspective: 100%;
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
  display: grid;
  grid-template-columns: auto auto auto;
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

@media (max-width: 768px) {
  .section-con {
    margin-top: 15%;
    height: 100%;
    margin-bottom: 15%;
    width: 98%;
  }
  .container {
    margin-bottom: 1100px;
  }
}
</style>
