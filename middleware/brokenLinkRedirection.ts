export default defineNuxtRouteMiddleware((to, from) => {
  console.log(to.path);

  const listRedirects = [
    { from: "/blog/basic-of-javascript", to: "/blog/what-is-javascript" },
    { from: "/blog/basic-of-typescript", to: "/blog/what-is-typescript" },
  ];

  let redirectPath = listRedirects.filter((v) => v.from == to.path);

  if (redirectPath.length !== 0 && redirectPath[0].to) {
    return navigateTo(redirectPath[0].to, { redirectCode: 301 });
  }
});
