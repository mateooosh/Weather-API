<template>
  <section class="nextdays">
    <div class="nextdays__info" :class="{weekend: isWeekend(dataSource.day)}">
      <div class="nextdays__day">{{ dataSource.day }}</div>
      <div class="nextdays__date">{{ dataSource.date }}</div>
    </div>

    <div class="nextdays__icon">
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

    <div class="nextdays__main">
      <div class="nextdays__temperature">
        {{ dataSource.temperature }}°C
      </div>

      <div class="nextdays__description">
        {{ dataSource.description }}
      </div>
    </div>

    <div class="nextdays__details">
      <div class="nextdays__details-row">
        <div class="nextdays__details-title">
          PRESSURE
          <div class="nextdays__details-value">{{ dataSource.pressure }}hPa</div>
        </div>

        <div class="nextdays__details-title">
          HUMIDITY
          <div class="nextdays__details-value">{{ dataSource.humidity }}%</div>
        </div>

        <div class="nextdays__details-title">
          SUNRISE
          <div class="nextdays__details-value">{{ dataSource.sunrise }}</div>
        </div>
      </div>


      <div class="nextdays__details-row">
        <div class="nextdays__details-title">
          FEELS LIKE
          <div class="nextdays__details-value">{{ dataSource.feels_like }}°C</div>
        </div>

        <div class="nextdays__details-title">
          WIND
          <div class="nextdays__details-value">{{ dataSource.wind }}km/h</div>
        </div>

        <div class="nextdays__details-title">
          SUNSET
          <div class="nextdays__details-value">{{ dataSource.sunset }}</div>
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
import {NextDayModel} from '@/models/NextDayModel'

export default {
  name: 'NextDays',

  components: {
    Icon01, Icon02, Icon03, Icon04, Icon09, Icon10, Icon11, Icon13, Icon50
  },

  props: {
    dataSource: NextDayModel
  },

  methods: {
    isWeekend(day) {
      return day === 'Saturday' || day === 'Sunday'
    }
  }
}
</script>

<style scoped lang="scss">
.nextdays {
  background-color: #DADADA;
  width: 760px;
  padding: 0px 10px 0 0;
  margin: 20px auto 0;
  color: rgb(39, 39, 39);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;

  &__info {
    width: 120px;
    background-color: #21518c;
    height: 120px;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  &__day {
    padding-top: 25px;
    text-align: center;
    font-weight: 300;
    color: #ddd;
    font-size: 20px;
  }

  &__date {
    text-align: center;
    color: #eee;
    font-size: 36px;
  }

  &__icon {
    padding: 5px 0;
    text-align: center;
    height: 100px;
    width: 200px;

    div {
      height: 100%;
    }
  }

  &__main {
    width: 150px;
  }

  &__temperature {
    font-size: 42px;
    text-align: center;
  }

  &__description {
    text-align: center;
    font-size: 20px;

  }

  &__details {
    padding-right: 15px;

    &-row {
      display: flex;
      justify-content: space-between;

      &:nth-child(2) {
        margin-top: 10px;
      }
    }

    &-title {
      font-weight: 400;
      font-size: 13px;
      text-align: center;

      &:nth-child(1) {
        margin-right: 10px;
      }

      &:nth-child(2) {
        margin-right: 10px;
      }
    }

    &-value {
      font-size: 14px;
      margin-top: 2px;
      font-weight: 700;
    }
  }
}

.weekend {
  background-color: rgb(156, 65, 65);
}

@media(max-width: 800px) {
  .nextdays {
    width: calc(100% - 24px);
    margin: 12px 12px 0;

    &__info {
      height: 80px;
      width: 80px;
    }

    &__day {
      padding-top: 16px;
      font-size: 14px;
    }

    &__date {
      font-size: 24px;
    }

    &__icon {
      width: 100px;
      height: 64px;
    }

    &__main {
      width: 120px;
    }

    &__temperature {
      font-size: 28px;
    }

    &__description {
      font-size: 16px;
    }

    &__details {
      padding-right: 0;

      &-row {
        &:nth-child(2) {
          margin-top: 7px;
        }
      }

      &-title {
        font-size: 11px;

        &:nth-child(1) {
          margin-right: 4px;
        }

        &:nth-child(2) {
          margin-right: 4px;
        }
      }

      &-value {
        font-size: 12px;
      }
    }
  }
}

@media(max-width: 500px) {
  .nextdays {
    &__icon {
      width: 70px;
      height: 50px;
    }

    &__main {
      width: 80px;
    }

    &__temperature {
      font-size: 22px;
    }

    &__description {
      font-size: 12px;
    }

    &__details {
      &-title {
        font-size: 10px;
      }

      &-value {
        font-size: 9px;
      }
    }
  }
}

@media(max-width: 410px) {
  .nextdays {
    &__day {
      padding-top: 16px;
      font-size: 14px;
    }

    &__date {
      font-size: 24px;
    }

    &__icon {
      width: 100px;
      height: 65px;
    }

    &__main {
      width: 120px;
    }

    &__temperature {
      font-size: 28px;
    }

    &__description {
      font-size: 16px;
    }

    &__details {
      display: none;
    }
  }
}

</style>
