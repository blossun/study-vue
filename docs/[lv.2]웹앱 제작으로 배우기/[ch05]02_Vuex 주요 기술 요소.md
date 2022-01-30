# Vuex 설치 및 등록

> [vuex docs](https://vuex.vuejs.org/guide/)

![image-20220128112004226](assets/[ch05]02_Vuex 주요 기술 요소/image-20220128112004226.png)

설치 후, package.json에 vuex가 dependencies에 추가된 것 확인

![image-20220128112732115](assets/[ch05]02_Vuex 주요 기술 요소/image-20220128112732115.png)



npm install로 등록하면 package.json에 저장이 된다. 그것들이 `node_moduls`에 밑에 라이브러리가 생긴다.

여기에 있는 라이브러리를 가져와서 로딩해서 사용한다.



![image-20220128114540696](assets/[ch05]02_Vuex 주요 기술 요소/image-20220128114540696.png)

vuex를 보통 `store`라고 부른다. 이를 저장하는 관행적인 폴더가 있다.

* `project/src/store/store.js` - 일반적인 vuex의 구조



1. Vuex를 플러그인으로 명시적으로 설치

2. Vuex를 global functionality 추가

   ```js
   import Vue from 'vue'  //core library 2개(vue, vuex)를 다운
   import VUex from 'vuex'
   
   Vue.use(Vuex); //Vue 플러그인을 사용
   
   export const store = new Vuex.Store({
       
   })
   ```

   * **`Vue.use()` : Vue의 플러그인 기능**

     * **뷰를 사용하는 모든 영역(전역)에 특정 기능(global functionality)을 추가하고 싶을 때 사용한다.**

     * 예를 들어, Todo.vue (코드)에서 `this.$store`로 여기에 접근할 수 있게 한다.

3. main.js에 store.js를 등록

   `export`로 scope를 변경해서 다른 파일에서 `import`해서 사용할 수 있도록 한다.

   `export const store`하면 외부에서 `store`변수를 사용할 수 있게 된다.

   다른 파일에서 이 `store`변수에 접근하려면 `import`해야 한다. 

   ```js
   import Vue from 'vue'
   import App from './App.vue'
   import { store } from './store/store' //store 변수를 사용한다고 등록
   
   Vue.config.productionTip = false
   
   new Vue({
     render: h => h(App),
     store, //data에 저장
   }).$mount('#app')
   ```

   

# state와 getters 소개

* mutations은 **state 값을 변경**한다는 점에 초점을 맞추면 된다.
* 비동기 처리는 api 응답을 기다리는 등의 

![image-20220128115346451](assets/[ch05]02_Vuex 주요 기술 요소/image-20220128115346451.png)

![image-20220128115744346](assets/[ch05]02_Vuex 주요 기술 요소/image-20220128115744346.png)



![image-20220128115844442](assets/[ch05]02_Vuex 주요 기술 요소/image-20220128115844442.png)

state를 직접 접근해서 값을 가져오는 방식이 불편하기 때문에 getters를 사용해서 편하게 가져올 수 있다. 

위 예시는 다른점이 없지만, 이후 **헬퍼 함수**를 사용하면 `this.getNumber`로 쉽게 가져올 수 있다.



개발자 도구 Vue에서 Vuex값을 확인할 수 있다.

![image-20220128152655370](assets/[ch05]02_Vuex 주요 기술 요소/image-20220128152655370.png)





## state 속성 적용

앞서 실습에서 하위 컴포넌트에서 공통적으로 사용하는 `todoItems` 데이터를 상위 컴포넌트인 `App`로 빼냈었다. 이를 Store로 옮겨서 사용할 수 있다.



App.vue의 create 메서드를 store(fetch() 메서드)로 옮겨보자

**this.todoItems**는 스코프가 달라서 접근이 안된다. 따라서 빈 배열을 하나 만들어서 localStorage에 있는 내용을 담고, 이를 다시 반환하는 형태로 작성해야 한다.

* **store.js**

```js
import Vue from 'vue' //라이브러리 등록
import Vuex from 'vuex'

Vue.use(Vuex); //Vue 플러그인을 사용

//localStorage 관련 API를 전부 여기로 빼낸다.
const storage = {
    //fetch: function() { //아래 선언 방식과 동일
    fetch() { //속성 메서드
        const arr = []; //새로운 배열
        if (localStorage.length > 0) {
            for (let i = 0; i < localStorage.length; i++) {
                if (localStorage.key(i) !== 'loglevel:webpack-dev-server') {
                    arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
                }
            }
        }
        return arr;
    }
}

export const store = new Vuex.Store({
    state: {
        todoItems: storage.fetch()
    }
})
```



* **TodoList.vue**

propsdata로 전달 받아서 사용하던 데이터를 **store**데이터로 직접 접근해서 사용하도록 변경한다.

```vue
<!-- <li v-for="(todoItem, index) in propsdata" v-bind:key="todoItem.item" class="shadow"> -->
<li v-for="(todoItem, index) in this.$store.state.todoItems" v-bind:key="todoItem.item" class="shadow">
```



![image-20220128154958263](assets/[ch05]02_Vuex 주요 기술 요소/image-20220128154958263.png)



> [소스코드 참고](https://github.com/blossun/study-vue/commit/8ef5484f5bec4f7fe1f31a9e48e640cca4b04173)



# mutations와 commit() 형식 소개

![image-20220130182506169](assets/[ch05]02_Vuex 주요 기술 요소/image-20220130182506169.png)

* 뮤테이션은 첫번째 인자로 state가 넘어간다. 

* mutation에 인자로 여러가지 값을 넘기고 싶다면 key-value 형식으로 객체화 시켜서 넘긴다.
* 인자를 받을 때 "payload" 변수명을 관행적으로 사용한다. (다른 이름을 붙여도 괜찮다.)

![image-20220130183223260](assets/[ch05]02_Vuex 주요 기술 요소/image-20220130183223260.png)



## mutations 적용

App.vue에 있는 메서드를 mutations로 변경



**AS-IS**

TodoInput 컴포넌트에서 새로 추가되는 항목을 인자로 해서 addTodoItem 이벤트를 호출해서 App에 있는 todoItems 데이터에 추가를 했다.

```
TodoInput.vue --- (event : addTodoItem) --→ App.vue
```

**TO-BE**

TodoInput 컴포넌트에서 store.js에 있는 state를 변경하기위한 Mutation인 addOneItem을 호출한다. (이때 마찬가지로 필요한 데이터를 인자로 넘긴다.)

App.vue와의 관계는 끊어지고 TodoInput이 store.js 데이터 값을 변경하게 된다.

```
TodoInput.vue --- (commit : addOneItem) --→ store.vue
```



* TodoInput.vue

```vue
<script>
export default {
    methods: {
        addTodo() {
            if (this.newTodoItem !== '') { //값이 있을 때만 실행
                const text = this.newTodoItem.trim();
                this.$store.commit('addOneItem', text); // mutations를 동작시키기 위해서 commit()실행
                this.clearInput();
            } else {
                this.showModal = !this.showModal;
            }
        }
}
</script>
```

* store.js

```js

export const store = new Vuex.Store({
    state: {
        todoItems: storage.fetch()
    },
    mutations: {
        addOneItem(state, todoItem) {
            const obj = {completed: false, item: todoItem};
            localStorage.setItem(todoItem, JSON.stringify(obj)); //로컬스토리지에 저장 obj -> String
            state.todoItems.push(obj); //mutation에서 state에 접근하는 방법은 첫번쨰 인자로 받은 변수를 이용해서 속성에 접근해야한다.
        },
    }
})
```



[mutation]의 type은 '메서드명'을 의미한다.

![image-20220130185511275](assets/[ch05]02_Vuex 주요 기술 요소/image-20220130185511275.png)



※ 객체 인자 넘기는 방법

```js
//1
const obj = {
  todoItem: todoItem,
  index: index
};
this.$store.commit('removeOneItem', obj);
```

```js
//2 같은 변수명 생략
const obj = {
	todoItem,
	index
};
this.$store.commit('removeOneItem', obj);
```

```js
//3
this.$store.commit('removeOneItem', {todoItem, index});
```





## 왜 mutations로 상태를 변경해야 하는가?





# actions 소개 및 예제



## 왜 actions에 비동기 로직을 선언해야 하는가?



