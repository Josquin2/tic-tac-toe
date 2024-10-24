<script setup lang="ts">
import { checkAuth } from "./client-functions";
onBeforeMount(() => {
  checkAuth();
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
