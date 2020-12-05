<!-- this is a child component of its parent ActivityTable.vue -->

<template>
    <tbody>
        <!-- used v-for to create one table row for each activity record -->
        <!-- v-bind:class creates class identifiers (not dynamic, it is hard coded) for css styling -->
        <tr v-bind:class="{ sketchingRow: record.type === 'Sketching',
                            drawingRow: record.type === 'Drawing',
                            paintingRow: record.type === 'Painting' }">
            <td>{{ record.date | shortDate }}</td>

            <td>{{ record.hours | decimalPlaces(2) }}</td>

            <td>{{ record.type }}</td>

            <td>{{ record.medium }}</td>

            <td><img v-if="record.completed" src="../assets/check.png" class="center"
                     alt="completed" title="completed"></td>

            <td>{{ record.note | textareaDisplayCharacterLimit }}</td>

            <td v-show="edit">
                <b-button v-b-modal.update-row-modal class="btn btn-light left" v-on:click="updateRecord">
                    <img src="@/assets/pencil.png" title="Update/Edit">
                </b-button>

                <b-button class="btn btn-light right" v-on:click="deleteRecord">
                    <img src="@/assets/delete.png" title="Delete">
                </b-button>

                <!-- <img src="@/assets/pencil.png" title="Update/Edit" v-on:click="updateRecord" class="left"> -->
                <!-- <img src="@/assets/delete.png" title="Delete" v-on:click="deleteRecord" class="right"> -->
            </td>
        </tr>
    </tbody>
</template>


<script>
    import { shortDate, textareaDisplayCharacterLimit, decimalPlaces } from "@/utilities/filters.js";

    export default {
        name: "ActivityRow",                  // name of this component
        // do not modify a prop: props data has to be provided by its parent, ActivityTable.vue
        // to avoid modification of props v-model in the template should not be attached to props
        props: {
            record: Object,
            edit: Boolean
        },
        // defined in the src/utilities/filter.js file
        filters: {
            shortDate,
            decimalPlaces,
            textareaDisplayCharacterLimit
        },
        methods: {
            deleteRecord(record) {
                if (confirm(`Delete ${this.record.type} activity, with ${this.record.hours} hours, dated ${this.$options.filters.shortDate(this.record.date)}?`))
                {
                    // emits a message to the parent ActivityTable.vue
                    this.$emit("delete-record-row", this.record);
                }
            },
            updateRecord(record) {
                // emits a message to the parent ActivityTable.vue
                // ASK PROF: does this need to me this.record like line 56
                this.$emit("update-record-row", record.id)
            }
        }
    }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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