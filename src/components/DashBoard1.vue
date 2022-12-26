<template>
<!-- <div class="darkmode">
<div ref="content">
  <sidebar-menu :menu="menu" />
  <div class="dashboard darkmode">
    <div class="left darkmode">
      <div class="sidebar">
        <div class="wrapper">
          <div class="menu">
            <img src="https://i.ibb.co/B4Dn7CT/menu.png" />
          </div>
        </div>
      </div>
      <div class="navigation darkmode">
        <div class="wrapper2 darkmode">
          <div class="title">
            <h1> Mercury Investors </h1>
          </div>
          <div class="section1">
            <div class="mx-auto">
              <strong> Watchlist </strong>
              <div v-for="item in watchlist" :key="item.id">
                <watchlist
                :data="item.data"
                :percent="item.percent"
                :price="item.price"
                :symbol="item.symbol"
                />
              </div>
            </div>
          </div>
          <div class="section2 darkmode">
          </div>
        </div>
      </div>
    </div>
          <portfolio-chart
            class="pa-5"
            :options="options"
          />
    <div class="right-side ">
      <div class="right-header">
        <div class="top-bar">
          <div class="top-bar-justify">
            <div class="big-inbox">
              Dashboard
            </div>
            <div class="top-bar-items">
            </div>
          </div>
          <div class="profile2">
            <div class="icon-name5">Talha fareed</div>
          </div>
        </div>
        <hr class="new-hr">
        <div class="right-bottom">
          <div class="middle-buttons">
            <div class="form has-search">
              <input class="text" type="search" placeholder="Search here..." name="search" />
              <span class="searchIcon">
         <img src="https://i.ibb.co/sqFgRq8/search.png" />
       </span>
            </div>
          </div>
        </div>
      </div>
      <div class="right-body darkmode">
        <div class="scroll-cards">
          <div class="card1">
          </div>
          <div class="card">
          </div>
          <div class="card">
          </div>
        </div>
        <div class="container darkmode mx-auto">
          <h1>Total Value</h1>
          <h2>${{currentVal}}</h2>
          <button type="button" outlined className="ma-1 mb-5" color="amber" v-on:click="run()">Update</button>
          <br>
          <h1>Dollar Change</h1>
          <h2>${{dollarChange}}</h2>
          <br>
          <h1>Percent Change</h1>
          <h2>{{percentChange}}%</h2>
          <br>
          <br>
          <h1>Total Holdings</h1>
          <button type="button" outlined className="ma-1 mb-5" color="amber" v-on:click="generatepdf()">Generate PDF Report</button>
        </div>
        </div>
      </div>
    </div>
</div> -->

<div class="flex-container" ref="content">

  <div class="watchlist-container ml-10">
    <div class="title">
      <h1 class ="pa-5"> Mercury Investors </h1>
    </div>
    <strong> Watchlist </strong>
    <div style="overflow: auto; height:600px;">
          <div v-for="item in watchlist" :key="item.id">
      <watchlist
      :data="item.data"
      :percent="item.percent"
      :price="item.price"
      :symbol="item.symbol"
      />
    </div>
    </div>

  </div>
  <div class="portfolio-container">
    <!-- <search-input @changed-symbol='symbolEvent' class="mx-auto search-container pa-5" /> -->
    <div class="value-container">
      <div class="text-container mx-auto pa-5">
        <h1>Total Value</h1>
        <h2>${{currentVal}}</h2>

      </div>
      <div class="text-container mx-auto pa-5">
        <h1>Dollar Change</h1>
        <h2>${{dollarChange}}</h2>
      </div>
      <div class="text-container mx-auto pa-5">
        <h1>Daily Change</h1>
        <h2>{{percentChange}}%</h2>
      </div>
    </div>

    <div class="chart-container my-auto">
      <portfolio-chart v-if="arrData.length > 1"
        class="pa-5"
        :options="options"
        :chartdata="arrData"
      />
    </div>
          <div class="button-container pa-10">
        <v-btn type="button" outlined className="ma-1 mb-5 mx-auto pa-2" color="white" v-on:click="generatepdf()">Generate PDF Report</v-btn>
      </div>
  </div>
    <div class="watchlist-container mr-10 my-auto">
    <strong> Holdings </strong>
    <div style="overflow: auto; height:600px;">
    <div v-for="item in holding" :key="item.id">
      <owned-stock
      :data="item.data"
      :percent="item.percent"
      :price="item.price"
      :holding="item.owned"
      :symbol="item.symbol"
      />
    </div>
    </div>
  </div>
