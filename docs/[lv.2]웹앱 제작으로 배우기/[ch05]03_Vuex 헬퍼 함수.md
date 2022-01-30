# 헬퍼 함수 및 ES6 Spread 연산자 소개

![image-20220130213204161](assets/[ch05]03_Vuex 헬퍼 함수/image-20220130213204161.png)

![image-20220130213740264](assets/[ch05]03_Vuex 헬퍼 함수/image-20220130213740264.png)

* 이렇게 로딩하면 컴포넌트의 로직에서 바로 선언해서 사용할 수 있다. 

* 위 예제에서 `mapState(['num'])` 은 store에 state로 선언되어있는 `num`이라는 값을 들고와서 computed()에 매핑한 것이다.
* state, getters는 보통 상태를 접근해서 템플릿에 표현해주는속성이기 때문에 computed() 에 들어간다.
* methods에는 mutations와 actions가 들어간다.



### ES6 Spread 연산자

![image-20220130222739840](assets/[ch05]03_Vuex 헬퍼 함수/image-20220130222739840.png)

> [전개 구문 - spread 연산자](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

> ※ [jsbin - 웹 실습](https://jsbin.com/?js,console,output)



# mapState, mapGetters 소개 및 ES6 Spread 연산자 쓰는 이유

![image-20220130214916583](assets/[ch05]03_Vuex 헬퍼 함수/image-20220130214916583.png)

![image-20220130222254703](assets/[ch05]03_Vuex 헬퍼 함수/image-20220130222254703.png)



* spread 연산자를 쓰는 이유?

  각각의 컴포넌트 고유의 computed 속성을 쓰고, 추가로 state, getters를 쓰고 싶다면 이렇게 spread 연산자인 `...`을 써야한다.



## getters와 mapGetters 적용하기

vue에서 권고하는 가이드 방식으로 코드를 수정해보자

* 템플릿에서 표현하는 값들은 가급적 JS 연산이나 속성 접근을 최대한 줄여서 최대한 깔끔하게 표현한다.
* 깔끔하게 표현하기 위한 연산은 script 내에서 처리한다.



**store.js**

* getters 정의

```js

export const store = new Vuex.Store({
    getters: {
      storedTodoItems(state) {
          return state.todoItems;
      }  
    },
})
```



**TodoList.vue**

* computed에 getter를 매핑

todoItems라는 computed 메서드를 만들어서 store의 getters를 이용해 todoItems 가져오도록 한다.

템플릿에서는 이 computed 메서드를 호출에서 값을 이용한다.

```vue
<template>
  <div>
        <transition-group name="list" tag="ul">
          <li v-for="(todoItem, index) in this.todoItems" v-bind:key="todoItem.item" class="shadow">
            <!-- 생략 -->
          </li>
        </transition-group>
  </div>
</template>

<script>
export default {
    computed: {
        todoItems() {
            return this.$store.getters.storedTodoItems;
        }
    }
}
</script>
```



mapGetters 적용

* getters명과 컴포넌트에서 사용할 이름이 다를 경우에 객체 리터럴 방식으로 사용할 수 있다.

```js
computed: {
  //방법1. 배열 리터럴
  	...mapGetters(['storedTodoItems'])
  //방법2. 객체 리터럴
    ...mapGetters({
      todoItems: 'storedTodoItems'
    })
}
```



> 소스코드 참고
>
> [mapGetters 적용](https://github.com/blossun/study-vue/commit/f2dbd33dad39bc4226c49cae18ecfd39853d81a6)
>
> [mapState 적용](https://github.com/blossun/study-vue/commit/18700c170ebaa4960015bf0c4863ee7082ff937a)



# mapMutations, mapActions 소개 및 헬퍼의 유연한 문법

![image-20220130225552293](assets/[ch05]03_Vuex 헬퍼 함수/image-20220130225552293.png)

![image-20220130230401052](assets/[ch05]03_Vuex 헬퍼 함수/image-20220130230401052.png)

![image-20220130230418261](assets/[ch05]03_Vuex 헬퍼 함수/image-20220130230418261.png)



## mapMutations 적용

**AS-IS**

```js
removeTodo(todoItem, index) {
  this.$store.commit('removeOneItem', {todoItem, index});
}
```



**TO-BE**

헬퍼함수는 컴포넌트에서 메서드를 호출하면서 넘겨주는 값이 있다면 따로 넘겨줄 인자값을 명시적으로 선언하지 않아도 암묵적으로 값을 넘겨준다.

※ **주의** - 기존에 뮤테이션을 호출 할 때 객체 하나를 넘기고 있었으므로, 템플릿에서 헬퍼함수를 호출할 때도 객체 하나만 넘기도록 `{}`로 넘겨줘야 한다.

```html
<span class="removeBtn" v-on:click="removeTodo({todoItem, index})"> <!--객체 형태로 인자하나를 넘긴다. -->
  <i class="fas fa-trash-alt"></i>
</span>
```

```js
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
    methods: {
        ...mapMutations({
            removeTodo: 'removeOneItem' //넘겨줄 인자(todoItem, index)를 명시하지 않아도 암묵적으로 넘어감
        })
    }
}
```



> [mapMutations 적용 코드 참고](https://github.com/blossun/study-vue/commit/dd8c5c1a4f751a4953ecfe0adc5180795108cf82)



# 헬퍼 함수가 주는 간편함







# 헬퍼 함수가 주는 간편함







---

# 스토어 속성 모듈화 방법







# 스토어 모듈화 방법







