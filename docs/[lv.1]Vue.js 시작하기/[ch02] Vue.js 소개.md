# MVVM 모델에서의 Vue



## Vue는 무엇인가?

* View : 브라우저에서 사용자에게 보여지는 화면
* ViewModel
  * DOM Listeners : View에서 발생하는 이벤트(ex. 클릭, 키보드 입력)를 청취하고 있는다.
    * JS에 있는 데이터를 변경해주거나 JS에 지정한 특정 로직을 실행하게 된다.
  * Data Bindings : JS 데이터가 변경되면 Data Bindings를 타고 화면에 반영하게 된다.

![image-20220116162513539](assets/[ch02]_Vue.js 소개/image-20220116162513539.png)



# 기존 웹 개발 방식(HTML, Javascript)

web-dev.html 파일 생성

* html : 화면에 나타나는 DOM의 정보를 넣는다.

* JavaScript : 태그나 DOM의 내용을 조작

  

스크립트 작성 후 콘솔로 확인

```html
<body>
    <div id="app"></div>

    <script>
        var div = document.querySelector('#app'); //app이라는 id 정보를 받아온다.
        console.log(div); //콘솔로 div 정보를 확인
    </script>
</body>
```

![image-20220116164537751](assets/[ch02]_Vue.js 소개/image-20220116164537751.png)



html에 텍스트를 표시하는 방법

* 방법1) 직접 html에 텍스트를 넣는 방법

```html
<body>
    <div id="app">
        hello world
    </div>

    <script>
        var div = document.querySelector('#app');
        console.log(div);
    </script>
</body>
```

* 방법2) script 코드로 텍스트를 넣는 방법

  태그 정보를 받아와서 `innerHTML`을 이용해 텍스트를 넣어줄 수 있다.

```html
<body>
    <div id="app"></div>

    <script>
        var div = document.querySelector('#app');
        div.innerHTML = 'hello world!';
    </script>
</body>
```



## 태그에 표시할 값이 변경되는 경우

태그의 정보를 받아와서 태그에 특정 변수에 담긴 문자열로 화면에 표시하려고 할 때, 변수값이 중간에 변경된다고 화면에 보여지는 값이 바뀌지 않는다. 다시 innerHTML로 값을 넣어줘야 된다.

```html
<body>
    <div id="app"></div>

    <script>
        var div = document.querySelector('#app');
        console.log(div);
        var str = 'hello world!';
        div.innerHTML = str;
        
        str = 'hello world~~~~~~'; //이렇게 값이 변경된다고 화면에 보여지는 값이 바뀌지 않는다.
        div.innerHTML = str; //다시 innerHTML로 값을 넣어줘야 된다.
    </script>
</body>
```



**코드 작성 시 Tip**

* `!` + `tab ` : 자동으로 기본 html 구조 생성

* `div#app` 을 작성하면 자동으로 다음과 같이 `    <div id="app"></div>`이 완성된다.

  ![image-20220116164039680](assets/[ch02]_Vue.js 소개/image-20220116164039680.png)

  ![image-20220116164052326](assets/[ch02]_Vue.js 소개/image-20220116164052326.png)



# Reactivity 구현

Vue의 핵심인 Reactivity를 이용하면 어떤 점들이 편해지는지 살펴보자

* Reactivity 란 ? 

  데이터의 변화를 라이브러리에서 감지해서 알아서 자동으로 화면에 그려주는 것



## Object.defineProperty() API

객체의 동작을 재정의하는 API



> Object.defineProperty() API 사용방법 검색
> → mdn object define property
>
> → [Object.defineProperty() API 문서 링크](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
>
> * MDN : 웹 기술 관련 스팩과 사용법이 기술되어 있다. 모든 API와 문법&예제를 보자



```javascript
Object.defineProperty(대상 객체, 객체의 속성, {
            //정의할 내용
        })
```



### 사용 예

1. viewModel 객체를 생성
2. Object.defineProperty를 이용해서 viewModel 객체에 `str` 속성을 선언하고, 속성에 기능을 정의

3. 게터와 세터를 정의

   ```javascript
   var viewModel = {}; //viewModel 객체 생성
   
   Object.defineProperty(viewModel, 'str', {
     // 속성에 접근했을 때의 동작을 정의
     get: function() {
       console.log('접근');
     },
     // 속성에 값을 할당했을 때의 동작을 정의
     set: function(newValue) {
       console.log('할당', newValue);
     }
   })
   ```

4. 콘솔에서 동작 확인

   ![image-20220116171252856](assets/[ch02]_Vue.js 소개/image-20220116171252856.png)



## Object.defineProperty() 이용해서 개선

div의  app에 값이 바뀌면 자동으로 화면에 반영되도록 할 수 있다.

```html
<body>
    <div id="app"></div>

    <script>
        var div = document.querySelector('#app');
        var viewModel = {}; //viewModel 객체 생성

        Object.defineProperty(viewModel, 'str', {
            // 속성에 접근했을 때의 동작을 정의
            get: function() {
                console.log('접근');
            },
            // 속성에 값을 할당했을 때의 동작을 정의
            set: function(newValue) {
                console.log('할당', newValue);
                div.innerHTML = newValue;
            }
        })
    </script>
</body>
```



![image-20220116171723491](assets/[ch02]_Vue.js 소개/image-20220116171723491.png)





# Reactivity 코드 라이브러리화 하기

먼저, 특정 기능을 함수로 분리한다.

1. init() 함수에 앞서 정의한 기능을 넣어준다.

   ```js
   function init() {
     Object.defineProperty(viewModel, 'str', {
       // 속성에 접근했을 때의 동작을 정의
       get: function() {
         console.log('접근');
       },
       // 속성에 값을 할당했을 때의 동작을 정의
       set: function(newValue) {
         console.log('할당', newValue);
         render(newValue); //변경된 값 랜더링
       }
     });
   }
   ```

2. 화면에 랜더링해주는 코드를 render() 함수로 분리

   ```js
   function render(value) {
     div.innerHTML = value;
   }
   ```

3. Init() 함수 호출

   ```js
   init();
   ```

4. 위에 정의한 내용을 JS의 즉시 실행 함수에 넣어준다.

   ```html
   <body>
       <div id="app"></div>
   
       <script>
           var div = document.querySelector('#app');
           var viewModel = {}; //viewModel 객체 생성
   
           //즉시 실행 함수
           (function() {
               function init() {
               Object.defineProperty(viewModel, 'str', {
                   // 속성에 접근했을 때의 동작을 정의
                   get: function() {
                       console.log('접근');
                   },
                   // 속성에 값을 할당했을 때의 동작을 정의
                   set: function(newValue) {
                       console.log('할당', newValue);
                       render(newValue);
                   }
                   });
               }
   
               function render(value) {
                   div.innerHTML = value;
               }
   
               init(); //호출
           })();
           
       </script>
   </body>
   ```





## JS의 즉시 실행 함수

init()과 render()가 애플리케이션 로직에 노출되지 않게 또 다른 유효범위(스코프)에 넣어주는 것이다. 

일반적으로 오픈소스 라이브러리들이 이런 식으로 변수의 유효범위를 관리하고 있다.

[즉시 실행 함수 MDN 문서 링크](https://developer.mozilla.org/ko/docs/Glossary/IIFE)



