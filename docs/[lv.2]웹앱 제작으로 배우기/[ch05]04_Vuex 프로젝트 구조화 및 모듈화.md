# 프로젝트 구조화와 모듈화



# 스토어 속성 모듈화 방법

![image-20220131001828996](assets/[ch05]04_Vuex 프로젝트 구조화 및 모듈화/image-20220131001828996.png)

각 속성의 내용을 별도의 파일로 분리해서 파일의 내용을 불러와 사용한다.

* `as` : alias 별칭

![image-20220131002152401](assets/[ch05]04_Vuex 프로젝트 구조화 및 모듈화/image-20220131002152401.png)



> [소스코드 참고](https://github.com/blossun/study-vue/commit/db4b123ceeb525e7f1b1460c97fd3f9316ea267f)



# 스토어 모듈화 방법

![image-20220131003738125](assets/[ch05]04_Vuex 프로젝트 구조화 및 모듈화/image-20220131003738125.png)



**목록이 나오지 않는 문제 발생**

질문 답변 중 아래 글을 확인

```js
computed: {
  ...mapState({
   myTodoItems: state => state.todoApp.todoItems
  })
}
```

myTodoItems로 컴포넌트에서 사용하시면 됩니다. 그리고 위와 같이 접근할 때는 객체의 속성의 속성을 접근하기 때문에 todoApp이 비어있진 않은지 보장해주셔야 할 것 같아요 :)

⇒ `        ...mapState(['todoItems']),`코드에서 아래 코드로 변경해서 해결

```js
...mapState({
  todoItems: state => state.todoApp.todoItems
}),
```

`state` 객체의 속성(todoApp)의 속성(todoItems)에 접근하는 것임을 알자!

즉,

스토어를 모듈화해서 사용하다보니 기존에는 store의 state를 바로 사용하던 코드가 
todpApp이라는 객체의 속성값에 접근하는 것으로 바뀌었기 때문에 
todoList에서 todoItems에 접근하는 코드를 수정해줘야 한다.



**TO-BE**

* TodoList.vue

```vue
<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
    computed: {
        ...mapState({
            todoItems: state => state.todoApp.todoItems //수정
        }),
        ...mapGetters(['storedTodoItems'])
    }
}
</script>
```



> [소스코드 참고](https://github.com/blossun/study-vue/commit/4aa30731ca88f646b7073e484f90794a07420e22)



---

> 이렇게 모듈화를 하는 단위가, 화면별 인가요? 아니면 전체 Application 인가요?
>
> 예를 들면, application에 화면1,화면2,화면3이 있다면
>
> 1. 화면 1,2,3의 getters,mutations, store 통합본이 있는건지,
> 2. 화면 1,2,3 각각 getters,mutations, store 이 필요한건지 궁금합니다.
>
> 더불어 vuex 뿐만아니라, vue 파일의 구조는 어떻게 가져가야되는지도 궁금합니다.

스토어의 모듈화 기준은 딱히 정해져 있는게 없습니다 :) 저는 해보니 페이지 단위 보다는 데이터 유형 별로 스토어 모듈을 분리하는게 관리하는데 효과적이더라구요 :)

스토어의 모듈은 강의에서 안내드린대로 modules 밑에 넣으셔도 되고 아래와 같이 하셔도 무방합니다 :)

store/

 index.js

 users.js

 products.js



---

> dom에 접근해야할 상황이 올경우 ref를 사용해도 되나요.. ref는 vue 사용의 목적에 어긋나기때문에 가능하면 사용하지 말라고하는데 궁금합니다.

답변) ref가 뷰의 사용 목적에 벗어난다라는 정보는 어디서 얻으셨을까요? 제가 알기로는 뷰에서 직접 DOM 조작을 하려면 ref를 사용해야 한다고 알고 있습니다. 뷰에서 DOM을 조작할 때 "디렉티브"라는 개념을 사용하고 있는데요. 해당 개념은 뷰가 처음이 아니라 초기 앵귤러 버전부터 사용했습니다. 앵귤러에서도 DOM 요소에 직접 접근하는 대신 프레임워크에서 제공하는 디렉티브나 속성들을 활용하라고 권고합니다.