</div>
</template>

<script>
import Vue from "vue";
import VueAxios from "vue-axios";
import axios from "axios";
import Watchlist from './Watchlist.vue';
import jsPDF from "jspdf";
import domtoimage from 'dom-to-image';
import PortfolioChart from './PortfolioChart.vue';
import router from "../router"
import SearchInput from "./SearchInput.vue";
import OwnedStock from "./ownedStock.vue";

Vue.use(VueAxios,axios)
export default {
  components: { Watchlist, PortfolioChart, SearchInput, OwnedStock},
  name: "DashBoard",

  data(){
    return{
      options: {
         tooltips: {
            mode: 'index'
        },
        plugins: {
          legend: {
            labels: {
              color: "white"
            }
          }
        },
        scales: {
            xAxes: [{
              display: false,
                gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                }
            }],
            yAxes: [{
              display: false,
                gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                }
            }]
        },
        responsive: true,
        maintainAspectRatio: false,
        parsing: false
      },
      currentVal: '',
      dollarChange: '',
      percentChange: '',
      holding: [
      ],
      watchlist: [
      ],
      arrData: [

      ]
    }

  },
  methods:{
    async symbolEvent(value) {
      console.log('changed');
      const fd = new FormData();
      fd.append("SearchValue", value);
      var res = await fetch("http://www.mercuryinvestors.com/#/.netlify/functions/Auth/stockChartData",  {
        method: 'POST',
        body: fd
      });
      router.push("/StockPage");
  },
    beforeCreate() {
      Vue.axios.get('http://www.mercuryinvestors.com/#/.netlify/functions/Auth/PortVal').then( (res)=>{
        this.value=res.data.PortValue
        console.warn(this.value)
      })
    },


    generatepdf(){
      domtoimage
          .toPng(this.$refs.content)
          .then(function (dataUrl) {
            var img = new Image();
            img.src = dataUrl;
            const doc = new jsPDF({
              orientation: 'portrait',
              // unit: "pt",
              format: [500, 500],
            });
            doc.setFont("times", "bold")
            doc.setFontSize("20")
            doc.text("Mercury Investors Portfolio Report", 175, 20)
            doc.addImage(img, 'JPEG', 20, 40);
            const date = new Date();
            const filename = 'filename' + '.pdf';

            doc.save(filename);
          })
          .catch(function (error) {
            console.error('oops, something went wrong!', error);
          });
      }
  },
  async beforeCreate() {
    const portfolioVal = await axios.get('http://www.mercuryinvestors.com/#/.netlify/functions/Auth/PortVal')
    let pData = JSON.parse(JSON.stringify(portfolioVal.data));
    //console.log(pData.CurrentValue);
    this.currentVal = pData.CurrentValue;
    this.dollarChange = pData.Dchange;
    this.percentChange = pData.Pchange;
    const WatchlistData = await axios.get('http://www.mercuryinvestors.com/#/.netlify/functions/Auth/Watchlist')
    let wlData = WatchlistData.data
    for (let i = 0; i < wlData.length; i++) {
      let data = wlData[i].Data["0"]
      this.watchlist.push({id: i, data: data, symbol: wlData[i].Symbol, price: wlData[i].Price, percent: wlData[i].Percent})
      // console.log(this.watchlist)
    }
    const holdingData = await axios.get('http://www.mercuryinvestors.com/#/.netlify/functions/Auth/OwnedStock')
    let hData = holdingData.data
    for (let i = 0; i < hData.length; i++) {
      let data = hData[i].Data["0"]
      this.holding.push({id: i, data: data, symbol: hData[i].Symbol, price: hData[i].Price, percent: hData[i].percent, owned: hData[i].owned})
      // console.log(this.holding)
    }
  },

  async created() {
    const chartData = await axios.get('http://www.mercuryinvestors.com/#/.netlify/functions/Auth/portfolioChart')
    let data = chartData.data
    console.log(chartData)
    data.forEach(d => {
    let date = d.Date;
    let price = Number(d.TotalValue);
    this.arrData.push({date, price: price});
  })
  }
}

</script>

<style scoped>
* {
  box-sizing: border-box;
  outline: none;
}

.button-container {
  display: flex;
  flex-direction: column;

}

.value-container {
  display: flex;
  flex-direction: row;
  text-align: center;
}

.text-container {
  display: flex;
  flex-direction: column;
}

