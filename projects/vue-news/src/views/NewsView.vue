<template>
  <div>
      <div v-for="user in users" v-bind:key="user.id">{{ user.title }}</div>
  </div>
</template>

<script>
import { fetchNewsList } from '../api/index.js'

export default {
    data() {
        return {
            users: []
        }
    },
    created() {
        console.log('호출 전: ', this);
        fetchNewsList()
        .then(response => {
            console.log('호출 후: ', this);
            this.users = response.data;
        })
        .catch(function(error) {
            console.log(error);
        });
    },
}
</script>

<style>

</style>