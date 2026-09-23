import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { defineNuxtModule } from '@nuxt/kit'

function stripDrizzleV0RelationsSource(source: string): string {
  if (!source.includes('Relations') && !source.includes('relations')) {
    return source
  }

  let next = source.replace(
    /import\s*\{([^}]*)\}\s*from\s*(['"])drizzle-orm\2\s*;?/,
    (_match, inner: string, quote: string) => {
      const names = inner
        .split(',')
        .map(part => part.trim())
        .filter(part => part && part !== 'relations' && !part.startsWith('relations '))
      return names.length ? `import { ${names.join(', ')} } from ${quote}drizzle-orm${quote};` : ''
    },
  )

  const declaration = /(?:export\s+)?const\s+\w+Relations\s*=\s*relations\(/g
  let out = ''
  let last = 0
  let match = declaration.exec(next)
  while (match) {
    out += next.slice(last, match.index)
    let index = declaration.lastIndex
    let depth = 1
    while (index < next.length && depth) {
      if (next[index] === '(') depth++
      else if (next[index] === ')') depth--
      index++
    }
    while (index < next.length && /[;\s]/.test(next[index])) index++
    last = index
    match = declaration.exec(next)
  }
  next = `${out}${next.slice(last)}`

  next = next.replace(/export\s*\{([^}]+)\}/g, (_match, inner: string) => {
    const names = inner
      .split(',')
      .map(part => part.trim())
      .filter(part => part && !/(?:^|\s)\w+Relations$/.test(part))
    return names.length ? `export { ${names.join(', ')} }` : ''
  })

  return next.replace(/\n{3,}/g, '\n\n')
}

async function stripDrizzleV0RelationsFile(filePath: string): Promise<void> {
  let source: string
  try {
    source = await readFile(filePath, 'utf-8')
  }
  catch {
    return
  }
  const next = stripDrizzleV0RelationsSource(source)
  if (next !== source) {
    await writeFile(filePath, next)
  }
}

export default defineNuxtModule({
  meta: {
    name: 'strip-drizzle-v0-relations',
  },
  setup(_options, nuxt) {
    const schemaFiles = () => [
      join(nuxt.options.buildDir, 'better-auth/schema.sqlite.ts'),
      join(nuxt.options.buildDir, 'hub/db/schema.mjs'),
      join(nuxt.options.buildDir, 'hub/db/schema.d.mts'),
      join(nuxt.options.rootDir, 'node_modules/@nuxthub/db/schema.mjs'),
      join(nuxt.options.rootDir, 'node_modules/@nuxthub/db/schema.d.mts'),
    ]

    nuxt.hook('hub:db:schema:extend', async ({ paths }) => {
      for (const schemaPath of paths) {
        await stripDrizzleV0RelationsFile(schemaPath)
      }
    })

    nuxt.hook('app:templatesGenerated', async () => {
      for (const schemaPath of schemaFiles()) {
        await stripDrizzleV0RelationsFile(schemaPath)
      }
    })
  },
})
