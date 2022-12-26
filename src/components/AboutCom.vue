<template>
  <div class="container">
    <!--======================================================================== -->
    <h2 class="header">My Portfolios</h2>

    <!--======================================================================== -->
    <div class="create">
      <input
          class="w-100 form-control"
          type="text"
          v-model="portfolio"
          placeholder="Create a Portfolio..."
      />
      <br>
      <input
          class="w-100 form-control"
          type="text"
          v-model="currency"
          placeholder="Usd or CAD."
      />
      <br>

      <button type="button" outlined className="ma-1 mb-5" color="amber" v-on:click="reg();">Create Portfolio</button>

    </div>

    <!--======================================================================== -->

    <!--======================================================================== -->

    <!--======================================================================== -->
    <!-- Portfolios table -->
    <table class="table table-bordered mt-5" style="border-radius:10px;">
      <tr>
        <th scope="col">Name</th>
        <th scope="col" style="width: 120px">Currency</th>
        <th scope="col" class="text-center" style="width: 70px">Delete</th>
        <th scope="col" class="text-center" style="width: 70px">Edit</th>
      </tr>
    </table>
    <div class="portfolios">
      <div v-if="portfolios.length">
        <li v-for="(portfolio, index) in portfolios" :key="index">
          <td style="width: 410px">
            {{ portfolio.name }}
          </td>
          <td style="width: 135px">
            {{ portfolio.currency }}
          </td>
          <td style="width: 70px">
            <div @click="deletePortfolio(index)">
              <span class="fa fa-trash pointer"></span>
            </div>
          </td>
          <td class="text-center">
            <div @click="editPortfolio(index)">
              <p class="fa fa-pen pointer"></p>
            </div>
          </td>
        </li>
      </div>
      <div v-else>No more portfolios</div>
    </div>

    <!--======================================================================== -->
    <div>
      <br>
      <button class="loadPortfolio" >Load</button>
    </div>

  </div>
</template>

<script>

export default {
  name: "PortfoliosPage",
  props: {
    msg: String,
  },

  data() {
    return {
      portfolio: "",
      currency: "",
      currencyClicked: false,
      editedPortfolio: null,

      portfolios: [
        {
          name: "Portfolio 1",
          currency: "CAD",
        },
      ],
    };
  },

  methods: {

    deletePortfolio(index) {
      this.portfolios.splice(index, 1);
    },

    editPortfolio(index) {
      this.portfolio = this.portfolios[index].name;
      this.editedPortfolio = index;
    },

    cadPick(){
      this.currency = "CAD";
      this.currencyClicked = true;
    },

    usdPick(){
      this.currency = "USD";
      this.currencyClicked = true;
    },

    async reg() {
      const fd = new FormData();
      fd.append("PortfolioName", this.name);
      fd.append("LastName", this.currency);

      var res = await fetch("http://www.mercuryinvestors.com/portfolio", {
        method: 'POST',
        body: fd

      });
      var resData = await res.json();
      console.log(resData);


    },

    submitPortfolio() {
      if (this.currencyClicked){
        if (this.portfolio.length === 0) return;

        /* We need to update the portfolio */
        if (this.editedPortfolio != null) {
          this.portfolios[this.editedPortfolio].name = this.portfolio;
          this.portfolios[this.editedPortfolio].currency = this.currency;
          this.editedPortfolio = null;
        }

        else {
          /* We need to add new portfolio */
          this.portfolios.push({
            name: this.portfolio,
            currency: this.currency,
          });
        }

        this.portfolio = "";
        this.currencyClicked=false;
      }
    },
  },
};
</script>

<style scoped>
.container{
  max-width: 700px;
}

.header{
  text-align: center;
  margin-top: 4rem;
  margin-bottom: 2rem;
}

.create{
  display: block;
  margin : 0 auto;
  text-align: center;
  width: 500px;
  padding-bottom: 25px;
}

.button-currency{
  text-align: center;
  padding:0.3em 2em;
  border:0.10em solid #000000;
  margin:0 0.3em 0.3em 0;
  color:#d4af37;
}

.button-currency:hover {
  color:#000000;
  border-color:#000000;
  transform: translateY(-1px);
  border-color:#d4af37;
}

.button-currency:focus {
  color:#000000;
  border-color:#d4af37;
}

.createBtn{
  margin-top: 4rem;
  display: block;
  margin : 0 auto;
  text-align: center;
  border: 0.10em solid #000000;
  padding:0.3em 2em;
}

.portfolios li {
  list-style-type: none;
  display: block;
  margin-bottom: 10px;
  padding: 15px;
  background: #f2f2f2;
  box-shadow: 1px 3px 5px rgba(0,0,0,0.1);
  border-radius: 10px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid grey;
}

.portfolios li:hover {
  transform: translateY(-1px);
  background: #f8f7f7e5;
}

.pointer {
  cursor: pointer;
}

</style>

