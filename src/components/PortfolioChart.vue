<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: {
    label: {
        type: String
    },
    chartdata: {
      type: Array,
    },
    options: {
      type: Object,
      default: null
    }
  },
  mounted () {
    this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
    this.gradient.addColorStop(0, 'rgba(2, 136,209, 0.55)')
    this.gradient.addColorStop(0.5, 'rgba(2, 136, 209, 0.35)');
    this.gradient.addColorStop(1, 'rgba(2, 136, 209, 0.05)');

    const dates = this.chartdata.map(d => d.date);
    const price = this.chartdata.map(d => d.price);
    console.log(dates)
    console.log(price)
    this.renderChart({
        labels: dates,
        datasets: [{
            label: "Portfolio Value",
            fill: true,
            borderColor: 'rgb(255, 255, 255)',
            //borderColor: 'rgb(146, 204, 235)',
            data: price,
            tension: 0.2,
            cubicInterpolationMode: 'monotone',
            pointStyle: 'circle',
            //pointBackgroundColor: 'gold',
            pointRadius: 3,
            backgroundColor: this.gradient
        }
        ]
    }, this.options)
  },
}
</script>