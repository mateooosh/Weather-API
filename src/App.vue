<template>
  <div class="container">
    <Input @search="getData" v-model="query"/>
    <Transition>
      <TodayFrame v-if="showTodayFrame" :data-source="todayWeather"/>
    </Transition>

    <Transition>
      <section class="next-days" v-if="showNextDaysFrames">
        <NextDays v-for="(item, index) in dailyNextDays" :key="index" :data-source="item"/>
      </section>
    </Transition>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import Input from './components/Input.vue'
import TodayFrame from './components/TodayFrame.vue'
import NextDays from './components/NextDays.vue'
import _ from 'lodash'
import {getActualWeatherForPlace, getNextDays} from '@/components/weather/weather.api'
import {DailyWeatherModel} from '@/models/DailyWeatherModel'
import {TodayWeatherModel} from "@/models/TodayWeatherModel"
import {firstLetterToUppercase} from "@/common/utils"

const LAST_SEARCH_QUERY_KEY = 'lastSearchQuery'

export default defineComponent({
  name: 'App',
  components: {
    Input,
    TodayFrame,
    NextDays
  },

  data() {
    return {
      query: '',
      showTodayFrame: false,
      showNextDaysFrames: false,
      todayWeather: TodayWeatherModel,
      nextDays: DailyWeatherModel,
      show: false
    }
  },

  computed: {
    dailyNextDays() {
      return _.slice(this.nextDays?.daily, 1, this.nextDays?.daily?.length)
    }
  },

  mounted () {
    const lastSearchQuery = localStorage.getItem(LAST_SEARCH_QUERY_KEY)
    if (lastSearchQuery) {
      this.query = firstLetterToUppercase(lastSearchQuery)
      this.getData(lastSearchQuery)
    }
  },

  methods: {
    async getData(value) {
      this.showTodayFrame = false
      this.showNextDaysFrames = false

      let [error, data] = await getActualWeatherForPlace(value)

      if (error) {
        this.$toast.error(firstLetterToUppercase(error.response.data.message))
        return
      } else {
        this.todayWeather = TodayWeatherModel.fromJson(data)
        this.showTodayFrame = true
      }

      [error, data] = await getNextDays(this.todayWeather.lat, this.todayWeather.lon)
      if (error) {
        this.$toast.error(firstLetterToUppercase(error.response.data.message))
      } else {
        this.nextDays = DailyWeatherModel.fromJson(data)
        this.showNextDaysFrames = true
      }

      localStorage.setItem(LAST_SEARCH_QUERY_KEY, value)
    }
  }
})
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
}

.next-days {
  margin-bottom: 20px;
}

.v-enter-active,
.v-leave-active {
  transition: all .5s ease;
  transform: translateY(0px);
}

.v-enter-from {
  transform: translateY(50px);
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
