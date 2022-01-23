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

> - [로컬 스토리지 setItem() API 공식 가이드](https://developer.mozilla.org/en-US/docs/Web/API/Storage/setItem)

