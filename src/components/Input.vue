<template>
  <Transition>
    <form class="form" v-if="showForm" @submit.prevent="search">
      <input :value="modelValue"
             @input="$emit('update:modelValue', $event.target.value)"
             ref="input"
             type="text"
             class="form__input"
             placeholder="Location">
      <div class="form__buttons">
        <div @click.prevent="getLocation" class="form__button form__button--location">
          <map-marker-outline class="form__icon"/>
        </div>
        <div @click.prevent="search" class="form__button form__button--search">
          <magnify class="form__icon"/>
        </div>
      </div>

    </form>
  </Transition>
</template>

<script>
import {getPlaceByLocation} from '@/components/weather/weather.api'
import {Magnify, MapMarkerOutline} from 'mdue'

export default {
  name: 'Input',
  props: ['modelValue'],
  components: {
    Magnify,
    MapMarkerOutline
  },

  data() {
    return {
      showForm: false,
      lat: null,
      lon: null,
      searchIsLoading: false,
      locationIsLoading: false
    }
  },

  mounted() {
    setTimeout(() => {
      this.showForm = true
    }, 100)
  },

  methods: {
    search() {
      this.$emit('search', this.modelValue)
      this.$refs.input.blur()
    },

    async getLocation() {
      this.locationIsLoading = true
      await navigator.geolocation.getCurrentPosition(position => {
        const {latitude, longitude} = position.coords
        this.lat = latitude
        this.lon = longitude

        this.getPlace()
        this.locationIsLoading = false
      }, (error) => {
        alert(error.message)
        this.locationIsLoading = false
      })

    },

    async getPlace() {
      let [error, data] = await getPlaceByLocation(this.lat, this.lon)

      if (error) {
        console.log(error)
        this.locationIsLoading = false
        return
      } else {
        this.value = data[0].name
        this.locationIsLoading = false
        this.search()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.form {
  width: 300px;
  margin: 40px auto;
  display: flex;
  justify-content: space-between;
  gap: 16px;
  position: relative;

  &__input {
    width: 100%;
    padding: 12px 16px;
    font-size: 20px;
    border-radius: 8px;
    border: none;

    &:focus {
      border: none;
      outline: none;
    }
  }

  &__buttons {
    position: absolute;
    right: 12px;
    bottom: 50%;
    transform: translateY(50%);
    display: flex;
    align-items: center;
  }

  &__button {
    cursor: pointer;
    display: flex;
    align-items: center;
    border-radius: 20px;
    padding: 4px;
    transition: all .3s;

    &:hover {
      background-color: #e8e8e8;
    }

    &--search {
    }

    &--location {
    }
  }

  &__icon {
    color: #494949;
    font-size: 28px;

  }
}

@media(max-width: 630px) {
  .form {
    width: calc(100% - 24px);
    margin-left: 12px;
    margin-right: 12px;
  }
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
