<template>
  <div class="container" v-bind:class="{
      'active': isActive, 'text-red': hasError
      }">Class Binding</div>
</template>

<script>
export default {
    name: '',
    components: {},
    data() {
        return {
            isActive: true,
            hasError: false,
        };
    },
    setup() {},
    created() {},
    mounted() {},
    unmounted() {},
    methods: {}
}
</script>

<style scoped>
container {
  width: 100%;
  height: 200px;
}
.active {
  background-color: yellow;
  font-weight: bold;
}
.text-red {
  color: red;
}

</style>
