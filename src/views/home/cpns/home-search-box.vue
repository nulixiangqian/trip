<template>
  <div class="search-box">
    <!-- 位置信息 -->
    <div class="location bottom-gray-line">
      <div class="city" @click="cityClick">{{ currentCity.cityName }}</div>
      <div class="position" @click="positionClick">
        <span class="text">我的位置</span>
        <img src="@/assets/img/home/icon_location.png" alt="">
      </div>
    </div>
    <!-- 日期范围 -->
    <div class="item date-range bottom-gray-line" @click="showCalendar = true">
      <div class="start">
        <div class="date">
          <span class="tip">入住</span>
          <span class="time">{{ startDate }}</span>
        </div>
        <div class="stay">共{{ stayCount }}晚</div>
      </div>
      <div class="end">
        <div class="date">
          <span class="tip">离店</span>
          <span class="time">{{ endDate }}</span>
        </div>
      </div>
    </div>
    <!-- 日历 -->
    <van-calendar 
      v-model:show="showCalendar" 
      type="range" 
      :round="false"
      @confirm="onConfirm"
      :formatter="formatter" 
    />
    <div class="item price-counter bottom-gray-line">
      <div class="start">价格不限</div>
      <div class="end">人数不限</div>
    </div>
    <div class="item keyword bottom-gray-line">关键字/位置/民宿名</div>
    <!-- 热门推荐 -->
    <div class="hot-suggest">
      <span 
      v-for="(item, index) in hotSuggests" 
      :key="index"
      class="tag"
      >
      {{item.tagText.text}}
      </span>
    </div>
  
  </div>

</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import useCityStore from "@/store/modules/city.js";
import { storeToRefs } from "pinia";
import { formatMonthDay, getDiffDate } from "@/utils/format_date.js";
import useHomeStore from "@/store/modules/home.js";

const router = useRouter();
// 位置/城市
const cityClick = () => {
  router.push("/city");
};

const positionClick = () => {
  navigator.geolocation.getCurrentPosition(
    res => {
      console.log("获取位置成功", res);
    },
    err => {
      console.log("获取位置失败", err);
    },
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }
  );
};

// 当前城市
const cityStore = useCityStore();
const { currentCity } = storeToRefs(cityStore);

// 日期范围的处理
const nowDate = new Date();
const newDate = new Date();
newDate.setDate(nowDate.getDate() + 1);
const startDate = ref(formatMonthDay(nowDate));
const endDate = ref(formatMonthDay(newDate));
const stayCount = ref(getDiffDate(nowDate, newDate));

const showCalendar = ref(false);

const onConfirm = value => {
  // 1,设置日期
  const selectStartDate = value[0];
  const selectEndDate = value[1];
  startDate.value = formatMonthDay(selectStartDate);
  endDate.value = formatMonthDay(selectEndDate);

  stayCount.value = getDiffDate(selectStartDate, selectEndDate);
  // 2,隐藏日历
  showCalendar.value = false;
};
const formatter = day => {
  if (day.type === "start") {
    day.bottomInfo = "入住";
  } else if (day.type === "end") {
    day.bottomInfo = "离店";
  }
  return day;
};
// 热门建议
const homeStore = useHomeStore();
const { hotSuggests } = storeToRefs(homeStore);
</script>


<style lang="less" scoped>
.search-box {
  --van-calendar-popup-height: 100%;
}
.location {
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0 20px;
  .city {
    flex: 1;
    color: #333;
  }
  .position {
    width: 74px;
    display: flex;
    align-items: center;
    .text {
      font-size: 12px;
      color: #666;
    }
    img {
      margin-left: 5px;
      width: 18px;
      height: 18px;
    }
  }
}
.date-range {
  display: flex;
  height: 44px;
  padding: 0 20px;
  .stay {
    flex: 1;
    text-align: center;
    font-size: 12px;
    color: #666;
  }
}
.price-counter {
  height: 44px;
  .start {
    border-right: 1px solid #f2f2f2;
  }
}
.keyword {
  height: 44px;
}
.item {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 20px;
  color: #999;

  .start {
    flex: 1;
    display: flex;
    height: 44px;
    align-items: center;
  }

  .end {
    min-width: 30%;
    padding-left: 20px;
  }

  .date {
    display: flex;
    flex-direction: column;

    .tip {
      font-size: 12px;
      color: #999;
    }

    .time {
      margin-top: 3px;
      color: #333;
      font-size: 15px;
      font-weight: 500;
    }
  }
}
.hot-suggest {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 20px;
  margin: 10px 0;

  .tag {
    margin: 3px;
    background-color: #f1f3f5;
    padding: 4px 8px;
    border-radius: 14px;
    font-size: 12px;
    color: #3f4954;
  }
}
</style>