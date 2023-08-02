// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import Theme from 'vitepress/theme'
import Base from './Base.vue'

import './tailwind.postcss'
import './style.css'

export default {
  extends: Theme,
  Layout: () => {
    return h(Base, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
  }
}
