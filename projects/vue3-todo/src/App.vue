<template>
  <div class="name">{{ name }} Vue3</div>
  <div>Hi</div>
</template>

<script>
export default {
  setup() {
    const name = 'Solar';

    return {
      name
    };
  }
}
</script>

<style>
.name {
  color: blue;
}
</style>
