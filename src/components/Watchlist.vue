<template>

<div class="watchlist-container mx-auto mt-10 mb-n10">
    <div class="flex-container mx-auto mb-10"> 
        <div class="symbol-container pt-1">
            <p class="my-auto">{{symbol}}</p> <!-- used for the stock symbol e.g AAPL -->
        </div>
        <div class="spark-container">
            <v-sparkline 
            :value="data"
            :gradient="gradient"
            :fill= "fill"
            :smooth="radius || false"
            ></v-sparkline> <!-- used for data for past 24 hrs -->
        </div>
        <div class="info-container pa-auto pb-1">
            <p class= "my-auto mx-auto">{{percent}}%</p> <!--used to denote percent change over last 24 hrs-->
            <p class= "my-auto mx-auto">${{price}}</p> <!--used to denote most recent price per share-->
        </div>
    </div>
</div>


</template>

<script>
export default {
    data () {
        return {
            gradient: ['rgba(2, 136,209, 0.95)', 'rgba(2, 136,209, 0.65)', 'rgba(2, 136,209, 0.25)'],
            fill: true,
            radius: 10,
            //value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]
        }
    },
    props: ['data', 'symbol', 'price', 'percent']
}
</script>

<style scoped>
.watchlist-container {
    display: flex;
    /* flex-direction: column;
    justify-content: center;
    align-content: center; */
    border-radius: 10px;
    
}
.flex-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    width: 250px;
    line-height: 0.9;
    color: white;
    background-color: #0d1017;
    border-width: 5px;
    border-color: #0d1017;
    border-radius: 10px;
    border-style: solid;
}
.spark-container {
    background-color: #0d1017;
}
.info-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    background-color: #0d1017;
    color: white;
    line-height: 1.3;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
}
.symbol-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    background-color: #0d1017;
    color: white;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}
</style>