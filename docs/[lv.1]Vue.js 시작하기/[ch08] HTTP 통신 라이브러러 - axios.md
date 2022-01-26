# HTTP 라이브러리와 Ajax 그리고 Vue Resource

> ※ 참고 - vue의 공식 라이브러리 (pagekit단체) vue-resource는 옛날 방식이고 현재는 사용하지 않음 샘플코드볼 때 이를  사용하고 있으면 오래됐을 확률이 높다. 주의하고 참고



# 액시오스

뷰에서 권고하는 **HTTP 통신 라이브러리**는 액시오스(Axios)입니다. **Promise 기반의** HTTP 통신 라이브러리이며 상대적으로 다른 HTTP 통신 라이브러리들에 비해 문서화가 잘되어 있고 API가 다양합니다.

> [axios github](https://github.com/axios/axios)

> Promis 란? JS의 비동기처리 패턴
> ※ 자바스크립트의 비동기 처리 패턴 변화
>
> 1. callback
> 2. promise
> 3. promise + generator
> 4. async & await
>
> [자바스크립트 비동기 처리와 콜백 함수](https://joshua1988.github.io/web-development/javascript/javascript-asynchronous-operation/)
>
> [자바스크립트 Promise 이해하기](https://joshua1988.github.io/web-development/javascript/promise-for-beginners/)
>
> [자바스크립트 async와 await](https://joshua1988.github.io/web-development/javascript/js-async-await/)



## 액시오스 설치

프로젝트에 액시오스를 설치하는 방법은 CDN 방식과 NPM 방식 2가지가 있습니다.

### CDN 방식

```html
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

### NPM 방식

```bash
npm install axios
```

## 액시오스 사용방법

라이브러리를 설치하고 나면 `axios`라는 변수에 접근할 수 있게 됩니다. `axios` 변수를 이용하여 아래와 같이 HTTP GET 요청을 날리는 코드를 작성합니다.

```html
<div id="app">
  <button v-on:click="fetchData">get data</button> <!-- 버튼을 클릭하면 fetchData 메소드 실행 -->
</div>  
```

```js
new Vue({
  el: '#app',
  methods: {
    fetchData: function() {
      axios.get('https://jsonplaceholder.typicode.com/users/')
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
})
```

위 코드는 get data 버튼을 클릭했을 때 사용자 정보를 받아오는 코드입니다. 실행하면 사용자 정보가 브라우저 개발자 도구의 콘솔에 출력됩니다.



> ※ [jsonplaceholder 사이트](https://jsonplaceholder.typicode.com/)는 JS에서 REST Api를 테스트할 때 사용할 수 있는 사이트이다.
>
> 10개의 유저 정보를 받아올 수 있는 샘플 데이터가 반환된다.
>
> ※ [자바스크립트 동작 원리](https://joshua1988.github.io/web-development/translation/javascript/how-js-works-inside-engine/)



※ Axios의 일반적인 구조

<img src="assets/[ch08] HTTP 통신 라이브러러 - axios/image-20220117090848031.png" alt="image-20220117090848031" style="zoom:50%;" />



### 실습 - 받아온 정보를 하면에 뿌려보자

Vue인스턴스는 Root 컴포넌트로 data 속성에 users라는 이름으로 배열을 만들어줬다.

주의할 점은 method내에서의 `this`와 `axios`내애서의 `this`는 가리키는 대상이 다르다.

따라서 getData function 내에서 `this`를 변수(`vm`)에 담아준다. 이 변수(`vm`)는 `Root`를 가리키고 있기 때문에 `vm.users`라고 쓰면 Root 컴포넌트의 `users`를 가리키게 된다.

```html
<div id="app">
  <button v-on:click="getData">get user</button>
  <div>
    {{ users }} <!-- 배열을 정리하지않고 바로 화면에 출력 -->
  </div>
</div>
```

```js
new Vue({
  el: '#app',
  data: {
    users: []
  },
  methods: {
    getData: function() { 
      var vm = this; //인스턴스(컴포넌트)를 바라보는 this
      axios.get('https://jsonplaceholder.typicode.com/users/')
        .then(function(response) {
        console.log(response.data);
        //this.users = response.data; //여기서의 this는 users를 가리키지 않는다. 비동기처리를 했을 때, 실행 컨텍스트가 바뀌면서 this가 가리키는 대상도 바뀐다.
        vm.users = response.data;
      })
        .catch(function(error) {
        console.log(error);
      });
    }
  }
})
```



# 크롬 개발자 도구 네트워크 패널 보는 방법

* [XHR] : 비동기 통신 모니터링

![image-20220117094220019](assets/[ch08] HTTP 통신 라이브러러 - axios/image-20220117094220019.png)

* [Preview]로 보면 좀 더 구조를 파악하기 쉽다.

![image-20220117094346913](assets/[ch08] HTTP 통신 라이브러러 - axios/image-20220117094346913.png)



* [프런트엔드 개발자가 알아야 하는 HTTP 프로토콜](https://joshua1988.github.io/web-development/http-part1/)

* [구글 크롬 개발자 도구 공식 문서](https://developers.google.com/web/tools/chrome-devtools/)

