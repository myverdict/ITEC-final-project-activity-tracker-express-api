<template>
    <div id="app">
        <!-- display name of the activity -->
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
                        v-on:save-edited-one-record-from-table="updateOneItem">
        </activity-table>


        <!-- use v-bind with child props as attributes to send data from App.vue to child -->
        <activity-summary v-bind:activityRecords="activityRecords"
                          v-bind:types="types"
                          v-bind:media="media">
        </activity-summary>


        <!-- Attributes -->
        <footer>
            <div>
                Pencil Icons made by
                <a href="https://www.flaticon.com/authors/dinosoftlabs"
                   title="DinosoftLabs" target="_blank">DinosoftLabs</a>
                from <a href="https://www.flaticon.com/"
                        title="Flaticon"> www.flaticon.com</a>
            </div>

            <div>
                  Remove Icons made by
                  <a href="https://www.flaticon.com/authors/pixel-perfect"
                     title="Pixel perfect" target="_blank">Pixel perfect</a>
                  from <a href="https://www.flaticon.com/"
                          title="Flaticon"> www.flaticon.com</a>
            </div>

            <div>
                Green check mark icon from
                <a href="https://www.iconsdb.com/green-icons/check-mark-3-icon.html" target="_blank">Icons DB</a>
            </div>
        </footer>
    </div>                    <!-- END of template div -->
</template>


<script>
    import NewActivityForm from "@/components/NewActivityForm.vue";
    import ActivityTable from "@/components/ActivityTable.vue";
    import ActivitySummary from "@/components/ActivitySummary.vue";

    export default {
        name: 'App',                // name of this component
        // child components
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
                // used in ActivityTable.vue and ActivitySummary.vue
                activityRecords: [],

                // used to create choices (drop-down list): the option elements for select for question 3
                // used in the NewActivityForm.vue, ActivityTable.vue, ActivitySummary.vue, and EditModal.vue as props
                types: [ "Sketching", "Drawing", "Painting" ],

                // used to set the values and the labels for the radio buttons for question 4
                // used in NewActivityForm.vue, ActivityTable.vue, ActivitySummary.vue, and EditModal.vue as props
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
                // the $activity_record_api variable is taken from main.js &
                // the addActivityRecord method is taken from the ActivityService.vue
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
                // the $activity_record_api variable is from main.js, &
                // the deleteActivityRecord method is from the ActivityService.vue
                this.$activity_record_api.deleteActivityRecord(record.id).then( () => {
                    this.updateAllRecords();
                })
            },                        // END of deleteRecord method

            // item coming from b-modal --> table --> App.vue to replace array with 1 updated table record row
            updateOneItem(record) {
                // the $activity_record_api variable is from main.js &
                // the updateActivityRecord method is from the ActivityService.vue
                this.$activity_record_api.updateActivityRecord(record).then( () => {
                    this.updateAllRecords();
                })
            },                        // END of updateOneItem method

            // this method updates all activity records
            updateAllRecords() {
                // the $activity_record_api variable is from main.js &
                // the getAllActivityRecords method is from the ActivityService.vue
                this.$activity_record_api.getAllActivityRecords().then( (records) => {
                    this.activityRecords = records;
                })
            },                          // END of updateAllRecords method
        }                               // END of methods
    }                                   // END of export default
</script>


<style>
    footer
    {
        font-size: small;
        background-color: lightgrey;
        font-weight: bold;
        margin-top: 25px;
        padding: 10px;
    }
</style>
