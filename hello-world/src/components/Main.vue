<template>
  <main id="results">
    <div class="results-content">
      <h4>Site &#160; / &#160; List of respondents</h4>
      <table class="table-results">
        <tbody v-on:scroll="registeredUsers">
          <tr class="table-placeholder">
            <td>{{ name }}</td>
            <td>{{ email }}</td>
            <td>{{ tel }}</td>
            <td>{{ results }}</td>
          </tr>
          <tr v-for="users in usersArr" class="table-data">
            <td>{{ users.userName }}</td>
            <td>{{ users.userEmail }}</td>
            <td>{{ users.userPhone }}</td>
            <td>{{ users.userResult }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      email: "E-mail",
      name: "Full Name",
      tel: "Phone",
      results: "Result",
      userName: "",
      userEmail: "",
      userPhone: "",
      userResult: "0",
      usersArr: [
        // получение данных пользователя и результатов опроса
        {
          userName: (this.userName = JSON.parse(localStorage.getItem("name"))),
          userEmail: (this.userEmail = JSON.parse(
            localStorage.getItem("email")
          )),
          userPhone: (this.userPhone = JSON.parse(localStorage.getItem("tel"))),
          userResult: (this.userResult = JSON.parse(
            localStorage.getItem("results")
          )),
        },
      ],
    };
  },
};
</script>

<style scoped>
#results {
  height: 90.6vh;
  background-color: #fff;
}

#results h4 {
  font-weight: 500;
  color: #636b75;
  text-align: left;
  padding-top: 30px;
}

.results-content {
  margin-left: auto;
  margin-right: auto;
  width: 1400px;
}

.table-data {
  color: #636b75;
  font-weight: 300;
  letter-spacing: -0.011em;
}

table {
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  border-collapse: separate;
  border-spacing: 0;
  box-sizing: border-box;
  border: 1px solid #dde1e6;
  border-bottom: #636b7500;
  border-radius: 6px;
  margin-top: 31px;
}

.table-placeholder {
  font-weight: 600;
  background-color: #f9fafb;
}

td {
  border: solid 1px rgba(192, 192, 192, 0);
  border-bottom: solid 1px #dde1e6;
  border-style: solid none;
  padding: 12px;
  background-color: rgba(255, 255, 255, 0);
}

td:first-child {
  border-left-style: solid;
}

td:last-child {
  border-right-style: solid;
}
</style>
