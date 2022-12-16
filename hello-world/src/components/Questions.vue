<template>
  <main id="registration" v-for="items in renderRegistration">
    <Form @submit="onSubmit">
      <div class="container">
        <h4>Site &#160;/&#160; Interview</h4>
        <div class="fields">
          <p>Full Name</p>
          <Field
            name="name"
            type="name"
            :rules="validateName"
            v-model="name"
            class="field"
            placeholder="Full Name"
          />
          <ErrorMessage name="name" class="errors" />
          <p>E-mail</p>
          <Field
            name="email"
            type="email"
            :rules="validateEmail"
            v-model="email"
            class="field"
            placeholder="example@email.com"
          />
          <ErrorMessage name="email" class="errors" />
          <p>Phone</p>
          <Field
            name="tel"
            type="tel"
            :rules="validateTel"
            v-model="tel"
            class="field"
            placeholder="+7__________"
          />
          <ErrorMessage name="tel" class="errors" />
          <div class="buttons">
            <router-link to="/" class="button-back"
              >Вернуться к списку
            </router-link>
            <button
              class="button-login"
              @click="
                persist();
                updateRegistration();
              "
              @keypress.enter="persist"
              :disabled="isDisabled"
            >
              Начать опрос
            </button>
          </div>
        </div>
      </div>
    </Form>
  </main>
  <div id="questions" v-for="items in renderQuestions">
    <div class="content">
      <h4>Site &#160; / &#160; Interview</h4>
      <p>{{ title }}</p>
      <div class="progressbar">
        <div class="steps" v-for="questionsCount in questions">
          <hr
            class="progress-step"
            :class="{
              progressStepCurrent: questionsCount.id === questionIndex + 1,
            }"
          />
          <span
            class="progress-point"
            @click="questionIndex = questionsCount.id - 1"
          >
            <img
              src="../images/state.png"
              alt="progress"
              class="points"
              v-if="questionsCount.id > questionIndex + 1"
            />
            <img
              src="../images/current.png"
              alt="progress"
              class="points"
              v-if="questionsCount.id === questionIndex + 1"
            />
            <img
              src="../images/done.png"
              alt="progress"
              class="points"
              v-if="questionsCount.id < questionIndex + 1"
            />
            <h2>Вопрос {{ questionsCount.id }}&#160;</h2>
          </span>
        </div>
      </div>
      <div class="container-quest">
        <div v-for="(questions, index) in questions">
          <div v-show="index === questionIndex">
            <div class="quests">
              <p v-for="title in questions.text">{{ title }}</p>
              <br />
              <label
                v-for="answer in questions.responses"
                v-if="questionIndex === 0"
                class="choose"
              >
                <input
                  type="radio"
                  v-model="radios"
                  :id="answer.id"
                  :value="answer.points"
                />
                {{ answer.text }}
              </label>
              <label
                v-for="answer in questions.responses"
                v-if="questionIndex === 1"
                class="choose"
              >
                <input type="number" v-model="months" :id="answer.id" />
                {{ answer.text }}
              </label>
              <label
                v-for="answer in questions.responses"
                v-if="questionIndex === 2"
                class="choose"
              >
                <input
                  type="checkbox"
                  v-model="rainbow"
                  :id="answer.id"
                  :value="answer.points"
                />
                {{ answer.text }}
              </label>
              <select
                v-if="questionIndex === 3"
                class="select"
                v-model="particles"
              >
                <option
                  v-for="answer in questions.responses"
                  type="checkbox"
                  :id="answer.id"
                  :value="answer.points"
                >
                  {{ answer.text }}
                </option>
              </select>
              <label
                v-for="answer in questions.responses"
                v-if="questionIndex === 4"
                class="choose"
              >
                <input type="text" v-model="universe" :id="answer.id" />
              </label>
              <button
                v-if="questionIndex > 0"
                v-on:click="prev"
                class="btn-prev"
              >
                Вернуться назад
              </button>
              <button
                v-if="questionIndex < 4"
                v-on:click="next"
                class="btn-next"
              >
                Следующий
              </button>
              <router-link
                to="/"
                v-if="questionIndex === 4"
                v-on:click="addCurrentResults()"
                class="btn-next"
              >
                Завершить опрос
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
  data() {
    return {
      localStorageData: localStorage?.length,
      renderRegistration: localStorage?.length === 0 ? ["1"] : [],
      name: "",
      email: "",
      tel: "",
      renderQuestions: localStorage?.length > 0 ? ["1"] : [],
      title: "Вопросы:",
      questionIndex: 0,
      radios: 0,
      months: 0,
      rainbow: [],
      particles: 0,
      universe: 0,
      arrOfModels: [],
      results: [],
      questions: [
        // вопросы и баллы за них
        {
          text: ["Какого числа Хэллоуин?"],
          id: 1,
          responses: [
            { text: "31 Октября", points: 2 },
            { text: "1 Ноября", points: 1 },
            { text: "1 Октября", points: -1 },
          ],
        },
        {
          text: ["Сколько месяцев в году?"],
          id: 2,
          responses: [{ text: " месяцев", points: 0 }],
        },
        {
          text: ["Какие из этих цветов есть в радуге?"],
          id: 3,
          responses: [
            { text: "Красный", points: 1 },
            { text: "Розовый", points: 0 },
            { text: "Зелёный", points: 2 },
          ],
        },
        {
          text: [
            "Последняя обнаруженная частица Стандартной элементарной модели",
          ],
          id: 4,
          responses: [
            { text: "Мьюонное нейтрино", points: 0 },
            { text: "Гравитон", points: 1 },
            { text: "Бозон Хиггса", points: 2 },
          ],
        },
        {
          text: ["Ответ на главный вопрос жизни, вселенной и всего такого"],
          id: 5,
          responses: [{ points: 0 }],
        },
      ],
    };
  },
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  methods: {
    // скрыть окно регистрации после ее завершения и отобразить опрос
    updateRegistration() {
      this.renderRegistration.shift();
      this.renderQuestions.push(1);
      this.isRegistered = true;
    },
    // след. вопрос
    next() {
      this.questionIndex++;
    },
    // пред. вопрос
    prev() {
      this.questionIndex--;
    },
    onSubmit(values) {
      console.log(JSON.stringify(values, null, 2));
    },
    // валидация полного имени
    validateName(value) {
      if (!value) {
        return "Это поле необходимо для заполнения";
      }
      const regex = /^([\w]{3,})+\s+([\w\s]{3,})+$/i;
      if (!regex.test(value)) {
        return "Неккоретное имя";
      }
      return true;
    },
    // валидация почты
    validateEmail(value) {
      if (!value) {
        return "Это поле необходимо для заполнения";
      }
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!regex.test(value)) {
        return "Неверный email адрес";
      }
      return true;
    },
    // валидация номера телефона
    validateTel(value) {
      if (!value) {
        return "Это поле необходимо для заполнения";
      }
      const regex =
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
      if (!regex.test(value)) {
        return "Неверный номер телефона";
      }
      return true;
    },
    // создание переменных в ls
    mounted() {
      if (localStorage.name) this.name = localStorage.name;
      if (localStorage.email) this.email = localStorage.email;
      if (localStorage.tel) this.tel = localStorage.tel;
      if (localStorage.radios) this.radios = localStorage.radios;
      if (localStorage.results) this.results = localStorage.results;
    },
    // Подсчёт результатов после прохождения опроса
    addCurrentResults() {
      this.months === 12 ? (this.months = 1) : (this.months = 0);
      this.universe === "42" ? (this.universe = 2) : (this.universe = 0);
      const countedRainbows = (this.rainbow = this.rainbow.reduce(
        (acc, curr) => acc + curr,
        0
      ));
      this.results.push(
        this.radios,
        this.months,
        countedRainbows,
        this.particles,
        this.universe
      );
      this.results = this.results.reduce((acc, curr) => acc + curr, 0) + "/10";
      localStorage.results = JSON.stringify(this.results);
    },
    // данные зарегистрированного пользователя отправляются в localStorage
    persist() {
      localStorage.name = JSON.stringify(this.name);
      localStorage.email = JSON.stringify(this.email);
      localStorage.tel = JSON.stringify(this.tel);
      localStorage.results = JSON.stringify("0/10");
    },
  },
  computed: {
    // disabled кнопки регистрации
    isDisabled() {
      return this.name.length <= 3 ||
        this.email.length <= 6 ||
        this.tel.length < 8
        ? true
        : false;
    },
  },
};
</script>

