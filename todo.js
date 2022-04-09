// Описание задачи:
// Исправить и дополнить приложение Список задач,
// в функционал которого входит:
// 1) Добавление новых задач;
// 2) Отображение списка задач;
// 3) Фильтрация задач по статусу;
// 4) Удаление элементов из списка задач;
// 5) Получение задач из удалённого хранилища при инициализации приложения
// (https://my-json-server.typicode.com/falk20/demo/todos);

// От вас требуется:
// 1. Доработать приложение в соответствии с заявленным функционалом.
// 2. Описать ваши изменения в коде комментариями.
// Изменять код можно как душа пожелает.

import Vue from "vue";
// импортируем vue более привычным образом - здесь это работает 
window.app = new Vue({
  el: "#app",
  data() {
    return {
      innerData: {
        zadachi: [],
        activeFilter: "all"     //установим all - чтобы сразу оттображался список
      },
      value: "Задача 1"
    };
  },
  created() {
    // делаем запрос к api - получаем данные
    fetch("https://my-json-server.typicode.com/falk20/demo/todos")
      .then((response) => response.json())
      .then((response) => this.setZadachi(response));
    // преобразовали ответ в json и загрузили в data -> zadachi
  },
  mounted() {
    var search = document.getElementById("search") || {};
   // search.focus();
   //делаем активным окно для добавления задач
  },
  template: `
    <div>
        <div style="margin-bottom:10px">
          <input v-bind:value="value" id="search" />
          <button v-on:click="todo()">Добавить задачу</button>
        </div>

        <div>
          <span v-on:click="setFilter('active')">Активные</span>
          <span v-on:click="setFilter('completed')" style="margin-left:10px">Завершенные</span>
          <span v-on:click="setFilter('all')" style="margin-left:10px" >Все</span>
          </div>
        <br/>

        <div v-if="this.innerData.activeFilter == 'active'">
          <div v-for="todo of this.innerData.zadachi" style="display:flex" v-if="todo.active == true" >
            <h6 style="margin:0 5px">{{ todo.text }}</h6>
            <div v-on:click="remove(todo.id)" style="margin-left:10px; color:red; cursor:pointer"><h5 style="margin:0 5px">X</h5></div>
          </div>
        </div>

        <div v-if="this.innerData.activeFilter == 'all'" >
          <div v-for="todo of this.innerData.zadachi" style="display:flex">
            <h6 style="margin:0 5px">{{ todo.text }}</h6>
            <div v-on:click="remove(todo.id)" style="margin-left:10px; color:red; cursor:pointer"><h5 style="margin:0 5px">X</h5></div>
        </div>
      </div>

        <div v-if="this.innerData.activeFilter == 'completed'">
          <div v-for="todo of this.innerData.zadachi" style="display:flex" v-if="todo.active == false">
            <h6 style="margin:0 5px">{{ todo.text }}</h6>
            <div v-on:click="remove(todo.id)" style="margin-left:10px; color:red; cursor:pointer"><h5 style="margin:0 5px">X</h5></div>
          </div>
        </div>
 
    </div>
  `,

  methods: {
    // добавление задачи в список
    todo(t) {
      // формируем объект с новой задачей
      var newTodo = {
          'id': this.innerData.zadachi.length + 1,
          'text': document.getElementById("search").value,
          'active': true
        };
        // добавляем новый объект в список
        this.innerData.zadachi.push(newTodo);
    },
    // удаление задачи из списка
    remove(t) {
      // новый массив с задачами пустой
      var todos = [];
      // перебираем массив с задачами, записываем в новый массив только те задачи
      // id которых не совпадает с переданным параметром
      for (var i = 0; i < this.innerData.zadachi.length; i++) {
        if (this.innerData.zadachi[i].id != t) {
          todos.push(this.innerData.zadachi[i]);
        }
      }
      // новым массивом замещаем список задач
      this.setZadachi(todos);
    },
    // установка нового значения фильтра задач
    setFilter(filter) {
      this.$set(this.innerData, "activeFilter", filter);
    },
    // загрузка списка задач
    setZadachi(todos) {
      this.$set(this.innerData, "zadachi", todos);
    }
  }
});
