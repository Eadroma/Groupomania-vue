<template>
  <v-container>
    <div v-if="isLoading" class="loadingSkeletons">
      <v-skeleton-loader type="article, image"> </v-skeleton-loader>
    </div>
    <div v-else>
      <v-card class="postCard" v-if="userp">
        <v-list-item>
          <v-list-item-avatar color="grey darken-3">
            <v-img class="elevation-6" alt="image" :src="userp.imgUrl"> </v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title style="margin-left: 10px"
              >{{ userp.name }} - {{ userp.email }} -
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
            <v-menu open-on-hover top offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="ml-2 like"
                  small
                  text
                  v-bind="attrs"
                  v-on="on"
                  @click="like()"
                  :loading="loadingLike"
                >
                  <v-icon> mdi-heart</v-icon>
                  <strong>
                    {{ post.likes }}
                  </strong>
                </v-btn>
              </template>

              <v-list width="200px" v-if="post.userLiked.length > 0">
                <v-list-item
                  v-for="id in post.userLiked"
                  :key="id"
                  @click="redirect(id)"
                >
                  <v-list-item-avatar>
                    <v-img
                      class="elevation-6"
                      alt="image"
                      :src="getUser(id).imgUrl"
                    />
                  </v-list-item-avatar>
                  <v-list-item-title class="ml-4">
                    {{ getUser(id).name }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>

          <div v-if="isLoggedIn && user && user.id == userp.id">
            <v-btn class="ml-2 comment" text small>
              <v-icon> mdi-pencil </v-icon>
            </v-btn>
          </div>
          <div>
            <v-btn class="ml-2 comment" text small>
              <strong>
                {{ post.comments ? post.comments.length : 0 }}
              </strong>
              <v-icon> mdi-chat </v-icon>
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </div>
    <v-snackbar v-model="error" dark center :timeout="2000">
      <v-icon color="#fc256f" style="margin-right: 4px"> mdi-alert </v-icon
      >{{ errorMsg }}
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getPost, getUser, like } from '@/helpers/helper'
export default {
  name: 'OnePost',
  props: {
    users: Array,
    id: Number,
  },
  data: () => ({
    post: null,
    userp: null,
    error: false,
    errorMsg: '',
    loadingLike: false,
  }),
  computed: {
    ...mapState({
      user: 'user',
      isLoggedIn: 'isLoggedIn',
      token: 'token',
      showSettings: 'showSettings',
      tab: 'tab',
      userView: 'userView',
    }),
    isLoading() {
      return !this.post && !this.userp
    },
  },
  created: async function () {
    await this.setPost()
    await this.setUser()
  },
  methods: {
    ...mapActions(['setTab', 'setUserView']),
    async setPost() {
      const data = await getPost(this.id)
      this.post = data.post
      this.post.userLiked = data.post.userLiked.reverse()
    },
    async setUser() {
      if (this.post && this.post.userId)
        this.userp = await getUser(this.post.userId)
    },
    async like() {
      this.loadingLike = true
      const response = await like(this.id, this.token)
      if (response.status == 401 || response.status == 404)
        this.toggleError('Verify your connection')
      if (response.status == 500) this.toggleError('Server error')
      if (response.status == 200) {
        const data = await response.json()
        this.post.likes = this.post.likes - (data.like == 'like' ? -1 : 1)
        if (this.post.userLiked.includes(this.user.id))
          this.post.userLiked.splice(
            this.post.userLiked.indexOf(this.user.id),
            1
          )
        // remove user from array
        else this.post.userLiked.push(this.user.id) // add user to array
      }
      this.loadingLike = false
    },
    toggleError(msg) {
      this.error = true
      this.errorMsg = msg
    },
    getUser(id) {
      return this.users ? this.users.find(user => user.id == id) : null
    },
    async redirect(id) {
      if (id === this.user?.id || !this.isLoggedIn) this.setTab(1)
      else {
        this.setUserView(await getUser(id))
        this.setTab(this.showSettings ? 3 : 2)
      }
    },
  },
}
</script>

<style scoped>
.v-btn {
  padding: 0 !important;
}

.ml-4 {
  margin-left: 1rem;
}
</style>
