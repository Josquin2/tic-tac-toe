export default defineNuxtRouteMiddleware((to, from) => {
  // isAuthenticated() is an example method verifying if a user is authenticated
  if (isAuthenticated() != true) {
    return navigateTo("/auth");
  }
});

function isAuthenticated() {
  // its not working
  //   cause its working on the server side
  if (localStorage.getItem("user")) {
    return true;
  } else {
    return false;
  }
}
