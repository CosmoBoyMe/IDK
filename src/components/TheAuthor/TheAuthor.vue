<script setup>
  defineProps(['userId','avatar', 'authorName', 'link'])
</script>

<template>
  <div class="author">
    <router-link :to="`/profile/${userId}`" >
      <img class="author__avatar" :src='avatar' alt="author">
    </router-link>
    <div class="author__description">
      <p class="author__name">{{ authorName }}</p>
      <a class="author__link">{{ link }}</a>
    </div>
  </div>
</template>

<style lang="scss">

  .author {
    display: flex;
    align-items: center;
    column-gap: 20px;


    &__avatar {
      width: 45px;
      height: 45px;
      border-radius: 50%;
    }

    &__link {
      cursor: pointer;
    }
  }

</style>