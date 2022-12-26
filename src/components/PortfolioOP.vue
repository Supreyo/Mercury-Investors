<template>
   <div class="flex-container mx-auto my-auto">
    <!-- <v-img class="img-container" :src="require('../assets/PortBack.png')"> -->
      <div class="flex-container mx-auto my-auto" >
        <div>
          <h1 class="header">Portfolios</h1>

          <div class="create">
            <input
              class="w-100 form-control"
              type="text"
              v-model="portfolio"
              placeholder="Create a Portfolio..."
            />
          </div>

          <div class="create">
            <input
              class="w-100 form-control"
              type="text"
              v-model="currency"
              placeholder="Choose Currency..."
            />
          </div>

          <center>
          <div>
            <button class="button-currency" @click="cadPick">CAD</button>
            <button class="button-currency" @click="usdPick">USD</button>
          </div>
          <br>
          <div>
            <button type="button" v-on:click="createPortfolio(), reload()" href="#" class="myButton">Create</button>
          </div>
          <br>
          </center>
        </div>

        <!--======================================================================== -->
        <center>
        <div class="portfolios">
          <!-- <div v-if="portfolios.length"> -->
          <li v-for="item in list" v-bind:key="item.id" >
            <td style="width: 410px">
                {{ item.PortfolioName }}
              </td>
              <td style="width: 135px">
                {{ item.CurrencyType }}
              </td>
              <td style="width: 135px">
                {{ item.PortfolioID }}
              </td>
            <td style="width: 135px">
              <button type="button" @click="SendPID(item.PortfolioID)">Open</button>
            </td>

              <td style="width: 135px">
                <button type="button" v-on:click="deletePortfolio(item.PortfolioID),reload()">Delete</button>
              </td>
              <td style="width: 70px">
                <button type="button" v-on:click="editPortfolio(item.PortfolioID),reload()">Edit</button>
              </td>
            </li>
        </div>
        </center>

          <!-- <div v-else>No more portfolios</div> -->
      </div>
    <!--</v-img> -->
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from 'vue-axios'
import IndividualPortfolio from './IndividualPortfolio.vue';
import router from "../router";

Vue.use(VueAxios,axios)
export default {
  components: { IndividualPortfolio },
  name: "PortfolioOP",
  props: {
    msg: String,

  },

  data() {
    return {
      portfolio: "",
      currency: "",
      PID:"",
      currencyClicked: false,
      editedPortfolio: null,
      list:undefined,

    };
  },
  methods: {
    SendPID(PID) {
      const fd = new FormData();
      fd.append("PID", PID)

      console.log(PID)
      fetch("http://www.mercuryinvestors.com/#/.netlify/functions/Auth/PID",   {
          method: 'POST',
          body: fd,
        }
      ).then((results)=> {
        router.push('/DashBoard')


      });
      /*axios.post('http://localhost:3000/PID', {
        pid: PID
      }).then(()=>{
        console.log(PID)
      })*/
    },
    async getPortfolios() {
      Vue.axios.get('http://www.mercuryinvestors.com/#/.netlify/functions/Auth/portfolioTable').then( (res)=>{
        this.list=res.data
        console.warn(res.data)
      })

      console.log(fd.get("pwd"));
      var resData = await res.json();
      console.log(resData);
    },

    async createPortfolio(){
      const fd = new FormData();
      fd.append("PortfolioName", this.portfolio);
      fd.append("Currency", this.currency);

      var res = await fetch("http://www.mercuryinvestors.com/#/.netlify/functions/Auth/portfolio", {
        method: 'POST',
        body: fd
      });
    },

    async deletePortfolio(PortfolioID){
      var deleteIndex = PortfolioID
      const fd = new FormData();
      fd.append("DeleteIndex", deleteIndex)

      var res = await fetch("http://www.mercuryinvestors.com/#/.netlify/functions/Auth/portfolioDelete", {
        method: 'POST',
        body: fd
      });

      console.log("DELETE BUTTON CLICK" + deleteIndex);
    },

    async editPortfolio(PortfolioID){
      var editIndex = PortfolioID

      const fd = new FormData();
      fd.append("PortfolioName", this.portfolio);
      fd.append("Currency", this.currency);
      fd.append("EditIndex", editIndex)


      var res = await fetch("http://www.mercuryinvestors.com/#/.netlify/functions/Auth/portfolioEdit", {
        method: 'POST',
        body: fd
      });
    },

    /*editPortfolio(index) {
      this.portfolio = this.portfolios[index].name;
      this.editedPortfolio = index;
    },*/

    cadPick(){
      this.currency = "CAD";
      this.currencyClicked = true;
    },

    usdPick(){
      this.currency = "USD";
      this.currencyClicked = true;
    },

    reload() {
      reload = location.reload();
    },
  },

  async created(){
   await this.getPortfolios();
  },
};
</script>

<style scoped>
  .flex-container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: flex-start;
    background-color: #0f131d;
    height: 100vh;
    color: white;
  }

  .container{
    max-width: 700px;
    background-color: red;
    border-bottom-left-radius: 5%;
    border-bottom-right-radius: 5%;
    /*padding-bottom: 50px;
    background-position: center;*/
  }

  .img-container{
    display: flex;
    height: 100vh;
    flex-direction: column;
    justify-content: center;
    align-content: flex-start;

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
    color: white;
    width: 500px;
    padding-bottom: 25px;
  }

input, select, textarea{
    color: white;
}

textarea:focus, input:focus {
    color: white;
}

  button{
    font-family: Sans-serif;
  }

  /*.button-currency{
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
  }*/

  .button-currency {
    background:linear-gradient(to bottom, #78b9c2 5%, #46699c 100%);
    background-color:#78b9c2;
    border-radius:20px;
    border:1px solid #4e6096;
    display:inline-block;
    cursor:pointer;
    color:#ffffff;
    font-family:Arial;
    font-size:13px;
    padding:11px 16px;
    text-decoration:none;
    text-shadow:0px 0px 0px #283966;
  }
  .button-currency:hover {
  background:linear-gradient(to bottom, #46699c 5%, #78b9c2 100%);
    background-color:#46699c;
  }
  .button-currency:active {
    position:relative;
    top:1px;
  }

  .portfolios li {
    list-style-type: none;
    display: block;
    margin-bottom: 10px;
    padding: 15px;
  background-color:#0f131d;
    box-shadow: 1px 3px 5px rgba(0,0,0,0.1);
    border-radius: 10px;
    width: 75%;
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

  .myButton {
    background:linear-gradient(to bottom, #599bb3 5%, #408c99 100%);
    background-color:#599bb3;
    border-radius:10px;
    border:1px solid #29668f;
    display:inline-block;
    cursor:pointer;
    color:#ffffff;
    font-family:Arial;
    font-size:17px;
    padding:11px 34px;
    text-decoration:none;
    text-shadow:0px 0px 0px #3d768a;
  }
  .myButton:hover {
    background:linear-gradient(to bottom, #408c99 5%, #599bb3 100%);
    background-color:#408c99;
  }
  .myButton:active {
    position:relative;
    top:1px;
  }

  input[type=text], select {
    width: 100%;
    padding: 12px 10px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }

  input[type=submit] {
    width: 100%;
    background-color: #4CAF50;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
</style>
