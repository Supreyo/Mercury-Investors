<template>
  <div class="flex-container">
    <div class="info-container">
      <SharesComp class="mx-auto my-auto pa-5 "></SharesComp>
      <TechA class="mx-auto my-auto pa-5 mt-5"
        :Exchange="Exchange"
        :Currency="Currency"
        :LatestQuarter="LatestQuarter"
        :MarketCapitalization="MarketCapitalization"
        :EBITDA="EBITDA"
        :PERatio="PERatio"
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
        :PriceToSalesRatioTTM="PriceToSalesRatioTTM"
        :PriceToBookRatio="PriceToBookRatio"
        :ftWeekHigh="ftWeekHigh"
        :ftWeekLow="ftWeekLow"
        :fDayMovingAverage="fDayMovingAverage"
        :thDayMovingAverage="thDayMovingAverage"
        :SharesOutstanding="SharesOutstanding"
        :DividendDate="DividendDate"
        :ExDividendDate="ExDividendDate"
      >
      </TechA>
    </div>
    <overview-data class="mx-auto my-auto pa-5" :information="companyInfo" :sector="sector" :industry="industry"></overview-data>
  </div>
</template>

<script>
import SharesComp from "@/components/SharesComp";
import TechA from "@/components/TechA";
import OverviewData from './OverviewData.vue';

export default {
  name: "PageComponents",
  props: [
    'companyInfo', 
    'sector', 
    'industry', 
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
    "ExDividendDate"],
  components: {OverviewData, TechA, SharesComp}
}
</script>

<style scoped>

.flex-container {
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  width:95%;
  height: 95%;
}

.info-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content:center;
  width: 100%;
  min-height: 35vh;
}
</style>