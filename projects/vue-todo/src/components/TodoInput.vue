<template>
  <div class="inputBox" shadow>
      <input type="text" v-model="newTodoItem">
      <!-- <button v-on:click="addTodo">add</button> -->
      <span class="addContainer" v-on:click="addTodo">
          <i class="fas fa-plus"></i>
      </span>
  </div>
</template>

<script>
export default {
    data: function() {
        return {
            newTodoItem: ""
        }
    },
    methods: {
        addTodo: function() {
            console.log(this.newTodoItem);
            localStorage.setItem(this.newTodoItem, this.newTodoItem); //로컬스토리지에 저장
            this.clearInput();
        },
        clearInput: function() {
            this.newTodoItem = ''; //입력값 초기화
        }
    }
}
</script>

<style>

</style>