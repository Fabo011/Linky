<template>
  <div>
    <h1>Chat</h1>
      <div>
        <h2>Welcome, {{ user }}!</h2>
        <div v-for="message in messages" :key="message.id">
          <p>{{ message.username }}: {{ message.message }}</p>
        </div>
        <input v-model="newMessage" placeholder="Type your message" />
        <button @click.prevent="sendMessage">Send</button>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TheFooter from '../components/lib/TheFooter.vue';
import { supabase } from '@/components/lib/supabaseClient';
import { store } from '@/store/store';

export default defineComponent({
  name: 'ChatRoom.vue',
  components: { TheFooter },

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
      await supabase.from('chat').insert({ username: this.user, message: this.newMessage, chatRoom: this.chatRoom });
      this.newMessage = '';
      this.fetchMessages();
      this.realtimeListener();
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