<template>
  <div class="container">
    <Input v-on:search="getData"/>
    <TodayFrame v-if="showTodayFrame" :data="data" :icon="icon"/>

    <section class="next-days" v-if="showNextDaysFrames">
      <div v-for="(item, index) in dailyNextDays" :key="index">
        <NextDays :day="item.day"
                  :date="item.date"
                  :icon="item.weather[0].icon[0]+item.weather[0].icon[1]"
                  :temperature="Math.round((item.temp.day - 273.15)*10)/10"
                  :description="item.weather[0].description.charAt(0).toUpperCase() + item.weather[0].description.slice(1)"
                  :pressure="item.pressure"
                  :humidity="item.humidity"
                  :sunrise="new Date(item.sunrise*1000).toLocaleTimeString()"
                  :feels_like="Math.round((item.feels_like.day - 273.15)*10)/10"
                  :wind="Math.round(item.wind_speed*3.6*100)/100"
                  :sunset="new Date(item.sunset*1000).toLocaleTimeString()"
        />
      </div>
    </section>
  </div>
</template>

<script>
import Input from './components/Input'
import TodayFrame from './components/TodayFrame'
import NextDays from './components/NextDays'
import {DAYS} from '../common/DAYS'
import _ from 'lodash'
import {getActualWeatherForPlace, getNextDays} from '@/components/weather/weather.api'
import {getIcon} from '@/common/utils'

export default {
  name: 'App',
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
  components: {
    Input,
    TodayFrame,
    NextDays
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
        this.nextDays = data
        let day = new Date()

        for (let i = 1; i < 8; i++) {
          day.setDate(day.getDate() + 1)
          this.nextDays.daily[i].day = this.getNameOfDay(day)
          this.nextDays.daily[i].date = `${day.getDate() > 9 ? day.getDate() : '0' + day.getDate()}.${day.getMonth() + 1 > 9 ? day.getMonth() + 1 : '0' + (day.getMonth() + 1)}`
        }
        this.showNextDaysFrames = true
      }

      // await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${this.data.coord.lat}&lon=${this.data.coord.lon}&appid=${this.appId}`)
      //   .then(response => response.json())
      //   .then(response => {
      //     console.log(response)
      //   })
      //   .catch(() => alert(`Something went wrong`))
    }
  }
}
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
