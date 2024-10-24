<script setup lang="ts">
import type { Reactive } from "vue";
import type { User, responseUser } from "~/types/User";

async function login() {
  if (password.value && username.value) {
    const response: responseUser = await $fetch("/api/auth/login", {
      method: "post",
      body: {
        username: username.value,
        password: password.value,
      },
    });

    if (response?.status == 200) {
      localStorage.setItem("user", JSON.stringify(response.user));
      router.push("main-page");
    }

    console.log(response);
  }
  // here is post function should be
  // if response is good
  // router.push('play')
}

async function register() {
  if (password.value === confirmPassword.value) {
    const response: responseUser = await $fetch("/api/auth/signup", {
      method: "post",
      body: {
        username: username.value,
        password: password.value,
      },
    });

    if (response?.status == 200 && response?.user) {
      localStorage.setItem("user", JSON.stringify(response.user));
      router.push("main-page");
    }
  }
}

function onChangeButtonClick(type: string) {
  if (type == "Login") {
    button.value = "Register";
  } else {
    button.value = "Login";
  }
}

function onButtonClick(type: string) {
  if (type == "Login") {
    login();
  } else {
    register();
  }
}

onMounted(async () => {
  console.log("nothing here");
});

const username = ref("");
const password = ref("");
const confirmPassword = ref("");
const data: Ref<responseUser | {}> = ref({});

const router = useRouter();

const button = ref("Login");
const confirmPasswordShow = ref(true);
</script>

<template>
  <section class="auth-block">
    <h2>Tic Tac Toe</h2>
    <input type="text" placeholder="Username" v-model="username" />
    <input type="password" placeholder="Password" v-model="password" />
    <input
      type="password"
      placeholder="Confirm Password"
      v-if="button == 'Register'"
      v-model="confirmPassword"
    />
    <div class="buttons">
      <button @click="onButtonClick(button)">{{ button }}</button>
      <a @click="onChangeButtonClick(button)">{{
        button == "Login" ? "I have an account" : "Create account"
      }}</a>
    </div>
  </section>
</template>

<style lang="scss">
.auth-block {
  padding: 3rem 5rem;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);

  h2 {
    text-align: center;
    font-size: 1.5rem;
  }

  input {
    min-height: 2.5rem;
    min-width: 20rem;
    border-radius: 0.25rem;
    border: 1px solid #e1e1e1;
    padding-left: 0.75rem;
    background-color: #f3f3f3;
  }

  .buttons {
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    transition: 0.3s;

    a {
      cursor: pointer;
      font-size: 0.75rem;
    }

    a:hover {
      text-decoration: underline;
    }

    .button__hidden {
      opacity: 0;
      display: none;
    }
  }

  button {
    width: 100%;
    min-height: 2.5rem;
    border: 1px solid #e1e1e1;
    border-radius: 0.25rem;
    font-size: 1.25rem;
  }
}
</style>
