<template>
  <div class="component-container">
    <div class="row-container">
      <div class="mx-auto pa-2">
        <h2>Key Information</h2>
        <div class="key-info-container">
          <div class="col-container">
            <p class="text-headers">Exchange</p>
            <p class="mt-n3">{{Exchange}}</p>
            <p class="text-headers">Currency</p>
            <p class="mt-n3">{{Currency}}</p>
            <p class="text-headers">Latest Quarter</p>
            <p class="mt-n3">{{LatestQuarter}}</p>
            <p class="text-headers">Market Capitalization</p>
            <p class="mt-n3">{{MarketCapitalization}}</p>
            <p class="text-headers">EBITDA</p>
            <p class="mt-n3">{{EBITDA}}</p>
            <p class="text-headers">PE Ratio</p>
            <p class="mt-n3">{{PERatio}}</p>
            <p class="text-headers">Book Value</p>
            <p class="mt-n3">{{BookValue}}</p>
            <p class="text-headers">EPS</p>
            <p class="mt-n3">{{EPS}}</p>
          </div>
          <div class="col-container">
            <p class="text-headers">Profit Margin</p>
            <p class="mt-n3">{{ProfitMargin}}</p>
            <p class="text-headers">Quarterly Earnings Growth YOY</p>
            <p class="mt-n3">{{QuarterlyEarningsGrowthYOY}}</p>
            <p class="text-headers">Quarterly Revenue Growth YOY</p>
            <p class="mt-n3">{{QuarterlyRevenueGrowthYOY}}</p>
            <p class="text-headers">Analyst Target Price</p>
            <p class="mt-n3">{{AnalystTargetPrice}}</p>
            <p class="text-headers">Price To Book Ratio</p>
            <p class="mt-n3">{{PriceToBookRatio}}</p>
            <p class="text-headers">52 Week High</p>
            <p class="mt-n3">{{ftWeekHigh}}</p>
            <p class="text-headers">52 Week Low</p>
            <p class="mt-n3">{{ftWeekLow}}</p>
            <p class="text-headers">50 Day Moving Average</p>
            <p class="mt-n3">{{fDayMovingAverage}}</p>
            <p class="text-headers">200 Day Moving Average</p>
            <p class="mt-n3">{{thDayMovingAverage}}</p>
          </div>
        </div>
      </div>
      <div class="mx-auto pa-2">
        <h2>Trailing Twelve Month Data</h2>
          <p class="text-headers">Operating Margin</p>
          <p class="mt-n3">{{OperatingMarginTTM}}</p>
          <p class="text-headers">Return On Assets</p>
          <p class="mt-n3">{{ReturnOnAssetsTTM}}</p>
          <p class="text-headers">Return On Equity</p>
          <p class="mt-n3">{{ReturnOnEquityTTM}}</p>
          <p class="text-headers">Revenue </p>
          <p class="mt-n3">{{RevenueTTM}}</p>
          <p class="text-headers">Revenue Per Share</p>
          <p class="mt-n3">{{RevenuePerShareTTM}}</p>
          <p class="text-headers">Gross Profit</p>
          <p class="mt-n3">{{GrossProfitTTM}}</p>
          <p class="text-headers">Diluted EPS</p>
          <p class="mt-n3">{{DilutedEPSTTM}}</p>
          <p class="text-headers">Price To Sales Ratio</p>
          <p class="mt-n3">{{PriceToSalesRatioTTM}}</p>
      </div>
      <div class="mx-auto pa-2">
        <h2>Dividend Information</h2>
          <p class="text-headers">Dividend Per Share</p>
          <p class="mt-n3">{{DividendPerShare}}</p>
          <p class="text-headers">Dividend Yield</p>
          <p class="mt-n3">{{DividendYield}}</p>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "TechA",
  props: [
    "Exchange",
    "Currency",
    "LatestQuarter",
    "MarketCapitalization",
    "EBITDA",
    "PERatio",
    "BookValue",
    "DividendPerShare",
    "DividendYield",
    "EPS",
    "RevenuePerShareTTM",
    "ProfitMargin",
    "OperatingMarginTTM",
    "ReturnOnAssetsTTM",
    "ReturnOnEquityTTM",
    "RevenueTTM",
    "GrossProfitTTM",
    "DilutedEPSTTM",
    "QuarterlyEarningsGrowthYOY",
    "QuarterlyRevenueGrowthYOY",
    "AnalystTargetPrice",
    "PriceToSalesRatioTTM",
    "PriceToBookRatio",
    "ftWeekHigh",
    "ftWeekLow",
    "fDayMovingAverage",
    "thDayMovingAverage",
    "SharesOutstanding",
    "DividendDate",
    "ExDividendDate"
    ]
}



</script>

<style scoped>
.component-container{
  display: flex;
  flex-direction: row;
  justify-self: center;
  align-self: center;
  justify-content:space-around;
  align-content:center;
  width: 1200px;
  min-height: 200px;
  background-color: #0d1017;
}

.text-headers{
  color: darkgrey;
}

.key-info-container {
  display: flex;
  flex-direction: row;
}

.row-container{
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
}

.col-container{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
}

.container{
  text-align: center;
}

</style>