<!-- this is a child component of the parent App.vue -->

<template>
    <div>
        <!-- Activity Summary section -->
        <div class="card">
            <h2 class="card-header text-white bg-dark">Summary</h2>

            <div class="card-body">
                <p>
                    You have practiced a total of
                    <!-- a computed property 'totalHours' to calculate the total hours practiced -->
                    <!-- used with a filter to restrict to 2 decimal places -->
                    {{ totalHours | decimalPlaces(2) | hoursWordPlurality }}.
                </p>

                <!--
                    if there are any records, then display list of total hours for each
                    activity type & display the bar, doughnut, and pie charts.
                -->
                <div v-if="activityRecords.length != 0">
                    <div class="card-header text-white bg-secondary">
                          Practice hours for each activity:
                    </div>

                    <ul class="list-group list-group-flush">
                        <li class="list-group-item" v-for="eachActivityHours in totalHoursForEachActivityRecord">
                            {{ eachActivityHours.typeOfActivity }} :
                            {{ eachActivityHours.numOfHours | decimalPlaces(2) | hoursWordPlurality }}
                        </li>
                    </ul>

                    <br><hr>

                    <!-- Bar chart for activity type hours -->
                    <h4 class="card-subtitle text-muted">Activity Growth Charts</h4><br>
                    <div class="chartSize">
                        <chart-bar v-bind:chartData="chartDataForHours"></chart-bar>
                    </div>

                    <!-- Doughnut chart for medium of instruction, traditional/digital -->
                    <div class="chartSize">
                        <chart-doughnut v-bind:chartData="chartDataForMedia"></chart-doughnut>
                    </div>

                    <!-- Pie chart for activity status, completed/pending -->
                    <div class="chartSize">
                        <chart-pie v-bind:chartData="charDataForStatus"></chart-pie>
                    </div>
                </div>
          </div>
      </div>          <!-- END of the activity summary section -->
    </div>            <!-- END of template div -->
</template>


