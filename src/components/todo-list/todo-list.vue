<template>
    <div class='todo-list'>
        <h1 class='header'>To Do List</h1>
        <div class='toolbar'>
          <input type='text' id='newTodoText' v-model='newTodoText' maxlength='20' placeholder='Please input title' />
          <button id='newTodoBtn' v-on:click="clickAdd()">Add</button>
        </div>
        <ul class='todos' v-show='items.length > 0'>
            <li v-for='item in items' :key='item.id'>
              <span class='item'>{{ item }}</span>
            </li>
        </ul>
    </div>
</template>

<script lang='ts'>
import Vue from "vue";

export default Vue.extend({
  name: "todo-list",
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      newTodoText: ''
    }
  },
  methods: {
    clickAdd() {
      this.items.push(this.newTodoText);
    }
  }
});
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped lang='less'>
.common-style() {
  border: 1px solid white;
  padding: 5px 10px;
  color: white;
  background-color: transparent;
}
.todo-list {
  ul {
    list-style-type: none;
    padding: 0;
  }
  .header {
    text-align: center;
    color: white;
  }
  .toolbar {
    padding: 5px 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    #newTodoText {
      .common-style;
      font-size: 24px;
      border-radius: 24px;
      max-width: 200px;
    }
    #newTodoBtn {
      .common-style;
      border-radius: 16px;
      transition: background-color 0.3s, color 0.3s;
      -webkit-transition: background-color 0.3s, color 0.3s;
      &:hover {
        background-color: #e6e6e6;
        color: black;
      }
    }
  }
  .todos {
    padding: 5px 15px;
    .item {
      color: #e4e4e4;
    }
  }
}
</style>
