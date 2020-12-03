<!-- this is a child component of the ActivitySummary.vue component -->
<!-- no template required, because chartJS is going to create the template for us automatically -->

<script>
    import { Bar, mixins } from 'vue-chartjs';

    let { reactiveProp } = mixins;

    export default {
        extends: Bar,                   // type of chart

        name: "ActivityChart",          // name of this component

        mixins: [ reactiveProp ],

        data() {
            return {
                chartOptions: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true           // this is for the scale to begin at 0
                            }
                        }]
                    }
                }
            }
        },

        mounted() {
            this.renderChart(this.chartData, this.chartOptions);
        }
    }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>