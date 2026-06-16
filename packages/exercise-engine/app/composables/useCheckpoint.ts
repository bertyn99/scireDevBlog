export function useCheckpoint(options: { exerciseId: string; conceptTags?: string[] }) {
  const check = (answer: unknown) => ({ passed: false, score: 0 })
  const solved = ref(false)
  return { check, solved }
}
