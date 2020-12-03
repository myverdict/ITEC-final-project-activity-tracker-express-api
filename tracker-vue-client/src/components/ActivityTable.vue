<!-- this is a child component of the parent App.vue -->
<template>
    <div>
        <!-- List of Activity Records TABLE section -->
        <div class="card">
            <h2 class="card-header text-white bg-dark">Activity Records</h2>


            <div class="edit-table-toggle form-check editing-checkbox">
                <input id="edit-table" type="checkbox" class="form-check-input" v-model="editTable">
                <label for="edit-table" class="form-check-label">Edit table?</label>
            </div>


            <div class="card-body">
                <h3>
                    <!-- TODO Display number of records -->
                    {{ totalRecords }}                              <!-- with computed property -->
                    <!-- {{ activityRecords.length }} records       without computed property -->
                </h3>

                <div id="records table-responsive">
                    <table class="table table-sm table-bordered table-hover table-light">                           <!-- START of table -->
                        <thead>
                            <tr class="bg-danger">                      <!-- START of table row headers -->
                                <th>Date</th>
                                <th>Hours</th>
                                <th>Type</th>
                                <th>Medium</th>
                                <th>Status</th>
                                <th>Note</th>
                                <th v-show="editTable">Actions</th>
                            </tr>                                       <!-- END of table row headers -->
                        </thead>

                        <!--
                            * v-for to create one table row for each activity record
                            * v-bind props (from ActivityRow.vue, the child component) &
                              pass data from parent (ActivityTable.vue) to child component
                            * v-on to listen to events from the child component, ActivityRow.vue
                            * alternate way of writing the tag element: <ActivityRow></ActivityRow>
                        -->
                        <activity-row v-for="record in activityRecords"
                                      v-bind:key="record.id"
                                      v-bind:record="record"
                                      v-bind:edit="editTable"
                                      v-on:delete-record-row="deleteRecord"
                                      v-on:update-record-row="updateRecord">
                        </activity-row>                         <!-- END of ActivityRow.vue component -->

                    </table>            <!-- END of table -->
                </div>                  <!-- END of #records div -->
            </div>                      <!-- END of .card-body div -->
        </div>                          <!-- END of List of Activity Records TABLE section -->
    </div>
</template>


<script>
    import ActivityRow from "@/components/ActivityRow.vue";

    export default {
        name: "ActivityTable",            // name of this component
        components: {
            ActivityRow
        },
        // do not modify a prop: props data has to be provided by its parent, App.vue
        // to avoid modification of props v-model in the template should not be attached to props
        props: {
            activityRecords: Array
        },
        data() {
            return {
                editTable: false,
            }
        },
        computed: {
            // set the plurality of the word 'record(s)' in the table title section of the application
            totalRecords() {
                if (this.activityRecords.length == 1)
                {
                    return `1 record`;
                }
                else
                {
                  return this.activityRecords.length + " records";
                }
            }
        },
        methods: {
            deleteRecord(record) {
                // emits a message to the parent App.vue
                this.$emit("delete-record-table", record);
            },
            // ASK PROF: should take more arguments for updated data
            updateRecord(record) {


                // emits a message to the parent App.vue
                this.$emit("update-record-table", record)
            }
        }
    }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #records
    {
        max-height: 250px;
        overflow: scroll;
    }
    .editing-checkbox
    {
        margin: 20px;
    }
    th
    {
        text-align: center;
    }
</style>