import { getHotSuggests } from "@/service/modules/home"
import { defineStore } from "pinia";

const useHomeStore = defineStore("home", {
  state: () => ({
    hotSuggests: []
  }),
  actions: {
    async fetchHotSuggestData() {
      const res = await getHotSuggests()
      this.hotSuggests = res.data
    }
  }
})

export default useHomeStore