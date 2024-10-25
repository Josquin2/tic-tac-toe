<script setup lang="ts">
import type { responseUser } from "~/types/User";

// Function to authenticate user (login or register)
async function authenticate(type: string) {
  if (username.value && password.value) {
    // Additional validation for registration
    if (type === "Register" && password.value.length < 6) {
      addErrorMessage("Password should be at least 6 symbols length");
      return;
    }
    if (type === "Register" && password.value !== confirmPassword.value) {
      addErrorMessage("Passwords do not match");
      return;
    }

    const url = type === "Login" ? "/api/auth/login" : "/api/auth/signup";
    try {
      const response: responseUser = await $fetch(url, {
        method: "post",
        body: {
          username: username.value,
          password: password.value,
        },
      });

      // Check the response status
      if (response?.status === 200 && response?.user) {
        localStorage.setItem("user", JSON.stringify(response.user));
        router.push("main-page");
      } else if (response?.status !== 200) {
        console.error(
          "Error:",
          response?.status,
          response?.error || "Unknown error"
        );

        // Handle different error statuses
        switch (response?.status) {
          case 401:
            addErrorMessage("Password is wrong");
            break;
          case 400:
            addErrorMessage("Username already exists");
            break;
          case 404:
            addErrorMessage("Username not found");
            break;
          default:
            addErrorMessage("An unexpected error occurred");
        }
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }
}

// Function to handle button click event
function onButtonClick(type: string) {
  authenticate(type);
}

// Function to add error message
function addErrorMessage(message: string) {
  error.value = message;
  document
    .getElementById("error-message")
    ?.classList?.add("auth__error__message");
}

// Function to handle change button click event
function onChangeButtonClick(type: string) {
  const inputClass = document.getElementById("second-password")?.classList;
  if (type == "Login") {
    button.value = "Register";
    inputClass?.add("input__show");
    inputClass?.remove("input__hidden");
  } else {
    button.value = "Login";
    inputClass?.add("input__hidden");
    inputClass?.remove("input__show");
  }
}

// Function to check if user is already logged in
onMounted(async () => {
  const user = JSON.parse(localStorage.getItem("user") ?? "null");
  if (user) {
    router.push("/main-page");
  }
});

// Reactive variables
const username = ref("");
const password = ref("");
const confirmPassword = ref("");
const router = useRouter();
const error = ref("");
const button = ref("Register");

// Watcher to reset error message after timeout
watch(error, () => {
  setTimeout(() => {
    document
      .getElementById("error-message")
      ?.classList?.remove("auth__error__message");
    setTimeout(() => {
      error.value = "";
    }, 300);
  }, 1500);
});
</script>

<template>
  <section class="auth-block">
    <div class="auth__header">
      <h2>Tic Tac Toe</h2>

      <p id="error-message">{{ error }}</p>
    </div>

    <input type="text" placeholder="Username" v-model="username" />

    <div class="password-block">
      <input type="password" placeholder="Password" v-model="password" />
      <input
        type="password"
        class="second__password"
        placeholder="Confirm Password"
        id="second-password"
        v-model="confirmPassword"
      />
    </div>
    <div class="buttons">
      <button @click="onButtonClick(button)">{{ button }}</button>
      <a @click="onChangeButtonClick(button)">{{
        button !== "Login" ? "I have an account" : "Create account"
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

  .auth__header {
    h2 {
      text-align: center;
      font-size: 1.5rem;
    }

    p {
      height: 0rem;
      overflow: hidden;
      transition: 0.3s;
    }

    .auth__error__message {
      height: 1.5rem;
    }
  }

  input {
    height: 2.5rem;
    min-width: 20rem;
    border-radius: 0.25rem;
    border: 1px solid #e1e1e1;
    padding-left: 0.75rem;
    background-color: #f3f3f3;
    transition: 0.3s;
  }

  .password-block {
    display: flex;
    flex-direction: column;

    .second__password {
      margin-top: 2rem;
    }
    .input__hidden {
      animation: hide-input 0.4s forwards;
    }

    .input__show {
      animation: show-input 0.4s forwards;
    }
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
