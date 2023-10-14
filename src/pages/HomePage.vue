<script setup>
import { reactive, watchEffect } from 'vue';
import { STATUS } from '@/shared/status.js';

import PostItem from '@/components/PostItem/PostItem.vue';
import TheLoader from '@/components/TheLoader/TheLoader.vue';
import TheError from '@/components/TheError/TheError.vue';

const state = reactive({ status: STATUS.idle, posts: [], error: null });

watchEffect(async() => {
  if (state.status === STATUS.idle) {
    state.status = STATUS.loading
    try {
      const response = await fetch('https://api.unsplash.com/photos/?client_id=SilCCiINdpRxAJx0RsAVz7kHfmINubhmLdtMvQqbsrM');
      const data = await response.json();
      const postsWithViews = await Promise.all(data.map( async (item) => {
        const photoResponse = await fetch(`https://api.unsplash.com/photos/${item.id}/statistics/?client_id=SilCCiINdpRxAJx0RsAVz7kHfmINubhmLdtMvQqbsrM`)
        const { views } = await photoResponse.json();
        item.views = views;
        return item;
      }));

      state.posts = postsWithViews;
      state.status = STATUS.resolved;
      state.error = null;
    } catch(error) {
      state.status = STATUS.rejected;
      state.error = 'something goes wrong'
    }
  }
  console.log(state.posts)
})

const handleErrorClick = () => state.status = STATUS.idle;

</script>

<template>
  <main class="home">
    <div v-if="state.status === STATUS.loading"  class="home__loader">
      <TheLoader />
    </div>
    <div class="home__posts" v-if="state.posts.length">
      <PostItem v-for="item of state.posts" :userId="item.user.username" :postImg="item.urls.regular" :avatar="item.user.profile_image.medium" :viewsCount="item.views.total" :link="item.user.portfolio_url" :key="item.id" :authorName="item.user.name" />
    </div>
    <div class="home__error" v-if="state.status === STATUS.rejected">
      <TheError @handleErrorClick="handleErrorClick" :text="`Произошла ошибка: ${state.error}` " />
    </div>
  </main>
</template>

<style lang="scss">
  .home  {
    max-width: 1400px;
    margin: 0 auto;
    &__loader {
      position: fixed;
      top: 30%;
      right: 50%;
      transform: translate(-50%, 50%);
    }
    
    &__posts {
      align-items: start;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-auto-rows: 500px;
      column-gap: 40px;
      row-gap: 20px;
    }

    &__error {
      position: fixed;
      max-width: 500px;
      width: 100%;
      transform: translate(-50%, 10%);
      left: 50%;
      right: 50%;
    }
  }
</style>
