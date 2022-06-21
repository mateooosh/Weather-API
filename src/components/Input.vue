<template>
  <Transition>
    <form class="form" v-if="showForm">
      <input v-model="city" type="text" class="form__input" placeholder="Location">
      <button @click.prevent="$emit('search', city)" class="form__button">Search</button>
    </form>
  </Transition>
</template>

<script>
export default {
  name: 'Input',
  data() {
    return {
      city: '',
      showForm: false
    }
  },
  mounted() {
    setTimeout(() => {
      this.showForm = true
    }, 100)
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

  &__input {
    width: 200px;
    padding: 8px 10px;
    font-size: 20px;
    border-radius: 8px;
    border: none;

    &:focus {
      border: none;
      outline: none;
    }
  }

  &__button {
    background-color: #21518c;
    color: rgb(233, 233, 233);
    border: none;
    border-radius: 8px;
    padding: 8px 24px;
    font-size: 20px;
    cursor: pointer;
  }
}

.v-enter-active,
.v-leave-active {
  transition: all .5s ease;
  transform: translateY(0px);
}

.v-enter-from{
  transform: translateY(50px);
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>
