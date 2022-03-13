<template>
  <div>
    <h2>{{state.username}}</h2>
  </div>
</template>

<script>
import {reactive} from "vue";

export default {
  name: 'CompositionAPI1',
  setup() {
    // const username = 'solar';
    const state = reactive({
      username: 'solar',
      age: 30,
    })

    return {
      state,
    };
  }
}
</script>

<style>

</style>
