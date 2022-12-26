<template>
  <v-app>
    <div>
      <div>
      <div class="toolbar pa-5">
        <router-link class="colorsssss" :to="{ name: 'StockPage'}">Search</router-link>
        <router-link class="colorsssss" :to="{ name: 'Login'}">Login</router-link>
        <router-link class="colorsssss" :to="{ name: 'Dashboard'}">Dashboard</router-link>
        <router-link class="colorsssss" :to="{ name: 'Portfolios'}">Portfolios</router-link>
        <router-link class="colorsssss" :to="{ name: 'Transactions'}">Transactions</router-link>

        <!-- <a href="#" v-on:click="logout">Logout</a> -->
      </div>
      <router-view/>
      <!-- <SharesComp/>
      <Holdings/>
      <TransactionsHistory/> -->
      </div>
    </div>
  </v-app>

</template>

<script>
import router from "../src/router"
import axios from "axios"
import PortfolioOP from "./components/PortfolioOP";
import DashBoard from "./components/DashBoard1";
import StockPage from "./components/StockPage";
import Search from "./components/SearchInput";
import SharesComp from "./components/SharesComp";
import Holdings from "./components/Holdings";
import TransactionsHistory from "./components/TransactionsHistory";
export default {
  name: "App",
  components: {
    Search,
    StockPage,
    DashBoard,
    PortfolioOP,
    SharesComp,
    Holdings,
    TransactionsHistory},
  methods: {
    logout: function (e) {
      axios.get("/api/logout")
        .then(() => {
          router.push("/")
        })
    }
  }
}
</script>

<style scoped>

.toolbar {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: #0f131d;
  color: white;
}

.colorsssss {
  color: white;
  text-decoration:none;
}
</style>
