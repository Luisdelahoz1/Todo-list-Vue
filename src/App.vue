<template>
  <div id="app">
    <TodoList />
  </div>
</template>


<script>
import TodoList from '../src/components/todo-list.vue';

export default {
  components: {
    TodoList,
  },
};
</script>