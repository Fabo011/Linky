<template>
    <nav id="nav" class="navbar sticky-top navbar-expand-md">
        <div class="d-flex order-lg-2">
            <img class="navbar-brand ms-2" src="../../assets/linky-logo-128px.png" id="logo" href="/"
                @click.prevent="home" />

                <nav>
                <form class="d-flex align-items-center">
                    <SearchBar />
                    <TheServiceSelector />
                </form>
            </nav>
        </div>
    </nav>

    <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { store } from '../../store/store';
import CreateAndSaveNewLinkVue from '../userprofile/link/TheCreateAndSaveNewLink.vue';
import SearchBar from '../lib/TheSearchBar.vue';
import CreateChatRoom from '../userprofile/chat/TheCreateChatRoom.vue';
import TheServiceSelector from '../userprofile/TheServiceSelector.vue';

export default defineComponent({
    name: 'TheNavbar.vue',

    components: {
        CreateAndSaveNewLinkVue,
        SearchBar,
        CreateChatRoom,
        TheServiceSelector,
    },

    data() {
        return {
            store,
            refresh: '',
            searchValue: '',
        };
    },

    methods: {
        home() {
            store.setUsername(this.refresh);
            store.setToken(this.refresh);
            store.action(this.refresh);
            this.$router.push(`/`);
        },
    },
});
</script>

<style scoped>
#nav {
    background-color: #333;
    height: 60px;
}

.navbar.sticky-top {
    z-index: 5020;
}

#logo {
    width: 40px;
    height: 50px;
    cursor: pointer;
}

.inp-search {
    width: 100%;
}

.my {
    margin-top: 13%;
}
</style>