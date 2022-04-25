<template>
  <v-card class="overflow-hidden" id="container">
    <v-app-bar absolute dark shrink-on-scroll prominent fade-img-on-scroll scroll-target="#tabContainer">

      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-img src="./assets/icon-left-font-monochrome-white.png" max-height="200" max-width="250"></v-img>

      <v-spacer></v-spacer>
      <div class="d-flex">
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn v-if="!isLoggedIn" text small @click="(signup = !signup) && (overlay = !overlay)">
          s'inscrire
        </v-btn>
        <v-btn v-if="!isLoggedIn" text small @click="(login = !login) && (overlay = !overlay)">
          se connecter
        </v-btn>
        <v-btn v-if="isLoggedIn" text small @click="setIsLoggedIn">
          déconnexion
        </v-btn>
      </div>


      <template v-slot:extension>
        <v-tabs align-with-title>
          <v-tab>
            Home
          </v-tab>
          <v-tab v-if="isLoggedIn">{{ isLoggedIn }}</v-tab>
          <v-tab v-if="isLoggedIn">Settings</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-sheet id="tabContainer" max-height="100vh">
      <v-container style="height: 1000px;">
        <v-overlay :value="overlay" :opacity="opacity" style="width: 100%;">
          <form>
            <v-text-field v-model="email" :error-messages="emailErrors" label="E-mail" required
              @input="$v.email.$touch()" @blur="$v.email.$touch()">
            </v-text-field>
            <!-- error message -->

            <v-text-field v-model="password" :error-messages="passwordErrors" label="Mot de passe" required
              @input="$v.password.$touch()" @blur="$v.password.$touch()"></v-text-field>
          </form>
          <div class="overlay-buttons">
            <v-btn class="white--text" color="teal" @click="cancelOverlay()" small>
              Annuler
            </v-btn>
            <v-btn class="white--text" color="success" small v-if="signup" @click="handleSignup()" :loading="loading"
              :disabled="disabled">
              S'inscrire
            </v-btn>
            <v-btn class="white--text" color="success" small v-if="login" @click="handleLogin()" :loading="loading">
              Se connecter
            </v-btn>
          </div>
          <div class="alert-overlay">
            <v-alert dense type="info" v-if="passwordFeedback && signup" color='#00AFF4'>
              {{ passwordFeedback }}
            </v-alert>
          </div>
        </v-overlay>
      </v-container>
    </v-sheet>
  </v-card>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { validationMixin } from 'vuelidate'
import { required, minLength, email } from 'vuelidate/lib/validators'
import zxcvbn from 'zxcvbn'
import store from './store';

export default {
  name: "App",
  mixins: [validationMixin],
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(8)
    }
  },
  data: () => ({
    email: '',
    password: '',
    overlay: false,
    signup: false,
    login: false,
    loading: false,
    disabled: true,
    emailError: false,
    passwordError: false,
    opacity: 0.8,
    passwordFeedback: '',
  }),
  computed: {
    emailErrors() {
      const errors = [];
      if (this.login) return errors;
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.required && errors.push('L\'email est requis');
      !this.$v.email.email && errors.push('L\'email n\'est pas valide');
      this.emailError = errors.length != 0;
      this.disabled = this.emailError && this.passwordError ? false : true;
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (this.login) return errors;
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push('Le mot de passe est requis');
      !this.$v.password.minLength && errors.push('Le mot de passe doit contenir au moins 8 caractères');
      const passwordSecure = zxcvbn(this.password);
      if (passwordSecure.score < 2) {
        errors.push(passwordSecure.feedback.warning);
        this.passwordFeedback = passwordSecure.feedback.suggestions[0];
      } else {
        this.passwordFeedback = '';
      }
      this.passwordError = errors.length != 0;
      this.disabled = !this.emailError && !this.passwordError ? false : true;
      return errors;
    },
    ...mapState({ isLoggedIn: "isLoggedIn" }),
  },
  methods: {
    ...mapActions(['setIsLoggedIn', 'setToken']),
    cancelOverlay() {
      this.$v.$reset()
      this.overlay = false;
      this.signup = false;
      this.login = false;
      this.email = '';
      this.password = '';
      this.passwordFeedback = '';
    },
    async handleSignup() {
      this.loading = true;
      console.log(this.email, this.password)
      const response = await fetch('http://localhost:8081/api/users/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password
        })
      });
      const data = await response.json();
      console.log(data);
      if (response.status != 201)
        this.passwordFeedback = data.message;
      else {
        console.log('oui');
        this.passwordFeedback = '';
        this.setIsLoggedIn();
        this.setToken(data.token);
        this.overlay = false;
        this.signup = false;
        this.login = false;
        this.email = '';
        this.password = '';
      }
    },
    handleLogin() {
      console.log(this.isLoggedIn);
      this.setIsLoggedIn()
    }
  }
}

</script>


<style>
html,
body {
  margin: 0;
  height: 100%;
  overflow: hidden
}

.overlay-buttons {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.v-messages__message {
  color: #D06A6C;
  font-weight: bold;
}

.alert-overlay {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  margin: 0;
}
</style>
