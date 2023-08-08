<template>
    <div class="city top-page">
      <div class="top">
      <!-- 1,索引框 -->
      <van-search 
      v-model="searchValue" 
      show-action
      shape="round"
      placeholder="城市/区域/位置"
      @cancel="cancelClick"
      />
      <!-- 2，tab的切换 -->
      <van-tabs v-model:active="tabActive" color="#ff9854">
        <van-tab 
          v-for="(value, key, index) in allCities" 
          :key="index" 
          :title="value.title"
          :name="key"
        >
        </van-tab>
      </van-tabs>
      </div>
      <div class="content">
        <div v-for="(value, key, index) in allCities" :key="index">
          <city-group v-show="tabActive === key" :groupData="value" />
        </div>
        
      </div>
      
    </div>
    
</template>
<script setup>
import { ref } from "vue"
import { storeToRefs } from "pinia"
import { useRouter } from "vue-router"
import useCityStore from "@/store/modules/city.js"

import CityGroup from "./cpns/city-group.vue"

// 搜索框功能
const searchValue = ref("")
const router = useRouter()
const cancelClick = () => {
  router.back();
};

// tab切换
const tabActive = ref({});

// 网络请求：请求城市的数据
// const allCity = ref({})
// getCityAll().then(res => {
//   allCity.value = res.data
// })
// 从store中获取数据
const cityStore = useCityStore();
cityStore.fetchAllCitiesData();
const { allCities } = storeToRefs(cityStore)
</script>

<style lang="less" scoped>
.city {
  .top {
    position: relative;
    z-index: 9;
  }
  .content {
    height: calc(100vh - 98px);
    overflow-y: auto;
  }
}
</style>