<template>
  <v-container class="container">
    <v-card v-if="!user">
      <v-skeleton-loader
        v-bind="user"
        type="card-avatar, article"
      ></v-skeleton-loader>
    </v-card>
    <v-card v-else>
      <v-img
        lazy-src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        max-height="275"
        :src="user.coverUrl"
      >
      </v-img>
      <v-card-title>
        <div class="avatar-name">
          <v-avatar size="64">
            <img :src="user.imgUrl" />
          </v-avatar>
          <span class="headline">{{ user.name }} - {{ user.email }} </span>
        </div>
        <v-card-text class="headText">
          <v-card-text>{{ user.description }}</v-card-text>
        </v-card-text>
        <v-btn class="ma-1 right" dark color="#272727" fill @click="clearTab">
          Fermer
        </v-btn>
      </v-card-title>
    </v-card>

    <div class="ProfileBody">
      <all-post :posts="posts" />
    </div>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { getPostsWithId } from '@/helpers/getPostsWithId'
import AllPost from './AllPost.vue'

export default {
  name: 'ProfilePage',
  components: { AllPost },
  props: {
    user: Object,
  },
  data: () => ({
    posts: [],
    loading: false,
  }),
  created: function () {
    this.getPosts(this.user.id)
  },
  computed: {},
  methods: {
    ...mapActions(['setUserView', 'setTab']),
    clearTab() {
      this.setTab(0)
      this.setUserView(null)
    },
    async getPosts(id) {
      this.loading = true
      const data = await (await getPostsWithId(id)).json()
      this.posts = data.reverse()
      this.loading = false
    },
  },
}
</script>

<style scoped>
.container {
  height: 100vh;
}

.head .headText {
  margin-top: 0;
  padding: 0;
  margin-left: 1rem;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.v-image {
  margin: 0;
}

.avatar-name {
  display: flex;
  width: 75%;
  align-items: center;
  justify-content: flex-start;
}

.headline {
  margin-left: 20px;
}

.white--text {
  color: #fff !important;
}

.cover-icon {
  position: absolute;
  top: 50%;
  right: 20px;
  z-index: 3;
}

.v-text-field {
  margin-top: 0;
  width: 80%;
}

.avatar-icon {
  width: 5%;
}

.head-left {
  width: 49%;
  display: flex;
}

.form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
}

.overlay-button {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.ProfileBody {
  margin-top: 2rem;
}
</style>
