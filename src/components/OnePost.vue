<template>
  <v-container>
    <div v-if="isLoading" class="loadingSkeletons">
      <v-skeleton-loader type="article, image"> </v-skeleton-loader>
    </div>
    <div class="postContainer" v-else>
      <v-card class="postCard" v-if="userp">
        <v-list-item class="headerCard">
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
        <v-card-text class="text-h5 font-weight-bold cardContent">
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
            <v-btn
              class="ml-2 comment"
              text
              small
              @click="comments = !comments"
              :loading="loadingComments"
            >
              <strong>
                {{ post.comments ? post.comments.length : 0 }}
              </strong>
              <v-icon> mdi-chat </v-icon>
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
      <!-- comments card -->
      <v-card
        elevation="16"
        max-width="400"
        width="400"
        height="580"
        max-height="580"
        class="mx-auto"
        v-if="comments"
      >
        <div class="noComment" v-if="post.comments.length == 0">
          Aucun commentaire...
        </div>
        <v-list class="commentSection" v-else-if="!loadingComments">
          <template v-for="(item, index) in post.comments">
            <v-list-item :key="index">
              <v-list-item-avatar @click="redirect(id)">
                <v-img
                  class="elevation-6"
                  alt="image"
                  :src="getUser(item.userId) ? getUser(item.userId).imgUrl : ''"
                />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="ml-4" @click="redirect(id)">
                  {{ getUser(item.userId) ? getUser(item.userId).name : '' }} -
                  {{ new Date(post.createdAt).toLocaleDateString() }}
                </v-list-item-title>
                <v-list-item-subtitle class="ml-4">
                  {{ item.text }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
          </template>
        </v-list>
        <div v-else class="loadingComments">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </div>
        <div class="commentTextField">
          <v-text-field
            v-model="commentText"
            clearable
            full-width
            regular
            label="Ajoutez un commentaire"
            :append-outer-icon="'mdi-send'"
            @click:append-outer="sendMessage"
            @keyup.enter="sendMessage"
          ></v-text-field>
        </div>
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
import { getPost, getUser, like, addComment } from '@/helpers/helper'
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
    comments: false,
    commentText: '',
    loadingComments: false,
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
    async sendMessage() {
      if (!this.commentText || this.commentText.length > 256)
        this.toggleError(
          'Veuillez entrer un commentaire de moins de 256 caractères'
        )
      else {
        const comment = this.commentText
        this.loadingComments = true
        const data = await addComment(this.id, this.token, comment)
        if (data.error) {
          this.toggleError(data.error)
          this.loadingComments = false
        } else {
          this.post.comments.push({
            userId: this.user.id,
            text: comment,
            date: new Date(),
          })
          this.commentText = ''
          this.loadingComments = false
        }
      }
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

.postContainer {
  display: flex;
  width: 80%;
  margin: auto;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.postCard {
  margin: 0 1rem;
  height: 580px;
}

.commentSection {
  width: 400px;
  overflow-y: scroll;
  height: 87%;
  max-height: 500px;
}

.noComment {
  height: 87%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ml-4 {
  margin-left: 1rem;
}

.commentTextField {
  width: 90%;
  margin: auto;
}

.v-list-item__subtitle {
  overflow: visible !important;
  text-overflow: unset !important;
  white-space: initial !important;
}

.headerCard {
  flex: 0;
}

.cardContent {
  margin: auto;
  font-weight: bold;
  font-size: 1.2rem;
}

.loadingComments {
  height: 500px;
  max-height: 500px;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex: 0;
  margin: auto;
}
</style>
