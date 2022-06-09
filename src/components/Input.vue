<template>
  <form class="form">
    <input v-model="city" type="text" class="form__input" placeholder="Location">
    <button @click.prevent="$emit('search', city)" class="form__button">Search</button>
  </form>
</template>

<script>
export default {
  name: 'Input',
  data() {
    return {
      city: ''
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

  &__input {
    width: 200px;
    margin-right: 10px;
    padding: 6px 10px;
    font-size: 20px;
    border-radius: 4px;
    border: none;
  }

  &__button {
    background-color: #385179;
    color: rgb(233, 233, 233);
    border: none;
    border-radius: 4px;
    padding: 6px 12px;
    font-size: 20px;
    cursor: pointer;

    &:hover {
      color: rgb(233, 233, 233);
      background-color: #42597e;
    }
  }
}


</style>
