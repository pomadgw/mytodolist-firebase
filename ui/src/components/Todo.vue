<template>
  <div>
    {{ todo.todo }}
    <input type="checkbox" :checked="todo.is_marked_done" />
  </div>
</template>

<script type="ts">
export default {
  name: 'Todo',
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const { todo } = props;
    console.log(props)

    return { todo }
  }
}
</script>
