<template>
  <div id="root">
      <p>{{ this.originalPrice }}</p>
      <p>{{ this.doublePrice }}</p>
      <p>{{ this.triplePrice }}</p>
  </div>
</template>

<script>
export default {
    computed: {
        originalPrice() {
            this.$store.getters.originalPrice
        },
        doublePrice() {
            this.$store.getters.doublePrice
        },
        triplePrice() {
            this.$store.getters.triplelPrice
        }
    }
}
</script>

<style>

</style>