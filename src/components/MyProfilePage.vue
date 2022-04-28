<template>
    <v-container class="container">
        <div v-if="isLoggedIn">
            <v-card v-if="!user">
                <v-skeleton-loader v-bind="user" type="card-avatar, article"></v-skeleton-loader>
            </v-card>
            <v-card v-else>
                <v-img lazy-src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" max-height="275"
                    :src='user.coverUrl'></v-img>
                <v-card-title>
                    <div class="avatar-name">
                        <v-avatar size="64">
                            <img :src='user.imgUrl'>
                        </v-avatar>
                        <span class="headline">{{ user.name }} - {{ user.email }} </span>
                    </div>
                    <v-card-text class="headText">
                        <v-card-text>{{ user.description }}</v-card-text>
                    </v-card-text>
                    <v-btn class="ma-1 right" dark color="#272727" fill @click="showSettings">
                        Modifier
                    </v-btn>
                </v-card-title>
            </v-card>

            <div class="ProfileBody">
                <add-post />
            </div>
        </div>
    </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex"
import AddPost from "./AddPost.vue"
export default {
    name: 'ProfilePage',
    components: {
        AddPost
    },
    computed: {
        ...mapState({ isLoggedIn: "isLoggedIn", user: "user" }),
    },
    methods: {
        ...mapActions(['setTab', 'setShowSettings']),
        showSettings() {
            this.setTab(2)
            this.setShowSettings(true)
        }
    }
}
</script>


<style scoped>
.container {

    height: 100vh;
}

.headText {
    margin-top: 0;
    padding: 0;
    margin-left: 2rem;
}

.v-image {
    margin: 0;
}

.ProfileBody {
    margin-top: 2rem;
}

.avatar-name {
    display: flex;
    width: 25%;
    align-items: center;
    justify-content: space-between;

}

.right {
    position: absolute;
    right: 10px;
    bottom: 10px;
}
</style>