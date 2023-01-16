import { inject } from "@vercel/analytics";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("injected", () => inject());
});
