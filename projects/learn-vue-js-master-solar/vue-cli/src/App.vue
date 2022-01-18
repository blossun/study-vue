<template>
  <div id="app">
    <app-header></app-header> <!-- 컴포넌트 태그 등록 -->
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'; //컴포넌트 파일의 내용을 AppHeader 변수에 담음

export default {
  data: function() {
    return {
      str: 'hi'
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
