<template>
  <ChatNav />
  <div class="chat-container">
      <div class="chat-messages">
        <div v-for="message in messages" :key="message.id">
          <div class="message-block">
             <span class="message-username">{{ message.username }}</span><br>
             <span class="message-text">{{ message.message }}</span>
          </div>
        </div>
      </div>
    </div>
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
  },

  beforeRouteEnter() {
    store.authStatusRefresh();
    if (store.authStatus !== 'loggedIn') {
      window.location.href = '/signin';
    }
  },

  data() {
    return {
      store,
      user: store.username,
      newMessage: '',
      messages: [] as any,
      chatRoom: '' as string
    };
  },

  methods: {
    async fetchMessages () {
      const { data, error } = await supabase.from('chat').select('*').eq(`chatRoom`, this.chatRoom);
      if (data) this.messages = data;
      if (error) {
        console.log(error);
        // Add rollbar
      }
    },

    async sendMessage() {
      const message = store.text;
      const { error } = await supabase.from('chat').insert({ username: this.user, message: message, chatRoom: this.chatRoom });
      if (!error) {
        store.setChatTextValue(this.newMessage);
        this.fetchMessages();
        this.realtimeListener();
      } else {
        console.log(error);
        // Add rollbar
      }
    },

    realtimeListener() {
      console.log('realtime reached');
      supabase
        .channel('chat')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat' }, (payload) => {
          this.messages.push(payload.new);
        })
        .subscribe()
    },

    loadChatRoom() {
      const route = this.$route.params.link as string;
      const chatRR = route.slice(0, 60)
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
    }
  }
});
</script>

<style scoped>
.chat-container {
  margin: 0 auto;
  padding: 5px;
  font-family: Arial, sans-serif;
  max-width: 95%;

  @media screen and (min-width: 768px) {
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
  color: #007BFF;
}

.message-text {
  font-size: 16px;
  color: #333;
  word-wrap: break-word;
}
</style>