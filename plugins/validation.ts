import { configure } from "vee-validate";
export default defineNuxtPlugin((_nuxtApp) => {
  configure({
    validateOnBlur: true,
    validateOnChange: true,
    validateOnInput: false,
    validateOnModelUpdate: true,
  });
});
