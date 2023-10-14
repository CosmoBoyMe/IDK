<script setup>
  defineProps(['text'])
</script>

<template>
  <div class="error">
    <h3 class="error__title">Error</h3>
    <p class="error__text">{{ text }}</p>
    <button class="error__button" @click="$emit('handleErrorClick')">Повторить</button>
  </div >
</template>


<style lang="scss">
  .error {
    background-color: #ffd2cfff;
    display: flex;
    flex-direction: column;
    color: #181413;
    padding: 15px;
    border-radius: 5px;

    &__title {
      font-weight: bold;
      font-size: x-large;
      margin-bottom: 5px;
    }

    &__button {
      padding: 7px;
      border: 1px solid black;
      border-radius: 4px;
      margin-left: auto;
      cursor: pointer;

      &:hover {
        color: white;
        background-color:#181413;
      }
    }
  }
</style>