<template>
    <div class="container-AllPosts">
        <div class="container-AllPosts-header">
            <h1 class="container-AllPosts-header-title">Tous les posts</h1>

        </div>
        <div v-if="loading" class="loadingSkeletons">
            <v-col v-for="n in 5" :key="n">
                <v-skeleton-loader type="article, image">
                </v-skeleton-loader>
            </v-col>
        </div>
        <v-item-group active-class="primary">
            <v-container>
                <v-col>
                    <v-col v-for="post in posts" :key="post.id" cols="auto" md="auto">
                        <v-item v-slot="{ toggle }">
                            <v-card class="postCard" outlined elevation="8" @click="toggle">
                                <v-list-item>
                                    <v-list-item-avatar color="grey darken-3">
                                        <v-img class="elevation-6" alt="image" :src="getUser(post.userId).imgUrl">
                                        </v-img>
                                    </v-list-item-avatar>

                                    <v-list-item-content>
                                        <v-list-item-title style="margin-left: 10px;">{{ getUser(post.userId).name }} -
                                            {{
                                                    getUser(post.userId).email
                                            }} - {{ new Date(post.createdAt).toLocaleDateString() }}</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-card-text class="text-h5 font-weight-bold">
                                    {{ post.textContent }}
                                    <v-spacer></v-spacer>
                                </v-card-text>
                                <div v-if="post && post.imgUrl">
                                    <v-img :src="post.imgUrl" contain max-height="500px"></v-img>
                                </div>

                                <v-card-actions class="postButtons">
                                    <div>

                                        <v-btn class="mx-2 like" fab small>
                                            <v-icon>
                                                mdi-heart
                                            </v-icon>
                                        </v-btn>
                                        <strong>
                                            {{ post.likes }}
                                        </strong>
                                    </div>
                                    <div>
                                        <v-btn class="mx-2 comment" fab small>
                                            <v-icon>
                                                mdi-pencil
                                            </v-icon>
                                        </v-btn>
                                    </div>
                                    <div>
                                        <strong>
                                            {{ post.comments.length }}
                                        </strong>
                                        <v-btn class="mx-2 comment" fab small>
                                            <v-icon>
                                                mdi-chat

                                            </v-icon>
                                        </v-btn>
                                    </div>
                                </v-card-actions>
                            </v-card>
                        </v-item>
                    </v-col>
                </v-col>
            </v-container>
        </v-item-group>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'AllPost',
    data: () => ({
        posts: [],
        users: [],
        loading: true,
    }),
    computed: {
        ...mapState({ user: 'user' }),
    },
    created: function () {
        setTimeout(() => {
            this.getPosts();
            this.getUsers();
        }, 500);
        // setInterval(() => {
        //     this.getPosts();
        //     this.getUsers();
        // }, 300000);
    },
    methods: {
        async getPosts() {
            this.loading = true;
            const response = await fetch(`http://localhost:8081/api/posts`, {
                method: 'GET',
                headers: {
                    authorization: this.user.token,
                },
            });
            const data = await response.json();
            if (response.status == 201) {
                this.posts = data.posts;
            }
            this.loading = false;
        },
        async getUsers() {
            this.loading = true;
            const response = await fetch(`http://localhost:8081/api/users`, {
                method: 'GET',
            });
            const data = await response.json();
            if (response.status == 200) {
                this.users = data;
            }
            this.loading = false;
        },
        getUser(id) {
            return this.users.find(user => user.id == id);
        },
    },
}
</script>

<style>
.container-AllPosts {
    height: 100vh;
}

.postCard {
    width: 550px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    margin: auto;
}

.postButtons {
    display: flex;
    justify-content: space-between;
}

.comment {
    color: #fff !important;
    background-color: #1985A1 !important;
}

.like {
    color: #fff !important;
    background-color: rgb(208, 106, 108) !important;
}
</style>