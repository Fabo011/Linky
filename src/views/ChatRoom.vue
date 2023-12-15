<template>
  <TheChatNav />
  <audio ref="newMessageSound" controls>
    <source type="audio/mpeg" src="../assets/mp3/newMessageSound.mp3" />
    Your browser does not support the audio element.
  </audio>
  <div class="chat-container">
    <div v-for="message in messages" :key="message.id">
      <div v-if="store.username === message.username" class="message-block">
        <span class="user-avatar">
          {{ message.username.slice(0, 2) }}
        </span>
        <span class="message-username">{{ message.username }}</span>
        <TheChatDeleteBtn @click.prevent="deleteMessage(message.id)" />
        <br />
        <span class="message-text">{{ message.message }}</span>
      </div>
      <div v-if="store.username !== message.username" class="friend-message-block">
        <span class="friend-avatar">
          {{ message.username.slice(0, 2) }}
        </span>
        <span class="message-friend">{{ message.username }}</span>
        <br />
        <span class="message-text">{{ message.message }}</span>
      </div>
    </div>
  </div>
  <TheFooter />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TheFooter from '../components/lib/TheFooter.vue';
import { supabase } from '@/components/lib/supabaseClient';
import { store } from '@/store/store';
import TheChatNav from '@/components/navbars/TheChatNav.vue';
import eventBus from '@/components/lib/event-bus';
import TheChatDeleteBtn from '@/components/userprofile/chat/TheChatDeleteBtn.vue';
import { encryptData, decryptData } from '@/components/crypto/crypto.chat';

export default defineComponent({
  name: 'ChatRoom.vue',
  components: { TheFooter, TheChatNav, TheChatDeleteBtn },

  beforeMount() {
    this.loadChatRoom();
  },

  created() {
    this.receiveMessageEventBus();
    this.receiveChatMessageEventBus();
    this.realtimeListener();
    this.scrollToBottom();
  },

  async beforeRouteEnter() {
    await store.setUser();
  },

  updated() {
    this.$nextTick(() => this.scrollToBottom());
  },

  data() {
    return {
      store,
      newMessage: '',
      messages: [] as any[],
      chatRoom: '' as string,
      chatSecret: 'test'
    };
  },

  methods: {
    async fetchChatMessages() {
      const chatSecret = store.chatPrivateKey;
      const { data, error } = await supabase.from('chat').select('*').eq(`chatRoom`, this.chatRoom);
      if (data) {
        const decryptedMessages = data.map((message) =>
          decryptData(message.message, chatSecret),
        );
        this.messages = decryptedMessages as any;
      }
      if (error) {
        throw new Error('fetch chat message failed.');
        // Add rollbar
      }
    },

    async sendMessage() {
      const message = store.text;

      const chatSecret = store.chatPublicKey;
      console.log(chatSecret);
      const encryptedMessage = encryptData(message, chatSecret);

      const { error } = await supabase
        .from('chat')
        .insert({ username: store.username, message: encryptedMessage, chatRoom: this.chatRoom });
      if (!error) {
        store.setChatTextValue(this.newMessage);
        eventBus.emit('clearChatTextarea');
        this.scrollToBottom();
      } else {
        throw new Error('send chat failed.');
        // Add rollbar
      }
    },

    realtimeListener() {
      supabase
        .channel('chat')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat' }, (payload) => {
          this.messages.push(payload.new);
          this.newMessageSound();
        })
        .subscribe();
    },

    async deleteMessage(messageId: any) {
      this.messages.pop();
      const { error } = await supabase.from('chat').delete().eq(`id`, messageId);
      if (error) {
        // Add rollbar
        throw new Error('chat message deletion failed.');
      }
    },

    loadChatRoom() {
      const route = this.$route.params.link as string;
      const chatRR = route.slice(0, 60);
      this.chatRoom = chatRR;
    },

    receiveMessageEventBus() {
      eventBus.on('sendMessage', () => {
        this.sendMessage();
      });
    },

    receiveChatMessageEventBus() {
      eventBus.on('fetchChatMessages', () => {
        this.fetchChatMessages();
      });
    },

    scrollToBottom() {
      window.scrollTo(0, document.body.scrollHeight);
    },

    newMessageSound() {
      (this.$refs.newMessageSound as HTMLAudioElement).play();
    },
  },
});
</script>

<style scoped>
.chat-container {
  margin: 0 auto;
  padding: 5px;
  position: relative;
  font-family: Arial, sans-serif;
  max-height: 100%;
  max-width: 95%;
  margin-top: 20%;
  margin-bottom: 30%;
}

@media screen and (min-width: 768px) {
  .chat-container {
    margin-top: 5%;
    margin-bottom: 15%;
    max-width: 50%;
  }
}

.message-block {
  margin: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  opacity: 0.9;
  width: 75%;
}

.friend-message-block {
  margin: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  opacity: 0.9;
  margin-left: 25%;
}

.message-username {
  font-weight: bold;
  color: var(--primary-pink);
}

.message-text {
  font-size: 16px;
  color: var(--primary-background-color);
  word-wrap: break-word;
}

.message-friend {
  font-weight: bold;
  color: var(--primary-blue-color);
}

.user-avatar {
  width: 30px;
  height: 30px;
  background-color: var(--primary-pink);
  color: var(--primary-white-color);
  border-radius: 50%;
  padding: 5px;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 14px;
  margin-right: 5px;
}

.friend-avatar {
  width: 30px;
  height: 30px;
  background-color: var(--primary-blue-color);
  color: var(--primary-white-color);
  border-radius: 50%;
  padding: 5px;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 14px;
  margin-right: 5px;
}
</style>
@/components/userprofile/chat/TheChatSecret