<script>
    import ChartBar from "@/components/ChartBar.vue";
    import ChartDoughnut from "@/components/ChartDoughnut";
    import ChartPie from "@/components/ChartPie";

    import { decimalPlaces, hoursWordPlurality } from "@/utilities/filters.js";

    export default {
        name: "ActivitySummary",            // name of this component
        // name of child components
        components: {
            ChartBar,
            ChartDoughnut,
            ChartPie
        },
        // do not modify a prop: props data is provided by its parent, App.vue
        // to avoid modification of props, v-model in template should not be attached to props
        props: {
            activityRecords: Array,
            types: Array,
            media: Object
        },
        // defined in the src/utilities/filter.js file
        filters: {
            decimalPlaces,
            hoursWordPlurality
        },
        computed: {
            // calculate total hours to be used in the summary section of the application
            totalHours() {
                let total = 0;

                this.activityRecords.forEach( record => {
                    // alternate: total += record.hours;
                    total = total + record.hours;
                })

                return total;
            },                                                  // END of totalHours inside computed

            // calculate the total hours for each activity
            totalHoursForEachActivityRecord() {
                let arrayOfObjects = [];                        // empty array for objects

                // empty object for each type and hours for the type ("object literal" syntax)
                let objectInArray = {};

                this.activityRecords.forEach( record => {
                    this.types.forEach( activityType => {
                        // if the record entered is equal to one of the activity types
                        if (record.type === activityType)
                        {
                            // if there are no items/objects in the arrayOfObjects
                            if (arrayOfObjects.length === 0)
                            {
                                // create a new object
                                objectInArray = {
                                    typeOfActivity: record.type,
                                    numOfHours: record.hours
                                }

                                // push the object on to the arrayOfObjects
                                arrayOfObjects.push(objectInArray);
                            }
                            // else if there are items/objects in the arrayOfObjects,
                            // i.e., arrayOfObjects.length != 0
                            else
                            {
                                let found = false;      // initial boolean to record not found

                                // loop through the array to find if the item/object already exists
                                for (let i = 0; i < arrayOfObjects.length; i++)
                                {
                                    // if the record exists in the arrayOfObjects
                                    if (record.type === arrayOfObjects[i].typeOfActivity)
                                    {
                                        // then just update the number of hours for that item/object
                                        arrayOfObjects[i].numOfHours += record.hours;
                                        found = true;           // record is found
                                    }
                                }

                                // if the record is not found in the arrayOfObjects
                                if (!found)
                                {
                                    // create a new object
                                    objectInArray = {
                                        typeOfActivity: record.type,
                                        numOfHours: record.hours
                                    }

                                    // push the object on to the arrayOfObjects
                                    arrayOfObjects.push(objectInArray);
                                }
                            }
                        }
                    })              // END of types array forEach
                })                  // END of activityRecords array forEach

                return arrayOfObjects;
            },                                      // END of the totalHoursForEachActivityRecord inside computed

            // chart data for Bar charts
            chartDataForHours() {
                let colors = [ "orchid", "teal", "yellowgreen" ];
                let activityArray = this.totalHoursForEachActivityRecord;

                // create 2 empty arrays for the activity type and activity hours
                let activityTypeNames = [];
                let activityNumHours = [];

                // add each activity type name and each activity total hours to its respective arrays
                activityArray.forEach(function (eachActivity) {
                    activityTypeNames.push(eachActivity.typeOfActivity);
                    activityNumHours.push(eachActivity.numOfHours);
                })

                // return data in format expected by chartJS
                return {
                    labels: activityTypeNames,          // this is an array value
                    datasets: [{
                        label:"Hours practiced",        // this is the label that will show in tooltip on hover
                        data: activityNumHours,         // this is an array value
                        backgroundColor: colors         // this is an array value
                    }]
                }
            },                                      // END of chartData inside computed (Bar chart)

            // chart data for Doughnut chart
            chartDataForMedia() {
                let colors = [ "#DAF7A6", "#FFC300" ];

                let activityMediaCount = [];        // [ traditionalCount, digitalCount ]
                let traditionalCount = 0;
                let digitalCount = 0;

                // add number of times media type appears to each medium
                this.activityRecords.forEach(function (eachActivity) {
                    // TODO ASK Prof: Why is this if clause not working?
                    // if(eachActivity.medium === this.media.traditional)
                    if(eachActivity.medium == "Traditional")
                    {
                        traditionalCount += 1;
                    }
                    else
                    {
                        digitalCount += 1;
                    }
                })

                // Push the counts onto the activityMediaCount array
                activityMediaCount.push(traditionalCount);
                activityMediaCount.push(digitalCount);

                // return data in format expected by chartJS
                return {
                    // alternate way of writing labels as below
                    // labels: ["Traditional", "Digital"],      // this is an array value
                    labels: [ this.media.traditional, this.media.digital ],   // this is an array value
                    datasets: [{
                        data: activityMediaCount,                 // this is an array value
                        backgroundColor: colors                   // this is an array value
                    }]
                }
            },                                      // END of chartDataForMedia in computed (Doughnut chart)

            // chart data for Pie chart
            charDataForStatus() {
                let colors = [ "#DAF7A6", "#FFC300" ];

                let statusCount = [];               // [ completedCount, pendingCount ]
                let completedCount = 0;
                let pendingCount = 0;

                // add the number of activities completed/pending
                this.activityRecords.forEach( function (eachActivity) {
                    if(eachActivity.completed)
                    {
                        completedCount += 1;
                    }
                    else
                    {
                        pendingCount += 1;
                    }
                })

                // push the completed and pending count on to the status array
                statusCount.push(completedCount);
                statusCount.push(pendingCount);

                // return data in format expected by chartJS
                return {
                    labels: [ "Completed", "Pending" ],     // this is an array value
                    datasets: [{
                        data: statusCount,                  // this is an array value
                        backgroundColor: colors             // this is an array value
                    }]
                }
            }                                       // END of chartDataForStatus in computed (Pie chart)
        }                                           // END of computed
    }                                               // END of export default
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .chartSize
    {
        height: 300px;
        width: 300px;
        display: inline-block;      /* Allow graphs to be placed side by side */
    }
</style>