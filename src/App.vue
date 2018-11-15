<template>
  <div id='app'>
    <div class="block" style="width: 400px;">
      <clock />
    </div>
    <div class="block" style="width: 400px;">
      <toDoList />
    </div>
    <!-- <div class="block">
      <imageSelector />
    </div> -->
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import toDoList from "./components/todo-list.vue";
import clock from './components/clock.vue';
import imageSelector from "./components/image-selector.vue";

export default Vue.extend({
  name: "app",
  components: {
    toDoList,
    clock,
    imageSelector
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
  display: inline-block;
  background-image: url("./assets/background/1.png");
  background-color: black;
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: red;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .block {
    margin: 10px;
  }
}
</style>
