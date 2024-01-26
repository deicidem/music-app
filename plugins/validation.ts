import * as rules from "@vee-validate/rules";
import { defineRule } from "vee-validate";
// write function snake case to camel case
console.log(rules);
export default defineNuxtPlugin((_nuxtApp) => {
  Object.keys(rules)
    .filter((key) => key !== "default")
    .forEach((rule) => {
      defineRule(rule, rules[rule]);
    });
});
