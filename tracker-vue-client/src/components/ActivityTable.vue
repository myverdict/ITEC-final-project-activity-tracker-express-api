<!-- this is a child component of the parent App.vue -->

<template>
    <div>
        <!-- v-bind types & media is binding a prop from EditModal.vue to a prop in ActivityTable.vue -->
        <edit-modal 
                    ref="editRecordModal"
                    v-bind:initialRecordInfo="recordToEdit"
                    v-bind:types="types"
                    v-bind:media="media"
                  
                    v-on:save-edited-one-record-from-modal="recordEditSaved">
        </edit-modal>


        <!-- List of Activity Records TABLE section -->
        <div class="card">
            <h2 class="card-header text-white bg-dark">Activity Records</h2>


            <!-- checkbox for 'Edit table' option -->
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

                        <tbody>
                            <!-- used v-for to create one table row for each activity record -->
                            <!-- v-bind:class creates class identifiers (not dynamic, it is hard coded) for css styling -->
                            <activity-row v-for="record in activityRecords"
                                          v-bind:key="record.id"
                                          v-bind:record="record"
                                          v-bind:edit="editTable"
                                          v-on:delete-record-row="deleteRecord"
                                          v-on:request-edit-record="requestEditRecord">
                            </activity-row>
                        </tbody>
                    </table>            <!-- END of table -->
                </div>                  <!-- END of #records div -->
            </div>                      <!-- END of .card-body div -->
        </div>                          <!-- END of List of Activity Records TABLE section -->
    </div>
</template>


<script>
    import ActivityRow from "@/components/ActivityRow.vue";
    import EditModal from "@/components/EditModal";
    import { shortDate, textareaDisplayCharacterLimit, decimalPlaces } from "@/utilities/filters.js";

    export default {
        name: "ActivityTable",            // name of this component
        // child components
        components: {
            ActivityRow,
            EditModal
        },
        // do not modify a prop: props data has to be provided by its parent, App.vue
        // to avoid modification of props v-model in the template should not be attached to props
        props: {
            activityRecords: Array,       // array of record objects received from App.vue
            types: Array,                 // array of activity types received from App.vue
            media: Object                 // object of medium of instruction received form App.vue
        },
        data() {
            return {
                editTable: false,         // initial setting of the 'Edit table?' checkbox
                recordToEdit: {},         // initial empty variable for record to be edited
                showEditModal: false
            }
        },
        // defined in the src/utilities/filter.js file
        filters: {
            shortDate,
            decimalPlaces,
            textareaDisplayCharacterLimit
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
            // when the delete button is clicked in a table row
            deleteRecord(record) {
                // emits a message to the parent App.vue
                this.$emit("delete-record-table", record);
            },

            // when the edit button is clicked in a table row, the form will reflect/populate
            // the fields with the specific table row data
            requestEditRecord(record) {
                // set data that the modal will display
                // avoid v-model directly to the data that is being changed, or you'll have to think how
                // to get the original data back if the user changes the data but then changes their mind
                // and wants to cancel the edit.
                this.recordToEdit = record;
                // this.showEditModal = true;
                this.$refs.editRecordModal.show();
                // this.showEditModal = !this.showEditModal;
            },

            // save the updated record to the table to the same record id
            recordEditSaved(record) {
                // emits a message to the parent App.vue
                this.$emit("save-edited-one-record-from-table", record);
            }
        }
    }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #records { max-height: 250px; overflow: scroll; }
    .editing-checkbox { margin: 20px; }
    th { text-align: center; color: white; }
</style>