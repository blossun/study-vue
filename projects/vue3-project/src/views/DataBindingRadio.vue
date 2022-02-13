<template>
  <div>
    <label><input type="radio" v-bind:value="radioValue1" v-model="picked">{{radioValue1}}</label>
    <label><input type="radio" v-bind:value="radioValue2" v-model="picked">{{radioValue2}}</label>
    <label><input type="radio" v-bind:value="radioValue3" v-model="picked">{{radioValue3}}</label>
    <br>
    <span>선택 : {{picked}}</span>
  </div>
</template>

<script>
export default {
    name: '',
    components: {},
    data() {
        return {
            picked: '',
            radioValue1: '고수',
            radioValue2: '현빈',
            radioValue3: '원빈',
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
