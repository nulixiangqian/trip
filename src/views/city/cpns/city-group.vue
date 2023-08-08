<template>
  <div class="city-group">
    <van-index-bar :sticky="false" :index-list="indexList">
      <van-index-anchor index="热门" />
      <div class="list">
        <div v-for="(item, index) in groupData.hotCities" :key="index">
          <div class="city" @click="cityClick(item)">{{item.cityName}}</div>
        </div>
      </div>
      <div v-for="(item, index) in groupData.cities" :key="index">
        <van-index-anchor :index="item.group" />
        <div v-for="(iten, indey) in item.cities" :key="indey">
          <van-cell :title="iten.cityName" @click="cityClick(iten)" />
        </div>
      </div>
    </van-index-bar>    
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import useCityStore from '@/store/modules/city.js';

// 定义props
const props = defineProps({
    groupData: {
        type: Object,
        default: () => ({})
    }
})

// 动态的索引
const indexList = computed(() => {
  const list = props.groupData.cities.map(item => item.group)
  list.unshift("#")
  return list
})

// 监听城市的点击
const router = useRouter()
const cityStore = useCityStore()
const cityClick = (item) => {
  // 选中当前的城市
  cityStore.currentCity = item
  // 返回上一级
  router.back()
} 

</script>


<style lang="less" scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;

  .city {
    width: 70px;
    height: 28px;
    border-radius: 14px;
    background-color: #fff4ec;
    font-size: 12px;
    text-align: center;
    line-height: 28px;
    margin: 6px;
  }
}
</style>