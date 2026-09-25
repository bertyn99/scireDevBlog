export type PlaygroundScreen =
  | 'landing'
  | 'catalog'
  | 'path'
  | 'course'
  | 'chapter'
  | 'exercise'
  | 'studio'

export type PlaygroundMark = 'leaf' | 'circle' | 'grove'
export type PlaygroundPalette = 'd' | 'warm' | 'cool'

export const SCREENS: { id: PlaygroundScreen, label: string }[] = [
  { id: 'landing', label: 'Landing' },
  { id: 'catalog', label: 'Catalog' },
  { id: 'path', label: 'Path' },
  { id: 'course', label: 'Course' },
  { id: 'chapter', label: 'Chapter' },
  { id: 'exercise', label: 'Exercise' },
  { id: 'studio', label: 'Studio' },
]

export const MARKS: { id: PlaygroundMark, label: string }[] = [
  { id: 'leaf', label: 'Leaf' },
  { id: 'circle', label: 'Circle' },
  { id: 'grove', label: 'Grove' },
]

export const PALETTE_OPTIONS: { id: PlaygroundPalette, label: string }[] = [
  { id: 'd', label: 'D' },
  { id: 'warm', label: 'Warm' },
  { id: 'cool', label: 'Cool' },
]

export const PALETTES: Record<PlaygroundPalette, {
  label: string
  paper: string
  ink: string
  minium: string
  slate: string
  ash: string
  surface: string
}> = {
  d: {
    label: 'D',
    paper: '#F4F4F5',
    ink: '#262626',
    minium: '#F23005',
    slate: '#3F4A52',
    ash: '#A6A6A6',
    surface: '#FFFFFF',
  },
  warm: {
    label: 'Warm',
    paper: '#F5F3F0',
    ink: '#262626',
    minium: '#F23005',
    slate: '#4A4540',
    ash: '#A39E98',
    surface: '#FFFCF8',
  },
  cool: {
    label: 'Cool',
    paper: '#F2F4F6',
    ink: '#24282C',
    minium: '#F23005',
    slate: '#3A4650',
    ash: '#9AA3AA',
    surface: '#FFFFFF',
  },
}

function isScreen(v: unknown): v is PlaygroundScreen {
  return SCREENS.some(s => s.id === v)
}

function isMark(v: unknown): v is PlaygroundMark {
  return MARKS.some(m => m.id === v)
}

function isPalette(v: unknown): v is PlaygroundPalette {
  return v === 'd' || v === 'warm' || v === 'cool'
}

export function usePlayground() {
  const route = useRoute()
  const router = useRouter()

  const screen = computed<PlaygroundScreen>(() =>
    isScreen(route.query.screen) ? route.query.screen : 'landing',
  )
  const mark = computed<PlaygroundMark>(() =>
    isMark(route.query.mark) ? route.query.mark : 'leaf',
  )
  const palette = computed<PlaygroundPalette>(() =>
    isPalette(route.query.palette) ? route.query.palette : 'd',
  )

  const tokens = computed(() => PALETTES[palette.value])

  const cssVars = computed(() => ({
    '--pg-paper': tokens.value.paper,
    '--pg-ink': tokens.value.ink,
    '--pg-minium': tokens.value.minium,
    '--pg-slate': tokens.value.slate,
    '--pg-ash': tokens.value.ash,
    '--pg-surface': tokens.value.surface,
    '--pg-radius': '8px',
  }))

  function patch(next: Partial<{
    screen: PlaygroundScreen
    mark: PlaygroundMark
    palette: PlaygroundPalette
  }>, mode: 'push' | 'replace' = 'replace') {
    const query = {
      screen: next.screen ?? screen.value,
      mark: next.mark ?? mark.value,
      palette: next.palette ?? palette.value,
    }
    router[mode]({ query })
  }

  function cycleScreen(dir: 1 | -1) {
    const i = SCREENS.findIndex(s => s.id === screen.value)
    const next = SCREENS[(i + dir + SCREENS.length) % SCREENS.length]
    if (next) patch({ screen: next.id }, 'push')
  }

  return { screen, mark, palette, tokens, cssVars, patch, cycleScreen }
}
