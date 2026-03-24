<template>
  <PageNav />
  <article class="container">
    <section
      class="position-absolute top-50 start-50 translate-middle w-70 p-3 section-con"
      style="color: #333"
    >
      <div class="background-container">
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
}

.background-container {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border-radius: 22px;
  padding: 28px 32px;
  border: 1px solid rgba(255, 255, 255, 0.75);
  box-shadow: 0 20px 64px rgba(0, 0, 0, 0.18);
}

.animated-text {
  font-size: 2.8em;
  margin: 0;
  display: inline-block;
  position: relative;
  animation: flyIn 1s ease-out forwards;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #222;
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
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin: 20px 0;
}

.feature {
  text-align: center;
  background-color: #f8f9ff;
  border: 1px solid rgba(95, 127, 255, 0.12);
  border-radius: 12px;
  padding: 16px 10px;
  transition: background-color 0.2s, transform 0.2s;
}

.feature:hover {
  background-color: rgba(95, 127, 255, 0.06);
  transform: translateY(-2px);
}

.feature i {
  font-size: 1.9em;
  color: #5f7fff;
  margin-bottom: 8px;
  display: block;
}

.feature p {
  font-size: 12px;
  font-weight: 600;
  color: #555;
  margin: 0;
}

.btn-primary {
  color: #fff;
}

.img {
  width: 68px;
  height: 68px;
  border-radius: 50%;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
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
  .features {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
