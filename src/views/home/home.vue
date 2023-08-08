<template>
  <div class="home">
    <home-nav-bar/>
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="">
    </div>
    <home-search-box :hotSuggests="hotSuggests"/>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import HomeNavBar from "./cpns/home-nav-bar.vue"
import HomeSearchBox from "./cpns/home-search-box.vue"
import useHomeStore from "@/store/modules/home.js";

// 热门建议
const homeStore = useHomeStore()
homeStore.fetchHotSuggestData()
const { hotSuggests } = storeToRefs(homeStore)

</script>
<style lang="less" scoped>
.banner {
  img {
    width: 100%;
  }
}

</style>
