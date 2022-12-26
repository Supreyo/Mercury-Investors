<template>
  <div class="flex-container" ref="content">
     <div class="container">
      <div class="container" >

        <div>
          <h1 class="header">Transaction History</h1>
        </div>

        <v-btn v-on:click="getTransaction();" outlined className="ma-1 mb-5 mx-auto pa-2" color="white" >Get Transactions</v-btn>
        <v-btn v-on:click="generatepdf()" outlined className="ma-1 mb-5 mx-auto pa-2" color="white" >Generate PDF Report</v-btn>

        <table>
            <tr>
                <th style="width: 1000px">Stock Symbol</th>
                <th style="width: 1000px">Type</th>
                <th style="width: 1000px">Total</th>
                <th style="width: 1000px">Volume</th>
                <th style="width: 410px">Date</th>
            </tr>
        </table>

        <br>
        <center>
        <div class="transactions">
            <li v-for="item in list" v-bind:key="item.id">
              <td style="width: 1000px">
                {{ item.Symbol }}
              </td>
              <td style="width: 1000px">
                {{ item.TransactionType }}
              </td>
              <td style="width: 1000px">
                {{ "$" + item.TransactionTotal }}
              </td>
              <td style="width: 1000px">
                {{ item.TransactionVolume }}
              </td>
              <td style="width: 1000px">
                {{ item.TransactionDate }}
              </td>
            </li>
        </div>
        </center>
      </div>
  </div>
  </div>

</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from 'vue-axios'
import jsPDF from "jspdf";
import domtoimage from 'dom-to-image';

Vue.use(VueAxios,axios)
export default {
  name: "TransactionHistory",
  props: {
    msg: String,

  },

  data() {
    return {
      list:undefined,

    };
  },
  methods: {
    async getTransaction() {
      Vue.axios.get('http://www.mercuryinvestors.com/#/.netlify/functions/Auth/transactionsTable').then( (res)=>{
        this.list=res.data
        console.warn(res.data)
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
            doc.text("Mercury Investors Transaction Report", 175, 20)
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
};
</script>

<style scoped>

.flex-container {
      background-color: #0f131d;
      min-height: 100vh;
}

  .container{
    max-width: 700px;
    background-color: #0f131d;
    color: white;
    border-bottom-left-radius: 5%;
    border-bottom-right-radius: 5%;
  }

  .transactions li {
    list-style-type: none;
    display: block;
    margin-bottom: 10px;
    padding: 15px;
    background-color: #0f131d;
    box-shadow: 1px 3px 5px rgba(0,0,0,0.1);
    border-radius: 10px;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid grey;
  }

  .transactions li:hover {
    transform: translateY(-1px);
    background: #f8f7f7e5;
    color: #0f131d;
  }

  .pointer {
    cursor: pointer;
  }
</style>
