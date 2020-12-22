<template>
  <div class="border-2 px-4 py-3 rounded-md flex mb-3">
    <div :class="isDone" class="flex-1">{{ todo.todo }}</div>
    <div><input type="checkbox" v-model="todo.is_marked_done" /></div>
    <div><button class="ml-3 bg-red-500 text-white -my-3 py-3 px-3 -mr-4 rounded-md" type="button" @click="deleteMe">delete</button></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import api, { Todo as TodoType } from '../api'

export default defineComponent({
  name: 'Todo',
  props: {
    todo: {
      type: Object,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const todo = (props.todo) as TodoType;

    const isDone = computed(() => {
      if (todo.is_marked_done) {
        return 'line-through text-gray-500'
      }

      return ''
    })

    const deleteMe = () => {
      alert(`TODO: delete me! ID: ${props.id}`)
    }

    return { todo, isDone, deleteMe }
  },
  watch: {
    async 'todo.is_marked_done'() {
      await api.toggleMarkTodo(this.id, this.todo.is_marked_done);
    }
  }
})
</script>
