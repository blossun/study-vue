# Vuex 소개

![image-20220127142023497](assets/[ch05]01_Vuex 소개/image-20220127142023497.png)

* state : data 프로퍼티
* getters : computed
* mutations : method
* actions : 비동기 method

![image-20220127142445852](assets/[ch05]01_Vuex 소개/image-20220127142445852.png)

![image-20220127142608659](assets/[ch05]01_Vuex 소개/image-20220127142608659.png)



# Flux와 MVC 패턴 소개 및 Flux 등장 배경



![image-20220127142934073](assets/[ch05]01_Vuex 소개/image-20220127142934073.png)

단방향으로만 흘러간다.



![image-20220127143024128](assets/[ch05]01_Vuex 소개/image-20220127143024128.png)

MVC

* Model : 화면에서 보여지는 데이터(텍스트, 이미지)를 DB에서 가져와서 담는다.
* Controller : Model과 View를 제어한다. (데이터 처리가 여러가지 방향으로 일어난다.)
* Model과 View가 데이터를 주고 받을 수 있어서 양방향 통신이 이뤄진다.

Flux

* 데이터 변경이 Actions부터 View까지 단방향으로 일어난다.

![image-20220127143650269](assets/[ch05]01_Vuex 소개/image-20220127143650269.png)

![image-20220127143745259](assets/[ch05]01_Vuex 소개/image-20220127143745259.png)

Action이 발생하면 Dispatcher가 동작해서 Store(Model)를 바꾸고, 바뀐 내용으로 View 화면이 갱신된다.

View 화면에서 사용자 입력(Action)이 발생하면 다시 반복해서 흘러간다.



# Vuex가 필요한 이유, Vuex 컨셉, Vuex 구조

![image-20220127144103666](assets/[ch05]01_Vuex 소개/image-20220127144103666.png)

![image-20220127144906264](assets/[ch05]01_Vuex 소개/image-20220127144906264.png)

![image-20220127145116207](assets/[ch05]01_Vuex 소개/image-20220127145116207.png)



![image-20220127145136071](assets/[ch05]01_Vuex 소개/image-20220127145136071.png)



![image-20220127150930252](assets/[ch05]01_Vuex 소개/image-20220127150930252.png)



> [자바스크립트 비동기 처리와 콜백 함수](https://joshua1988.github.io/web-development/javascript/javascript-asynchronous-operation/) 
>
> [자바스크립트 Promise 쉽게 이해하기](https://joshua1988.github.io/web-development/javascript/promise-for-beginners/)



