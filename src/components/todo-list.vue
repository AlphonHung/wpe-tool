<template>
    <div class='todo-list'>
        <h1 class='header'>To Do List</h1>
        <div class='toolbar'>
          <input type='text' id='newTodoInput' v-model='newTodoInput' maxlength='18' placeholder='Please input title' />
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
import storage from "../helpers/storage";

export default Vue.extend({
  name: "todo-list",
  data() {
    return {
      items: JSON.parse(storage.fetch(storage.KEYS.LOCAL_STORAGE) || "[]") as Array<todoItem>,
      newTodoInput: "" // new todo的暫存字串
    };
  },
  computed: {
    /** 已排序的items */
    getRankedItems(): Array<todoItem> {
      return this.items.filter(x => x.isFinished).concat(this.items.filter(x => !x.isFinished));
    }
  },
  watch: {
    items: {
      handler: function(data) {
        storage.save(storage.KEYS.LOCAL_STORAGE, JSON.stringify(data));
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
      this.newTodoInput = '';
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
        "finished": item.isFinished
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
    #newTodoInput {
      .common-style;
      font-size: 24px;
      border-radius: 24px;
      max-width: 200px;
    }
  }
  .todos {
    padding: 5px 10px;
    li {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      height: 34px;
      .todo-text {
        color: white;
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
</style>
