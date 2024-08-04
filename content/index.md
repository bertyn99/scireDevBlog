::hero-landing
::

::feature
::

::feature-with
::

::feature-with-code
---
features: [
    {
        name: "Hands-on Projects.",
        description:"Each module is accompanied by practical projects that challenge you to apply what you've learned in real-world scenarios.",
        icon: CloudArrowUpIcon,
    },
    {
        name: "Up-to-date Content.", description:". You'll have access to the latest tools, frameworks, and best practices in the industry, ensuring that your skills remain relevant and marketable.",
        icon: LockClosedIcon
    },
    {
        name: "Flexible Learning.",
        description:"Our platform offers flexible learning options, allowing you to access course materials at your convenience. Learn at your own pace and make the most out of your available time.",
        icon: ServerIcon
    }
]
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

::newsletter
::
