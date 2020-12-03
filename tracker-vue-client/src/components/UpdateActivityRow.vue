<!-- this is a child component of the ActvityRow.vue -->
<template>
    <div>

    </div>
</template>


<script>
    // ASK PROF: if this is right, if yes, where to place this and how to connect to ActivityRow.vue?
    // https://coreui.io/docs/components/bootstrap/modal/#
    $('#myModal').on('shown.bs.modal', function () {
        $('#myInput').trigger('focus')
    })

    export default {
        name: "UpdateActivityRow",            // name of this component

    }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>