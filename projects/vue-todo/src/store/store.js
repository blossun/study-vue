import Vue from 'vue' //라이브러리 등록
import Vuex from 'vuex'

Vue.use(Vuex); //Vue 플러그인을 사용

//localStorage 관련 API를 전부 여기로 빼낸다.
const storage = {
    fetch() { //속성 메서드
        const arr = [];
        if (localStorage.length > 0) {
            for (let i = 0; i < localStorage.length; i++) {
                if (localStorage.key(i) !== 'loglevel:webpack-dev-server') {
                    arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
                }
            }
        }
        return arr;
    }
}

export const store = new Vuex.Store({
    state: {
        todoItems: storage.fetch()
    },
    mutations: {
        addOneItem(state, todoItem) {
            const obj = {completed: false, item: todoItem};
            localStorage.setItem(todoItem, JSON.stringify(obj)); //로컬스토리지에 저장 obj -> String
            state.todoItems.push(obj); //mutation에서 state에 접근하는 방법은 첫번쨰 인자로 받은 변수를 이용해서 속성에 접근해야한다.
        },
    }
})