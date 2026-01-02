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
          Linky Cloud Documentation
        </h1>

        <!-- Tabs for User/Technical Docs -->
        <ul class="nav nav-tabs mb-4">
          <li class="nav-item">
            <a class="nav-link active" data-bs-toggle="tab" href="#user-docs">User Guide</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-bs-toggle="tab" href="#tech-docs">Technical Docs</a>
          </li>
        </ul>

        <!-- Tab Content -->
        <div class="tab-content">
          <!-- User Documentation -->
          <div class="tab-pane fade show active" id="user-docs">
            <h3>How to Use Linky Cloud</h3>
            <div class="accordion custom-accordion" id="userAccordion">
              <!-- General Informations Accordion -->
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#general-informations"
                  >
                    General Informations
                  </button>
                </h2>
                <div
                  id="general-informations"
                  class="accordion-collapse collapse show"
                  data-bs-parent="#userAccordion"
                >
                  <div class="accordion-body">
                    <div class="row">
                      <div class="col-12">
                        <p>
                          Linky Cloud is a <strong>non-profit, client-side encrypted</strong> secure
                          vault designed to protect your most sensitive information. Consider it as
                          a <strong>personal, ultra-secure digital vault</strong> in the cloud,
                          built for privacy-conscious users who want to safeguard their critical
                          data without compromising security or privacy.
                        </p>
                        <hr />
                        <h5>What Can You Store in Linky Cloud?</h5>
                        <ul>
                          <li>
                            <i class="bi bi-pass me-2"></i
                            ><strong>Passwords & Passkeys:</strong> Use Linky Cloud as a password
                            manager to securely store and manage your credentials.
                          </li>
                          <li>
                            <i class="bi bi-file-earmark-lock me-2"></i
                            ><strong>Account Recovery Files:</strong> Keep encrypted backups of
                            recovery codes or keys for your online accounts.
                          </li>
                          <li>
                            <i class="bi bi-file-earmark-text me-2"></i
                            ><strong>Critical Files:</strong> Store scans of essential documents
                            like your passport, proof of citizenship, or notification slips safe
                            from loss or theft.
                          </li>
                          <li>
                            <i class="bi bi-person-lines-fill me-2"></i
                            ><strong>Contacts:</strong> Save encrypted contact details for your most
                            important connections.
                          </li>
                          <li>
                            <i class="bi bi-link me-2"></i><strong>URLs:</strong> Bookmark trusted
                            links in Linky Cloud to avoid clicking on malicious or phishing links in
                            the future.
                          </li>
                        </ul>
                        <hr />
                        <h5>Why Linky Cloud?</h5>
                        <p>
                          Linky Cloud is <strong>not</strong> a traditional cloud storage for
                          vacation photos or large files. Instead, it’s a
                          <strong>high-security backup</strong> for your most important
                          information—passwords, recovery files, critical documents, contacts, and
                          trusted URLs—all protected by <strong>client-side encryption</strong>.
                          Client-side means that only you hold the key or/and certificates to
                          decrypt your data, ensuring <strong>maximum privacy and security</strong>.
                        </p>

                        <hr />
                        <h5>
                          How Linky Cloud Differs from Google, Apple, and Other Big Tech Solutions
                        </h5>
                        <ul>
                          <li>
                            <strong>Client-Side Encryption:</strong> Unlike Google Drive, Apple
                            iCloud, or most password managers, Linky Cloud encrypts user data before
                            it leaves your device. Only the user hold the keys to decrypt your data.
                            Not even Linky Cloud (fabo011-cloud.de) can access users
                            information,because we never store your keys on our servers.
                          </li>
                          <li>
                            <strong>Zero-Knowledge Architecture:</strong> Services like WhatsApp or
                            mainstream cloud providers often store encryption keys on their servers,
                            making user data vulnerable to breaches or government requests. With
                            Linky Cloud, your keys stay with you. Even if a hacker gains access to
                            our database, they cannot decrypt user data without their key.
                          </li>
                          <li>
                            <strong> Personal Data Collection:</strong> Big tech companies often
                            collect metadata or personal information for ads or analytics. Linky
                            Cloud does not collect or store any personal data. The user remain
                            completely anonymous.
                          </li>
                          <li>
                            <strong>Decentralized & Secure:</strong> Users data is stored in a
                            decentralized manner, ensuring no single point of failure. This is
                            unlike centralized services where a breach can expose millions of users
                            at once.
                          </li>
                        </ul>

                        <hr />
                        <h5>Project Financing</h5>
                        <p>
                          Linky Cloud is a non-profit, independent project financed exclusively by
                          donations. We are not backed by any company, organization, or venture
                          capital. Our mission is to provide a secure, private, and decentralized
                          vault for your sensitive data without compromising your privacy for
                          profit.
                        </p>

                        <hr />
                        <h5>Why Donate?</h5>
                        <p>
                          If you use Linky Cloud regularly, especially to store critical files,
                          passwords, or recovery data please consider donating. Your contributions
                          directly fund:
                        </p>
                        <ul>
                          <li>
                            <strong>Servers:</strong> To ensure fast, reliable, and secure access.
                          </li>
                          <li>
                            <strong>Storage Costs:</strong> To store your encrypted files and data.
                          </li>
                          <li>
                            <strong>Domain & DNS:</strong> To maintain a trusted and accessible
                            online presence.
                          </li>
                          <li>
                            <strong>Development:</strong> To continuously improve security,
                            features, and user experience.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Features Accordion -->
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#features"
                  >
                    Features
                  </button>
                </h2>
                <div
                  id="features"
                  class="accordion-collapse collapse"
                  data-bs-parent="#userAccordion"
                >
                  <div class="accordion-body">
                    <div class="row">
                      <div class="col-md-6">
                        <h5><i class="bi bi-cloud me-2"></i>Account Recovery Files</h5>
                        <p>Upload encrypted recovery files for your accounts.</p>
                      </div>
                      <div class="col-md-6">
                        <h5><i class="bi bi-link me-2"></i>Web Links</h5>
                        <p>Save and categorize important URLs.</p>
                      </div>
                      <div class="col-md-6">
                        <h5><i class="bi bi-person-lines-fill me-2"></i>Contacts</h5>
                        <p>Store encrypted contact details.</p>
                      </div>
                      <div class="col-md-6">
                        <h5><i class="bi bi-pass me-2"></i>Passwords & Passkeys</h5>
                        <p>Manage passwords and passkeys securely.</p>
                      </div>
                      <div class="col-md-6">
                        <h5><i class="bi bi-file-earmark me-2"></i>Critical Files</h5>
                        <p>Upload and encrypt sensitive documents (e.g., passports).</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Technical Documentation -->
          <div class="tab-pane fade" id="tech-docs">
            <h3>Technical Documentation</h3>
            <div class="accordion custom-accordion" id="techAccordion">
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#architecture"
                  >
                    Architecture
                  </button>
                </h2>
                <div
                  id="architecture"
                  class="accordion-collapse collapse show"
                  data-bs-parent="#techAccordion"
                >
                  <div class="accordion-body">
                    <p>
                      Linky Cloud uses <strong>client-side encryption</strong> (AES-256) for all
                      data.
                    </p>
                    <p>
                      Data is stored in a <strong>decentralized</strong> manner (IPFS for files,
                      encrypted DB for metadata).
                    </p>
                    <p>No personal data is collected; users are anonymous.</p>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#api"
                  >
                    API & Integration
                  </button>
                </h2>
                <div id="api" class="accordion-collapse collapse" data-bs-parent="#techAccordion">
                  <div class="accordion-body">
                    <p>
                      REST API endpoints for programmatic access (e.g., `/api/v1/links`,
                      `/api/v1/contacts`).
                    </p>
                    <p>Webhook support for real-time updates.</p>
                    <p>Open-source SDKs for JavaScript/Python.</p>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#security"
                  >
                    Security
                  </button>
                </h2>
                <div
                  id="security"
                  class="accordion-collapse collapse"
                  data-bs-parent="#techAccordion"
                >
                  <div class="accordion-body">
                    <p>End-to-end encryption with user-controlled keys.</p>
                    <p>Zero-knowledge architecture: even admins cannot decrypt user data.</p>
                    <p>Regular security audits and bug bounty program.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
  name: 'DocumentationView',
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
  perspective: 100%;
}

.animated-text {
  font-size: 2.5em;
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

.img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.accordion-button:not(.collapsed) {
  color: #5f7fff;
  background-color: #f8f9fa;
}

.accordion-button::after {
  color: #5f7fff;
}

/* Custom accordion styling for fixed height and scrollable content */
.custom-accordion {
  max-height: 400px;
  overflow-y: auto;
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
  .custom-accordion {
    max-height: 300px;
  }
}
</style>
