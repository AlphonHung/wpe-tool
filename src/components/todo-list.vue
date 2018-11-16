<template>
    <div class='todo-list'>
      <div class="theme-line-top"></div>
        <p class='header'>Missions</p>
        <div class='toolbar'>
          <input type='text' id='newTodoInput' v-model='newTodoInput' maxlength='100' placeholder='New Mission...' />
          <button id='refreshBtn' class="button" v-on:click="clickRefresh()">Refresh</button>
          <button id='newTodoBtn' class="button" v-on:click="clickAdd()">Add</button>
        </div>
        <ul class='todos' v-show='items.length > 0'>
            <li v-for='item in getRankedItems' :key='item.id'>
              <span class='todo-text' v-bind:class="getFinishClass(item)">{{ item.text }}</span>
              <div class="todo-btns">
                <button id='finishTodoBtn' class="button" v-on:click="clickFinish(item.id)">Fin</button>
                <button id='deleteTodoBtn' class="button" v-on:click="clickDelete(item.id)">Del</button>
              </div>
            </li>
        </ul>
    </div>
</template>

<script lang='ts'>
import Vue from "vue";
import storage from "../helpers/storage.helper";

export default Vue.extend({
  name: "todo-list",
  data() {
    return {
      items: JSON.parse(storage.fetch(storage.KEYS.TODO_LIST) || "[]") as Array<
        todoItem
      >,
      newTodoInput: "" // new todo的暫存字串
    };
  },
  computed: {
    /** 已排序的items */
    getRankedItems(): Array<todoItem> {
      return this.items
        .filter(x => x.isFinished)
        .concat(this.items.filter(x => !x.isFinished));
    }
  },
  watch: {
    items: {
      handler: function(data) {
        storage.save(storage.KEYS.TODO_LIST, JSON.stringify(data));
      },
      deep: true // deep copy
    }
  },
  methods: {
    /** 新增todo */
    clickAdd() {
      this.items.push({
        id: Math.random()
          .toString(16)
          .substr(2), // ramdon string
        text: this.newTodoInput,
        isFinished: false
      });
      this.newTodoInput = "";
    },
    clickRefresh() {
      this.items = this.items.filter(x => !x.isFinished);
    },
    /** todo標示已完成 */
    clickFinish(id: string) {
      var item = this.items.find(x => x.id === id);
      if (item) item.isFinished = !item.isFinished;
    },
    /** 刪除todo */
    clickDelete(id: string) {
      this.items = this.items.filter(x => x.id != id);
    },
    /** todo item判斷是否掛上class */
    getFinishClass(item: todoItem) {
      return {
        finished: item.isFinished
      };
    }
  }
});
interface todoItem {
  id: string;
  text: string;
  isFinished: boolean;
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped lang='less'>
.common-style() {
  border: 1px solid white;
  padding: 5px 10px;
  color: white;
  background-color: transparent;
  margin: 2px;
}
.button {
  .common-style;
  border-radius: 16px;
  transition: background-color 0.3s, color 0.3s;
  -webkit-transition: background-color 0.3s, color 0.3s;
  &:hover {
    background-color: #e6e6e6;
    color: black;
  }
}
.todo-list {
  position: relative;
  background-color: rgba(64, 64, 64, 0.6);
  transition: background-color 0.3s, color 0.3s;
  -webkit-transition: background-color 0.3s, color 0.3s;
  ul {
    list-style-type: none;
    padding: 0;
  }
  &:hover {
    background-color: transparent;
  }
  .header {
    text-align: center;
    color: #cbe6ff;
    text-shadow: 0em 0em 0.3em #1870c7, 0em 0em 0.1em #cbe6ff;
    padding-top: 8px;
    font-size: 34px;
  }
  .toolbar {
    padding: 5px 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    #newTodoInput {
      .common-style;
      font-size: 12px;
      border-radius: 24px;
      width: 100%;
    }
  }
  .todos {
    padding: 5px 10px;
    li {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      min-height: 34px;
      .todo-text {
        color: #cbe6ff;
        word-break: break-all;
        font-size: 16px;
        &.finished {
          color: #a6a6a6;
        }
      }
      .todo-btns {
        min-width: 88px;
      }
    }
  }
}
.hidden {
  display: none;
}
.theme-line-top {
  position: absolute;
  top: 2px;
  width: 100%;
  height: 2px;
  background-color: #004489;
}
</style>
