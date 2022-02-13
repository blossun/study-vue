<template>
  <div>
    <div v-bind:style="styleObject">인라인 스타일 바인딩</div>
    <div v-bind:style="[baseStyle, addStyle]">인라인 스티일 바인딩 - 배열</div>
  </div>
</template>

<script>
export default {
    name: '',
    components: {},
    data() {
        return {
            styleObject: {
              color: 'red',
              fontSize: '13px'
            },
            baseStyle: 'background-color:yellow;width:100%;height:200px;',
            addStyle: 'color:red;font-weight:bold;'
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
