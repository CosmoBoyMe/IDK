<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router'
import { STATUS } from '@/shared/status.js';

import TheMessageModal from '@/components/TheMessageModal/TheMessageModal.vue';

import DotsSvg from '@/assets/svg/dots.svg';
import MessageSvg from '@/assets/svg/message.svg'
import InstagramSvg from '@/assets/svg/instagram.svg'
import LocationSvg from '@/assets/svg/location.svg'


const isMessageModalOpened = ref(false);
const state = reactive({ status: STATUS.idle, user: null, error: null });
const route = useRoute();

onMounted(async () => {
  if (state.status === STATUS.idle) {
    state.status = STATUS.loading
    try {
      const response = await fetch(`https://api.unsplash.com/users/${route.params.id}/?client_id=SilCCiINdpRxAJx0RsAVz7kHfmINubhmLdtMvQqbsrM`);
      const data = await response.json();
      state.user = data;
      state.status = STATUS.resolved;
      state.error = null;
    } catch(error) {
      state.status = STATUS.rejected;
      state.error = 'something goes wrong'
    }
  }
})

</script>


<template>
  <main class="profile">
    <div v-if="state.user" class="profile__content">
      <div class="profile__info">
        <img class="profile__avatar" :src="state.user.profile_image.large" alt="avatar">
        <div class="profile__column">
            <div class="profile__actions">
            <h3 class="profile__name">{{ state.user.name }}</h3>
            <button type="button" class="profile__actions-button profile__message" @click="isMessageModalOpened = true">
              <MessageSvg width="20px" height="20px" />
            </button>
            <button class="profile__actions-button profile__more-actions">
              <DotsSvg width="20px" height="10px"/>
            </button>
          </div>
          <div class="profile__description">
            <p class="profile__bio">{{ state.user.bio }}</p>
            <p class="profile__location">
              <LocationSvg width="20px" height="20px" />
              {{ state.user.location }}
            </p>
            <a class="profile__instagram" target="_blank" :href="`https://www.instagram.com/${state.user.instagram_username}`">
              <InstagramSvg width="15px" height="15px" />
              Instagram
            </a>
            <Teleport to='#modals'>
              <TheMessageModal v-if="isMessageModalOpened" @message-modal-close="() => isMessageModalOpened = false" :isOpened="isMessageModalOpened" :name="state.user.name" :avatar="state.user.profile_image.large" />
            </Teleport>
          </div>
        </div>
      </div>
      <ul class="profile__tabs">
        <li class="profile__tabs-tab">
          <button class="profile__tabs-button">Photos: {{ state.user.total_photos }}</button></li>
        <li class="profile__tabs-tab">
          <button class="profile__tabs-button">Likes: {{ state.user.total_likes }}</button></li>
        <li class="profile__tabs-tab">
          <button class="profile__tabs-button">Collection: {{ state.user.total_collections }}</button></li>
      </ul>
    </div>
  </main>
</template>





<style lang="scss">

.profile {
  &__info {
    display: flex;
    align-items: flex-start;
    max-width: 1040px;
    padding: 0 20px;
    margin: 0 auto;
    margin-bottom: 100px;
  }

  &__avatar {
    margin-right: 20px;
  }

  &__column {
    display: flex;
    flex-direction: column;
  }

  &__name {
    font-size: 40px;
    font-weight: 700;
    text-wrap: nowrap;
    margin-right: 50px;
  }

  &__actions {
    align-items: center;
    display: flex;
    column-gap: 10px;
    margin-bottom: 30px;
    &-button {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #d1d1d1;
      cursor: pointer;
      max-width: 50px;
      width: 100%;
      height: 30px;
      background-color: #fff;
    }
  }

  &__description {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
  }

  &__avatar {
    border-radius: 50%;
  }

  &__location {
    display: flex;
    align-items: center;
    column-gap: 10px;
  }

  &__instagram {
    display: flex;
    align-items: center;
    column-gap: 15px;
  }

  &__tabs {
    list-style: none;
    display: flex;
    column-gap: 10px;
    margin: 0 20px;
    padding: 0;

    &-button {
      min-width: 50px;
      padding: 10px;
      cursor: pointer;
      border: none;
      border-radius: 5px;
    }
  }
}




</style>