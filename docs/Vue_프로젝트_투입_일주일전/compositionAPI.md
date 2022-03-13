# composition API



vue2에서 작성하던 코드 방식

```vue
<template>
  <div>
    <h2>{{username}}</h2>
  </div>
</template>

<script>
export default {
  name: 'CompositionAPI1',
  data() {
    return {
      username: 'solar'
    };
  }
}
</script>
```



vue3에서는 `setup()` 을 이용한다. 

하지만 다음과 같이 작성하면 **데이터 바인딩** 이 되지 않는다.

```vue
<template>
  <div>
    <h2>{{username}}</h2>
  </div>
</template>

<script>
export default {
  name: 'CompositionAPI1',
  setup() {
    const username = 'solar';

    return {
      username,
    };
  }
}
</script>
```



vue에서 제공하는 `reactive` 를 이용해서 데이터 바인딩을 해줘야 한다.

```vue
<template>
  <div>
    <h2>{{state.username}}</h2>
  </div>
</template>

<script>
import {reactive} from "vue";

export default {
  name: 'CompositionAPI1',
  setup() {
    const state = reactive({
      username: 'solar',
      age: 30,
    })

    return {
      state,
    };
  }
}
</script>
```

