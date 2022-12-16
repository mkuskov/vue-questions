<template>
  <header>
    <p class="interview-title">Interview</p>
    <div class="btns">
      <router-link to="/" class="list">Список опрошенных</router-link>
      <router-link to="/questions" class="pass">Пройти опрос</router-link>
    </div>
  </header>
  <router-view class="content"></router-view>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style>
body {
  margin: 0;
  background-color: #ffffff;
}

header {
  padding-top: 1.5%;
  padding-bottom: 1.5%;
  background-color: #f2f2f2;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: space-around;
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
  font-family: "Inter", sans-serif;
  border-radius: 15px;
}

.btns {
  margin-top: 5px;
}

.list {
  margin-right: 12px;
}

.pass,
.list {
  font-size: 16px;
  text-decoration: none;
  cursor: pointer;
  transition: 0.2s;
  padding: 10px;
  border-radius: 5px;
  color: white;
  border: none;
}

.pass {
  width: 150px;
  background-color: #27ae60;
}

.list {
  width: 180px;
  background-color: #2f54eb;
}

.list:hover {
  transition: 0.2s;
  background-color: #203fb9;
}

.pass:hover {
  transition: 0.2s;
  background-color: #218f4f;
}
</style>
