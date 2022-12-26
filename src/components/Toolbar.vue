<template>
  <div class="navbar">
      <div class="nav-container">
      <div class="button-container mx-auto my-auto pa-1">
        <a href="#Dashboard">Dashboard</a>
        <a href="#Crypto">Crypto</a>
        <a href="#Forex">Forex</a>
        <a href="#News">News</a>
      </div>
      <div class="search-container mx-auto my-auto">
        <search-input/>
      </div>
      <a class="mx-auto my-auto" href="#Dashboard">Account</a>
    </div>
  </div>
</template>

<script>
import SearchInput from './SearchInput.vue';

    export default {
  components: { SearchInput },
        
    }
</script>

<style scoped>

.navbar {
  display: flex;
  flex-direction:row;
  justify-content: center;
  align-content: center;
  overflow: visible;
  background-color: #A80007;
  width: 100vw;
  position: absolute;
}

h2 {
  color: white;
}

.nav-container {
  display: flex;
  flex-direction:row;
  justify-content: center;
  align-content: center;
  overflow: visible;
  background-color: #A80007;
  width: 100vw;
  position: absolute;
}

.button-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.search-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  background-color: #A80007;
  width:30vw;
}

.navbar a {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 19px 16px;
  text-decoration: none;
  font-size: 17px;
}

.navbar a:hover {
  background-color: #ddd;
  color: black;
}

.navbar a.active {
  color: white;
}
</style>