import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import Cookies from 'js-cookie';
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    storage: {
      getItem: key => Cookies.get(key),
      setItem: (key, value) => Cookies.set(key, value, {
        expires: 3,
        secure: true
      }),
      removeItem: key => Cookies.remove(key)
    }
  })],
  state: {
    user: null,
    token: null,
    isLoggedIn: false,
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setToken(state, token) {
      state.token = token
    },
    setIsLoggedIn(state) {
      state.isLoggedIn = !state.isLoggedIn
    }
  },
  actions: {
    setUser({
      commit
    }, user) {
      commit('setUser', user)
    },
    setToken({
      commit
    }, token) {
      commit('setToken', token)
    },
    setIsLoggedIn({
      commit
    }) {
      commit('setIsLoggedIn')
    },
    getConnectedUser() {
      if (this.state.token == null)
        return null;
      return fetch('http://localhost:8081/api/users/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': this.state.token,
          }
        }).then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.name == 'TokenExpiredError') {
            this.state.token = null;
            this.state.isLoggedIn = false;
            return null;
          }
          this.commit('setUser', data);
        })
    },
    clearState() {
      this.commit('setUser', null)
      this.commit('setToken', null);
      this.commit('setIsLoggedIn', false);
    }
  },
  getters: {
    user: state => state.user,
    token: state => state.token,
    isLoggedIn: state => state.isLoggedIn,
  }
})