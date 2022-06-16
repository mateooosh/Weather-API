<template>
  <div class="container">
    <Input v-on:search="getData"/>
    <TodayFrame v-if="showTodayFrame" :data="data" :icon="icon"/>

    <section class="next-days" v-if="showNextDaysFrames">
      <div v-for="(item, index) in dailyNextDays" :key="index">
        <NextDays :day="item.day"
                  :date="item.date"
                  :icon="item.icon"
                  :temperature="item.temperature"
                  :description="item.description"
                  :pressure="item.pressure"
                  :humidity="item.humidity"
                  :sunrise="item.sunrise"
                  :feels_like="item.feels_like"
                  :wind="item.wind"
                  :sunset="item.sunset"
        />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import Input from './components/Input.vue'
import TodayFrame from './components/TodayFrame.vue'
import NextDays from './components/NextDays.vue'
import {DAYS} from '../common/DAYS'
import _ from 'lodash'
import {getActualWeatherForPlace, getNextDays} from '@/components/weather/weather.api'
import {getIcon} from '@/common/utils'
import {DailyWeatherModel} from '@/models/DailyWeatherModel'

export default defineComponent({
  name: 'App',
  components: {
    Input,
    TodayFrame,
    NextDays
  },
  data() {
    return {
      city: '',
      showTodayFrame: false,
      showNextDaysFrames: false,
      icon: '',
      data: Object,
      nextDays: Object,
      appId: 'ebbf5f1d676d479b2fc1eb8dd318add2'
    }
  },
  computed: {
    dailyNextDays() {
      return _.slice(this.nextDays?.daily, 1, this.nextDays?.daily?.length)
    }
  },
  methods: {
    getNameOfDay(date) {
      return DAYS[date.getDay()]
    },

    async getData(value) {
      this.showTodayFrame = false
      this.showNextDaysFrames = false

      let [error, data] = await getActualWeatherForPlace(value)

      if (error) {
        alert(error)
      } else {
        this.data = data
        this.icon = getIcon(data.weather[0].icon)
        this.showTodayFrame = true
      }

      [error, data] = await getNextDays(this.data.coord.lat, this.data.coord.lon)
      if (error) {
        alert(error)
      } else {


        this.nextDays = DailyWeatherModel.fromJson(data)



        // for (let i = 1; i < 8; i++) {
        //   day.setDate(day.getDate() + 1)
        //   this.nextDays.daily[i].day = this.getNameOfDay(day)
        //   this.nextDays.daily[i].date = `${day.getDate() > 9 ? day.getDate() : '0' + day.getDate()}.${day.getMonth() + 1 > 9 ? day.getMonth() + 1 : '0' + (day.getMonth() + 1)}`
        // }
        this.showNextDaysFrames = true
      }
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
</style>
