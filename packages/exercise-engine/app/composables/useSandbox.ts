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

/**
 * Inject HTML + CSS into a sandboxed iframe and render it.
 * Returns the iframe element for DOM inspection.
 */
export function createSandbox(html: string, css: string): HTMLIFrameElement {
  const iframe = document.createElement('iframe')
  iframe.sandbox.add('allow-scripts')
  iframe.style.width = '100%'
  iframe.style.height = '100%'
  iframe.style.border = 'none'

  iframe.srcdoc = `<!DOCTYPE html>
<html>
<head>
  <style>${css}</style>
</head>
<body>${html}</body>
</html>`

  return iframe
}

/**
 * Run test assertions against the sandbox iframe's DOM.
 */
export function runTests(
  iframe: HTMLIFrameElement,
  tests: TestCase[],
): TestResult[] {
  const doc = iframe.contentDocument
  if (!doc) return tests.map(t => ({
    name: t.name,
    passed: false,
    expected: 'document accessible',
    actual: 'could not access iframe document',
    message: 'Sandbox may be blocked by browser security',
  }))

  return tests.map((test) => {
    switch (test.type) {
      case 'css-property': {
        const el = doc.querySelector(test.selector)
        if (!el) return makeResult(test, false, `element "${test.selector}"`, 'not found')
        const value = getComputedStyle(el).getPropertyValue(test.property!)
        const passed = test.expected
          ? value.includes(String(test.expected))
          : !!value
        return makeResult(test, passed, String(test.expected ?? 'any value'), value)
      }

      case 'dom-exists': {
        const el = doc.querySelector(test.selector)
        return makeResult(
          test,
          el !== null,
          `"${test.selector}" to exist`,
          el ? 'found' : 'not found',
        )
      }

      case 'dom-count': {
        const count = doc.querySelectorAll(test.selector).length
        return makeResult(test, count === Number(test.expected), String(test.expected), String(count))
      }

      default:
        return makeResult(test, false, 'unknown test type', 'unknown')
    }
  })
}

function makeResult(
  test: TestCase,
  passed: boolean,
  expected: string,
  actual: string,
): TestResult {
  return {
    name: test.name,
    passed,
    expected,
    actual,
    message: passed ? undefined : `Expected ${expected}, got ${actual}`,
  }
}
