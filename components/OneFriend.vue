<script setup lang="ts">
const props = defineProps({
  image: String,
  name: String,
  isOnline: Boolean,
});
</script>

<template>
  <div class="one__friend">
    <div class="user__image">
      <img :src="props?.image" alt="" />
    </div>

    <div class="user__info">
      <h4 class="user__name">{{ props?.name }}</h4>

      <span
        class="user__online"
        :class="props?.isOnline == true ? 'online' : 'offline'"
      ></span>
    </div>
  </div>
</template>
