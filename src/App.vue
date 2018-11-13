<template>
  <div id='app'>
    <!-- <img alt='Vue logo' src='./assets/logo.png'> -->
    <!-- <HelloWorld msg=''/> -->
    <div class="block">
      <toDoList v-bind:items="toDoList" />
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import toDoList from "./components/todo-list/todo-list.vue";

export default Vue.extend({
  name: "app",
  components: {
    HelloWorld,
    toDoList
  },
  data() {
    return {
      toDoList: ["Test A", "Test B"]
    };
  }
});
</script>

<style lang='less'>
/*清除內外框margin*/
html,
body,
div,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
p,
blockquote,
dl,
dt,
dd,
ul,
ol,
li,
pre,
form,
fieldset,
object,
code,
em,
span,
var,
legend,
button,
input,
textarea,
th,
td,
a,
img,
header,
footer,
nav,
aside,
audio,
datalist,
section {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
}

#app {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  background-image: url("./assets/background/background.jpg");
  .block {
    height: 100%;
    width: 300px;
    margin: 10px 5px;
    display: inline-block;
    overflow-y: scroll;
    background-color: rgba(64, 64, 64, 0.6);
  }
}
</style>
