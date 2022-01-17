# watch

watch 속성은 특정 데이터의 변화를 감지하여 자동으로 특정 로직을 수행해주는 속성입니다.



예제 - num 데이터 값이 변경되면 logText() 메소드를 실행하도록 watch 속성을 설정

```html
<div id="app">
  {{ num }}
  <button v-on:click="addNum">increase</button>
</div>
```

```js
new Vue({
  el: '#app',
  data: {
    num: 10
  },
  watch: {
    num: function() { //num 데이터를 지켜보고 있다가 변경이 생기면 실행할 로직을 정의
      this.logText(); //logText() 함수를 호출
    }
  },
  methods: {
    addNum: function() {
      this.num++;
    },
    logText: function() {
      console.log('changed');
    }
  }
})
```







