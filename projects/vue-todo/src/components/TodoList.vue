<template>
  <div>
      <ul>
          <li v-for="(todoItem, index) in todoItems" v-bind:key="todoItem.item" class="shadow">
              <i class="checkBtn fas fa-check" v-bind:class="{checkBtnCompleted: todoItem.completed}" 
                    v-on:click="toggleComplete(todoItem, index)"></i>
              <span v-bind:class="{textCompleted: todoItem.completed}">{{ todoItem.item }}</span>
              <span class="removeBtn" v-on:click="removeTodo(todoItem, index)">
                  <i class="fas fa-trash-alt"></i>
              </span>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
    data: function() {
        return {
            todoItems: []
        }
    },
    methods: {
        removeTodo: function(todoItem, index) {
            console.log('remove items');
            console.log(todoItem, index);
            localStorage.removeItem(todoItem); //로컬스토리지에서 삭제
            this.todoItems.splice(index, 1); //화면에서 삭제. 해당 index에서부터 1개 item 삭제
        },
        toggleComplete: function(todoItem) {
            todoItem.completed = !todoItem.completed;
            //로컬스토리지의 데이터를 갱신
            localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
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
    }
}
</script>

<style scoped>
ul {
    list-style-type: none; /* 점 없앰 */
    padding-left: 0px;
    margin-top: 0;
    text-align: left;
}
li {
    display: flex;
    min-height: 50px;
    height: 50px;
    line-height: 50px;
    margin: 0.5rem 0;
    padding: 0 0.9rem;
    background: white;
    border-radius: 5px;
}
.checkBtn {
    line-height: 45px;
    color: #62acde;
    margin-right: 5px;
}
.checkBtnCompleted {
    color: #b3adad;
}
.textCompleted {
    text-decoration: line-through;
    color: #b3adad;
}
.removeBtn {
    margin-left: auto;
    color: #de4343;
}
</style>