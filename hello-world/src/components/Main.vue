<template>
  <main id="results">
    <div class="results-content">
      <h4>Site &#160; / &#160; List of respondents</h4>
      <div class="table-container">
        <table class="table-results">
          <tbody>
            <tr class="table-placeholder">
              <td>{{ name }}</td>
              <td>{{ email }}</td>
              <td>{{ tel }}</td>
              <td>{{ results }}</td>
            </tr>
            <tr
              v-for="users in registeredUserArr"
              v-show="isUserExist()"
              class="table-data"
            >
              <td>{{ users.userName }}</td>
              <td>{{ users.userEmail }}</td>
              <td>{{ users.userPhone }}</td>
              <td>{{ users.userResult }}</td>
            </tr>
            <tr v-for="users in othersArr" class="table-others">
              <td>{{ users.name }}</td>
              <td>{{ users.email }}</td>
              <td>{{ users.phone }}</td>
              <td>{{ users.results }}/10</td>
            </tr>
          </tbody>
        </table>
      </div>
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
      userResult: "",
      registeredUserArr: [
        // получение данных пользователя
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
      othersArr: {
        anotherUserOne: {
          name: "Michael Johnson",
          email: "michaelmail@mail.com",
          phone: "+79895467336",
          results: 5,
        },
        anotherUserTwo: {
          name: "Elon Musk",
          email: "elon@mail.com",
          phone: "+75648875384",
          results: 10,
        },
        anotherUserThree: {
          name: "Steve Jobs",
          email: "jobssteveee@mail.com",
          phone: "+75456877478",
          results: 9,
        },
      },
    };
  },
  methods: {
    isUserExist() {
      return localStorage.length !== 0;
    },
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

.table-data,
.table-others {
  color: #52555a;
  font-weight: 300;
  letter-spacing: -0.011em;
}

.table-container {
  margin-top: 30px;
  border-radius: 5px;
  height: 70vh;
  border: 1px solid #dde1e6;
}

table {
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  border-collapse: separate;
  border-spacing: 0;
  box-sizing: border-box;
  border: none;
  border-bottom: #636b7500;
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
