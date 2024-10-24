<script setup lang="ts">
onMounted(() => {
  checkAuth();
});

// Should be in separate file
function checkAuth() {
  const router = useRouter();

  const local = localStorage.getItem("auth") || "";

  if (local && local != "") {
    // here is server function
    // something like post request
    // and if response of this request is bad
    // should push to /auth
  } else {
    router.push("/auth");
    console.log("you are not logged!");
  }
}
</script>

<template>
  <!-- there should be just loading circle -->
</template>

<style lang="scss"></style>
