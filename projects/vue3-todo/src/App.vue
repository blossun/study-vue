<template>
  <div class="name">
    {{ greeting('Hi') }}
    {{ callName('Solar') }}
    {{ greetingName }}
  </div>
</template>

<script>
export default {
  setup() {
    const name = 'Solar';

    const greeting = () => {
      return 'Hello';
    };

    const callName = (name) => {
      return name;
    }

    const greetingName = greeting() + callName(name);

    return {
      name, greeting, callName, greetingName
    };
  }
}
</script>

<style>
.name {
  color: blue;
}
</style>
