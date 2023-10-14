<script setup>
  import TheAuthor from '../TheAuthor/TheAuthor.vue';
  import TheViews from '../TheViews/TheViews.vue';

  defineProps(["postImg", "avatar", "authorName", "link", 'viewsCount', 'userId'])

</script>

<template>
  <div class="post">
    <div class="post__author">
      <TheAuthor :userId="userId" :avatar="avatar" :authorName="authorName" :link="link" />
    </div>
    <img class="post__img" :src="postImg" alt="post">
    <div class="post__views">
      <TheViews :viewsCount="viewsCount" />
    </div>
  </div>
</template>


<style lang="scss">

  .post {
    display: flex;
    flex-direction: column;
    height: 100%;
    &__author {
      margin-bottom: 15px;
    }
    &__img {
      width: 100%;
      overflow: hidden;
      max-width: 100%;
      object-fit: cover;
      max-height: 100%;
    }
    &__views {
      margin-left: auto;
    }
  }

</style>