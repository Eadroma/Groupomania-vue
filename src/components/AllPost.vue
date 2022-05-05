<template>
  <div class="container-AllPosts">
    <div class="container-AllPosts-header">
      <h1 class="container-AllPosts-header-title">Tous les posts</h1>
    </div>
    <div v-if="isLoading" class="loadingSkeletons">
      <v-col v-for="n in 5" :key="n">
        <v-skeleton-loader type="article, image"> </v-skeleton-loader>
      </v-col>
    </div>
    <v-item-group active-class="primary" v-else>
      <v-container>
        <v-col>
          <v-col v-for="post in posts" :key="post.id" cols="auto" md="auto">
            <v-item v-slot="{ toggle }">
              <v-card class="postCard" outlined elevation="8" @click="toggle">
                <v-list-item>
                  <v-list-item-avatar color="grey darken-3">
                    <v-img
                      class="elevation-6"
                      alt="image"
                      :src="getUser(post.userId).imgUrl"
                    >
                    </v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title style="margin-left: 10px"
                      >{{ getUser(post.userId).name }} -
                      {{ getUser(post.userId).email }} -
                      {{
                        new Date(post.createdAt).toLocaleDateString()
                      }}</v-list-item-title
                    >
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
                      <v-icon> mdi-heart </v-icon>
                    </v-btn>
                    <strong>
                      {{ post.likes }}
                    </strong>
                  </div>
                  <div v-if="isLoggedIn && user.id == post.userId">
                    <v-btn class="mx-2 comment" fab small>
                      <v-icon> mdi-pencil </v-icon>
                    </v-btn>
                  </div>
                  <div>
                    <strong>
                      {{ post.comments.length }}
                    </strong>
                    <v-btn class="mx-2 comment" fab small>
                      <v-icon> mdi-chat </v-icon>
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
import { getPosts, getUsers } from '@/helpers/helper'
export default {
  name: 'AllPost',
  data: () => ({
    posts: null,
    users: null,
    loading: true,
  }),
  computed: {
    ...mapState({ user: 'user', isLoggedIn: 'isLoggedIn' }),
    isLoading() {
      return this.users ? (this.posts ? false : true) : true
    },
  },
  created: function () {
    this.getPosts()
    this.getUsers()
  },
  methods: {
    async getPosts() {
      this.loading = true
      const data = await getPosts()
      this.posts = data.posts
      this.loading = false
    },
    async getUsers() {
      this.loading = true
      const data = await getUsers()
      this.users = data
      console.log('data: ' + { ...data })
      console.log(data)
      this.loading = false
    },
    getUser(id) {
      return this.users ? this.users.find(user => user.id == id) : null
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
  background-color: #1985a1 !important;
}

.like {
  color: #fff !important;
  background-color: rgb(208, 106, 108) !important;
}
</style>
