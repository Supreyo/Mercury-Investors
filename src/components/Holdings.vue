<template>
   <div class="container">
      <div class="container" >
        
        <div>
          <h1 class="header">Holdings</h1>
        </div>

        <button v-on:click="getHoldings();">Get Holdings</button>

        <table>
            <tr>
                <th style="width: 1000px">Stock Symbol</th>
                <th style="width: 1000px">Owned Units</th>
                <th style="width: 1000px">Average Price</th>
                
            </tr>
        </table>
        
        <br>
        <center>

        <div class="transactions">
            <li v-for="item in list" v-bind:key="item.id">
                <div v-if="item.PortfolioID == 113">
                  <td style="width: 1000px">
                      {{ item.Symbol }}
                  </td>
                  <td style="width: 1000px">
                      {{ item.OwnedUnits}}
                  </td>
                  <td style="width: 1000px">
                      {{ "$" + item.AvgUnitPrice }}
                  </td>
                </div>
            </li>
        </div>
        </center>
      </div>
  </div> 
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from 'vue-axios'

Vue.use(VueAxios,axios)
export default {
  name: "Holdings",
  props: {
    msg: String,
    
  },

  data() {
    return {
      list:undefined,

    };
  },
  methods: {
    async getHoldings() {
        Vue.axios.get('http://www.mercuryinvestors.com/#/.netlify/functions/Auth/holdingsTable').then( (res)=>{
          this.list=res.data
           console.warn(res.data)
        })
    },

    async deleteHoldings(){

    }
  },
};
</script>

<style scoped>
  .container{
    max-width: 700px;
    background-color: #585858;
    border-bottom-left-radius: 5%;
    border-bottom-right-radius: 5%;
  }

  .transactions li {
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

  .transactions li:hover {
    transform: translateY(-1px);
    background: #f8f7f7e5;
  }

  .pointer {
    cursor: pointer;
  }
</style>