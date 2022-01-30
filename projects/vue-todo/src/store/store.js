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
    }
})