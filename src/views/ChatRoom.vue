<template>
  <ChatNav />
  <div>
    <h1>Chat</h1>
      <div>
        <h2>Welcome, {{ user }}!</h2>
        <div v-for="message in messages" :key="message.id">
          <p>{{ message.username }}: {{ message.message }}</p>
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

export default defineComponent({
  name: 'ChatRoom.vue',
  components: { TheFooter, ChatNav },

  beforeMount() {
    this.loadChatRoom();
    this.fetchMessages();
    this.loadUsername();
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
      newMessage: store.text,
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
      const { error } = await supabase.from('chat').insert({ username: this.user, message: this.newMessage, chatRoom: this.chatRoom });
      if (!error) {
        this.newMessage = '';
        this.fetchMessages();
        this.realtimeListener();
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
    }
  }
});
</script>

<style scoped>
.container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  
  padding: 10px;
}

.input-container {
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.textarea-container {
  width: 100%;
}

button {
  background-color: #007BFF;
  color: #fff;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  margin-left: 10px;
  width: 10%;
  margin-right: 3px;
}

textarea {
  padding: 2px;
  margin: 0;
  flex: 1;
  white-space: pre-wrap;
  height: 80%;
}
</style>