<style scoped>
.container {
  margin-left: auto;
  margin-right: auto;
  width: 1400px;
}

h4 {
  font-weight: 500;
  color: #636b75;
  text-align: left;
  padding-top: 30px;
}

.errors {
  margin-bottom: 2.5vh;
  color: rgb(241, 56, 56);
}

.fields {
  padding-top: 4%;
  width: 30%;
  display: flex;
  flex-direction: column;
  margin: auto;
}

.fields input {
  margin-bottom: 2.5vh;
  border-radius: 5px;
  border: 1px solid #94aae7;
  padding: 8px 12px;
}

.buttons {
  margin-top: 10px;
  width: 100%;
  text-align: center;
  display: grid;
  grid-template-columns: 200px auto;
}

.button-back,
.button-login {
  text-decoration: none;
  text-align: center;
  transition: 0.2s;
  font-size: 16px;
  font-weight: 500;
  padding: 12px;
  cursor: pointer;
  border-radius: 10px;
  color: rgb(255, 255, 255);
  border: none;
}

.button-login {
  margin-left: 50px;
  background-color: #27ae60;
}

.button-back {
  background-color: #2f54eb;
}

.button-login:disabled {
  background-color: rgb(161, 161, 161);
  cursor: not-allowed;
  opacity: 0.75;
}

