<template>
    <div id="app">
        <!-- display the name of the activity -->
        <!-- Application header/title: activity variable is the activity data from the Vue script below -->
        <h1 class="text-center">{{ activity }} Time Tracker</h1>


        <new-activity-form v-on:record-added="newRecordAdded"
                           v-bind:activity="activity"
                           v-bind:types="types"
                           v-bind:media="media">
        </new-activity-form>


        <activity-table v-bind:activityRecords="activityRecords"
                        v-on:delete-record-table="deleteRecord"
                        v-on:update-record-table="updateRecords">
        </activity-table>


        <activity-summary v-bind:activityRecords="activityRecords"
                          v-bind:types="types">
        </activity-summary>
    </div>
</template>


<script>
    import NewActivityForm from "@/components/NewActivityForm.vue";
    import ActivityTable from "@/components/ActivityTable.vue";
    import ActivitySummary from "@/components/ActivitySummary.vue";

    export default {
        name: 'App',
        components: {
            NewActivityForm,
            ActivityTable,
            ActivitySummary
        },
        data() {
            return {
                // Array of activity records displayed in the activity table summary
                activityRecords: [],

                // Name of the activity, e.g., sport, exercise, language, etc.
                // used in App.vue and in the NewActivityForm.vue
                activity: "Practice Art",

                // used to create choices (drop-down list): the option elements for select for question 3
                // used in the NewActivityForm.vue and in ActivitySummary.vue as props
                types: [ "Sketching", "Drawing", "Painting" ],

                // used to set the values and the labels for the radio buttons for question 4
                // used in NewActivityForm.vue as props
                media: {
                    traditional: "Traditional",
                    digital: "Digital"
                }
            }
        },
        methods: {
            // this method adds an activity record to the database and updates the api
            newRecordAdded(record) {
                // the $ variable is taken from main.js & the add method is taken from the ActivityService.vue
                this.$activity_record_api.addActivityRecord(record)
                    .then( record => {
                        this.updateRecords();
                    })
                    .catch( err => {
                        let msg = err.response.data.join(', ');

                        alert('Error adding activity record.\n' + msg);
                    })
            },                        // END of newRecordAdded method

            /*
            // newRecordAdded method when api not present (without express api)
            newRecordAdded(record) {
                // Push the record on to the activityRecords array
                this.activityRecords.push(record);

                // sort the records according to date
                this.activityRecords.sort(function (r1, r2) {
                    // returns negative value to order r1 before r2
                    // returns positive value to order r1 after r2
                    // return r1.date.getTime() - r2.date.getTime();        // earliest records at the beginning of the list
                    return r2.date.getTime() - r1.date.getTime();           // recent records at the beginning of the list
                })
            },
            */

            // this method deletes one record from the database & updates the api
            deleteRecord(record) {
                // the $ variable is taken from main.js & the delete method is taken from the ActivityService.vue
                this.$activity_record_api.deleteActivityRecord(record.id)
                    .then( () => {
                        this.updateRecords();
                    })
            },                        // END of deleteRecord method

            /*
            // deleteRecord method when api not present (without express api)
            deleteRecord(record) {
                // filter returns a new array of all records for which the function returns true
                this.activityRecords = this.activityRecords.filter( function (rec) {
                    if (rec != record)
                    {
                        return true;
                    }
                })
            },
            */

            // this method updates all activity records
            updateRecords() {
                // the $ variable is taken from main.js & the get method is taken from the ActivityService.vue
                this.$activity_record_api.getAllActivityRecords()
                    .then( (records) => {
                        this.activityRecords = records;
                    })
            },                          // END of updateRecords method
        }                               // END of methods
    }                                   // END of export default
</script>


<style>

</style>
