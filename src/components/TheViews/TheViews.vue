<script setup>
  import EyeSvg from '@/assets/svg/eye.svg'
  defineProps(["viewsCount"]);
</script>


<template>
  <div class="views">
    <span class="views__count">{{ viewsCount }}</span>
    <span class="views__icon"><EyeSvg /></span>
  </div>
</template>

<style lang="scss">
  .views {
    display: flex;
    align-items: center;
    column-gap: 15px;
    &__count {
      font-size: 16px;

    }
    &__icon {
      width: 30px;
      height: 30px;
    }
  }
</style>