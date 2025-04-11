<template>
  <PageNav />
  <div class="imprint-privacy">
    <h1 class="header">{{ projectName }} - Imprint and Privacy Statement</h1>

    <section class="imprint">
      <h2>Imprint</h2>
      <p><strong>Project Name:</strong> {{ projectName }}</p>
      <p>
        <strong>Project URL:</strong> <a :href="projectUrl" target="_blank">{{ projectUrl }}</a>
      </p>
      <p>
        <strong>Contact:</strong><br />
        <span>Email: {{ contactEmail }}</span
        ><br />
        <span
          >LinkedIn: <a :href="socialHandle" target="_blank">{{ socialHandle }}</a></span
        ><br />
        <span
          >GitHub: <a :href="githubRepository" target="_blank">{{ githubRepository }}</a></span
        >
      </p>
    </section>

    <section class="privacy-commitment">
      <h2>Privacy Commitment</h2>
      <p>
        At {{ projectName }}, we are committed to providing an open-source, privacy-focused
        experience for all our users. We do not collect any personal information, and we do not
        engage in any form of tracking.
      </p>
      <ul>
        <li>
          <strong>No Tracking:</strong> We do not use any analytics or tracking tools to monitor
          your usage of our project.
        </li>
        <li>
          <strong>No Data Collection:</strong> We do not collect any personal information, including
          names, emails, or IP addresses.
        </li>
        <li>
          <strong>Data Security:</strong> Your security is essential to us. We take every reasonable
          precaution to protect your data and ensure the security of our project. All your
          data like links,files, passwords, notes etc. are encrypted with your digital key.
        </li>
      </ul>
    </section>

    <section class="cookies">
      <h2>Cookies</h2>
      <p>We don't use cookies for tracking purposes.</p>
    </section>

    <section class="third-party-services">
      <h2>Third-Party Services</h2>
      <p>We do not use third-party services or APIs that might compromise your privacy.</p>
    </section>

    <section class="changes">
      <h2>Changes to This Privacy Statement</h2>
      <p>
        In the future, if any changes are made to our privacy practices, we will update this
        statement to reflect those changes. We will always respect your privacy and make efforts to
        keep you informed.
      </p>
    </section>

    <section class="questions-concerns">
      <h2>Questions or Concerns</h2>
      <p>
        If you have any questions or concerns, please feel free to reach out to us through
        the contact information provided email above.<br>
        If you want to delete your account with all data, just hit the delete account button in your dashboard.
      </p>
    </section>
  </div>
  <TheFooter />
</template>

<script lang="ts">
import TheFooter from '@/components/lib/TheFooter.vue';
import PageNav from '@/components/navbars/ThePageNav.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ThePrivacyView.vue',
  components: { PageNav, TheFooter },

  data() {
    return {
      projectName: 'Linky Cloud',
      projectUrl: 'https://linkycloud.com',
      contactEmail: 'linky-cloud@proton.me',
      socialHandle: 'in/fabian-waismayer-5a4931287',
      githubRepository: 'https://github.com/Fabo011/Linky',
    };
  },
});
</script>

<style scoped>
.imprint-privacy {
  max-width: 80%;
  margin: 0 auto;
  padding: 20px;
  background-color: var(--primary-background-color);
  color: var(--primary-white-color);
  opacity: 0.8;
  margin-top: 5%;
  margin-bottom: 15%;
}

@media (max-width: 768px) {
  .imprint-privacy {
    max-width: 90%;
  }
}

.header {
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
}

.imprint h2 {
  font-size: 20px;
  margin-top: 10px;
}

.imprint p {
  margin: 10px 0;
}
</style>
