<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <TodoInput v-on:addTodoItem="addOneItem"></TodoInput>
    <TodoList v-bind:propsdata="todoItems" v-on:removeItem="removeOneItem"></TodoList>
    <TodoFooter></TodoFooter>

  </div>
</template>

<script>
import TodoHeader from './components/TodoHeader.vue'
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'
import TodoFooter from './components/TodoFooter.vue'

export default {
  data: function() {
    return {
      todoItems: []
    }
  },
  created: function() {
        console.log('created');
        if (localStorage.length > 0) {
            for (var i = 0; i < localStorage.length; i++) {
                if (localStorage.key(i) !== 'loglevel:webpack-dev-server') {
                    // console.log(typeof localStorage.getItem(localStorage.key(i)));
                    // console.log(JSON.parse(localStorage.getItem(localStorage.key(i)))); //String -> obj
                    this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
                }
                // console.log(localStorage.key(i));
            }
        }
  },
  methods: {
    addOneItem: function(todoItem) {
      var obj = {completed: false, item: todoItem};
      localStorage.setItem(todoItem, JSON.stringify(obj)); //로컬스토리지에 저장 obj -> String
      this.todoItems.push(obj); //로컬스토리지 목록과 할일 목록 동기화
    },
    removeOneItem: function(todoItem, index) {
      localStorage.removeItem(todoItem.item); //로컬스토리지에서 삭제
      this.todoItems.splice(index, 1); //화면에서 삭제. 해당 index에서부터 1개 item 삭제
    }
  },
  components: {
    // 컴포넌트 태그명 : 컴포넌트 내용
    'TodoHeader': TodoHeader,
    'TodoInput': TodoInput,
    'TodoList': TodoList,
    'TodoFooter': TodoFooter
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