.button-login:disabled:hover {
  background-color: rgb(161, 161, 161);
  cursor: not-allowed;
  opacity: 0.75;
  transform: scale(1);
}

.button-back:hover {
  transition: 0.2s;
  transform: scale(1.03);
  background-color: #2445ca;
}

.button-login:hover {
  transition: 0.2s;
  transform: scale(1.03);
  background-color: #1f914e;
}
.progress-step {
  width: 145.2px;
  background-color: #c1c9d2;
  border: none;
  margin-right: 10px;
  border-radius: 10px;
  height: 4px;
}

.progressStepCurrent {
  width: 145.2px;
  background-color: #5469d4;
  border: none;
  margin-right: 10px;
  border-radius: 10px;
  height: 4px;
}

.progressbar {
  margin-bottom: 20vh;
  text-align: left;
  align-items: center;
  justify-content: center;
  display: flex;
}

.progress-point {
  align-items: center;
  display: flex;
  cursor: pointer;
}

.points {
  margin-right: 5px;
}

.steps h2 {
  font-size: 14px;
}

h2 {
  font-weight: 400;
  color: #697386;
}

.content {
  margin-left: auto;
  margin-right: auto;
  width: 1400px;
}

.container-quest {
  display: flex;
  justify-content: center;
}

p {
  font-size: 25px;
}

.quests {
  display: flex;
  align-items: center;
  justify-content: center;
}

.quests p {
  max-width: 300px;
  font-size: 20px;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
}

.choose {
  margin-left: 20px;
  margin-right: 40px;
}

.choose input {
  border: 1px solid rgb(206, 206, 206);
  border-radius: 10px;
  padding: 12px;
}

.select {
  margin-right: 50px;
  font-size: 16px;
  border: 1px solid rgb(206, 206, 206);
  border-radius: 10px;
  padding: 12px;
}

.btn-next,
.btn-prev {
  margin-right: 15px;
  text-decoration: none;
  font-size: 15px;
  transition: 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  gap: 4px;
  cursor: pointer;
  border-radius: 10px;
  color: rgb(255, 255, 255);
  border: none;
}

.btn-next {
  background-color: #27ae60;
}

.btn-prev {
  background-color: #2f54eb;
}

.btn-next:hover {
  background-color: #228d4f;
}

.btn-prev:hover {
  background-color: #2a47bb;
}

.btn-next:hover,
.btn-prev:hover {
  transition: 0.2s;
  transform: scale(1.03);
}
</style>
