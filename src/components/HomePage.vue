<template>
  <v-container class="container">
    <div v-if="isLoggedIn">
      <add-post-vue />
    </div>
  </v-container>
</template>

<script>
import AddPostVue from './AddPost.vue'
import { mapState, mapActions } from "vuex";

export default {
  name: 'Home',
  components: {
    AddPostVue
  },
  data: () => ({
  }),
  computed: {
    ...mapState({ isLoggedIn: "isLoggedIn" }),
  }
}
</script>


<style scoped>
.container {

  height: 100vh;
}
</style>