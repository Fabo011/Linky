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
                          <strong>high-security backup</strong> for your most important informations
                          like passwords, recovery files, critical documents, contacts, and trusted
                          URLs—all protected by <strong>client-side encryption</strong>. Client-side
                          means that only you hold the key or/and certificates to decrypt your data,
                          ensuring <strong>maximum privacy and security</strong>.
                        </p>

                        <hr />
                        <h5>
                          How Linky Cloud Differs from Google, Apple, and Other Big Tech Solutions
                        </h5>
                        <ul>
                          <li>
                            <strong>Client-Side Encryption:</strong> Unlike Google Drive, Apple
                            iCloud, or most password managers, Linky Cloud encrypts your data before
                            it leaves your device. Only you hold the key to decrypt your data. Not
                            even Linky Cloud (fabo011-cloud.de) could access your information,
                            because we never store your keys on our servers.
                          </li>
                          <li>
                            <strong>Zero-Knowledge Architecture:</strong> Services like WhatsApp or
                            mainstream cloud providers often store encryption keys on their servers,
                            making user data vulnerable to breaches or government requests. With
                            Linky Cloud, your keys stay with you. Even if a hacker gains access to
                            our database, they cannot decrypt your data without the key.
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
                        <h5>What is Zero Trust?</h5>
                        <p>
                          <strong
                            >What is actually zero trust, client side encryption, open source? Lets
                            make some examples:</strong
                          >
                        </p>
                        <ul>
                          <li>
                            <strong>Zero Trust (Client-Side Encryption):</strong>
                            Imagine you have a beloved cat. You want to make sure your cat gets the
                            best, safest food possible. Here are three ways you could handle feeding
                            your cat: Send your cat to the neighbor’s house and hope they feed your
                            cat the right food no poison, no allergens, just what your cat needs.
                            But what if they don’t know your cat’s diet? What if they accidentally
                            give your cat something harmful? You’re trusting them completely. Take
                            your cat to a cat dining hall where lots of cats are fed. You hope the
                            staff there know what’s best for your cat and serve safe, appropriate
                            food. But again, you’re putting your cat’s health in someone else’s
                            hands. What if they make a mistake? Cook or order food yourself,
                            tailored exactly to your cat’s needs. You know the ingredients, you
                            control the quality, and you’re certain it’s safe. No trust needed—just
                            confidence in what you’re providing. Linky Cloud only provides the
                            infrastructure for you to encrypt your data securely. You hold the
                            key—you don’t trust me to encrypt it with a server key, and you
                            shouldn’t have to. You want, and deserve, your own control. Linky Cloud
                            uses Supabase and AWS storage in the background, but I don’t trust them
                            to encrypt your data. That’s why I designed the system so that you, your
                            key, only you are in charge of encryption key like you would be in
                            charge of your cats food. I hope this explanation was clear enough. You
                            can also check the technical documentation for more details.
                          </li>
                          <li>
                            <strong>Open Source:</strong> Open Source means that the program code is
                            visible to you. Furthermore, you are developers are free to use and
                            modify.
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

              <!-- How to Use Linky Cloud Accordion -->
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#how-to-use"
                  >
                    How to Use Linky Cloud Securely
                  </button>
                </h2>
                <div
                  id="how-to-use"
                  class="accordion-collapse collapse"
                  data-bs-parent="#userAccordion"
                >
                  <div class="accordion-body">
                    <div class="row">
                      <div class="col-12">
                        <h5>Recommended Workflow</h5>
                        <p>
                          To maximize security, we recommend using
                          <a href="https://keepass.info" target="_blank">KeePass</a> to store your
                          Linky Cloud password and digital key <strong>offline</strong>. KeePass is
                          an offline password manager, ensuring your Linky Cloud credentials are
                          never exposed to the internet.
                        </p>
                        <ul>
                          <li>
                            <strong>Step 1:</strong> Install KeePass on all devices where you plan
                            to use Linky Cloud.
                          </li>
                          <li>
                            <strong>Step 2:</strong> Store your Linky Cloud password and digital key
                            in KeePass.
                          </li>
                          <li><strong>Step 3:</strong> You can stay logging in the whole day.</li>
                        </ul>

                        <hr />
                        <h5>Alternative: USB Backup</h5>
                        <p>
                          If you prefer not to use KeePass, you can store your Linky Cloud password
                          and digital key in a text file on a USB drive.
                        </p>
                        <ul>
                          <li>
                            <strong>Step 1:</strong> Save your Linky Cloud password and digital key
                            in a text file on a USB drive.
                          </li>
                          <li>
                            <strong>Step 2:</strong> Connect the USB drive to your device when
                            logging in to Linky Cloud.
                          </li>
                          <li>
                            <strong>Step 3:</strong> Copy and paste your credentials from the USB
                            drive.
                          </li>
                        </ul>

                        <hr />
                        <h5>Important Security Notes</h5>
                        <ul>
                          <li>
                            <strong>No Password Recovery:</strong> Due to our maximum security
                            requirements, there is no password recovery functionality. If you lose
                            your password or digital key, you will permanently lose access to your
                            data.
                          </li>
                          <li>
                            <strong>Backup Your Credentials:</strong> Always keep a secure backup of
                            your Linky Cloud password and digital key. Store Linky Cloud backups on
                            USB drives, never on internet-connected devices.
                          </li>
                          <li>
                            <strong>Backup Your Data:</strong> Regularly export your Linky Cloud
                            data by clicking the "Export CSV" button in the dashboard. Store this
                            backup on a USB drive, never on the internet.
                          </li>
                        </ul>

                        <hr />
                        <h5>Restore & Recovery</h5>
                        <p>
                          If you suspect your password or digital key has been compromised, follow
                          these steps:
                        </p>
                        <ol>
                          <li>
                            Export your data via the "Export CSV" button in the Linky Cloud
                            dashboard.
                          </li>
                          <li>
                            Delete your account via the "Delete Account" button. This will
                            permanently remove all data from our servers.
                          </li>
                          <li>
                            Create a new account with a new password. A new digital key will be
                            generated.
                          </li>
                          <li>
                            Restore your data by using the "Import CSV" button and selecting your
                            previously exported file.
                          </li>
                          <li>
                            Delete the backup files from your computer unless they were copied from
                            a USB backup.
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Real Talk Accordion -->
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#real-talk"
                  >
                    Real Talk
                  </button>
                </h2>
                <div
                  id="real-talk"
                  class="accordion-collapse collapse"
                  data-bs-parent="#userAccordion"
                >
                  <div class="accordion-body">
                    <div class="row">
                      <div class="col-12">
                        <p>
                          Of course, Linky Cloud has many advantages, but like everything in life,
                          it comes with trade-offs. No solution is perfect, and nothing can ever be
                          100% secure. Your data is still on the internet, and while we take every
                          precaution, risks always exist. For example, if quantum computers become
                          widely available, even the strongest encryption could be broken in
                          minutes. You might consider storing your data on a Synology NAS at home,
                          but even that isn’t foolproof—your home network could still be
                          compromised. If you rely solely on a USB stick, it could be lost, stolen,
                          or damaged, leaving you without access to your data.
                        </p>
                        <p>
                          Linky Cloud’s mission is simple: We aim to provide the best possible
                          security at all times, giving you a way to back up your critical data in
                          case of emergencies—like a broken USB stick, a fire at home, or other
                          unforeseen events. You remain in full control of your encryption key, and
                          we provide a non-profit, secure infrastructure to store your data. But
                          always remember: No system is invulnerable. While we strive for the
                          highest level of security, it’s important to stay aware of the risks and
                          trade-offs involved.
                        </p>
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
                    <img src="../../docs/architecture.png" alt="Linky Cloud Architecture" />
                    <p>
                      The frontend runs on a microK8s private Kubernetes cluster in vienna managed
                      from
                      <a href="https://www.linkedin.com/in/fabian-w-5a4931287" target="_blank"
                        >https://www.linkedin.com/in/fabian-w-5a4931287</a
                      >.
                    </p>
                    <p>
                      For the code, see:
                      <a href="https://github.com/Fabo011/microk8s-cluster" target="_blank"
                        >https://github.com/Fabo011/microk8s-cluster</a
                      >.
                    </p>
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
                    Backend
                  </button>
                </h2>
                <div id="api" class="accordion-collapse collapse" data-bs-parent="#techAccordion">
                  <div class="accordion-body">
                    <p>
                      Linky Cloud uses Supabase as a backend and their postgres database: See:
                      <a href="https://supabase.com/docs" target="_blank"
                        >https://supabase.com/docs</a
                      >.
                    </p>
                    <p>Entity Relationship Model comming soon.</p>
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
                    <p>Comming soon.</p>
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
