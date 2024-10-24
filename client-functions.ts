export function checkAuth() {
  const router = useRouter();
  const route = useRoute();

  const user = JSON.parse(localStorage.getItem("user") ?? "null");

  if (!user && route.fullPath !== "/") {
    router.push("/");
  }
}
