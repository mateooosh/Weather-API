<template>
  <section class="today">
      <div class="today__date">{{date}}</div>
      <div class="today__content">
        <div class="today__icon">
          <Icon01 v-if="icon=='01'"/>
          <Icon02 v-if="icon=='02'"/>
          <Icon03 v-if="icon=='03'"/>
          <Icon04 v-if="icon=='04'"/>
          <Icon09 v-if="icon=='09'"/>
          <Icon10 v-if="icon=='10'"/>
          <Icon11 v-if="icon=='11'"/>
          <Icon13 v-if="icon=='13'"/>
          <Icon50 v-if="icon=='50'"/> 
				</div>

        <div class="today__main">
          <div class="today__main-temperature">{{Math.round((data.main.temp - 273.15)*10)/10}}°C</div>
          <div class="today__main-place">{{data.name}}, {{data.sys.country}}</div>
        </div>

        <div class="today__details">
          <div class="today__details-description">{{data.weather[0].description.charAt(0).toUpperCase()+data.weather[0].description.slice(1)}}</div>
          <div class="today__details-row">
            <div class="today__details-title">
              PRESSURE
              <div class="today__details-value">{{data.main.pressure}}hPa</div>
            </div>

            <div class="today__details-title">
              HUMIDITY
              <div class="today__details-value">{{data.main.humidity}}%</div>
            </div>

            <div class="today__details-title">
              SUNRISE
              <div class="today__details-value">{{new Date(data.sys.sunrise*1000).toLocaleTimeString()}}</div>
            </div>
          </div>

          <div class="today__details-row">
            <div class="today__details-title">
              FEELS LIKE
              <div class="today__details-value">{{Math.round((data.main.feels_like - 273.15)*10)/10}}°C</div>
            </div>

            <div class="today__details-title">
              WIND
              <div class="today__details-value">{{Math.round(data.wind.speed*3.6*100)/100}}km/h</div>
            </div>

            <div class="today__details-title">
              SUNSET
              <div class="today__details-value">{{new Date(data.sys.sunset*1000).toLocaleTimeString()}}</div>
            </div>
          </div>
        </div>

        

        
        
      </div>
      
      
  </section>
</template>

<script>
import Icon01 from './Icon01.vue';
import Icon02 from './Icon02.vue';
import Icon03 from './Icon03.vue';
import Icon04 from './Icon04.vue';
import Icon09 from './Icon09.vue';
import Icon10 from './Icon10.vue';
import Icon11 from './Icon11.vue';
import Icon13 from './Icon13.vue';
import Icon50 from './Icon50.vue';

export default {
  name: 'TodayFrame',
  components:{
    Icon01, Icon02, Icon03, Icon04, Icon09, Icon10, Icon11, Icon13, Icon50,
  },
  data(){
    return{
      date: '',
    }
  },

  props: {
    data: Object,
    icon: String,
  },

  methods:{

    //get the name of day
    getDate() {
      let now = new Date();
      let day = '';
      switch(now.getDay()){
        case 0:
        day = 'Sunday'; break;
        case 1:
        day = 'Monday'; break;
        case 2:
        day = 'Thuesday'; break;
        case 3:
        day = 'Wednesday'; break;
        case 4:
        day = 'Thursday'; break;
        case 5:
        day = 'Friday'; break;
        case 6:
        day = 'Saturday'; break;
      }
      this.date = day + ', ' + ((now.getDate()>9) ? now.getDate() : '0'+now.getDate()) + '.' + 
      ((now.getMonth()+1)>9 ? now.getMonth()+1 : '0'+(now.getMonth()+1)) + '.' + now.getFullYear();
    }
  },

  mounted(){
    this.getDate()
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.today{
  background-color: rgba(56, 81, 121);
  width:760px;
  padding:0px 10px;
  margin: auto;
  color:white;
  border-radius: 4px;

  &__date{
    padding: 10px 5px 0;
    font-weight: 300;
  }

  &__content{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0 20px;   
  }

  &__icon{
      padding: 15px 10px 5px;  
      text-align: center;
      height: 120px;
      width:210px;

      div{
        height: 100%;
      }
    }

  &__main{
    flex: 4;
    text-align: center;

    &-temperature{
      font-size: 55px;
      font-weight: 400;
      text-align: center;
    }

    &-place{
      font-size: 30px;
      font-weight: 300;
      text-align: center;
    }
  }

  &__details{
    flex: 3;
    text-align: center;
    padding-right: 15px;
    
    &-description{
      font-weight: 400;
      font-size: 20px;
    }

    &-row{
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
    }

    &-title{
      font-weight: 400;
      font-size: 13px;

      &:nth-child(1){
        margin-right: 10px;
      }

      &:nth-child(2){
        margin-right: 10px;
      }
    }

    &-value{
      font-size: 14px;
      margin-top: 2px;
      font-weight: 700;
    }
  }
}

@media(max-width: 760px){
  .today{
    width: 96%;
    margin-left: auto;
    margin-right: auto;

    &__icon{
      padding-left: 0;
      padding-right: 0;
    }

    &__details{
      padding-right: 0;
    }
  }
}

@media(max-width: 630px){
  .today{
    &__content{
      flex-direction: column;
    }

    &__main{
      margin-top:20px;
    }

    &__details{
      margin-top:20px;
      width: 100%;

      &-title{
        &:nth-child(1){
          margin-right: 0;
        }

        &:nth-child(2){
          margin-right: 0;
        }
      }

      &-row{
        justify-content: space-around;
      }
    }
  }
}

</style>
