// import { createResolver } from "@nuxt/kit";
// const { resolve } = createResolver(import.meta.url);

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: {
		enabled: true,

		timeline: {
			enabled: true,
		},
	},
	imports: {
		dirs: ["types", "composables/**"],
	},
	modules: [// chore
		// styling & ui
		"nuxt-vitest",
		"@nuxtjs/tailwindcss",
		"@pinia/nuxt",
		"@nuxtjs/google-fonts",
		"nuxt-purgecss",
		"@vueuse/nuxt",
		"@vee-validate/nuxt",
		"nuxt-vuefire",
		"nuxt-module-eslint-config",
	],
	css: [
		"./assets/css/main.css",
		"@fortawesome/fontawesome-free/css/all.min.css",
	],
	pinia: {
		storesDirs: ["stores/**"],
	},
	googleFonts: {
		families: {
			Roboto: true,
		},
	},
	veeValidate: {
		// disable or enable auto imports
		autoImports: true,
		// Use different names for components
		componentNames: {
			Form: "VeeForm",
			Field: "VeeField",
			FieldArray: "VeeFieldArray",
			ErrorMessage: "VeeErrorMessage",
		},
	},
	vuefire: {
		config: {
			apiKey: "AIzaSyAhCA5LdQuKLnC4rbO9yVAKg_9QmY_lrqk",
			authDomain: "music-a2e01.firebaseapp.com",
			projectId: "music-a2e01",
			storageBucket: "music-a2e01.appspot.com",
			appId: "1:155985681405:web:c2fe291216b57d8809d794",
		},
		auth: {
			enabled: true,
			sessionCookie: true,
		},
	},
	experimental: {
		defaults: {
			nuxtLink: {
				exactActiveClass: "text-yellow-400",
			},
		},
	},
	sourcemap: {
		server: true,
		client: true,
	},
	eslintConfig: {
		setup: false,
	},
	// postcss: {
	//   plugins: {
	//     cssnano: {
	//       preset: "default",
	//     },
	//   },
	// },
	// purgecss: {
	//   enabled: true, // Always enable purgecss
	//   fontFace: true,
	// },
});
