export interface ExerciseMeta {
  id: string
  type: 'stateless' | 'qcm' | 'code_challenge' | 'open_question' | 'graphical'
  title?: string
  description?: string
  conceptTags?: string[]
}

export interface CheckpointEvent {
  exerciseId: string
  passed: boolean
  score: number
  conceptTags: string[]
  timestamp: number
}

export interface TestCase {
  name: string
  type: 'css-property' | 'dom-exists' | 'dom-count'
  selector: string
  property?: string
  expected?: string | number
}

export interface TestResult {
  name: string
  passed: boolean
  expected: string
  actual: string
  message?: string
}
