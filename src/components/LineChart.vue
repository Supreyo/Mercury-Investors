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
    this.gradient2 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
    this.gradient3 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
    this.gradient4 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)

    this.gradient.addColorStop(0, 'rgba(2, 136,209, 0.55)')
    this.gradient.addColorStop(0.5, 'rgba(2, 136, 209, 0.35)');
    this.gradient.addColorStop(1, 'rgba(2, 136, 209, 0.05)');

    this.gradient2.addColorStop(0, 'rgba(68, 194, 68, 0.55)')
    this.gradient2.addColorStop(0.5, 'rgba(68, 194, 68, 0.35)');
    this.gradient2.addColorStop(1, 'rgba(68, 194, 68, 0.05)');

    this.gradient3.addColorStop(0, 'rgba(255, 59, 78, 0.55)')
    this.gradient3.addColorStop(0.5, 'rgba(255, 59, 78, 0.35)');
    this.gradient3.addColorStop(1, 'rgba(255, 59, 78, 0.05)');

    this.gradient4.addColorStop(0, 'rgba(140, 140, 140, 0.55)')
    this.gradient4.addColorStop(0.5, 'rgba(140, 140, 140, 0.35)');
    this.gradient4.addColorStop(1, 'rgba(140, 140, 140, 0.05)');

    const dates = this.chartdata.map(d => d.date).reverse();
    const open = this.chartdata.map(d => d.open).reverse();
    const high = this.chartdata.map(d => d.high).reverse();
    const low = this.chartdata.map(d => d.low).reverse();
    const closing = this.chartdata.map(d => d.close).reverse();

    this.renderChart({
        labels: dates,
        datasets: [{
            label: "Stock Open",
            fill: true,
            borderColor: 'rgb(255, 255, 255)',
            //borderColor: 'rgb(146, 204, 235)',
            data: open,
            tension: 0.2,
            cubicInterpolationMode: 'monotone',
            pointStyle: 'circle',
            //pointBackgroundColor: 'gold',
            pointRadius: 3,
            backgroundColor: this.gradient
        },
        {
            label: "Stock High",
            fill: true,
            borderColor: 'rgb(255, 255, 255)',
            //borderColor: 'rgb(146, 204, 235)',
            data: high,
            tension: 0.2,
            cubicInterpolationMode: 'monotone',
            pointStyle: 'circle',
            //pointBackgroundColor: 'gold',
            pointRadius: 3,
            backgroundColor: this.gradient2
        },
        {
            label: "Stock Low",
            fill: true,
            borderColor: 'rgb(255, 255, 255)',
            //borderColor: 'rgb(146, 204, 235)',
            data: low,
            tension: 0.2,
            cubicInterpolationMode: 'monotone',
            pointStyle: 'circle',
            //pointBackgroundColor: 'gold',
            pointRadius: 3,
            backgroundColor: this.gradient3
        },
        {
            label: "Stock Close",
            fill: true,
            borderColor: 'rgb(255, 255, 255)',
            //borderColor: 'rgb(146, 204, 235)',
            data: closing,
            tension: 0.2,
            cubicInterpolationMode: 'monotone',
            pointStyle: 'circle',
            //pointBackgroundColor: 'gold',
            pointRadius: 3,
            backgroundColor: this.gradient4
        }
        ]
    }, this.options)
  },
}
</script>