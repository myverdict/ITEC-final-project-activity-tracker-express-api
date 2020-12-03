<template>
    <div id="app">
        <!-- display the name of the activity -->
        <!-- Application header/title: activity variable is the activity data from the Vue script below -->
        <h1 class="text-center">{{ activity }} Time Tracker</h1>

        <!-- child components used as tag elements -->
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
                          v-bind:types="types"
                          v-bind:media="media">
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
                // Name of the activity, e.g., sport, exercise, language, etc.
                // used in App.vue and in the NewActivityForm.vue as props
                activity: "Practice Art",

                // Array of activity records displayed in the activity table summary
                activityRecords: [],

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
        mounted() {
            this.updateRecords();
        },
        methods: {
            // this method adds an activity record to the database and updates the api
            newRecordAdded(record) {
                console.log(record);
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

            // this method deletes one record from the database & updates the api
            deleteRecord(record) {
                // the $ variable is taken from main.js & the delete method is taken from the ActivityService.vue
                this.$activity_record_api.deleteActivityRecord(record.id)
                    .then( () => {
                        this.updateRecords();
                    })
            },                        // END of deleteRecord method

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
