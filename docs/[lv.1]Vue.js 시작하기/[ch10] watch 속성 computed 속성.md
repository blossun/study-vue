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



## watch 속성 vs computed 속성

> [watch 속성과 computed 속성 차이점에 관한 공식 문서 링크](https://vuejs.org/v2/guide/computed.html#ad)

* watch
  * 무거운 로직
  * 매번 실행되기 부담스러운 로직
  * 변경된 값을 가지고 http 요청을 보내는 로직이 적합하다.
  * 기본적으로 `(새로운 값, 이전 값)` 정보를 파라미터로 받을 수 있다.
* computed
  * 단순한 값에 대한 계산
  * vue의 validate(validation library)가 거의 computed로 구현되어 있다.
  * watch 보다 사용 권장

```js
new Vue({
  el: '#app',
  data: {
    num: 10
  },
  computed: {
    doubleNum: function() {
      return this.num * 2;
    }
  },
  watch: {
    num: function(newValue, oldValue) {
      this.fetchUserByNumber(newValue);
    }
  },
  methods: {
    fetchUserByNumber: function(num) {
      console.log(num);
      // axios.get(num); //이런 요청 로직이 적합
    }
  }
});
```

















