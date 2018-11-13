<template>
  <div class='todo-list-item'>
    <!-- 顯示模式 -->  
    <div v-show="!isEditMode">
      <h4 class='title'>{{ item.title }}</h4>
      <div class='details' v-show='item.details.length > 0'>
        <ul>
          <li v-for='detail in item.details' :key='detail.id'>
            <span class='key'>{{ detail.key }}</span>
            <span> | </span>
            <span class='value'>{{ detail.value }}</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 編輯模式 -->  
    <div v-show="isEditMode">
      <input v-model='item.title' type='text' maxlength='20' placeholder='Please input title' />
      <div class='details' v-show='item.details.length > 0'>
        <ul>
          <li v-for='detail in item.details' :key='detail.id'>
            <input class='key' v-model='detail.key' placeholder='Input detail key' />
            <span> | </span>
            <input class='value' v-model='detail.value' placeholder='Input detail value' />
          </li>
        </ul>
      </div>
    </div>
    </div>
</template>

<script lang='ts'>
import Vue from "vue";

export default Vue.extend({
  name: "todo-list-item",
  props: {
    item: {
      type: Object,
      required: true
    },
    isEditMode: {
      type: Boolean,
      required: true
    }
  }
});
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped lang='less'>
.todo-list-item {
  padding: 5px 15px;
  .title {
    color: white;
    text-align: center;
    font-weight: bold;
    margin: 10px;
  }
  .details {
    ul {
      list-style-type: none;
      color: #e4e4e4;
      li {
        .key {
          max-width: 30%;
        }
        .value {
          max-width: 100%;
        }
      }
    }
  }
}
</style>
