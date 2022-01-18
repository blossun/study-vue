<template>
  <form v-on:submit="submitForm">
    <div>
      <!-- label은 지정한 for에 해당하는 id값을 바라보게 된다. 어떤 태그를 위한 label인지를 표시-->
      <label for="username">id: </label>
      <input id="username" type="text" v-model="username">
    </div>
    <div>
      <label for="password">pw: </label>
      <input id="password" type="password" v-model="password">
    </div>
    <button type="submit">login</button>
  </form>
</template>

<script>
export default {
  data: function() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    submitForm: function(event) {
      event.preventDefault(); //event 기본동작인 새로고침 막기
      console.log(this.username, this.password);
    }
  }

}
</script>

<style>

</style>