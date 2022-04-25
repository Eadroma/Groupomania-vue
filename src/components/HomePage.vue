<template>
  <v-container class="container">
    <add-post-vue />
  </v-container>
</template>

<script>
import AddPostVue from './AddPost.vue'
export default {
  name: 'Home',
  components: {
    AddPostVue
  },
  data: () => ({
  })
}
</script>


<style scoped>
.container {
  margin-top: 12vh;
  height: 100vh;
}
</style>