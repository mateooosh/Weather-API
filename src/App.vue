<template>
  <div id="app">
    <Input v-on:search="getData"/>
    <TodayFrame v-if="todayFrameIsVisible" :data="data" :icon="icon"/>

    <section class="next-days" v-if="gotNextDaysData">
      <div v-for="(item, index) in nextDays.daily" :key="index">
        <NextDays v-if="index!==0"
                  :day="item.day"
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
    <!--    <Footer :fixed="fixedFooter"/>-->
  </div>
</template>

<script>
import Input from './components/Input'
import TodayFrame from './components/TodayFrame'
import NextDays from './components/NextDays'
import Footer from './components/Footer'
import {DAYS} from '../common/DAYS'
import _ from 'lodash'

export default {
  name: 'App',
  data() {
    return {
      city: '',
      todayFrameIsVisible: false,
      gotNextDaysData: false,
      icon: '',
      data: Object,
      nextDays: Object,
      fixedFooter: true,
      appId: 'ebbf5f1d676d479b2fc1eb8dd318add2'
    }
  },
  components: {
    Input,
    TodayFrame,
    NextDays,
    Footer
  },

  methods: {
    getNameOfDay(date) {
      return DAYS[date.getDay()]
    },

    getData(value) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${this.appId}`)
          .then(response => response.json())
          .then(response => {

            this.data = response
            this.icon = response.weather[0].icon[0] + response.weather[0].icon[1]
            this.todayFrameIsVisible = true

            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.data.coord.lat}&lon=${this.data.coord.lon}&appid=${this.appId}`)
                .then(response => response.json())
                .then(response => {
                  this.nextDays = response
                  let day = new Date()

                  for (let i = 1; i < 8; i++) {
                    day.setDate(day.getDate() + 1)
                    this.nextDays.daily[i].day = this.getNameOfDay(day)
                    this.nextDays.daily[i].date = `${day.getDate() > 9 ? day.getDate() : '0' + day.getDate()}.${day.getMonth() + 1 > 9 ? day.getMonth() + 1 : '0' + (day.getMonth() + 1)}`
                  }

                  this.gotNextDaysData = true
                  this.fixedFooter = false
                })
                .catch(error => alert(`Something went wrong`))
          })
          .catch(error => alert(error))
    }
  },
}
</script>

<style lang="scss">
* {
  margin: 0;
  font-size: 18px;
  box-sizing: border-box;
  font-family: 'Lato', sans-serif;
}

body {
  // background-color: rgb(126, 126, 126);
  background: url('./assets/background.jpg') no-repeat center center fixed;
  background-size: cover;
}

.next-days {
  margin-bottom: 20px;
}
</style>
