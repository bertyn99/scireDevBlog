---
title: Building Reusable Components with Vue 3
description: Learn how to build reusable components with Vue 3, and explore popular UI libraries like Vuetify, PrimeVue, and ShadcnVue to streamline your development process.
image: img/article/cover/vue_3_reusable_component.webp
author: Magius
category: Web Development
createdAt: '2024-08-08'
modifiedAt: '2024-08-08'
tags:
  - JavaScript
  - Vue.js
  - UI Components
  - Web Development
head:
  meta:
    - name: keywords
    - content: Vue 3, JavaScript, reusable components, Vuetify, PrimeVue, ShadcnVue, web development
---

Welcome to ScireDev, young developers! Today, we're diving into a trending topic that's essential for any web developer: building reusable components with Vue 3. With the rise of modern JavaScript frameworks, creating modular, maintainable, and reusable code has become more important than ever. Vue 3, with its powerful Composition API, offers an elegant solution for building such components.

In this article, we'll explore the basics of Vue 3 components, guide you through creating reusable components, discuss existing UI libraries that can save you time, and provide practical advice and examples to get you started. By the end, you'll have the knowledge to enhance your development workflow and create more efficient applications.

## What Are Vue Components?

Vue components are the building blocks of a Vue.js application. They encapsulate HTML, CSS, and JavaScript, allowing you to create self-contained units of functionality. This modular approach makes it easier to manage and scale your application.

> "Components are meant to be reusable instances with isolated data and logic."

### Example: A Simple Button Component

Let's start with a basic example: a button component. Here's how you can define a simple button component in Vue 3 using the Composition API:

```vue
<template>
  <button @click="handleClick">{{ label }}</button>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  label: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['click']);

function handleClick() {
  emit('click');
}
</script>

<style scoped>
button {
  padding: 10px 20px;
  background-color: #42b983;
  border: none;
  color: white;
  cursor: pointer;
}
</style>
```

### Explanation

- **Template**: Defines the HTML structure of the component.
- **Script Setup**: Uses the Composition API with `defineProps` and `defineEmits` for props and event handling.
- **Style**: Scoped CSS to style the component.

## Why Reusable Components Matter

Reusable components are crucial for several reasons:

1. **Maintainability**: Changes in one place reflect everywhere the component is used.
2. **Consistency**: Ensures a uniform look and feel across the application.
3. **Efficiency**: Reduces code duplication and speeds up development.

## Creating Reusable Components

### Step 1: Identify Common Patterns

Before creating reusable components, identify common patterns in your application. For instance, buttons, form inputs, and modal dialogs are often repeated across different parts of an app.

### Step 2: Define Component Props

Props are custom attributes you can register on a component. They allow you to pass data from a parent component to a child component, making your components more dynamic and flexible.

```vue
<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'button'
  },
  disabled: {
    type: Boolean,
    default: false
  }
});
</script>
```

### Step 3: Emit Custom Events

Using the `emit` method, you can create custom events to communicate between components. This is especially useful for handling user interactions.

```vue
<template>
  <button :disabled="disabled" @click="$emit('custom-click')">
    <slot></slot>
  </button>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  disabled: Boolean
});

const emit = defineEmits(['custom-click']);
</script>
```

### Practical Example: A Reusable Input Component

Let's create a reusable input component that can be used for different types of inputs, such as text, email, or password.

```vue
<template>
  <input :type="type" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'text'
  },
  modelValue: {
    type: [String, Number],
    default: ''
  }
});

const emit = defineEmits(['update:modelValue']);
</script>

<style scoped>
input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
```

### Explanation

- **Two-way Binding**: The `modelValue` prop and `update:modelValue` event enable two-way data binding, making the component more versatile.
- **Slot**: Using slots allows you to pass custom content into the component.

## Leveraging Existing UI Libraries

While building reusable components from scratch can be rewarding and offer full control, it can also be time-consuming. Fortunately, several popular UI libraries provide pre-built, customizable components to expedite development. Vuetify offers a wide range of Material Design components, PrimeVue provides a rich set of highly customizable components suitable for various projects, and ShadcnVue offers lightweight, reusable components designed for easy integration. Leveraging these libraries can significantly streamline your workflow and ensure consistency across your projects.

## Conclusion

Building reusable components in Vue 3 is a powerful way to create more maintainable, efficient, and consistent applications. By leveraging props, custom events, and Vue’s flexible API, you can craft components that serve multiple purposes across your app. Additionally, using existing UI libraries like Vuetify, PrimeVue, and ShadcnVue can save you time and effort, allowing you to focus on the unique aspects of your project.

We hope this guide has provided you with valuable insights and practical steps to start creating your own reusable components. Stay tuned for more articles on advanced Vue 3 topics, and don't hesitate to explore our [Vue 3 Deep Dive](https://sciredev.com/vue3-deep-dive) course for an in-depth understanding.

Happy coding!
