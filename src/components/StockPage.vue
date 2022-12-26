<template>
  <div class="flex-container">
    <div class="search-container mx-auto">
      <search-input @changed-symbol='symbolEvent' class="pa-5 mx-auto"/>
    </div>
    <stock-change 
    :key="componentKey"
     v-if="arrData.length > 1" 
     class="mx-auto my-auto" 
     :name="name" 
     :currValue="arrData[0].close"
     :percentChange="percent"
     :increase="increase"
     >
     </stock-change>
    <div class="info-container">
      <div class="chart-container">
      </div>
      <line-chart
        :key="componentKey"
        v-if="arrData.length > 1"
        :chartdata="arrData"
        :options="options"
        class="mb-5 mt-5"
      />
      <PageComponents v-if="arrData.length > 1"
        :key="componentKey"
        :companyInfo="info"
        :industry="industry"
        :sector="sector"
        :CIK="CIK"
        :Exchange="Exchange"
        :Currency="Currency"
        :Country="Country"
        :Address="Address"
        :FiscalYearEnd="FiscalYearEnd"
        :LatestQuarter="LatestQuarter"
        :MarketCapitalization="MarketCapitalization"
        :EBITDA="EBITDA"
        :PERatio="PERatio"
        :PEGRatio="PEGRatio"
        :BookValue="BookValue"
        :DividendPerShare="DividendPerShare"
        :DividendYield="DividendYield"
        :EPS="EPS"
        :RevenuePerShareTTM="RevenuePerShareTTM"
        :ProfitMargin="ProfitMargin"
        :OperatingMarginTTM="OperatingMarginTTM"
        :ReturnOnAssetsTTM="ReturnOnAssetsTTM"
        :ReturnOnEquityTTM="ReturnOnEquityTTM"
        :RevenueTTM="RevenueTTM"
        :GrossProfitTTM="GrossProfitTTM"
        :DilutedEPSTTM="DilutedEPSTTM"
        :QuarterlyEarningsGrowthYOY="QuarterlyEarningsGrowthYOY"
        :QuarterlyRevenueGrowthYOY="QuarterlyRevenueGrowthYOY"
        :AnalystTargetPrice="AnalystTargetPrice"
        :TrailingPE="TrailingPE"
        :ForwardPE="ForwardPE"
        :PriceToSalesRatioTTM="PriceToSalesRatioTTM"
        :PriceToBookRatio="PriceToBookRatio"
        :EVToRevenue="EVToRevenue"
        :EVToEBITDA="EVToEBITDA"
        :ftWeekHigh="ftWeekHigh"
        :ftWeekLow="ftWeekLow"
        :fDayMovingAverage="fDayMovingAverage"
        :thDayMovingAverage="thDayMovingAverage"
        :SharesOutstanding="SharesOutstanding"
        :DividendDate="DividendDate"
        :ExDividendDate="ExDividendDate"
        />
    </div>
  </div>
</template>


<script>
import PageComponents from "@/components/PageComponents";
//import Toolbar from './Toolbar.vue';
import axios from 'axios';
import LineChart from './LineChart.vue';
import StockChange from './stockChange.vue';
import SearchInput from './SearchInput.vue';

