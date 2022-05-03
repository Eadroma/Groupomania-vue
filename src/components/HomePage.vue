<template>
  <v-container class="container">
    <div v-if="isLoggedIn">
      <add-post-vue />
    </div>
    <all-post-vue />
  </v-container>
</template>

<script>
import AddPostVue from './AddPost.vue'
import AllPostVue from './AllPost.vue';
import { mapState, mapActions } from "vuex";

export default {
  name: 'Home',
  components: {
    AddPostVue,
    AllPostVue
  },
  data: () => ({
  }),
  computed: {
    ...mapState({ isLoggedIn: "isLoggedIn" }),
  }
}
</script>


<style scoped>
</style>