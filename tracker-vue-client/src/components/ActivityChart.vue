<!-- this is a child component of the ActivitySummary.vue component -->
<!-- no template required, because chartJS is going to create the template for us automatically -->

<script>
    import { Line, mixins } from 'vue-chartjs';

    let { reactiveProp } = mixins;

    export default {
        extends: Line,                  // type of chart

        name: "ActivityChart",          // name of this component

        mixins: [ reactiveProp ],

        data() {
            return {
                chartOptions: {
                    scales: {
                        xAxes: [{
                            type: 'time',
                            distribution: 'linear'      // space out in time
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