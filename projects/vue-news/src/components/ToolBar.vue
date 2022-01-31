<template>
  <div class="header">
      <router-link to="/news">News</router-link> |
      <router-link to="/ask">Ask</router-link> |
      <router-link to="/jobs">Jobs</router-link>
  </div>
</template>

<style scoped>
.header {
    color: white;
    background-color: #42b883;
    display: flex;
    padding: 8px;
}
.header .router-link-exact-active { /* 클릭한 링크 색상 표시 */
    color: #35495e;
}
.header a { /* 활성화되지 않은 링크 표시 */
    color: white;
}
</style>