export default {
  name: "StockPage",
  data() {
    return {
      name: '',
      percent: null,
      CIK: '',
      Exchange: '',
      Currency: '',
      Country: '',
      Address: '',
      FiscalYearEnd: '',
      LatestQuarter: '',
      MarketCapitalization: '',
      EBITDA: '',
      PERatio: '',
      PEGRatio: '',
      BookValue: '',
      DividendPerShare: '',
      DividendYield: '',
      EPS: '',
      RevenuePerShareTTM: '',
      ProfitMargin: '',
      OperatingMarginTTM: '',
      ReturnOnAssetsTTM: '',
      ReturnOnEquityTTM: '',
      RevenueTTM: '',
      GrossProfitTTM: '',
      DilutedEPSTTM: '',
      QuarterlyEarningsGrowthYOY: '',
      QuarterlyRevenueGrowthYOY: '',
      AnalystTargetPrice: '',
      TrailingPE: '',
      ForwardPE: '',
      PriceToSalesRatioTTM: '',
      PriceToBookRatio: '',
      EVToRevenue: '',
      EVToEBITDA: '',
      Beta: '',
      ftWeekHigh: '',
      ftWeekLow: '',
      fDayMovingAverage: '',
      thDayMovingAverage: '',
      SharesOutstanding: '',
      DividendDate: '',
      ExDividendDate: '',
      users: {
        name: "Jesse"
      },
      componentKey: 0,
      arrData: [],
      companyData: [],
      info: '',
      industry: '',
      sector: '',
      currentValue: 0,
      percentChange: 0,
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
      increase: true,
    }
  },

  methods: {
    async symbolEvent(value) {
      console.log(value + 'stockPage');
      console.log('changed');
      console.log(this.componentKey);
      const fd = new FormData();
      fd.append("SearchValue", value);
      var res = await fetch("http://www.mercuryinvestors.com/#/.netlify/functions/Auth/stockChartData",  {
        method: 'POST',
        body: fd
      });
      this.chartData();
      //console.log(this.arrData);
      console.log(this.componentKey);
      this.componentKey += 1;
    },
    async chartData() {
      this.arrData.length = 0;
      const { data } = await axios.get("http://www.mercuryinvestors.com/#/.netlify/functions/Auth/stockChart");
      const compData = await axios.get("http://www.mercuryinvestors.com/#/.netlify/functions/Auth/CompanyData");
      let cData = compData;
      this.companyData.length = 0;
      this.arrData.length = 0;
      console.log(cData)
      this.companyData.push(compData.data);
      cData = JSON.parse(JSON.stringify(compData.data));
      this.info = cData[0].desc;
      this.industry = cData[0].industry;
      this.sector = cData[0].sector;
      this.name = cData[0].name;
      this.CIK = cData[0].CIK
      this.Exchange= cData[0].Exchange
      this.Currency= cData[0].Currency
      this.Country= cData[0].Country
      this.Address= cData[0].Address
      this.FiscalYearEnd= cData[0].FiscalYearEnd
      this.LatestQuarter= cData[0].LatestQuarter
      this.MarketCapitalization= cData[0].MarketCapitalization
      this.EBITDA= cData[0].EBITDA
      this.PERatio= cData[0].PERatio
      this.PEGRatio= cData[0].PEGRatio
      this.BookValue= cData[0].BookValue
      this.DividendPerShare= cData[0].DividendPerShare
      this.DividendYield= cData[0].DividendYield
      this.EPS= cData[0].EPS
      this.RevenuePerShareTTM= cData[0].RevenuePerShareTTM
      this.ProfitMargin= cData[0].ProfitMargin
      this.OperatingMarginTTM= cData[0].OperatingMarginTTM
      this.ReturnOnAssetsTTM= cData[0].ReturnOnAssetsTTM
      this.ReturnOnEquityTTM= cData[0].ReturnOnEquityTTM
      this.RevenueTTM= cData[0].RevenueTTM
      this.GrossProfitTTM= cData[0].GrossProfitTTM
      this.DilutedEPSTTM= cData[0].DilutedEPSTTM
      this.QuarterlyEarningsGrowthYOY= cData[0].QuarterlyEarningsGrowthYOY
      this.QuarterlyRevenueGrowthYOY= cData[0].QuarterlyRevenueGrowthYOY
      this.AnalystTargetPrice= cData[0].AnalystTargetPrice
      this.TrailingPE= cData[0].TrailingPE
      this.ForwardPE= cData[0].ForwardPE
      this.PriceToSalesRatioTTM= cData[0].PriceToSalesRatioTTM
      this.PriceToBookRatio= cData[0].PriceToBookRatio
      this.EVToRevenue= cData[0].EVToRevenue
      this.EVToEBITDA= cData[0].EVToEBITDA
      this.Beta= cData[0].Beta
      this.ftWeekHigh= cData[0].ftWeekHigh
      this.ftWeekLow= cData[0].ftWeekLow
      this.fDayMovingAverage= cData[0].fDayMovingAverage
      this.thDayMovingAverage= cData[0].thDayMovingAverage
      this.SharesOutstanding= cData[0].SharesOutstanding
      this.DividendDate= cData[0].DividendDate
      this.ExDividendDate= cData[0].ExDividendDate
      console.log(cData[0].name);
      console.log(cData[0]);
      console.log(data);
      console.log(data)
      data.forEach(d => {
        const date = d.timestamp;
        const open = Number(d.open);
        const high = Number(d.high);
        const low = Number(d.low);
        const close = Number(d.close);
        this.arrData.push({date, open: open, high: high, low: low, close: close});
      })
      let newNum = Number((this.arrData[1].close));
      let currNum = Number((this.arrData[0].close))
      let res = newNum - currNum;
      res = (res/currNum)*100;
      if (res < 0) this.increase = false;
      else this.increase = true;
      this.percent = Math.round(res * 100) / 100;      
      console.log(this.percent);
    }
    // getUserData: function () {
    //     let self = this
    //     axios.get("/api/user")
    //       .then((response) => {
    //         console.log(response)
    //         self.$set(this, "user", response.data.user)
    //       })
    //       .catch((errors) => {
    //         console.log(errors)
    //         router.push("/")
    //       })
    //   }
  },

  async created () {
    this.arrData.length = 0;
    const { data } = await axios.get("http://www.mercuryinvestors.com/#/.netlify/functions/Auth/stockChart");
    const compData = await axios.get("http://www.mercuryinvestors.com/#/.netlify/functions/Auth/CompanyData");
    let cData = compData
    console.log(cData)
    this.companyData.push(compData.data);
    cData = JSON.parse(JSON.stringify(compData.data));
    this.info = cData[0].desc;
    this.industry = cData[0].industry;
    this.sector = cData[0].sector;
    this.name = cData[0].name;
    this.CIK = cData[0].CIK
    this.Exchange= cData[0].Exchange
    this.Currency= cData[0].Currency
    this.Country= cData[0].Country
    this.Address= cData[0].Address
    this.FiscalYearEnd= cData[0].FiscalYearEnd
    this.LatestQuarter= cData[0].LatestQuarter
    this.MarketCapitalization= cData[0].MarketCapitalization
    this.EBITDA= cData[0].EBITDA
    this.PERatio= cData[0].PERatio
    this.PEGRatio= cData[0].PEGRatio
    this.BookValue= cData[0].BookValue
    this.DividendPerShare= cData[0].DividendPerShare
    this.DividendYield= cData[0].DividendYield
    this.EPS= cData[0].EPS
    this.RevenuePerShareTTM= cData[0].RevenuePerShareTTM
    this.ProfitMargin= cData[0].ProfitMargin
    this.OperatingMarginTTM= cData[0].OperatingMarginTTM
    this.ReturnOnAssetsTTM= cData[0].ReturnOnAssetsTTM
    this.ReturnOnEquityTTM= cData[0].ReturnOnEquityTTM
    this.RevenueTTM= cData[0].RevenueTTM
    this.GrossProfitTTM= cData[0].GrossProfitTTM
    this.DilutedEPSTTM= cData[0].DilutedEPSTTM
    this.QuarterlyEarningsGrowthYOY= cData[0].QuarterlyEarningsGrowthYOY
    this.QuarterlyRevenueGrowthYOY= cData[0].QuarterlyRevenueGrowthYOY
    this.AnalystTargetPrice= cData[0].AnalystTargetPrice
    this.TrailingPE= cData[0].TrailingPE
    this.ForwardPE= cData[0].ForwardPE
    this.PriceToSalesRatioTTM= cData[0].PriceToSalesRatioTTM
    this.PriceToBookRatio= cData[0].PriceToBookRatio
    this.EVToRevenue= cData[0].EVToRevenue
    this.EVToEBITDA= cData[0].EVToEBITDA
    this.Beta= cData[0].Beta
    this.ftWeekHigh= cData[0].ftWeekHigh
    this.ftWeekLow= cData[0].ftWeekLow
    this.fDayMovingAverage= cData[0].fDayMovingAverage
    this.thDayMovingAverage= cData[0].thDayMovingAverage
    this.SharesOutstanding= cData[0].SharesOutstanding
    this.DividendDate= cData[0].DividendDate
    this.ExDividendDate= cData[0].ExDividendDate
    console.log(cData[0]);
    console.log(data);
    data.forEach(d => {
      const date = d.timestamp;
      const open = Number(d.open);
      const high = Number(d.high);
      const low = Number(d.low);
      const close = Number(d.close);
      this.arrData.push({date, open: open, high: high, low: low, close: close});
    })
      let newNum = Number((this.arrData[1].close));
      let currNum = Number((arrData[0].close))
      let res = newNum - currNum;
      res = (res/currNum)*100;
      if (res < 0) this.increase = false;
      else this.increase = true;
      this.percent = Math.round(res * 100) / 100;
  },
  components: {
    PageComponents,
    //Toolbar,
    LineChart,
    StockChange,
    SearchInput
  },

}
</script>

<style scoped>

.flex-container {
  display: flex;
  flex-direction: column;
  justify-self: center;
  align-self: center;
  background-color: #0f131d;
  color: white;
}
.info-container {
  display: flex;
  flex-direction:column;
  justify-content: center;
}
.search-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: #0f131d;
}

</style>
