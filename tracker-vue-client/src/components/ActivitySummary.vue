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

                <!-- Challenge question! Display a list of the total hours for each type. -->
                <p v-if="activityRecords.length != 0">
                    <div class="card-header text-white bg-secondary">
                          Practice hours for each activity:
                    </div>

                    <ul class="list-group list-group-flush">
                        <li class="list-group-item" v-for="eachActivityHours in totalHoursForEachActivityRecord">
                            {{ eachActivityHours.typeOfActivity }} :
                            {{ eachActivityHours.numOfHours | decimalPlaces(2) | hoursWordPlurality }}
                        </li>
                    </ul>
                </p>

                <br><hr>

                <h4 class="card-subtitle text-muted">Activity Growth Charts</h4><br>
                <div class="chartSize">
                    <activity-chart v-bind:chartData="chartData"></activity-chart>
                </div>
          </div>
      </div>          <!-- END of the activity summary section -->
    </div>
</template>


<script>
    import ActivityChart from "@/components/ActivityChart.vue";
    import { decimalPlaces } from "@/utilities/filters.js";

    export default {
        name: "ActivitySummary",            // name of this component
        components: {
            ActivityChart                   // name of child component
        },
        // do not modify a prop: props data has to be provided by its parent, App.vue
        // to avoid modification of props v-model in the template should not be attached to props
        props: {
            activityRecords: Array,
            types: Array
        },
        data() {
            return {
                // ASK PROF: What to write here?

            }
        },
        filters: {
            decimalPlaces,
          // ASK PROF: how to use the computed property in line 12 and 24
          // set the plurality of the word 'hour(s)' in the summary section of the application
          hoursWordPlurality(numOfHours) {
              if(numOfHours == 1)
              {
                  return `1.00 hour`;
              }
              else
              {
                  return `${numOfHours} hours`;
              }
          },
        },
        computed: {
            // calculate total hours in the summary section of the application
            totalHours() {
                let total = 0;
                this.activityRecords.forEach( record => {
                    total = total + record.hours;                   // alternate: total += record.hours;
                })
                return total;
            },                                                      // END of totalHours inside computed
            totalHoursForEachActivityRecord() {
                let arrayOfObjects = [];                            // empty array for objects
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
            chartData() {
                let colors = ["orchid", "teal", "yellowgreen", ];
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
                    labels: activityTypeNames,                    // this is the array value
                    datasets: [{
                        label:"Practice hours for Activities",
                        data: activityNumHours,                   // this is an array value
                        backgroundColor: colors                   // this is an array value
                    }]
                }
            }                                       // END of chartData inside computed
        }                                           // END of computed
    }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .chartSize
    {
        height: 300px;
        width: 300px;
    }
</style>