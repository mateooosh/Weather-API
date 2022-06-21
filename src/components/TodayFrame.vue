<template>
  <section class="today">
    <div class="today__date">{{ dataSource.date }}</div>
    <div class="today__content">
      <div class="today__icon">
        <Icon01 v-if="dataSource.icon==='01'"/>
        <Icon02 v-if="dataSource.icon==='02'"/>
        <Icon03 v-if="dataSource.icon==='03'"/>
        <Icon04 v-if="dataSource.icon==='04'"/>
        <Icon09 v-if="dataSource.icon==='09'"/>
        <Icon10 v-if="dataSource.icon==='10'"/>
        <Icon11 v-if="dataSource.icon==='11'"/>
        <Icon13 v-if="dataSource.icon==='13'"/>
        <Icon50 v-if="dataSource.icon==='50'"/>
      </div>

      <div class="today__main">
        <div class="today__main-temperature">{{ dataSource.temperature }}°C</div>
        <div class="today__main-place">{{ dataSource.place }}, {{ dataSource.country }}</div>
      </div>

      <div class="today__details">
        <div class="today__details-description">
          {{ dataSource.description }}
        </div>
        <div class="today__details-row">
          <div class="today__details-title">
            PRESSURE
            <div class="today__details-value">{{ dataSource.pressure }}hPa</div>
          </div>

          <div class="today__details-title">
            HUMIDITY
            <div class="today__details-value">{{ dataSource.humidity }}%</div>
          </div>

          <div class="today__details-title">
            SUNRISE
            <div class="today__details-value">{{ dataSource.sunrise }}</div>
          </div>
        </div>

        <div class="today__details-row">
          <div class="today__details-title">
            FEELS LIKE
            <div class="today__details-value">{{ dataSource.feels_like }}°C</div>
          </div>

          <div class="today__details-title">
            WIND
            <div class="today__details-value">{{ dataSource.wind }}km/h</div>
          </div>

          <div class="today__details-title">
            SUNSET
            <div class="today__details-value">{{ dataSource.sunset }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Icon01 from './Icon01.vue'
import Icon02 from './Icon02.vue'
import Icon03 from './Icon03.vue'
import Icon04 from './Icon04.vue'
import Icon09 from './Icon09.vue'
import Icon10 from './Icon10.vue'
import Icon11 from './Icon11.vue'
import Icon13 from './Icon13.vue'
import Icon50 from './Icon50.vue'
import {TodayWeatherModel} from '@/models/TodayWeatherModel'

export default {
  name: 'TodayFrame',
  components: {
    Icon01, Icon02, Icon03, Icon04, Icon09, Icon10, Icon11, Icon13, Icon50,
  },

  props: {
    dataSource: TodayWeatherModel
  }
}
</script>
<style scoped lang="scss">
.today {
  background-color: #21518c;
  width: 760px;
  padding: 0px 10px;
  margin: auto;
  color: white;
  border-radius: 8px;

  &__date {
    padding: 12px 4px 0;
    font-weight: 300;
  }

  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 4px;
    padding: 0 0 20px;
  }

  &__icon {
    padding: 16px 12px 4px;
    text-align: center;
    height: 120px;
    width: 210px;

    > div {
      height: 100%;
    }
  }

  &__main {
    flex: 4;
    text-align: center;

    &-temperature {
      font-size: 55px;
      font-weight: 400;
      text-align: center;
    }

    &-place {
      font-size: 32px;
      font-weight: 300;
      text-align: center;
    }
  }

  &__details {
    flex: 3;
    text-align: center;
    padding-right: 16px;

    &-description {
      font-weight: 400;
      font-size: 20px;
    }

    &-row {
      display: flex;
      justify-content: space-between;
      gap: 8px;
      margin-top: 12px;
    }

    &-title {
      font-weight: 400;
      font-size: 13px;
    }

    &-value {
      font-size: 14px;
      margin-top: 3px;
      font-weight: 700;
    }
  }
}

@media(max-width: 800px) {
  .today {
    width: calc(100% - 24px);
    margin-left: 12px;
    margin-right: 12px;

    &__icon {
      padding-left: 0;
      padding-right: 0;
    }
  }
}

@media(max-width: 630px) {
  .today {
    &__content {
      flex-direction: column;
    }

    &__main {
      margin-top: 20px;
    }

    &__details {
      margin-top: 20px;
      width: 100%;

      &-title {
        &:nth-child(1) {
          margin-right: 0;
        }

        &:nth-child(2) {
          margin-right: 0;
        }
      }

      &-row {
        justify-content: space-around;
      }
    }
  }
}

</style>
