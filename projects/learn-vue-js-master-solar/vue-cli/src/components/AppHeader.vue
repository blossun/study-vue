<template>
  <header>
      <h1>{{ propsdata }}</h1>
      <!-- <button v-on:click="실행할 메서드명">send</button> -->
      <button v-on:click="sendEvent">send</button>
  </header>
</template>

<script>
export default {
    props: ['propsdata'],
    methods: {
        sendEvent: function() {
            this.$emit('renew');
        }
    }
}
</script>

<style>

</style>