**※ 프로젝트 구성 Tip**

* views 폴더에는 라우터의 페이지 컴포넌트에 해당하는 vue 파일만 넣는 것이 좋다.

아래 처럼 응답 결과를 받아와서 화면에 데이터를 뿌릴 수도 있다. 

![image-20220201023725810](assets/[ch02]API 구현/image-20220201023725810.png)

하지만, 페이지 역할을 하는 컴포넌트는 라우팅정보만 담아야지 데이터를 패치해오는 로직이 들어가는 것은 좋지 않은 설계 방식이다.

보통 Vue에 들어가는 컴포넌트의 레벨이 깊어지거나 설계가 변경되었을 때 유연하게 대응하려면 views에 있는 컴포넌트들은 라우팅 정보만 담겨있고, 데이터를 불러오는 로직들은 별도의 컴포넌트로 등록해야 한다.

`components`에 컴포넌트를 등록해서 사용한다. (이 방식으로 추후에 리팩토링해보자)



# axios를 이용한 api 호출

News API로 30개의 news를 받아와서 화면에 뿌려보자



* axios 설치

```sh
npm i axios --save
```

* NewView.vue

axios가 promise기반으로 api를 제공한다. get을 호출하면 `new Promise()`객체를 반환하기 때문에 객체에서 `then`과 `catch`로 연결해서 사용할 수 있다.

axios 호출 후, users에 response.data를 넣어줄 건데, 콜백의 this 바인딩이 현재 view 컴포넌트를 바라보고 있지 않기 때문에 `vm` 변수에 this를 담아두고, `vm`변수로 접근해서 넣어줄 수 있다. (화살표 함수를 쓰면 이런 바인딩 문제가 없다.)

```vue
<template>
  <div>
      <div v-for="user in users" v-bind:key="user.id">{{ user.title }}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            users: []
        }
    },
    created() {
        var vm = this;
        axios.get('https://api.hnpwa.com/v0/news/1.json')
        .then(function(response) {
            console.log(response);
            vm.users = response.data;
        })
        .catch(function(error) {
            console.log(error);
        });
    },
}
</script>
```



> [자바스크립트 Promise 쉽게 이해하기](https://joshua1988.github.io/web-development/javascript/promise-for-beginners/)

> Q. 
> v-for=" user in users " 요렇게 입력해주면 빨간밑줄로 v-bind 키 넣으라고해서 v-bind:key="user" 로 넣어줬는데
>
> vscode 상에선 에러메시지가 안나오는데 라이브서버 돌리면 실행은되지만 에러메시지가 나오더라구요..
>
> v-bind:key="user.id" 로 해주면 그제서야 사라지던데 맞는 건가요?
>
> ---
>
> A.
> user 데이터가 객체이면 객체 안의 특정 속성을 key 값으로 지정해주셔야 합니다. 말씀해주신 것처럼 user.id 같은 것으로요. v-bind:key의 대상은 객체가 아니라 문자열, 숫자 같은 식별할 수 있는 값이어야 합니다 :)
>
> 추가로 vue 2.2.0 버전 이상부터 필수로 key를 입력하게 되어 있습니다.
>
> * 리스트 렌더링 공식 가이드 : https://kr.vuejs.org/v2/guide/list.html

