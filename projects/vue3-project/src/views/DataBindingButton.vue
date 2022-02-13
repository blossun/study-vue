<template>
  <div>
    <input type="text" v-model="textValue">
    <button type="button" v-bind:disabled="textValue==''">Click</button>
  </div>
</template>

<script>
export default {
    name: '',
    components: {},
    data() {
        return {
            textValue: ''
        };
    },
    setup() {},
    created() {},
    mounted() {},
    unmounted() {},
    methods: {}
}
</script>

<style>

</style>
