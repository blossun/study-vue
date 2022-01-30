<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <TodoInput></TodoInput>
    <TodoList v-bind:propsdata="todoItems" 
              v-on:removeItem="removeOneItem"
              v-on:toggleItem="toggleOneItem"></TodoList>
    <TodoFooter v-on:clearAll="clearAllItems"></TodoFooter>

  </div>
</template>

<script>
import TodoHeader from './components/TodoHeader.vue'
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'
import TodoFooter from './components/TodoFooter.vue'

export default {
  data() {
    return {
      todoItems: []
    }
  },
  methods: {
    removeOneItem(todoItem, index) {
      localStorage.removeItem(todoItem.item); //로컬스토리지에서 삭제
      this.todoItems.splice(index, 1); //화면에서 삭제. 해당 index에서부터 1개 item 삭제
    },
    toggleOneItem(todoItem, index) {
      // todoItem.completed = !todoItem.completed; //안티 패턴
      this.todoItems[index].completed = !this.todoItems[index].completed;

      //로컬스토리지의 데이터를 갱신
      localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
    },
    clearAllItems() {
      localStorage.clear();
      this.todoItems = []; //비워줘야함
    }
  },
  components: {
    // 컴포넌트 태그명 : 컴포넌트 내용
    TodoHeader,
    TodoInput,
    TodoList,
    TodoFooter
  }

}
</script>

<style>
body {
  text-align: center;
  background-color: #F6F6F6;
}
input {
  border-style: groove;
  width: 200px;
}
button {
  border-style: groove;
}
.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
</style>