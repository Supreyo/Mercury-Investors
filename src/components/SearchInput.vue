<template>
  <div class="autocomplete-search">
    <input
      type="text"
      class="autocomplete-input"
      placeholder="Search"
      id="search-input"
      v-model="searchValue"
      @input="onChange()"
    />
    <div
      class="autocomplete-results-wrapper"
      v-show="!hidden && searchResults && searchResults.length > -1"
    >
      <div
        v-for="(result, index) in searchResults"
        :key="index"
        class="autocomplete-results"
        @click="
          searchValue = result['1. symbol'].toUpperCase();
          getSingleResult(result, index);
          reg();
        "
      >
        <div class="autocomplete-result">{{ result["1. symbol"] }}</div>
        <div class="autocomplete-result">{{ result["2. name"] }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router"
export default {
  name: "Search",
  data() {
    return {
      searchValue: "",
      searchResults: undefined,
      hidden: true,
      symbol: "",
    };
  },
  methods: {
    onChange() {
      if (this.searchValue.length >= 2) {
        this.getSearchResults();
      }
    },
    getSearchResults() {
      const urlBase = `https://www.alphavantage.co/query`;
      const params = {
        function: "SYMBOL_SEARCH",
        keywords: this.searchValue,
        apikey: "AARDO0PWKSGLOW5U",
      };
      axios
        .get(urlBase, { params })
        .then((res) => {
          this.hidden = false;
          this.searchResults = res.data.bestMatches;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getSingleResult(result) {
      this.hidden = true;
      this.symbol = result["1. symbol"];
      this.getSearchResultData();
      this.changedSymbol(this.symbol);
      //console.log(this.symbol);
    },
    changedSymbol(result) {
      this.$emit('changed-symbol', result);
    },
    getSearchResultData() {
      const urlBase = `https://www.alphavantage.co/query`;
      const params = {
        function: "TIME_SERIES_DAILY",
        symbol: this.symbol,
        apikey: "AARDO0PWKSGLOW5U",
      };
      axios
        .get(urlBase, { params })
        .then((res) => {
          const returnedData = res.data["Time Series (Daily)"];
          const lastItem = returnedData[Object.keys(returnedData)[0]];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async reg() {
      const fd = new FormData();
      fd.append("SearchValue", this.searchValue);
      var res = await fetch("http://www.mercuryinvestors.com/#/.netlify/functions/Auth/Sprice",  {
        method: 'POST',
        body: fd
      });

    },

    async symbolSend() {
      const fd = new FormData();
      fd.append("SearchValue", this.searchValue);
      // var res = await fetch("http://localhost:3000/stockChartData", {
      //   method: 'POST',
      //   body: fd
      // });
      // var res2 = await fetch("http://localhost:3000/CompanyData", {
      //   method: 'POST',
      //   body: fd
      // });
    }
  },
};

</script>

<style lang="css" scoped>
.autocomplete-search {
  width: 240px;
}
.autocomplete-input {
  padding: 10px;
  width: 400px;
  border-radius: 2px;
  border: 1px solid black;
  background-color: white;
}
.autocomplete-results-wrapper {
  position: absolute;
}
.autocomplete-results {
  position: relative;
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  width: 300px;
  border: 1px solid grey;
  padding: 10px;
  background-color: lightgray;
  color: black;
}
.autocomplete-results:hover {
  background-color: gray;
  cursor: pointer;
}
</style>
