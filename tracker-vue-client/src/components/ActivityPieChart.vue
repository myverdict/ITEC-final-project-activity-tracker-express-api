<!-- this is a child component of the ActivitySummary.vue component -->
<!-- no template required, because chartJS is going to create the template for us automatically -->


<script>
    import { Pie, mixins } from 'vue-chartjs';

    let { reactiveProp } = mixins;

    export default {
        extends: Pie,                   // type of chart

        name: "ActivityPieChart",       // name of this component

        mixins: [ reactiveProp ],

        data() {
            return {
                chartOptions: {
                    title: {
                        display:true,
                        text: "Completed/Pending"
                    }
                }
            }
        },

        mounted() {
              this.renderChart(this.chartData, this.chartOptions);
        }
    }
</script>

<style scoped>

</style>