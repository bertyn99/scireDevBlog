import { inject } from "@vercel/analytics";

export default defineNuxtPlugin((nuxtApp) => {
  // now available on `nuxtApp.$injected`
  nuxtApp.provide("injected", () => inject());
});