> dom에 접근시 this.$el과 ref를 사용해서 접근하는게 있는데 2개의 차이점은 뭔가요?

답변) $el 속성은 인스턴스의 최상위 DOM 요소를 가리킵니다. 반면에 ref 속성은 특정 DOM 요소를 지정해서 해당 DOM 정보를 취득할 수 있습니다. ref로 해결하실 수 있는 것을 굳이 `$el`을 이용해서 접근하실 필요는 없을 것 같아요.

> 이런식으로 ul li를 한번에 선택하고싶으면 
> `this.$el.querySelectorAll('ul li')` 이런식으로 접근해도 되는지 궁금합니다.
> dom접근시 어떤방법으로 접근하는게 제일 괜찮은지 알려주셨으면 좋겠습니다.

```html
<ul>
      <li>
        a
      </li><li>
        a
      </li><li>
        a
      </li><li>
        a
      </li><li>
        a
      </li><li>
        a
      </li><li>
        a
      </li><li>
        a
      </li><li>
        a
      </li><li>
        a
      </li>
</ul>
```

답변) 앞의 질문들과 중복되는 내용인 것 같습니다. ref로 접근하시는 것을 추천드리고 아래에 영상 링크 하나 첨부 드릴테니 세션2와 세션4를 참고해보시면 도움이 될 것 같네요. 참고로 ref 속성에 대한 내용은 "Vue.js 완벽 가이드"의 차트 모듈화에서도 다루고 있으니 관심 있으시면 한번 살펴보시면 좋을 것 같습니다 :)

https://www.youtube.com/watch?v=wU8Y07vgUbQ

---

>  export {} 와 export default {} 차이
> export default {} 로 선언을 하면 문서당 1번씩만 불러올 수 있는 건가요 ??
> modules > todoApp.js 파일에서는 export default {} 로 선언을 했고, mutations.js 파일에서는 export {} 로 선언을 했는데 2개 문서의 export 차이가 무엇인지 이해가 가질 않아서요.. 자세한 답변 부탁드립니다!!

맞습니다 default export는 해당 파일에서 1개만 export 할 수 있는 문법입니다. export { } 문법 방식은 한 파일 안에서 여러 개를 export 하실 수 있어요. 아래 문서 보시면 좀 더 이해하시기 수월할거에요 :)

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export

---

> Vue.js로 개발할 때 강의처럼 간단한 로직을 만들면서 Vuex로 조금씩 변경하는지, 아니면 처음부터 Vuex를 적용해서 개발을 하시는지 궁금합니다.
>
> 물론 초기 설계에 따라 다르겠지만, 실무 경험자께서 실제로 겪어보신 것이 궁금하네요.

 저는 이제 컴포넌트 기반 프레임워크를 경험한지 좀 되어서 그런지 뷰엑스를 써야할 때와 쓰지 않아도 될 때를 구분할 수 있는 것 같아요 :) 지상님께 추천드리고 싶은 방식은 컴포넌트 안에서 해결할 수 있는 문제는 뷰엑스로 들고가지 않는다 입니다. 로컬 컴포넌트로도 해결할 수 있는 문제를 계속 뷰엑스에 위임하다보면 데이터 처리 흐름도 복잡해 질 뿐더러 파일을 넘나들면서 생기는 사고 전환의 비용이 생깁니다. 제 개인적인 경험이니 참고해 주시면 좋을 것 같고 사실 구현에 정답은 없어서요 :)

Vue.js 학습 로드맵에 담은 저의 조언과 생각을 잘 고려해주시고 뷰엑스의 사용 기준은 지상님 스스로 만들어 나가시는 걸 추천드립니다 :)