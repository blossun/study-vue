# TodoHeader 컴포넌트 구현

## style 적용

스타일 컴포넌트에 vue 싱글 파일 컴포넌트에서 지원하는 'scope' 속성을 추가

* scope : 해당 컴포넌트 내에서만 유효한 속성임을 나타낸다.

* style이 원래 casecading style sheet여서 상위 요소의 스타일을 하위에서 상속 받게 되는데 `scope` 속성을 지정하면 이를 무시한다.

  컴포넌트 안에서만 유효한 스타일 속성이 된다.

```vue
<template>
    <header>
        <h1>TODO it!</h1>
    </header>
</template>

<style scoped>
h1 {
    color: #2F3852;
    font-weight: 900; /*폰트 굵기*/
    margin: 2.5rem 0 1.5rem;
}
</style>
```



# TodoInput 컴포넌트의 할 일 저장 기능 구현

사용자 입력을 로컬 스토리지에 저장

> [로컬 스토리지 setItem() API 공식 가이드](https://developer.mozilla.org/en-US/docs/Web/API/Storage/setItem)



1. 입력된 데이터 값과 매핑할 변수를 지정

    `data` 로 `return`하는 값을 만들어주면 된다.

2. `input` 태그에서 `v-model`로 값을 변수와 매핑

   * `v-model` : input에 입력된 값을 vue 인스턴스에 매핑

3. `button` 태그로 click 시마다 실행될 메서드를 지정

4. `addTodo` 메서드 정의

   * `this` 키워드 : 현재 this가 선언된 인스턴스

```vue
<template>
  <div>
      <input type="text" v-model="newTodoItem">
      <button v-on:click="addTodo">add</button>
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
            this.newTodoItem = ''; //입력값 초기화
        }
    }
}
</script>
```



로컬 스토리지에 저장된 값 확인

![image-20220123183809579](assets/[ch01]02_TodoHeader컴포넌트 구현/image-20220123183809579.png)



# TodoInput 컴포넌트 코드 정리 및 UI 스타일링

> [폰트 어썸 사이트](https://fontawesome.com/)

## input 데이터를 초기화하는 부분을 별도의 메소드로 분리

```vue
<script>
export default {
    data: function() {},
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
```



## 스타일링

* 여기 지정한 `shadow`는 `App,vue`에 정의한 스타일 속성을 의미한다.

  `  <div class="inputBox" shadow>`

  * App.vue의 <style>

  ```vue
  <style>
  .shadow {
    box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
  }
  </style>
  ```

* `span` 태그로 **추가(+)**하는 버튼의 아이콘을 넣어준다.

  > awesome icon 에서 검색	![image-20220123184923006](assets/[ch01]02_TodoHeader컴포넌트 구현/image-20220123184923006.png)

  선택한 icon 의 태그를 복사해서 넣어준다.

  커스텀하게 만든 `addBtn` 스타일도 적용시킨다.

  버튼을 클릭했을 때, `addTodo` 메서드를 실행하도록 `v-on:click="addTodo"`도 추가

  ```vue
  <span class="addContainer" v-on:click="addTodo">
    <i class="fas fa-plus addBtn"></i>
  </span>
  ```

  



## enter키를 누르면 addTodo 메소드가 실행되도록 추가

* `v-on:keyup.enter="메서드명"`

  `keyup.enter` : enter키를 쳤을 때 해당 이벤트를 잡아서 메서드를 실행시킨다.

```vue
<input type="text" v-model="newTodoItem" v-on:click="addTodo">
```











