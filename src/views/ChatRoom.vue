<template>
  <ChatNav />
  <div class="chat-container">
    <div class="chat-messages" id="container">
      <div v-for="message in messages" :key="message.id">
        <div v-if="user === message.username" class="message-block">
          <span class="user-avatar">
            {{ message.username.slice(0, 2) }}
          </span>
          <span class="message-username">{{ message.username }}</span
          ><br />
          <span class="message-text">{{ message.message }}</span>
        </div>
        <div v-if="user !== message.username" class="message-block">
          <span class="friend-avatar">
            {{ message.username.slice(0, 2) }}
          </span>
          <span class="message-friend">{{ message.username }}</span
          ><br />
          <span class="message-text">{{ message.message }}</span>
        </div>
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
import ChatNav from '@/components/navbars/TheChatNav.vue';
import eventBus from '@/components/lib/event-bus';

export default defineComponent({
  name: 'ChatRoom.vue',
  components: { TheFooter, ChatNav },

  beforeMount() {
    this.loadChatRoom();
    this.fetchMessages();
    this.loadUsername();
  },

  created() {
    this.sendMessageEventBus();
    this.realtimeListener();
    this.scrollToBottom();
  },

  beforeRouteEnter() {
    store.authStatusRefresh();
    if (store.authStatus !== 'loggedIn') {
      window.location.href = '/signin';
    }
  },

  updated() {
    // whenever data changes and the component re-renders, this is called.
    this.$nextTick(() => this.scrollToBottom());
  },

  data() {
    return {
      store,
      user: store.username,
      newMessage: '',
      messages: [] as any[],
      chatRoom: '' as string,
    };
  },

  methods: {
    async fetchMessages() {
      const { data, error } = await supabase.from('chat').select('*').eq(`chatRoom`, this.chatRoom);
      if (data) this.messages = data;
      if (error) {
        console.log(error);
        // Add rollbar
      }
    },

    async sendMessage() {
      const message = store.text;
      const { error } = await supabase
        .from('chat')
        .insert({ username: this.user, message: message, chatRoom: this.chatRoom });
      if (!error) {
        store.setChatTextValue(this.newMessage);
        this.scrollToBottom();
      } else {
        console.log(error);
        // Add rollbar
      }
    },

    realtimeListener() {
      supabase
        .channel('chat')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat' }, (payload) => {
          this.messages.push(payload.new);
        })
        .subscribe();
    },

    loadChatRoom() {
      const route = this.$route.params.link as string;
      const chatRR = route.slice(0, 60);
      this.chatRoom = chatRR;
    },

    loadUsername() {
      const username = store.username;
      this.user = username;
    },

    sendMessageEventBus() {
      eventBus.on('sendMessage', () => {
        this.sendMessage();
      });
    },

    scrollToBottom() {
      window.scrollTo(0, document.body.scrollHeight);
    },
  },
});
</script>

<style scoped>
.chat-container {
  margin: 0 auto;
  padding: 5px;
  font-family: Arial, sans-serif;
  position: relative;
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

.chat-messages {
  border: 1px solid #ccc;
  border-radius: 5px;
}

.message-block {
  margin: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  opacity: 0.9;
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