.search-container{
  display: flex;
  justify-content: center;
}

.flex-container {
  display: flex;
  flex-direction: row;
  background-color:#0f131d;
  justify-content: space-between;
  color: white;
  height: 100vh;
}

.watchlist-container{
  display:flex;
  flex-direction: column;
  text-align: center;
}

.portfolio-container{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 1200px;
}

.chart-container{
  min-width: 600px;
}

.darkmode{
  background-color:#0f131d;
  color: white;
}
body {
  margin: 0;
  font-family: Sans-serif;
  overflow: hidden;
}
.dashboard {
  height: 100vh;
  display: flex;
}
.left {
  height: 100%;
  display: flex;
}
/* .sidebar {
  width: 80px;
  height: 100%;
  background-image: linear-gradient(to bottom, #051937, #003353, #004e6c, #006b81, #0f8991);
  display: flex;
}
.wrapper {
  padding: 0 25px;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
 */

.items > img {
  margin-bottom: 25px;
}

.profile > img {
  border-radius: 50%;
  width: 305px;
  height: 35px;
  border: 1px solid white;
}

/* .menu {
  margin-top: 20px;
} */
.navigation {
  width: 270px;
  border-right: 1px solid #ddd;
}
.title > img {
  width: 50px;
  margin-bottom: 30px;
  margin-left: -8px;
}

.wrapper2 {
  padding: 0 25px;
  height: 100%;
  overflow: auto;
}





.avatar > img {
  width: 35px;
  border-radius: 10px;
}
.section1 {
  text-align: center;
  margin-top: 50px;
  margin-bottom: 10px;
}





.plus > img {
  width: 16px;
  height: 16px;
}


.big-inbox {
  font-size: 25px;
  font-weight: 500;
}
.right-side {
  /* background-color: #f2f3f7; */
  width: 100%;
  padding: 8px 30px;
  display: flex;
  flex-direction: column;
}
.right-body {
  flex: 1;
  display: flex;
  overflow: hidden;
}
.top-bar {
  display: flex;
  align-items: center;
  text-align: center;
}
.top-bar-justify {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.top-bar-items {
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 180px;
}
.profile2 > img {
  border-radius: 50%;
  width: 28px;
  height: 28px;
  border: 2px solid white;
  margin-left: 25px;
  margin-right: 5px;
}
.profile2 {
  display: flex;
  align-items: center;

  width: 120px;
}
.icon-name5 {
  font-size: 13px;
  color: grey;
}
.new-hr {
  border: 0.6px solid #ddd;
  margin-bottom: 25px;
}


.checkbox > input {
  width: 20px;
  height: 20px;
}

.right-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.down-arrow > img {
  width: 12px;
  height: 14px;
  margin-bottom: -2px;
  margin-left: 5px;
}

.has-search .text {
  padding-left: 30px;
  margin-left: 45px;
}
.form {
  display: flex;
  align-items: center;
}
.searchIcon {
  margin-left: 53px;
  position: absolute;
  margin-top: 2px;
}
.text {
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 280px;
  height: 30px;
  background-color: #edeef5;
}

.middle-buttons {
  display: flex;
}

.scroll-cards {
  width: 370px;
  height: 100%;
  overflow: auto;

  padding: 20px 0px 5px 0px;
}
.card {
  background-color: white;
  border-radius: 4px;
  margin-top: 8px;
  margin-bottom: 5px;
  padding: 25px 25px 15px 25px;
  transition: 0.3s;
}
.card:hover {
  box-shadow: 5px 1px 20px 1px #ddd;
  transform: scale(0.96);
}
.card1 {
  background-color: #0d1017;
  height: 200px;
  border-radius: 4px;
  margin-top: 2px;
  margin-bottom: 5px;
  padding: 25px 25px 15px 25px;
  transition: 0.3s;
}
.card1:hover {
  box-shadow: 5px 1px 20px 1px #ddd;
  transform: scale(0.96);
}



.mails > img {
  width: 35px;
  border-radius: 10px;
}

.container {
  text-align: center;
  margin: 20px 10px;
  height: 500px;
  width: 25vw;
  flex: 1;
  background-color: #0d1017;
  padding: 25px;
  overflow: auto;
}

.title {
  font-size: 15px;
  width: 100px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 10px;
}

.inside-img > img {
  width: 100px;
  border-radius: 10px;
  margin-top: 20px;
}
.inside-img > img:hover {
  transform: scale(0.95);
}

::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

</style>
