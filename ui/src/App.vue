<template>
  <div>
    Test
  </div>
</template>

<script type="ts">
import api from './api'

export default {
  name: 'App',
  data: () => ({
    todos: []
  }),
  async created() {
    this.todos = await api.getTodos();
  }
}
</script>
