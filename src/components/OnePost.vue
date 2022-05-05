<template></template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'OnePost',
  data: () => ({
    post: [],
    user: [],
  }),
  computed: {
    ...mapState({ user: 'user', isLoggedIn: 'isLoggedIn' }),
  },
}
</script>

<style></style>
