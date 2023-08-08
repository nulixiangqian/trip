<template>
  <div class="tab-bar">
    <van-tabbar v-model="currentIndex" active-color="#ff9854">
      <van-tabbar-item :to="item.path" v-for="(item, index) in tabbarData" :key="index">
        <span>{{item.text}}</span> 
        <template #icon>
          <img v-if="currentIndex !== index" :src="getAssetURL(item.image)" alt="">
          <img v-else :src="getAssetURL(item.imageActive)" alt="">        
        </template>
     </van-tabbar-item>
    </van-tabbar>   
  </div>
</template>

<script setup>
import tabbarData from "@/assets/data/tabbar.js";
import { getAssetURL } from "@/utils/get_assets_img.js";
import { ref } from "vue";
import { useRouter } from "vue-router";

const currentIndex = ref(0);


</script>
<style lang="less" scoped>
.tab-bar {
  img {
    height: 27px;
  }
}
</style>