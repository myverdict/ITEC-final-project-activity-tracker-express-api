<template>
    <div id="app">
        <!-- display the name of the activity -->
        <!-- Application header/title: activity variable is the activity data from the Vue script below -->
        <h1 class="text-center">{{ activity }} Time Tracker</h1>

        <!-- child components used as tag elements -->

        <!-- use v-bind with child props as attributes to send data from App.vue to child -->
        <!-- use v-on to listen to events from child components -->
        <new-activity-form v-on:record-added="newRecordAdded"
                           v-bind:activity="activity"
                           v-bind:types="types"
                           v-bind:media="media">
        </new-activity-form>


        <!-- use v-bind with child props as attributes to send data from App.vue to child -->
        <!-- use v-on to listen to events from child components -->
        <activity-table v-bind:activityRecords="activityRecords"
                        v-bind:types="types"
                        v-bind:media="media"
                        v-on:delete-record-table="deleteRecord"
                        v-on:save-edited-one-record-from-modal="updateOneItem">
        </activity-table>


        <!-- use v-bind with child props as attributes to send data from App.vue to child -->
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
            this.updateAllRecords();
        },
        methods: {
            // this method adds an activity record to the database and updates the api
            newRecordAdded(record) {
                console.log(record);
                // the $ variable is taken from main.js & the add method is taken from the ActivityService.vue
                this.$activity_record_api.addActivityRecord(record).then( record => {
                    this.updateAllRecords();
                })
                .catch( err => {
                    let msg = err.response.data.join(', ');
                    alert('Error adding activity record.\n' + msg);
                })
            },                        // END of newRecordAdded method

            // this method deletes one record from the database & updates the api
            deleteRecord(record) {
                // the $activity_record_api variable is taken from main.js, and
                // the deleteActivityRecord method is taken from the ActivityService.vue
                this.$activity_record_api.deleteActivityRecord(record.id).then( () => {
                    this.updateAllRecords();
                })
            },                        // END of deleteRecord method

            // item coming from b-modal to replace array with 1 updated table record row
            updateOneItem(record) {
                this.$activity_record_api.updateActivityRecord(record).then( () => {
                    this.updateAllRecords();
                })
            },

            // this method updates all activity records
            updateAllRecords() {
                // the $ variable is taken from main.js & the get method is taken from the ActivityService.vue
                this.$activity_record_api.getAllActivityRecords().then( (records) => {
                    this.activityRecords = records;
                })
            },                          // END of updateAllRecords method
        }                               // END of methods
    }                                   // END of export default
</script>


<style>

</style>
