:hero-landing{cta="Get started" description="Our platform stands out from the rest, offering a comprehensive learning experience that covers the key aspects required to become a proficient web developer." title="We’re changing the way you learn to code."}

:feature

::feature-with-code
---
features:
  - name: Hands-on Projects.
    description:"Each module is accompanied by practical projects that challenge you to apply what you've learned in real-world scenarios:
      '"': null
    icon: i-heroicons:cloud-arrow-up
  - name: Up-to-date Content.
    description:":
      " You'll have access to the latest tools": null
    frameworks: null
    and best practices in the industry: null
    ensuring that your skills remain relevant and marketable:
      '"': null
    icon: i-heroicons:lock-closed
  - name: Flexible Learning.
    description:"Our platform offers flexible learning options: null
    allowing you to access course materials at your convenience:
      " Learn at your own pace and make the most out of your available time":
        '"': null
    icon: i-heroicons:server
---
```tsx
    import { useState } from 'react'
    import { Switch } from '@headlessui/react'

    function Example() {

        const [enabled, setEnabled] = useState(true)

        return (

            <form action="/notification-settings" method="post">
                <Switch checked={enabled} onChange={setEnabled} name="notifications">
                    {/* ... */}
                </Switch>
                <button>Submit</button>
            </form>

        )
    }
```
::

:newsletter
