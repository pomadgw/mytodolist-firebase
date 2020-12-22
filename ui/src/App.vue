<template>
  <div class="flex flex-col mx-64 my-20">
    <Todo v-for="(todo, idx) in todos" :key="idx" :id="idx" :todo="todo" />
    <div class="flex">
      <input placeholder="Fill a todo" class="flex-1 px-4 py-3 leading-5 border rounded-md" v-model="newTodo" type="text" @keyup.enter="addTodo" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import api, { Todo as TodoType } from './api'
import Todo from './components/Todo.vue'

export default defineComponent({
  name: 'App',
  components: {
    Todo
  },
  data: () => ({
    todos: [] as TodoType[],
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
})
</script>
