<template>
  <div>
      <p>{{ fetchedItem.title }}</p>
      <div>{{ fetchedItem.content }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['fetchedItem'])
  },
  created() {
    const id = this.$route.params.id;
    this.$store.dispatch('FETCH_ITEM', id);
  }

}
</script>

<style>

</style>
