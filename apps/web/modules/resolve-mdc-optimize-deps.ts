import { createRequire } from 'node:module'
import { join } from 'node:path'
import { defineNuxtModule } from '@nuxt/kit'

const MDC_NESTED_PREFIX = '@nuxtjs/mdc > '

export default defineNuxtModule({
  meta: {
    name: 'resolve-mdc-optimize-deps',
  },
  setup(_options, nuxt) {
    const requireFromApp = createRequire(join(nuxt.options.rootDir, 'package.json'))

    nuxt.hook('vite:extendConfig', (config) => {
      const include = config.optimizeDeps?.include
      if (!include) return

      const resolved: typeof include = []
      for (const entry of include) {
        const name = typeof entry === 'string' && entry.startsWith(MDC_NESTED_PREFIX)
          ? entry.slice(MDC_NESTED_PREFIX.length)
          : entry
        if (typeof name !== 'string') {
          resolved.push(entry)
          continue
        }
        try {
          requireFromApp.resolve(name)
          resolved.push(name)
        }
        catch {
          // Drop entries Vite cannot resolve so NUXT_B7002 stays quiet.
        }
      }

      config.optimizeDeps!.include = [...new Set(resolved)]
    })
  },
})
