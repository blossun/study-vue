<template>
  <div id="app">
    <!-- <app-header v-bind:하위 컴포넌트에서 정의한 프롭스 속성 이름="상위 컴포넌트의 데이터 이름"></app-header> -->
    <app-header v-bind:propsdata="str"></app-header>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'; //컴포넌트 파일의 내용을 AppHeader 변수에 담음

export default {
  data: function() {
    return {
      str: '받아랏 데이터'
    }
  },
  components: {
    'app-header': AppHeader //AppHeader 변수를 컴포넌트로 연결
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
