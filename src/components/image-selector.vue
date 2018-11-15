<template>
    <div class='image-selector'>
        <div class='toolbar'>
            
            <label for="randomModeCheck" style="margin-right: 5px;">Random</label>
            <input type='checkbox' id='randomModeCheck' v-model='randomMode' />
        </div>
        <div class="images">
            <img src="../assets/background/background.jpg" alt="bktest" class="image" />
            <img src="../assets/background/background.jpg" alt="bktest" class="image" />
            <img src="../assets/background/background.jpg" alt="bktest" class="image" />
        </div>
    </div>
</template>

<script lang='ts'>
import Vue from "vue";
import VueResource from "vue-resource";
Vue.use(VueResource);

export default Vue.extend({
  name: "image-selector",
  data() {
    return {
      imageFolder: "../assets/background",
      imageFiles: [],
      selected: "", // 目前選擇的圖片name
      randomMode: false
    };
  },
  methods: {},
  watch: {
    randomMode: {
      handler: function(data) {
        console.log(`randomMode:${data}`);
      }
    }
  }
});
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped lang='less'>
.toolbar {
  margin: 10px;
}
.image {
  max-width: 80px;
  max-height: 45px;
  margin: 5px;
}
</style>
