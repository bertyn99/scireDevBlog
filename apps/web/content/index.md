---
title: Learn Web Development with Interactive Courses
description: Master frontend and full-stack development with ScireDev. Hands-on projects, adaptive exercises, and build-along courses help you learn to code at your own pace.
image: /img/brand/mark.svg
head:
  meta:
    - name: keywords
      content: learn to code, web development courses, frontend development, full-stack developer, JavaScript, Vue, React, coding exercises
seo:
  title: Learn to Code with Interactive Courses
  description: Master frontend and full-stack development with ScireDev. Hands-on projects, adaptive exercises, and build-along courses.
---

:hero-landing{cta="Start learning" description="From Latin scīre — to know — and Dev. ScireDev is the platform for the knowledge of the developer: interactive courses, adaptive exercises, and the spark to keep growing." title="Knowledge of the developer."}

:feature

::feature-with-code
---
features:
  - name: Hands-on Projects
    description: Each module is accompanied by practical projects that challenge you to apply what you've learned in real-world scenarios.
    icon: i-heroicons:cloud-arrow-up
  - name: Up-to-date Content
    description: You'll have access to the latest tools, frameworks, and best practices in the industry, ensuring your skills remain relevant and marketable.
    icon: i-heroicons:lock-closed
  - name: Flexible Learning
    description: Our platform offers flexible learning options, allowing you to access course materials at your convenience. Learn at your own pace.
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
