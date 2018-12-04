<template>
  <div class="image-slide">
    <div class="display-zone" @dblclick="triggerImageSelector">
      <div class="empty-zone" v-if="images.length == 0">
        <img class="empty-icon" src="../assets/icon/image_upload.png">
        <p class="empty-icon-text">Please double click here to select your images.</p>
      </div>
      <img
        class="display-image"
        v-if="images.length > 0"
        v-bind:src="displayImage"
        @click="changeRandom"
      >
    </div>
    <div class="toolbar">
      <input
        ref="imageSelector"
        type="file"
        style="display: none;"
        @change="imageSelected"
        multiple
      >
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
export default Vue.extend({
  name: "image-slide",
  data() {
    return {
      images: [] as imageItem[], // 匯入的圖片
      // imagePaths: ["eu01.jpg", "eu02.jpg", "eu03.jpg"], // 預設圖片路徑
      currentIndex: 0,
      isRandom: false,
      displayImage: require("../assets/icon/image_upload.png"),
      slideInterval: 0
    };
  },
  methods: {
    /** 每隔一段時間變換圖片index, 依照isRandom有不同的取index方式 */
    setSlideDisplay() {
      let tmpIndex = this.currentIndex;
      // 隨機模式時亂數決定index
      if (this.isRandom) {
        tmpIndex = Math.floor(Math.random() * this.images.length);
      }
      // 若index相同時(隨機決定到相同數字或非隨機模式下)，index+1
      if (tmpIndex == this.currentIndex) {
        tmpIndex = (tmpIndex + 1) % this.images.length;
      }

      this.currentIndex = tmpIndex;
      this.displayImage = this.images[this.currentIndex].src;
      console.log(`images: ${this.images.length}, index: ${this.currentIndex}`);
    },
    /** 改變isRandom */
    changeRandom() {
      this.isRandom = !this.isRandom;
    },
    /** 觸發input來選擇圖片 */
    triggerImageSelector() {
      this.$refs.imageSelector.click();
    },
    /** 選完圖片後的流程，紀錄並改變展示的圖片 */
    imageSelected(event: any) {
      this.slideInterval = 0;
      this.images = [];
      const files = event.target.files; //取得File物件
      [].forEach.call(files, this.fileReader);
      if (this.slideInterval == 0) {
        this.slideInterval = setInterval(this.setSlideDisplay, 1000 * 30); // start interval after seconds
      }
    },
    fileReader(file: any) {
      const reader = new FileReader();
      reader.onloadend = (event: any) => {
        // 放入容器
        const image: imageItem = {
          title: file.name, // 檔名從參數來
          src: event.target.result // base64從onloadend event而來
        };
        this.images.push(image);
        if (this.images.length == 1) this.setSlideDisplay(); // 選圖後不等待interval，顯示圖片
      };
      reader.readAsDataURL(file);
    },
    resizeBase64Image(file: any) {
      const reader = new FileReader();
      reader.onloadend = e => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          if (context == null) return;
          const canvasWidth = img.naturalWidth;
          const canvasHeight = img.naturalHeight;
          console.log(`nw: ${canvasWidth}, ch: ${canvasHeight}`);
          context.drawImage(img, 0, 0, canvasWidth, canvasHeight);
          this.images.push({
            title: file.name,
            src: canvas.toDataURL("image/jpeg")
          });
        };
      };
      reader.readAsDataURL(file);
    }
  }
});
interface imageItem {
  title: string;
  src: string;
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped lang='less'>
.image-slide {
  .display-zone {
    min-height: 300px;
    position: relative;
    padding-bottom: 56.25%; // 維持16:9
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .empty-zone {
      text-align: center;
      .empty-icon {
        max-width: 100px;
        max-height: 100px;
      }
      .empty-icon-text {
        color: white;
      }
    }
    .display-image {
      width: 100%;
      height: 100%;
      filter: saturate(2);
      -webkit-filter: saturate(2); // 飽和濾鏡
      transition: background-image 1s ease-in-out; // 換圖動畫漸變
      -webkit-transition: background-image 1s ease-in-out;
      opacity: 0.75; // 透明度
    }
  }
}
</style>
