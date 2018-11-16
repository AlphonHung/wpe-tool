<template>
  <div id='app'>
    <div class='left-blocks'>
      <div class="block">
        <clock />
      </div>
      <div class="block">
        <toDoList />
      </div>
    </div>
    <div class='right-blocks'>
      <div class="block">
        <imageSlide />
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import toDoList from "./components/todo-list.vue";
import clock from "./components/clock.vue";
import imageSlide from "./components/image-slide.vue";

export default Vue.extend({
  name: "app",
  components: {
    toDoList,
    clock,
    imageSlide
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
  // display: flex;
  background-image: url("./assets/background/main-background.png");
  background-color: black;
  background-size: cover;
  background-repeat: no-repeat;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .left-blocks {
    float: left;
    height: 100%;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 440px;
    .block {
      margin: 10px;
      width: 400px;
    }
  }
  .right-blocks {
    margin-left: 440px;
    .block {
      margin: 10px;
    }
  }
}
</style>
