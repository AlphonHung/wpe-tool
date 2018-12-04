<template>
  <div class="image-slide">
    <div
      class="display-zone"
      v-bind:style="displayImage"
      @click="changeRandom"
      @dblclick="triggerImageSelector"
    ></div>
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
import storage from "../helpers/storage.helper";
export default Vue.extend({
  name: "image-slide",
  data() {
    return {
      images: [] as any[], // 匯入的圖片
      imagePaths: ["eu01.jpg", "eu02.jpg", "eu03.jpg"], // 預設圖片路徑
      currentIndex: 0,
      isRandom: false,
      displayImage: {
        backgroundImage: ""
      }
    };
  },
  methods: {
    /** 每隔一段時間變換圖片index, 依照isRandom有不同的取index方式 */
    setSlideDisplay() {
      let tmpIndex = this.currentIndex;
      const tmpImages = this.images.length > 0 ? this.images : this.imagePaths;

      // 隨機模式時亂數決定index
      if (this.isRandom) {
        tmpIndex = Math.floor(Math.random() * tmpImages.length);
      }
      // 若index相同時(隨機決定到相同數字或非隨機模式下)，index+1
      if (tmpIndex == this.currentIndex) {
        tmpIndex = (tmpIndex + 1) % tmpImages.length;
      }

      this.currentIndex = tmpIndex;
      const url =
        this.images.length > 0
          ? tmpImages[this.currentIndex].src
          : require(`../assets/background/${tmpImages[this.currentIndex]}`);
      this.displayImage.backgroundImage = `url('${url}')`;
      setTimeout(() => {
        this.setSlideDisplay();
      }, 1000 * 5);
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
      this.images = [];
      const files = event.target.files; //取得File物件
      [].forEach.call(files, this.fileReader);

      setTimeout(() => {
        // download by base64
        // this.saveImage(this.images[0]);
        // storage.save(storage.KEYS.IMAGE_SLIDE, JSON.stringify(this.images));
        // const test = storage.fetch(storage.KEYS.IMAGE_SLIDE);
        // console.log(test);
      }, 3000);
    },
    fileReader(file: any) {
      console.log(file);
      const reader = new FileReader();
      reader.onloadend = (event: any) => {
        const image: imageItem = {
          title: file.name, // 檔名從參數來
          src: event.target.result // base64從onloadend event而來
        };
        this.images.push(image);
        this.saveImage(image);
      };
      reader.readAsDataURL(file);
    },
    saveImage(image: imageItem) {
      const link = document.createElement("a");
      link.setAttribute("href", image.src);
      link.setAttribute("download", image.title);
      link.click();
    }
  },
  created() {
    // this.images = JSON.parse(
    //   storage.fetch(storage.KEYS.IMAGE_SLIDE) || "[]"
    // ) as Array<any>;
    // console.log(this.images);
    this.setSlideDisplay();
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
  // background-color: white;
  .display-zone {
    filter: saturate(2);
    -webkit-filter: saturate(2); // 飽和濾鏡
    position: relative;
    // margin: 10px;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    transition-timing-function: cubic-bezier(0, 0, 1, 1);
    transition: background-image 1s ease-in-out; // 換圖動畫漸變
    -webkit-transition: background-image 1s ease-in-out;
    padding-bottom: 56.25%; // 維持16:9
    opacity: 0.75; // 透明度
    // border: 16px solid rgba(0, 0, 0, 0.1);
  }
  #imageInputs {
    display: none;
  }
}
</style>
