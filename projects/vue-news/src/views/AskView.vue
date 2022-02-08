<template>
  <div>
      <p v-for="item in items" v-bind:key="item.id">
        <a  v-bind:href="item.url">
          <router-link v-bind:to="`/item/${item.id}`">{{ item.title }}
          </router-link>
        </a>
        <small>{{ item.time_ago}} by {{ item.user }}</small>
      </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
      ...mapGetters({
        items: 'fetchedAsk'
      }),
      // #2
      // ...mapState({
      //   fetchedAsk: state => state.ask
      // }),

      //  #1
      //   ask() {
      //     return this.$store.state.ask;
      //   }
    },
    created() {
      this.$store.dispatch('FETCH_ASK');
    }
}
</script>

<style>

</style>
