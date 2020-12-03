<template>
    <div>
        <!-- Add records section (form) -->
        <div id="add-hours" class="card">
            <!-- 'Add records' title/heading for this section -->
            <h2 class="card-header text-white bg-dark">Add Records</h2>

            <div class="card-body">                 <!-- START of the actual form section -->
                <!-- Display error messages section -->
                <!-- using v-show to show this section if there are validation errors -->
                <div class="alert alert-danger" v-show="errors.length > 0">
                    <!-- show a list of validation errors from form -->
                    <li v-for="error in errors">{{ error }}</li>
                </div>


                <!-- 1. Date input -->
                <div class="form-group">
                    <!-- display name of activity in the label -->
                    <label class="form-label" for="date">
                        What date did you
                        <!-- using a filter to display the activity name in lowercase -->
                        {{ activity | lowercase }}?
                    </label>

                    <!-- using v-model to connect this input element to dateString data -->
                    <input id="date" class="form-control" type="date" v-model="dateString">

                    <small id="date-help" class="form-text text-muted">
                        Date must be today or in the past.
                    </small>
                </div>                              <!-- END of question 1: date input -->


                <!-- 2. Hours input -->
                <div class="form-group">
                    <label class="form-label" for="hours">How many hours did you practice for?</label>

                    <!--
                        * using v-model to connect this input element to hours data
                        * if only v-model="hours", then vue reads it as a string
                        * change to v-model.number, to read the input value as an integer
                        * adding the 'number' modifier will only allow numbers to be entered
                    -->
                    <input id="hours" class="form-control" type="number" min="0" max="24"
                           v-model.number="hours">

                    <small id="hours-help" class="form-text text-muted">
                        Enter a number of hours, more than 0, up to a maximum of 24
                    </small>
                </div>                              <!-- END of question 2: hours input -->


                <!-- 3. Drop down list for the type of activity -->
                <div class="form-group">
                    <label class="form-label" for="activityType">What type?</label>

                    <!-- create a select element & using a v-model to connect to the types -->
                    <!-- v-model will connect the option type selected from the drop-down, to the type data in Vue -->
                    <select class="form-control" id="activityType" v-model="type">
                        <!-- using v-for to create option elements, one for each type -->
                        <!-- create a dynamic set of options that will read data from the types array in Vue data -->
                        <option v-for="type in types">{{ type }}</option>
                    </select>
                </div>                              <!-- END of question 3: type of activity drop-down -->


                <!-- 4. Medium of instruction (radio buttons) -->
                <!-- Label "What media" for radio buttons: Traditional or Digital -->
                <div class="form-label pb-2">
                  What media?
                </div>

                <!-- Option 1: "Traditional" radio button -->
                <div class="form-check-inline">
                    <!--
                        * if each radio button is bound with a unique value,
                          then it will work as a radio button when used with v-model
                        * use v-bind to set a unique value to the radio button
                        * use v-model to connect the radio button to the medium data in Vue for toggling correctly
                    -->
                    <input id="media1" class="form-check-input" type="radio"
                           v-bind:value="media.traditional" v-model="medium">

                    <label class="form-check-label" for="media1">
                        <!-- Display text: object key 'traditional' used with data type 'media' to get the value of the object -->
                        {{ media.traditional }}
                    </label>
                </div>                              <!-- END of radio button option 1 -->

                <!-- Option 2: "Digital" radio button -->
                <div class="form-check-inline">
                    <!--
                        * if each radio button is bound with a unique value,
                          then it will work as a radio button when used with v-model
                        * use v-bind to set a unique value to the radio button
                        * use v-model to connect the radio button to the medium data in Vue for toggling correctly
                    -->
                    <input id="media2" class="form-check-input" type="radio"
                           v-bind:value="media.digital" v-model="medium">

                    <label class="form-check-label" for="media2">
                        <!-- Display text: object key 'digital' used with data type 'media' to get the value of the object -->
                        {{ media.digital }}
                    </label>
                </div>                              <!-- END of radio button option 2 -->
                                                    <!-- END of question 4: media type radio buttons -->

                <!-- 5. Add a "Completed?" checkbox -->
                <div class="form-check pb-3 pt-3">
                    <input class="form-check-input" type="checkbox" v-model="completed">
                    <label class="form-check-label">Completed?</label>
                </div>                              <!-- END of question 5: Complete/incomplete -->


                <!-- 6. Add a textarea for "Notes" -->
                <div class="form-group">
                    <label for="textareaInput">Notes:</label>
                    <textarea id="textareaInput" class="form-control" rows="3" v-model="note"></textarea>
                </div>                              <!-- END of question 6: notes text area -->


                <!-- Submit Button for form: Add a "Add record" button -->
                <div>
                    <button class="btn btn-warning mt-2" type="button" v-on:click="submit">Add record</button>
                </div>                              <!-- END of 'Add record' submit button -->
            </div>                                  <!-- END of the actual form section -->
        </div>                                      <!-- END of the add records section -->

    </div>                                          <!-- END of template div -->
</template>


<script>
    import { lowercase } from "@/utilities/filters.js";

    export default {
        name: "NewActivityForm",              // name of this component
        // do not modify a prop: props data has to be provided by its parent, App.vue
        // to avoid modification of props by a child component, v-model in the template
        // should not be attached to props, this will allow the parent component to
        // control modification of this data
        props: {
            activity: String,
            types: Array,
            media: Object
        },
        // you can v-model data, but not props
        data() {
            return {
                // these will be used with v-model to work with form data
                dateString: "",               // date input from the client-side is always a string
                hours: 1,
                type: "Sketching",            // type initialized to the first item in the drop-down
                medium: "",
                completed: false,
                note: "",

                // store errors in an array discovered during validation
                errors: []
            }
        },                                     // END of data
        // defined in the src/utilities/filter.js file
        filters: {
            lowercase
        },
        methods: {
            // submit method for the "Add record" button in the form section
            submit() {
                // Assumption: at the beginning of the validation, there are no errors
                this.errors = [];

                // convert the dateString to a Date object
                let date = new Date(this.dateString);

                // Validation 1: dates need to be valid, and in the past or today
                if(!this.dateString || this.dateString == "Invalid Date" || date > new Date())
                {
                    this.errors.push("Select a valid date, today or in the past.");
                }

                // Validation 2: Hours should be between 0 and 24
                if(this.hours <= 0 || this.hours > 24)
                {
                    this.errors.push("Number of hours must be greater than 0 and less than 24.");
                }

                // Validation 3: Activity type has to be selected from drop down list
                if(!this.type)
                {
                    this.errors.push("Select an activity type.");
                }

                // Validation 4: Activity medium of instruction must be selected (for radio buttons)
                if(!this.medium)
                {
                    this.errors.push("Select a media.");
                }

                // if there are no errors, add a record to the activityRecords in the parent App.vue
                if(this.errors.length == 0)
                {
                    // create a record
                    let record = {
                        date: date,
                        hours: this.hours,
                        type: this.type,
                        medium: this.medium,
                        completed: this.completed,
                        note: this.note
                    }

                    // emit a message to parent App.vue to add the record to the activityRecords data
                    this.$emit("record-added", record);

                    // reset data values to initial values
                    this.dateString = "";
                    this.hours = 1;
                    this.type = "Sketching";
                    this.medium = "";
                    this.completed = false;
                    this.note = "";
                }
            }                       // END of the submit method
        }                           // END of methods
    }                               // END of export default
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    input:hover, select:hover, textarea:hover
    {
        background-color: aliceblue;
    }
</style>