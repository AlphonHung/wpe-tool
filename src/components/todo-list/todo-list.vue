<template>
    <div class='todo-list'>
        <h1 class='header'>To Do List</h1>
        <button class='editButton' v-on:click="clickEdit()">Edit</button>
        <ul>
            <li v-for='item in items' :key='item.id'>
                <toDoListItem v-bind:item='item' v-bind:isEditMode='flag.isEditMode' />
            </li>
        </ul>
    </div>
</template>

<script lang='ts'>
import Vue from "vue";
import toDoListItem from "./todo-list-item.vue";

export default Vue.extend({
  name: "todo-list",
  components: {
    toDoListItem
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      flag: {
        isEditMode: false
      }
    };
  },
  methods: {
    clickEdit() {
      this.flag.isEditMode = !this.flag.isEditMode;
    }
  }
});
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped lang='less'>
.todo-list {
  position: relative;
  ul {
    list-style-type: none;
    padding: 0;
  }
  .header {
    text-align: center;
    color: white;
  }
  .editButton {
    position: absolute;
    right: 14px;
    top: 9px;
    border: 1px solid white;
    border-radius: 16px;
    padding: 5px 10px;
    color: white;
    background-color: transparent;
    transition: background-color;
    transition-duration: 300;
    &:hover {
      background-color: #e6e6e6;
      color: black;
    }
  }
}
</style>
