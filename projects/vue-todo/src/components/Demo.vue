<template>
  <div id="root">
      <p>{{ this.$store.getters.originalPrice }}</p>
      <p>{{ this.$store.getters.doublePrice }}</p>
      <p>{{ this.$store.getters.triplelPrice }}</p>
  </div>
</template>

<script>
export default {
}
</script>

<style>

</style>