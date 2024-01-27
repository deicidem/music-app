import * as rules from "@vee-validate/rules";
import { defineRule, configure } from "vee-validate";
// write function snake case to camel case
export default defineNuxtPlugin((_nuxtApp) => {
  // Object.keys(rules)
  //   .filter((key) => key !== "default")
  //   .forEach((rule) => {
  //     defineRule(rule, rules[rule]);
  //   });

  defineRule("required", rules.required);
  defineRule("tos", rules.required);
  defineRule("min", rules.min);
  defineRule("max", rules.max);
  defineRule("alpha_spaces", rules.alpha_spaces);
  defineRule("email", rules.email);
  defineRule("min_value", rules.min_value);
  defineRule("max_value", rules.max_value);
  defineRule("excluded", rules.not_one_of);
  defineRule("country_excluded", rules.not_one_of);
  defineRule("password_mismatch", rules.confirmed);

  configure({
    generateMessage(ctx) {
      const messages = {
        required: `The ${ctx.field} field is required.`,
        min: `The ${ctx.field} must be at least ${ctx.rule?.params?.[0]} characters.`,
        max: `The ${ctx.field} must be less than ${ctx.rule?.params?.[0]} characters.`,
        alpha_spaces: `The ${ctx.field} may only contain letters and spaces.`,
        email: `The ${ctx.field} must be a valid email.`,
        min_value: `The ${ctx.field} must be at least ${ctx.rule?.params?.[0]}.`,
        max_value: `The ${ctx.field} must be less than ${ctx.rule?.params?.[0]}.`,
        excluded: `The ${ctx.field} is not allowed.`,
        country_excluded: `Due to restrictions, we do not accept users from this location.`,
        password_mismatch: `The passwords don't match`,
        tos: `You must accept the Terms of Service.`,
      };
      if (ctx.rule) {
        return messages[ctx.rule.name];
      } else {
        return `The ${ctx.field} is invalid`;
      }
    },

    validateOnBlur: true,
    validateOnChange: true,
    validateOnInput: false,
    validateOnModelUpdate: true,
  });
});