> Q.
>
> 다른 서버에서 돌아가고 있는 php 파일을 axios로 불러오고 싶은데 cors 정책에 걸려서 다음으로 나갈 수가 없어서요..!
>
> 서로 다른 서버에서의 axios 사용은 어떻게 하는게 좋을까요?
>
> ---
>
> A.
>
> 해당 내용은 axios 레벨이 아니라 Vue CLI로 생성한 프로젝트에서 내부적으로 사용하고 있는 웹팩 데브 서버 레벨에서 처리해 주셔야 합니다. 아래 문서들 참고해서 진행해 보시면 좋을 것 같습니다 :)
>
> [웹팩 데브 서버 프록시 설정](https://joshua1988.github.io/webpack-guide/devtools/webpack-dev-server.html#프록시-proxy-설정)
>
> [CLI에서 웹팩 설정 방법](https://cli.vuejs.org/guide/webpack.html#working-with-webpack)



# axios의 api 함수 구조화 방법

* api를 프로젝트에서 관리하는 방법
  * 컴포넌트마다 api를 호출해서 사용하지 않고, 일괄적으로 api라는 폴더를 만들어서 관리한다.



`api/index.js` 에서 axios를 호출할 수 있게끔 api 함수들을 다 정의해놓으면 된다.

```js
import axios from 'axios'; //기본적으로 node_modules에 설치된 라이브러리를 가져온다.

// 1. HTTP Request & Response와 관련된 기본 설정
const config = {
    baseUrl: 'https://api.hnpwa.com/v0/'
}

// 2. API 함수들을 정리
function fetchNewsList() {
    // return axios.get(config.baseUrl + 'news/1.json');
    return axios.get(`${config.baseUrl}news/1.json`); //ES6 - backtick을 이용해서 변수와 문자열 연결
}

// 외부에서 사용할 수 있도록 export
export {
    fetchNewsList
}
```



`fetchNewsList()`에서 결과값을 `return`하는 것이 핵심이다. 이 후, `then()`, `catch()`하면 된다.

```
fetchNewsList()
    .then()
    .catch()
```



`NewsView.vue`에서 `fetchNewsList()`를 이용해서 API 호출 결과를 받아온다.

```vue
<script>
import { fetchNewsList } from '../api/index.js' //*

export default {
    data() {
        return {
            users: []
        }
    },
    created() {
        var vm = this;
        fetchNewsList() //*함수 이용
        .then(function(response) {
            console.log(response);
            vm.users = response.data;
        })
        .catch(function(error) {
            console.log(error);
        });
    },
}
</script>
```



> 소스코드 참고
>
> [axios의 api 함수 구조화](https://github.com/blossun/study-vue/commit/c112a53b3e566f1e41db71552f75e4077eeab421)
>
> [JobsView와 AskView 구현](https://github.com/blossun/study-vue/commit/ca75dc92b4973f477a71cc1a1355ff34e4019fbb)



> 참고 - [Reactivity in Depth](https://vuejs.org/v2/guide/reactivity.html#ad)



> **"Vue.js에서 api 요청 시 created hook이나 beforeMount hook에서 api 요청하는 게 좋다. 이유는 mounted가 되고 나서 데이터 요청을 하게 되면, 뷰의 reactivity 특성에 의해 화면이 다시 그려지게 된다" 라고 말씀하셨습니다.**
>
> (질문 1) 이것의 이유는
>
> => data, methods 등과 같은 속성이 초기화 및 접근이 가능한 created hook에서 하는 것이 효율적이지 mounted, 즉, 렌더링이 완료된 다음에 api 호출 등으로 인한 data 속성 변경은 updated hook이 실행되어 리-렌더링이 되기 때문이다. 이렇게 이해하면 될까요?
>
> 수 많은 블로그를 찾아본 결과 created, mounted 의견이 분분했고, 스스로 헷갈리기도 하고 프로젝트를 진행할 때 올바르게 사용하고자 질문드립니다.
>
> ---
>
> updated 훅 관점 보다는 쉽게 생각해서 서버 데이터를 언제 받아올지 모르기 때문에 해당 데이터를 받아오는 동안 컴포넌트를 그리는 행위를 중단할 수 없다는 관점에서 접근하시면 좋을 것 같습니다.

> (질문 2) 만약, 다음과 같은 상황이면 mounted hook을 이용해도 괜찮을까요? 
>
> 상황 1. mounted hook이 실행됐다는 건 렌더링이 완료되어 DOM에 접근 가능한 것이다. 해당 mounted hook 내에서 api 요청 + 해당 컴포넌트의 DOM에 접근해야 할 상황
>
> ---
>
> DOM에 접근 필요하시면 mounted를 쓰시면 됩니다.

> (질문 3) 자식 컴포넌트에서 부모 컴포넌트의 특정 데이터 속성(ex, aaa)을 watch하고 있다면, 이는 부모 컴포넌트의 mounted hook 단계에서 값을 변경 시 인식할 것입니다. 이때 부모 컴포넌트의 mounted hook에서 api 호출 후 응답 시 data 속성 aaa에 변화를 준다면, 자식 컴포넌트 단계에서 이를 watch 할 수 있을 것이고 이럴 때 사용할 수도 있겠네요.??? 
>
> 하지만 생각해보니 부모 컴포넌트 created hook에서 api 호출하고 자식 컴포넌트 측에서 watch 옵션으로 immediate: true를 준다면, 이를 바로 인식할 수도 있고... 헷갈리네요.
>
> ---
>
> 말씀하신 mounted와 watch 관계는 맞지 않는 것 같아요.



# 자바스크립트 this 4가지와 화살표 함수의 this

## 1. 전역의 this

* `window` : 브라우저 객체
  * 브라우저 정보, 돔에 대한 접근을 나타낼 수 있다.
  * 모든 변수, 함수 등 최상단에는 window가 있다.
  * 전역 변수를 정의한다.

여기서 `this`를 출력하면 `window` 정보를 출력한다. 즉, **this는 전역을 가리킨다.**

![image-20220201161823587](assets/[ch02]API 구현/image-20220201161823587.png)



## 2. 함수 내의 this

여기서 `this`를 출력하면 `window` 정보를 출력한다. 즉, **this는 전역을 가리킨다.**

![image-20220201162058352](assets/[ch02]API 구현/image-20220201162058352.png)

이런 것을 방지하기 위해서 **ES6에 'use strict'** 문법이 존재한다.



## 3. 생성자 함수 내의 this

생성자 함수에서 `this`는 `함수 자신`을 가리킨다.

![image-20220201162512246](assets/[ch02]API 구현/image-20220201162512246.png)



## 4. 비동기 처리에서의 this

앞서 비동기 로직에서 `this`를 콘솔에 출력해보자

```vue
<script>
import { fetchNewsList } from '../api/index.js'

export default {
    data() {
        return {
            users: []
        }
    },
    created() {
        var vm = this; //그래서 기존 this 바인딩을 유지하기 위해서 이렇게 별도의 변수를 사용했었다.
        console.log(this); //여기서의 this => VueComponent
        fetchNewsList()
        .then(function(response) {
            console.log(this); //여기서의 this => undefined
            vm.users = response.data;
        })
        .catch(function(error) {
            console.log(error);
        });
    },
}
</script>
```



호출 전의 `this`는 `VueComponent`를 가리키고, 호출 후의 `this`는 `undefined`가 출력된다.

![image-20220201163313687](assets/[ch02]API 구현/image-20220201163313687.png)





비동기 호출 자체는 호출되는 시점 자체에서 기존에 있던 this를 벗어난 this가 생긴다. (이건 자바스크립트가 가진 원래의 생김새이다.)



### 화살표 함수에서의 this

콜백 함수를 화살표 함수로 바꾸면 this가 그대로이다.

```vue
<script>
import { fetchNewsList } from '../api/index.js'

export default {
    data() {
        return {
            users: []
        }
    },
    created() {
        console.log('호출 전: ', this);
        fetchNewsList()
        .then(response => {
            console.log('호출 후: ', this);
            this.users = response.data;
        })
        .catch(function(error) {
            console.log(error);
        });
    },
}
</script>
```

![image-20220202145743513](assets/[ch02]API 구현/image-20220202145743513.png)



⇒ 콜백함수에서 this가 풀려버리기 때문에 es5로 개발할 때 bind()함수로 this를 명시적으로 지정해주거나, var vm=this;로 매핑해서 사용했었다.

하지만 ES6에서 화살표 함수가 등장하면서, 뷰 인스턴스의 this를 따로 바인딩 하지 않아도, 화살표 함수를 쓰면 함수를 정의하는 시점에 this를 그대로 매칭해서 쓸 수 있기 때문에 화살표 함수를 쓴다.



# 자바스크립트 비동기 처리(1) - Callback

* 콜백이란?

  특정 함수(기능)등이 종료되는 시점에 실행되는 함수이다.

이것이 가능한 이유는 JS는 함수를 인자로 넘길 수 있기 때문이다. 그래서 보통 인자로 전달되는 함수를 콜백함수라고 한다.



> jQueyr cdn 검색해서 태그 복사

![image-20220202192052523](assets/[ch02]API 구현/image-20220202192052523.png)



> 다음 콜백 함수 호출 코드를 보자

`ajax`요청이 `success`한 경우에만 넘겨준 함수 `function(data)` (이것이 콜백함수)가 실행된다.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Callback</title>
</head>
<body>
    <div>jquery ajax</div>

    <script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script>

    <script>
        function fetchData() {
            // 1
            var result = [];

            // 2
            $.ajax({
                url: 'https://api.hnpwa.com/v0/news/1.json',
                success: function(data) {
                    console.log('데이터 호출 결과', data);
                    result = data;
                }
            });

            // 3
            console.log('함수 결과', result);
        }
        fetchData();
    </script>
    
</body>
</html>
```



로그 출력 결과를 보면 28번째줄(3)이 먼저 찍히고, 그 다음에 22번째 줄(2)이 찍힌다.

![image-20220202193110259](assets/[ch02]API 구현/image-20220202193110259.png)



> - [비동기 처리와 콜백 함수](https://joshua1988.github.io/web-development/javascript/javascript-asynchronous-operation/)



# 자바스크립트 비동기 처리(2) - Promise

새로운 비동기 처리 패턴

`.then(성공했을때 실행할 내용).catch(실패했을 때 실행할 내용)` 이렇게 작성할 수 있다.

이 때 반환되는 객체는 `new Promise` 여야 한다.



> 다음 콜백 함수 호출 코드를 보자

callAjax()에서 Promixe 객체를 반환한다.

`ajax`요청이 `success`한 경우 resolve에 data를 넣어주면 이후에 `then`으로 체이닝할 수 있다.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Callback</title>
</head>
<body>
    <div>jquery ajax</div>

    <script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script>

    <script>
        function callAjax() {
            return new Promise(function(resolve, reject) {
                $.ajax({
                    url: 'https://api.hnpwa.com/v0/news/1.json',
                    success: function(data) {
                        resolve(data);
                    }
                })
            });
        }

        function fetchData() {
            // 1
            var result = [];

            // 2
            callAjax()
                .then(function(data) {
                    console.log('데이터 호출 결과', data);
                    result = data;
                    console.log('성공 후 함수 결과', result);
                });

            // 3
            console.log('함수 결과', result);
        }
        fetchData();
    </script>
    
</body>
</html>
```



> - [프로미스 쉽게 이해하기 글 주소](https://joshua1988.github.io/web-development/javascript/promise-for-beginners/)
>
> - [Promise MDN 주소](https://developer.mozilla.org/ko-KR/docs/Web/JavaScript/Reference/Global_Objects/Promise)





