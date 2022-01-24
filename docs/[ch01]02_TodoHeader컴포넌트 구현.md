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



---

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



---

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



---

# TodoList 컴포넌트의 할 일 목록 표시 기능 구현

* `ul>li*3` 이라고 치면 자동으로 `ul` 태그 내에 `li` 태그 3개를 자동완성해준다.

```html
<ul>
  <li></li>
  <li></li>
  <li></li>
</ul>
```



1. 가져온 데이터를 담을 리스트 타입의 data 변수 선언

2. created()에서 로컬 스토리지에 저장된 데이터를 가져온다. (for문)

   * `created()` : Vue의 라이프사이클 중에서 인스턴스가 생성되자마자 호출되는 라이프사이클 훅

3. html 태그에 `v-for` 을 이용해서 데이터값을 담아준다.

   

```vue
<template>
  <div>
      <ul>
          <li v-for="todoItem in todoItems" v-bind:key="todoItem">
              {{ todoItem }}
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
    created: function() {
        console.log('created');
        if (localStorage.length > 0) {
            for (var i = 0; i < localStorage.length; i++) {
                if (localStorage.key(i) !== 'loglevel:webpack-dev-server') {
                    this.todoItems.push(localStorage.key(i));
                }
                // console.log(localStorage.key(i));
            }
        }
    }
}
</script>
```

![image-20220125011638018](assets/[ch01]02_TodoHeader컴포넌트 구현/image-20220125011638018.png)



---

# TodoList 컴포넌트 UI 스타일링

> - [MDN splice() API 문서](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)

리스트 중에 선택한 아이템을 삭제한다.

1. 선택한 아이템이 어떤 것인지 아는 방법?

   vue에서 `v-for` 에서 내장된 index(현재 아이템을 가르키는)를 제공한다.

   ```html
   <li v-for="(todoItem, index) in todoItems" v-bind:key="todoItem" class="shadow">
   ```

2. 해당 todoItem과 index를 메서드에 넘겨준다.

   ```html
   <span class="removeBtn" v-on:click="removeTodo(todoItem, index)">
   ```

3. 로컬 스토리지에서 삭제

   ```script
   localStorage.removeItem(todoItem);
   ```

4. 화면에서 지워진 내용이 안보이도록 삭제

   로컬 스토리지 영역과 화면 영역은 분리되어있다. 따라서 데이터 삭제 후에 삭제된 데이터를 화면 영역에서도 안보이게 처리해줘야 한다. 

   `splice(시작 인덱스, 삭제할 item 갯수)` JS API를 사용하면 된다.

   * `splice()` : 기존 배열을 변경해서 새로운 배열로 반환(?)
   * `slice()` : 기존 배열을 변경하지 않음

   ```vue
   <script>
   methods: {
           removeTodo: function(todoItem, index) {
               console.log('remove items');
               console.log(todoItem, index);
               localStorage.removeItem(todoItem); //로컬스토리지에서 삭제
               this.todoItems.splice(index, 1); //화면에서 삭제. 해당 index에서부터 1개 item 삭제
           }
       }
   </script>
   ```

   

* TodoList.vue 전문

```vue
<template>
  <div>
      <ul>
          <li v-for="(todoItem, index) in todoItems" v-bind:key="todoItem" class="shadow">
              {{ todoItem }}
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
        }
    },
    created: function() {
        console.log('created');
        if (localStorage.length > 0) {
            for (var i = 0; i < localStorage.length; i++) {
                if (localStorage.key(i) !== 'loglevel:webpack-dev-server') {
                    this.todoItems.push(localStorage.key(i));
                }
                // console.log(localStorage.key(i));
            }
        }
    }
}
</script>
```

![image-20220125013144137](assets/[ch01]02_TodoHeader컴포넌트 구현/image-20220125013144137.png)



---

# TodoList 컴포넌트의 할 일 완료 기능 구현

할 일 완료 여부를 체크하는 체크박스 추가

## TodoList.vue

1. [TodoList.vue] check 아이콘 추가
2. [TodoList.vue] check 버튼을 클릭하면 실행할 메서드 지정 - `toggleComplete()`



## TodoInput.vue

1. [TodoInput.vue] 에서 저장하는 메서드 `addTodo()`수정

   단순히 text를 저장하던 기존 코드에서 (1) 할 일 완료 여부 check를 위한 boolean, (2) 할일 내용을 담을 text 로 이루어진 obj 객체를 추가하도록 수정한다.

   ```script
   var obj = {completed: false, item: this.newTodoItem};
   ```

2. [TodoInput.vue] localStorage에 담을 때는 `JSON.stringfy()`를 이용한다.

   * `JSON.stringfy()` : JSON 객체 → String 타입으로 변환해주는 (직렬화) API이다.

   ```script
   localStorage.setItem(this.newTodoItem, JSON.stringify(obj)); //로컬스토리지에 저장
   ```

   ![image-20220125015710752](assets/[ch01]02_TodoHeader컴포넌트 구현/image-20220125015710752.png)



데이터는 저장이 됐는데, 화면에 바로 목록으로 출력되지 않는다.

![image-20220125015922856](assets/[ch01]02_TodoHeader컴포넌트 구현/image-20220125015922856.png)



`TodoList`는 다른 컴포넌트 영역이다. 바로 갱신이 안되고 화면을 새로고침해야 화면에 보여지고 있다.

![image-20220125020052169](assets/[ch01]02_TodoHeader컴포넌트 구현/image-20220125020052169.png)



이 후 과정에서 컴포넌트 간의 통신과 반응성에 대해 알아본다.



## TodoList.vue

1. localStorage에 Obj 형태로 값이 저장되도록 수정되었기 때문에 이를 반영하여 수정

   

2. toggleComplete() 메서드 구현

   













