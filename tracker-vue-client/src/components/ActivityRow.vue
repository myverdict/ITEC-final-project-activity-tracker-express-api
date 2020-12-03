<template>
    <!-- TODO use v-for to create one table row for each activity record -->
    <!-- v-bind:class creates class identifiers (not dynamic, it is hard coded) for css styling -->
    <tr v-bind:class="{sketchingRow: record.type === 'Sketching',
                       drawingRow: record.type === 'Drawing',
                       paintingRow: record.type === 'Painting'}">
        <td>{{ record.date | shortDate }}</td>

        <td>{{ record.hours | decimalPlaces(2) }}</td>

        <td>{{ record.type }}</td>

        <td>{{ record.medium }}</td>

        <td>{{ record.completed | checkedBox }}</td>

        <td>{{ record.note | textareaDisplayCharacterLimit }}</td>

        <td v-show="edit">
            <img src="@/assets/pencil.png" title="Update/Edit" v-on:click="updateRecord">
            <img src="@/assets/delete.png" title="Delete" v-on:click="deleteRecord">
        </td>
    </tr>
</template>


<script>
    import { shortDate, textareaDisplayCharacterLimit, decimalPlaces } from "@/utilities/filters.js";

    export default {
        name: "ActivityRow",             // name of the component
        // do not modify a prop: props data has to be provided by its parent, ActivityTable.vue
        // to avoid modification of props v-model in the template should not be attached to props
        props: {
            record: Object,
            edit: Boolean
        },
        filters: {
            shortDate,
            decimalPlaces,
            textareaDisplayCharacterLimit,
            checkedBox(completed)
            {
                if(completed)
                {
                    return `Completed`;
                }
                return `Not completed`;
            },
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
                this.$emit("update-record-row", record)                 // ASK PROF: does this need to me this.record like line 56
            }
        }
    }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .sketchingRow
    {
        background-color: AliceBlue;
    }

    .drawingRow
    {
        background-color: LemonChiffon;
    }

    .paintingRow
    {
        background-color: MistyRose;
    }

    img
    {
        height: 25px;
    }
</style>