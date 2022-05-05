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
            <v-btn class="mx-2 like" fab small @click="like()">
              <v-icon> mdi-heart </v-icon>
            </v-btn>
            <strong>
              {{ post.likes }}
            </strong>
          </div>

          <div v-if="isLoggedIn && user && user.id == userp.id">
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
    </div>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import { getPost, getUser, like } from '@/helpers/helper'
export default {
  name: 'OnePost',
  props: {
    id: Number,
  },
  data: () => ({
    post: null,
    userp: null,
  }),
  computed: {
    ...mapState({ user: 'user', isLoggedIn: 'isLoggedIn' }),
    isLoading() {
      return !this.post && !this.userp
    },
  },
  created: async function () {
    await this.setPost()
    await this.setUser()
  },
  methods: {
    async setPost() {
      const data = await getPost(this.id)
      this.post = data.post
    },
    async setUser() {
      if (this.post && this.post.userId)
        this.userp = await getUser(this.post.userId)
    },
    async like() {
      const response = await like(this.id)
      // TO DO
    },
  },
}
</script>

<style></style>
