import antfu from "@antfu/eslint-config";
import nuxt from "./.nuxt/eslint.config.mjs";

export default antfu({
	stylistic: {
		indent: "tab", // 4, or 'tab'
		quotes: "double", // or 'double'
		semi: true,
	},
	rules: {
		"no-console": 0,
	},

}, nuxt);
