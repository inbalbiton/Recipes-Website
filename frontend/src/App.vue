<template>
  <div id="app">
    <header-bar></header-bar>
    <b-nav id="navbar">
      <b-nav-text class="item" v-if="!$root.store.username">
        Hello Guest! 
      </b-nav-text>
      <b-nav-text class="item" v-else>
        Hello {{ $root.store.username }}! 
      </b-nav-text>
      <b-nav-item class="item" active>
        <router-link :to="{ name: 'main' }">Home</router-link>
      </b-nav-item>
      <b-nav-item class="item">
        <router-link :to="{ name: 'search' }">Search</router-link>
      </b-nav-item>
      <b-nav-item class="item">
        <router-link :to="{ name: 'about' }">About</router-link>
      </b-nav-item>
      <b-nav-item-dropdown class="item" text="Personal Area" v-if="$root.store.username">
        <b-dropdown-item>
          <router-link :to="{ name: 'favoritesRecipesPage' }">My Favorites</router-link>
        </b-dropdown-item>
        <b-dropdown-item>
          <router-link :to="{ name: 'personalRecipesPage' }">My Recipes</router-link>
        </b-dropdown-item>
        <b-dropdown-item>
          <router-link :to="{ name: 'personalFamilyRecipesPage' }">My Family Recipes</router-link>
        </b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item class="item" v-else>
        <router-link :to="{ name: 'register' }">Register</router-link>
      </b-nav-item>
      <b-nav-item class="item" v-if="!$root.store.username">
        <router-link :to="{ name: 'login' }">Login</router-link>
      </b-nav-item>
      <b-nav-item>
        <button v-if="$root.store.username" @click="Logout">Logout</button>
      </b-nav-item>
    </b-nav><br><br><br><br>
    <router-view />
  </div>
</template>

<script>
import HeaderBar from "./components/HeaderBar.vue";

export default {
  name: "App",
  components: {
    HeaderBar,
  },
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");
      sessionStorage.clear();
      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  background-image: url("./assets/back-brown-flour.jpg");
  // background-image: url("./assets/black-back2-flour.jpg");
  background-size: cover;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: antiquewhite;
  min-height: 100vh;
}

#navbar{
  width: 100%;
  height: 60px;
  background: rgba(243, 175, 48, 0.719);
  padding: 45px;
  color: antiquewhite;
  position: fixed;
  z-index: 999;
  font-size: 20px;
}

.item {
  font-weight: bold;
  color: #eaeceb;
}
.dropdown-item{
  font-weight: bold;
  color: #eaeceb;
}
b-nav-item-dropdown{
  background: rgba(243, 175, 48, 0.719);
  font-weight: bold;
  color: antiquewhite;
}
#topnav #item:hover {
  color: rgb(236, 199, 130);
  color: rgb(59, 40, 3);;
}
.hellomsg {
  color: rgb(59, 40, 3);;
  font-size: 24px;
  font-family: Arial, Helvetica, sans-serif;
  font-style: italic;
}
</style>
