// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  alias: {
    "~": "/<rootDir>",
  },
  app: {
    rootId: 'laure'
  },
  typescript: {
    typeCheck: true,
  },
})
