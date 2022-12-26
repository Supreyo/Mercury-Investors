<template>
  <div class="component-container">
    <label className="ma-1"> Stock Name </label>
    <input className="ma-1" type="text" v-model="stock">
    <label className="ma-1"> Total Shares </label>
    <input className="ma-1" type="text" v-model="volume" required>
    <label className="ma-1">Price Per Share </label>
    <input className="ma-1" type="text" v-model="pricePerShare" required>
    <label className="ma-1">Date </label>

    <div>
      <br>
      <input className="ma-1" type="date" value="2018-07-22" v-model="date" required>
      <br>
    </div>

    <center>
    <div>
      <br>
      <button class="button-buysell mx-auto" v-on:click="buy(),updateHoldings(), addTransactions()">Buy</button>
      <button class="button-buysell mx-auto" v-on:click="sell(),updateHoldings(), addTransactions()">Sell</button>
      <button class="button-buysell mx-auto" v-on:click="watchlist()">Add to Watchlist</button>
    </div>
    </center>
  </div>
</template>
<script>
export default {
  name: "SharesComp",
  data() {
    return {
      stock: "",
      volume: "",
      pricePerShare: "",
      date: "",
      transType: "",
    }
  },
  methods:{

    buy(){
      alert("Stock added to Holdings")
      this.transType = "Buy"
    },

    sell(){
      alert("Stock removed from Holdings")

      this.transType = "Sell"
    },

    async watchlist(){
      alert("Stock added to Watchlist")

      await fetch ("http://www.mercuryinvestors.com/#/.netlify/functions/Auth/addToWatchlist")


    },

    async addTransactions() {
      const fd = new FormData();
      fd.append("Stock", this.stock);
      fd.append("Volume", this.volume);
      fd.append("PricePerShare", this.pricePerShare);
      fd.append("Date", this.date);
      fd.append("TransType", this.transType)

      const res = await fetch("http://www.mercuryinvestors.com/#/.netlify/functions/Auth/transactions", {
        method: 'POST',
        body: fd

      });
    },

    async updateHoldings() {
      const fd = new FormData();
      fd.append("Stock", this.stock.toUpperCase());
      fd.append("Volume", this.volume);
      fd.append("TransType", this.transType)
      fd.append("PricePerShare", this.pricePerShare);

      const res = await fetch("http://www.mercuryinvestors.com/#/.netlify/functions/Auth/updateHoldings", {
        method: 'POST',
        body: fd

      });

      console.log("UPDATED HOLDINGS")
    },
  }
}
</script>

<style scoped>

.component-container{
  display: flex;
  flex-direction: column;
  background-color: #0d1017;
  align-content:flex-start;
  justify-content: center;
  text-align:center;
  width: 600px;
  height: 300px;
}
h1{
  margin: auto;
  text-align: center;
}

input[type=text], select {
  color: white;
  text-align: center;
  border: 1px solid #ccc;
}

input[type=date], select {
  /*color: white;*/
  text-align: center;
  color-scheme: dark;
}

.button-buysell {
	background-color:#ffffff;
	border:1px solid black;
	display:inline-block;
	cursor:pointer;
	color: darkgrey;
	font-family:Arial;
	font-size:17px;
	padding:12px 33px;
	text-decoration:none;
	text-shadow:0px 1px 0px #f5f5f5;
}
.button-buysell:hover {
  background-color: #384361;
}
.button-buysell:active {
	position:relative;
	top:1px;
}

</style>
