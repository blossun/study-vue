import Vue from 'vue' //라이브러리 등록
import Vuex from 'vuex'
import todoApp from './modules/todoApp'

Vue.use(Vuex); //Vue 플러그인을 사용

export const store = new Vuex.Store({
    modules: {
        todoApp: todoApp
    }
});