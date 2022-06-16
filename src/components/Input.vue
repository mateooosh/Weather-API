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
  gap: 16px;

  &__input {
    width: 200px;
    padding: 8px 10px;
    font-size: 20px;
    border-radius: 8px;
    border: none;
  }

  &__button {
    background-color: #21518c;
    color: rgb(233, 233, 233);
    border: none;
    border-radius: 8px;
    padding: 8px 24px;
    font-size: 20px;
    cursor: pointer;

    &:hover {
      color: rgb(233, 233, 233);
      background-color: #42597e;
      transition: all .3s;
    }
  }
}


</style>
