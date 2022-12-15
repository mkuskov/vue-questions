<template>
  <header>
    <p class="interview-title">Interview</p>
    <router-link to="/" class="list">Список опрошенных</router-link>
    <router-link to="/questions" class="pass">Пройти опрос</router-link>
  </header>
  <router-view class="content"></router-view>
</template>

<script>
export default {
  data() {
    return {
      isStarted: JSON.parse(localStorage.getItem('isInterviewStarted')),
      localStorageData: localStorage.length,
    }
  },
}
</script>

<style>
body {
  margin: 0;
  background-color: #ececec;
}

header {
  margin-top: 1.5%;
  text-align: center;
  width: 1200px;
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-columns: 4.5fr 1fr 1fr;
}

.interview-title {
  text-decoration: none;
  font-size: 32px;
  line-height: 28px;
  color: #000000;
  margin: 0;
  width: 10%;
  color: rgb(15, 15, 15);
}

#app {
  font-family: 'Inter', sans-serif;
  border-radius: 15px;
}

.list {
  margin-right: 12px;
}

.pass,
.list {
  font-size: 16px;
  text-decoration: none;
  cursor: pointer;
  transition: .2s;
  padding: 10px;
  border-radius: 5px;
  color: white;
  border: none;
}

.pass {
  width: 150px;
  background-color: #27AE60;
}

.list {
  width: 180px;
  background-color: #2F54EB;
}

.list:hover {
  transition: .2s;
  background-color: #203fb9;
}

.pass:hover {
  transition: .2s;
  background-color: #218f4f;
}
</style>