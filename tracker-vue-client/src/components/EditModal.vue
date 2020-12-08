<!-- this is a child component of the parent App.vue -->

<template>
    <div>

    <!-- POP UP FORM: for updating table row data -->
    <b-modal v-model="modalShow" id="update-row-modal" title="Edit Activity Data" v-on:show="populate" v-on:ok="save">
        <!-- Q1. input date for Date -->
        <div class="form-group">
            <label class="form-label" for="edit-date-input">What date did you practice art?</label>

            <input type="date" class="form-control" id="edit-date-input" v-model="updateDate">

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

</div>                      <!-- END of .card-body div -->

</template>


<script>
    import { shortDate, textareaDisplayCharacterLimit, decimalPlaces } from "@/utilities/filters.js";

    export default {
        name: "EditModal",            // name of this component
        // components: {
        //     ActivityRow
        // },
        // do not modify a prop: props data has to be provided by its parent, App.vue
        // to avoid modification of props v-model in the template should not be attached to props
        props: {
            modalShow: Boolean,
            initialRecordInfo: Object,
            types: Array,                 // array of activity types received from App.vue
            media: Object  
        },
        data() {
            return {
                editedRecord: {},
                recordID: -1,
                updateDate: new Date(),
                updateHours: "",
                updateType: "",
                updateMedium: "",
                updateCompleted: false,
                updateNote: ""
           }
        },
        // defined in the src/utilities/filter.js file
        filters: {
            shortDate,
            decimalPlaces,
            textareaDisplayCharacterLimit
        },
        methods: {
          
            // ASK PROF: should this populate steps be in ActivityRow.vue or here?
            // when the edit button is clicked in a table row, the form will reflect/populate
            // the fields with the specific table row data
            populate(record) {
                // set data that the modal will display
                // avoid v-model directly to the data that is being changed, or you'll have to think how
                // to get the original data back if the user changes the data but then changes their mind
                // and wants to cancel the edit.

                this.recordID = record.id;

                // convert the Date object to an ISO date, e.g., 2020-01-21T00:00:00.000Z
                let isoDate = new Date(this.initialRecordInfo.date).toISOString();

                // take only the date part that will be represented in MM/DD/YYYY format in the input date field
                this.updateDate = isoDate.substring(0, 10);

                this.updateHours = this.initialRecordInfo.hours;
                this.updateType = this.initialRecordInfo.type;
                this.updateMedium = this.initialRecordInfo.medium;
                this.updateCompleted = this.initialRecordInfo.completed;
                this.updateNote = this.initialRecordInfo.note;
            },
            // save the updated record to the table to the same record id
            save() {

                // todo validate 
                // save the data that the modal is showing
                this.editedRecord.id = this.initialRecordInfo.id;
                this.editedRecord.date = this.updateDate;
                this.editedRecord.hours = this.updateHours;
                this.editedRecord.type = this.updateType;
                this.editedRecord.medium = this.updateMedium;
                this.editedRecord.completed = this.updateCompleted;
                this.editedRecord.note = this.updateNote;

                // emits a message to the parent App.vue
                this.$emit("save-edited-one-record-from-table", this.editedRecord);
            }
        }
    }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #records { max-height: 250px; overflow: scroll; }
    .editing-checkbox { margin: 20px; }
    th { text-align: center; color: white; }

    /* the below styling is copied from ActivityRow.vue */
    tr.sketchingRow { background-color: AliceBlue; }
    tr.drawingRow { background-color: LemonChiffon; }
    tr.paintingRow { background-color: MistyRose; }
    img { height: 25px; }
    img.center
    {
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
    .left { float: left; }
    .right { float: right; }
    .btn:hover { background-color: black; }
</style>