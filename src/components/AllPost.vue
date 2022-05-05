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
            <OnePost :id="post.id" />
          </v-col>
        </v-col>
      </v-container>
    </v-item-group>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getPosts, getUsers } from '@/helpers/helper'
import OnePostVue from './OnePost.vue'
import OnePost from './OnePost.vue'
export default {
  name: 'AllPost',
  data: () => ({
    posts: null,
    users: null,
    loading: true,
  }),
  components: {
    OnePostVue,
    OnePost,
  },
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
