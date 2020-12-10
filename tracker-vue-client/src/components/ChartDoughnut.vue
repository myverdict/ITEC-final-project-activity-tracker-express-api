<!-- this is a child component of the ActivitySummary.vue component -->
<!-- no template required, because chartJS is going to create the template for us automatically -->


<script>
    import { Doughnut, mixins } from 'vue-chartjs';

    let { reactiveProp } = mixins;

    export default {
        extends: Doughnut,            // type of chart

        name: "ChartDoughnut",        // name of this component

        mixins: [ reactiveProp ],

        data() {
            return {
                chartOptions: {
                    title: {
                        display:true,
                        text: "Medium of Instruction"     // graph title
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