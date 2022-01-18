<template>
  <form action="">
    <div>
      <!-- label은 지정한 for에 해당하는 id값을 바라보게 된다. 어떤 태그를 위한 label인지를 표시-->
      <label for="username">id: </label>
      <input id="username" type="text">
    </div>
    <div>
      <label for="password">pw: </label>
      <input id="password" type="password">
    </div>
    <button>login</button>
  </form>
</template>

<script>
export default {

}
</script>

<style>

</style>