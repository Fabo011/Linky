<template>
  <PageNav />
  <article>
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
          Linky Cloud provides a premium and secure cloud storage solution tailored for privacy
          enthusiasts. Our services ensure the encryption of all sensitive data, with exclusive
          access granted only through your digital key for decryption. Emphasizing a commitment to
          privacy, we refrain from collecting personalized data, maintaining both you and your
          information in an anonymous and decentralized manner.
        </p>
        <div class="features">
          <div class="feature">
            <i class="bi bi-cloud"></i>
            <p>Encrypted Files</p>
          </div>
          <div class="feature">
            <i class="bi bi-link"></i>
            <p>Organize Web Links</p>
          </div>
          <div class="feature">
            <i class="bi bi-person-lines-fill"></i>
            <p>Save Contacts</p>
          </div>
          <div class="feature">
            <i class="bi bi-lock"></i>
            <p>Secure File Sharing</p>
          </div>
          <div class="feature">
            <i class="bi bi-pass"></i>
            <p>Encrypted Password Manager</p>
          </div>
          <div class="feature">
            <i class="bi bi-chat"></i>
            <p>Encrypted Chat</p>
          </div>
        </div>
        <a
          @click.prevent="openRegister()"
          class="btn btn-primary"
          style="background-color: #5f7fff; border-color: #5f7fff"
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

  methods: {
    openRegister() {
      this.$router.push('signup');
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
    margin-bottom: 5%;
    width: 98%;
  }
}
</style>
