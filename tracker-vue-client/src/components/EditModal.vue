<!-- this is a child component of the parent ActivityTable.vue -->

<template>
    <div>
        <!-- POP UP FORM: for updating/editing table row data -->
        <b-modal id="update-row-modal" ref="updateRowModal" title="Edit Activity Data"
                 v-on:show="populate"
                 v-on:ok="save">

            <!-- Display error messages section -->
            <!-- using v-show to show this section if there are validation errors -->
            <div class="alert alert-danger" v-show="errors.length > 0">
                <!-- show a list of validation errors from form -->
                <li v-for="error in errors">{{ error }}</li>
            </div>


            <!-- Q1. input date for Date -->
            <div class="form-group">
                <label class="form-label" for="edit-date-input">What date did you practice art?</label>

                <input type="date" class="form-control" id="edit-date-input"
                       v-model="updateDate">

                <small id="date-help" class="form-text text-muted">
                    Date must be today or in the past.
                </small>
            </div>


            <!-- Q2. input hours -->
            <div class="form-group">
                <label class="form-label" for="edit-hours-input">
                    How many hours did you practice for?
                </label>

                <input class="form-control" id="edit-hours-input" v-model="updateHours">

                <small id="hours-help" class="form-text text-muted">
                    Enter a number of hours, more than 0, up to a maximum of 24
                </small>
            </div>


            <!-- Q3. input drop-down for type of activity -->
            <div class="form-group">
                <label class="form-label" for="edit-type-input">What type?</label>

                <select class="form-control" id="edit-type-input" v-model="updateType">
                    <option v-for="type in types">{{ type }}</option>
                </select>
            </div>

            <!-- Q4. input radio options for medium of instruction -->
            <div class="form-label pb-2">What media?</div>

            <!-- radio option 1 for traditional medium -->
            <div class="form-check-inline">
                <input id="edit-media1-input" class="form-check-input" type="radio"
                       v-bind:value="media.traditional" v-model="updateMedium">

                <label class="form-check-label" for="edit-media1-input">
                    {{ media.traditional }}
                </label>
            </div>

            <!-- radio option 2 for digital medium -->
            <div class="form-check-inline">
                <input id="edit-media2-input" class="form-check-input" type="radio"
                       v-bind:value="media.digital" v-model="updateMedium">

                <label class="form-check-label" for="edit-media2-input">
                    {{ media.digital }}
                </label>
            </div>


            <!-- Q5. input checkbox for completed status -->
            <div class="form-check pb-3 pt-3">
                <input class="form-check-input" type="checkbox" id="edit-status-input"
                       v-model="updateCompleted">

                <label class="form-check-label" for="edit-status-input">Completed?</label>
            </div>


            <!-- Q6. textarea for notes -->
            <div class="form-group">
                <label for="edit-textarea-input">Notes:</label>

                <textarea id="edit-textarea-input" class="form-control" rows="3"
                          v-model="updateNote"></textarea>
            </div>

        </b-modal>
    </div>
</template>


<script>
    export default {
        name: "EditModal",
        props: {
            initialRecordInfo: Object,    // initial record info to be displayed when pop up box opens
            types: Array,                 // array of activity types received from App.vue
            media: Object                 // object of medium of instruction received form App.vue
        },
        data() {
            return {
                editedRecord: {},         // for new updated/edited record object

                // for new updated/edited information for record fields
                recordID: -1,
                updateDate: new Date(),
                updateHours: 1,
                updateType: "Sketching",
                updateMedium: "",
                updateCompleted: false,
                updateNote: "",

                // store errors in an array discovered during validation
                errors: []
            }
        },
        methods: {
            show() {
                this.$refs.updateRowModal.show();
            },
            // when the edit button is clicked in a table row, the form will reflect/populate
            // the fields with the specific table row data
            populate() {
                // set initial data that the modal will display when pop up opens
                // avoid v-model directly to the data that is being changed, or you'll have to think how
                // to get the original data back if the user changes the data but then changes their mind
                // and wants to cancel the edit.

                // if there is data in initialRecordInfo...
                // wait until the next DOM update cycle to read and set the data.
                this.$nextTick( function() {
                    this.recordID = this.initialRecordInfo.id;

                    // convert the Date object to an ISO date, e.g., 2020-01-21T00:00:00.000Z
                    let isoDate = new Date(this.initialRecordInfo.date).toISOString();

                    // take only the date part that will be represented in MM/DD/YYYY format in the input date field
                    this.updateDate = isoDate.substring(0, 10);

                    this.updateHours = this.initialRecordInfo.hours;
                    this.updateType = this.initialRecordInfo.type;
                    this.updateMedium = this.initialRecordInfo.medium;
                    this.updateCompleted = this.initialRecordInfo.completed;
                    this.updateNote = this.initialRecordInfo.note;
                })
            },                        // END of the populate method
            // save the updated record to the table to the same record id
            save() {
                // Validate pop-up form fields
                // Assumption: at the beginning of the validation, there are no errors
                this.errors = [];

                // TODO ASK PROF: Do I need !this.updateDate || this.updateDate === "Invalid Date"
                // Validation 1: dates need to be valid, and in the past or today
                // if(!this.updateDate || this.updateDate === "Invalid Date" || this.updateDate > new Date())
                if(new Date(this.updateDate) > new Date())
                {
                    this.errors.push("Select a valid date, today or in the past.");
                }

                // Validation 2: Hours should be between 0 and 24
                if(this.updateHours <= 0 || this.updateHours > 24)
                {
                    this.errors.push("Number of hours must be greater than 0 and less than 24.");
                }

                // TODO ASK PROF: I believe I don't need validations for type
                // TODO, because one type is always clicked, no option for invalid data there
                // Validation 3: Activity type has to be selected from drop down list
                if(!this.updateType)
                {
                    this.errors.push("Select an activity type.");
                }

                // TODO ASK PROF: I believe I don't need validations for media
                // TODO, because one media is always clicked, no option for invalid data there
                // Validation 4: Activity medium of instruction must be selected (for radio buttons)
                if(!this.updateMedium)
                {
                    this.errors.push("Select a media.");
                }

                // if there are errors in the popup box form fields, i.e, this.errors.length != 0
                if(this.errors.length > 0) {
                    this.$nextTick(function () {
                        // keep showing the popup box until user enters valid data
                        this.show();
                    })
                }
                // if there are no errors, i.e., this.errors.length == 0
                else
                {
                    // save the new updated/edited data that the modal is showing
                    this.editedRecord.id = this.initialRecordInfo.id;
                    this.editedRecord.date = this.updateDate;
                    this.editedRecord.hours = this.updateHours;
                    this.editedRecord.type = this.updateType;
                    this.editedRecord.medium = this.updateMedium;
                    this.editedRecord.completed = this.updateCompleted;
                    this.editedRecord.note = this.updateNote;

                    // emits a message to the parent, ActivityTable.vue
                    // ActivityTable.vue emits a message to its parent, App.vue
                    this.$emit("save-edited-one-record-from-modal", this.editedRecord);
                }
            },              // END of save method
        }                   // END of methods
    }                       // END of export default
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>