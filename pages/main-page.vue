<script setup lang="ts"></script>

<template>
  <div class="main-page-block">
    <div class="all-about-user-block">
      <div class="main-page-left">
        <MainUser />
        <MainPlayBlock />
      </div>

      <div class="main-page-right">
        <MainFriends />
        <div class="chat-block right--block">
          <!-- here should be chat or something -->
        </div>
      </div>
    </div>

    <div class="news-block">
      <div class="news-heading"></div>

      <div class="all-news"></div>
    </div>
  </div>
</template>

<style lang="scss">
.main-page-block {
  display: flex;
  flex-direction: column;

  .all-about-user-block {
    display: flex;
    flex-direction: row;
    gap: 2rem;

    .main-page-left {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .main-page-right {
      display: flex;
      flex-direction: row;
      gap: 2rem;
    }
  }
}

.left--block {
  min-width: 34rem;
  min-height: 9.5rem;
  background-color: #3e3e3e;
  border-radius: 0.5rem;
  padding: 1.5rem;
}

.right--block {
  min-width: 12rem;
  min-height: 24.5rem;
  background-color: #3e3e3e;
  border-radius: 0.5rem;
}
</style>
