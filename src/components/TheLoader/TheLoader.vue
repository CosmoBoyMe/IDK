<script setup>
</script>
<template >
  <div title="ожидание загрузки" class="loader"></div>
</template>


<style lang="scss">
  .loader {
    width: 48px;
    height: 48px;
    border: 5px solid red;
    border-bottom-color: transparent;
    border-radius: 50%;
    animation: rotation 1s linear infinite;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
</style>