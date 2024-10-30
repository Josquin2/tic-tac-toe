<script setup lang="ts">
import type { User } from "~/types/User";
import Quit from "./Icons/Quit.vue";

function onQuitClick() {
  localStorage.clear();
  router.push("/");
}

const router = useRouter();
const user: User = JSON.parse(localStorage.getItem("user") || "null");
const phrase = ref("Some phrase here");
</script>

<template>
  <div class="user-block left--block" v-if="user">
    <div class="user__header__info">
      <div class="user__avatar">
        <img src="" alt="" />
      </div>
      <div class="user__about__info">
        <div class="info--achievements"></div>
        <div class="info--name">
          <h2>{{ user?.username }}</h2>
        </div>
        <div class="info--phrase">
          <input type="text" v-model="phrase" /> <button></button>
        </div>
      </div>
    </div>
    <div class="user__footer__info">
      <div class="user__stats">
        <p>Games: N/A</p>
        <p>Wins: N/A</p>
      </div>
      <button class="user__quit" @click="onQuitClick">
        <Quit />
      </button>
    </div>
  </div>
</template>

<style lang="scss">
.user-block {
  min-height: 13rem !important;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .user__header__info {
    display: flex;
    flex-direction: row;
    gap: 0.75rem;

    .user__avatar {
      display: flex;
      width: 5rem;
      height: 5rem;
      background-color: #575757;
      border-radius: 1rem;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .user__about__info {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;

      .info--achievements {
        margin-left: 0.25rem;
      }

      .info--name {
        h2 {
          font-size: 1.25rem;
        }
      }

      .info--phrase {
        input {
          background-color: transparent;
          border: none;
          font-size: 0.9rem;
        }
      }
    }
  }

  .user__footer__info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    height: 100%;

    .user__stats {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      p {
        margin: 0;
      }
    }

    .user__quit {
      transition: 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 0.5rem;
      background-color: #575757;
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1),
        0 2px 4px -2px rgb(0 0 0 / 0.1);
    }

    .user__quit:hover {
      background-color: #505050;
      box-shadow: 0 8px 12px -2px rgb(0 0 0 / 0.3),
        0 4px 8px -4px rgb(0 0 0 / 0.3);
    }
  }
}
</style>
