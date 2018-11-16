<template>
    <div class="image-slide" v-bind:style="{ backgroundImage: 'url(' + currentImage + ')' } " @dblclick="changeRandom"></div>
</template>

<script lang='ts'>
import Vue from "vue";

export default Vue.extend({
  name: "image-slide",
  data() {
    return {
      imagePaths: ["eu01.jpg", "eu02.jpg", "eu03.jpg"],
      currentIndex: 0,
      isRandom: false
    };
  },
  computed: {
    /** 當currentIndex變化時自動改變圖片路徑 */
    currentImage(): string {
      return require(`../assets/background/${
        this.imagePaths[this.currentIndex]
      }`);
    }
  },
  methods: {
    /** 每隔一段時間變換圖片index, 依照isRandom有不同的取index方式 */
    setSlideDisplay() {
      let tmpIndex = this.currentIndex;
      if (this.isRandom) {
        tmpIndex = Math.floor(Math.random() * this.imagePaths.length);
        if (tmpIndex == this.currentIndex) tmpIndex += 1; // 避免換到相同圖片
      } else {
        tmpIndex = (this.currentIndex + 1) % this.imagePaths.length;
      }
      this.currentIndex = tmpIndex;
      setTimeout(() => {
        this.setSlideDisplay();
      }, 1000 * 5);
    },
    /** 改變isRandom */
    changeRandom() {
      this.isRandom = !this.isRandom;
    }
  },
  created() {
    this.setSlideDisplay();
  }
});
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped lang='less'>
.image-slide {
  position: relative;
  margin: 10px;
  background-repeat: no-repeat;
  background-size: contain;
  transition: background-image 1s ease-in-out;
  -webkit-transition: background-image 1s ease-in-out;
  padding-bottom: 56.25%;
  opacity: 0.75;
}
</style>
