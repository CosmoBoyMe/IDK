<script setup>
  import { ref , onMounted, onUnmounted} from 'vue'
  import { MESSAGE_RULES } from './const.js';

  const props = defineProps(['name', 'avatar', 'isOpened'])
  const emit = defineEmits(['messageModalClose'])

  const messageText = ref("");

  onMounted(() => {
    document.body.classList.add('body__message-modal--open', props.isOpened)
  })

  onUnmounted(() => {
    document.body.classList.remove('body__message-modal--open')
  })


</script>

<template>
  <div @submit.prevent="$emit('messageModalClose')" @pointerdown="$emit('messageModalClose')" class="message-modal">
    <div class="message-modal__content"  @pointerdown.stop="">
      <div class="message-modal__user-info">
        <img class="message-modal__avatar" :src="avatar" alt="avatar">
        <h3 class="message-modal__title">Message {{ name }}</h3>
      </div>
      <p class="message-modal__text">Send a message to {{ name }} and receive a reply through your email.</p>
      <ul class="message-modal__rules">
        <li class="message-modal__rules-item" v-for="rule of MESSAGE_RULES" :key="rule">{{ rule }}</li>
      </ul>
      <form class="message-modal__form">
        <label class="message-modal__topic">What are you writing about
          <input class="message-modal__topic-input" type="text" placeholder="Say thanks">
        </label>
        <label class="message-modal__message">Your message
          <div class="message-modal__textarea-box">
            <textarea v-model="messageText" rows=10  maxlength=1200 class="message-modal__textarea" minlength="20" type="text" placeholder="Hey Sam, I’d like to thank you for sharing your photos on Unsplash. I’ve used one of them here: ___" ></textarea>
            <span class="message-modal__count">{{ messageText.length < 0 ? 0 : 1200 - messageText.length }}</span>
          </div>
        </label>

        <button class="message-modal__button">Send Message</button>
      </form>
    </div>
  </div>
</template>


<style lang="scss">

  .body__message-modal--open {
    overflow: hidden;
  }

  .message-modal {
    background-color: #0009;
    top: 0;
    padding: 50px;
    overflow: auto;
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;


    &__content {
      display: flex;
      flex-direction: column;
      padding: 32px;
      background-color: white;
      max-width: 500px;
      height: fit-content;
      border-radius: 5px;
    }

    &__user-info {
      display: flex;
      align-items: center;
      column-gap: 20px;
    }

    &__avatar {
      max-width: 48px;
      max-height: 48px;
      border-radius: 50%;
    }

    &__title {
      font-size: 28px;
      font-weight: 700;
    }

    &__text {
      margin-bottom: 20px;
    }

    &__rules {
      list-style: none;
      padding: 0;
      margin-bottom: 30px;
    }

    &__form {
      display: flex;
      flex-direction: column;
    }

    &__topic {
      display: flex;
      flex-direction: column;
      row-gap: 10px;
      margin-bottom: 20px;

      &-input {
        padding: 7px;
      }
    }

    &__message {
      display: flex;
      flex-direction: column;
      row-gap: 10px;
      margin-bottom: 30px;
    }

    &__textarea-box {
      display: flex;
      flex-direction: column;
      position: relative;
    }

    &__textarea {
      width: 100%;
      padding: 6px 12px;
      height: auto;
      resize: none;
      border-radius: 5px;
    }

    &__count {
      position: absolute;
      right: 10px;
      bottom: 10px;
      font-size: 10px;
    }

    &__button {
      max-width: 100%;
      margin-left: auto;
      cursor: pointer;
      padding: 10px;
      background-color: transparent;
      border-radius: 5px;
      border: 1px solid black;

      &:hover {
        color: red;
      }
    }

  }

</style>