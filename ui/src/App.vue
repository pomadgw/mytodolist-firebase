<template>
  <div>
    <Todo v-for="(todo, idx) in todos" :key="idx" :todo="todo" />
    <input v-model="newTodo" type="text" @keyup.enter="addTodo" />
  </div>
</template>

<script type="ts">
import api from './api'
import Todo from './components/Todo.vue'

export default {
  name: 'App',
  components: {
    Todo
  },
  data: () => ({
    todos: [],
    newTodo: ''
  }),
  async created() {
    await this.loadTodos();
  },
  methods: {
    async loadTodos() {
      this.todos = (await api.getTodos()).data;
    },
    async addTodo() {
      await api.createTodo(this.newTodo);
      await this.loadTodos();
    }
  },
}
</script>
