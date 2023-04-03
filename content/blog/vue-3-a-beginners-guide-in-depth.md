---
    title: 'Getting Started with Vue 3: A Beginners Guide in Depth'
    description: "Learn the basics of Vue 3 and start building your first web application with this beginner's guide. Get a comprehensive introduction to Vue 3 and its features."
    image: 'img/article/cover/vue_cover.webp'
    author: 'magius'
    category: 'road to basic'
    createdAt: '2023-04-03'
    modifiedAt: '2023-04-03'
    tags: ['frontend']
    head:
        meta: 
            -  name: "keywords"
               content: "vue, vue3, vue lifecycle, framework, javascript"
---


In recent years, Vue.js has emerged as a popular front-end JavaScript framework, thanks to its remarkable mix of ease, speed, and user-friendliness. Hold onto your headwear, though, because Vue.js 3 has upped its game with many fresh features and performance improvements. You're fortunate if you're a novice who wants to jump into Vue 3! You will be guided step-by-step through the ins and outs of setting up Vue 3 by this helpful article. Prepare to let your imagination run wild and change the front-end programming game! We will cover the following topics:

## **1. Introduction to Vue 3**

 **What is Vue.js?**

Vue.js is a progressive front-end JavaScript framework used for building user interfaces and single-page applications. It was created by Evan You in 2014 and has since gained popularity among developers due to its simplicity and ease of use. Vue.js allows developers to create reusable components, making it easy to build complex UIs.

 **What's new in Vue.js 3?**

Vue.js 3 was released in September 2020 and comes with many new features and performance improvements. The new version of Vue.js is faster, smaller, and more maintainable than previous versions. Some of the new features in Vue.js 3 include:

- Improved rendering performance
- Smaller bundle size
- Improved TypeScript support
- Composition API for better code organization
- Better support for custom rendering

### **Why should you choose Vue.js?**

Vue.js is a popular framework used by many developers due to its simplicity, performance, and ease of use. Some of the benefits of using Vue.js include:

- Easy to learn and use
- Simple and intuitive syntax
- Large community and ecosystem
- Excellent documentation and resources
- Great for building complex UIs
- High performance and fast rendering

## **2. Setting up Vue 3**

### **Installing Vue 3**

To install Vue 3, you can use the following command:

### **Creating a Vue project**

The Vue CLI tool allows you to create a new Vue project with just a few simple commands. To create a new Vue project, follow these steps:

1. Install the Vue Create CLI by running the following command:
    
    ```bash
    npm i vue@latest
    ```
    
2. Initialize the project.
    
    ```bash
    npm init vue@latest
    ```
    
3. Follow the prompts to select the features you want to include in your project, such as TypeScript or Router.
    
    ```bash
    ✔ Project name: … <your-project-name>
    ✔ Add TypeScript? … No / Yes
    ✔ Add JSX Support? … No / Yes
    ✔ Add Vue Router for Single Page Application development? … No / Yes
    ✔ Add Pinia for state management? … No / Yes
    ✔ Add Vitest for Unit testing? … No / Yes
    ✔ Add Cypress for both Unit and End-to-End testing? … No / Yes
    ✔ Add ESLint for code quality? … No / Yes
    ✔ Add Prettier for code formatting? … No / Yes
    
    Scaffolding project in ./<your-project-name>...
    Done.
    
    ```
    
4. Launch the project.
    
    ```bash
    cd projet-name
    npm install
    npm run dev
    
    ```
    

### **Understanding the Vue 3 project structure**

When you create a new Vue 3 project, you'll notice that it has a specific file structure that is optimized for Vue development. Here's an overview of the project structure:

- **`src/`**: This directory contains your main application code, including components, templates, and styles.
- **`public/`**: This directory contains your public assets, such as your **`index.html`** file and any static files.
- **`node_modules/`**: This directory contains all the third-party dependencies installed by npm.

## **3. Vue 3 Basics**

### **Vue 3 SFC**

Vue 3 Single File Component simplifies component development in Vue.js by allowing developers to define all the necessary code for a component in **a single file**.

 The template, script, and styles can be written in **HTML, JavaScript, CSS**, Sass, or other styling languages. Using Single File Components, developers can write more **maintainable and scalable** code in their Vue.js projects.

```jsx
<script setup>
</script>

<template>
  <div></div>
</template>

<style></style>
```

### **Vue 3 Templates**

Vue 3 templates are used to define the structure and layout of your application. Templates are written using HTML syntax and can include data bindings, conditional logic, and other dynamic features. Here's an example of a simple Vue 3 template:

```jsx
<template>
  <div>
    <h1>{{ message }}</h1>
    <p v-if="showMessage">This message is shown when showMessage is true.</p>
  </div>
</template>

```

In this example, we have a template that displays a message variable and conditionally shows a message based on the value of the **`showMessage`** variable.

### **Vue 3 Components**

Vue 3 components are reusable building blocks that can be used to create complex user interfaces. Components can be thought of as custom HTML elements that have their own data, templates, and behavior. Here's an example of a simple Vue 3 component:

```jsx
<script setup>

</script>

<template>
  <p>Welcome</p>
</template>

<style></style>
```

In this example, we've defined a new component called **`MyComponent`** with  a template. 

And we can import it elsewhere like that

```jsx

//app.vue
<script setup>
import {MyComponent} from
</script>

<template>
  <p>Welcome</p>
</template>

<style></style>
```

### **Vue 3 Directives**

Vue 3 directives are special attributes that can be added to HTML elements to bind data or manipulate the DOM. Directives start with the **`v-`** prefix and can be used to do things like conditionally render content, bind values to form inputs and loop over arrays.

Here's an example of a few common Vue 3 directives:

```jsx
<template>
  <div>
    <p v-if="showMessage">This message is shown when showMessage is true.</p>
		<input v-model="message" />
		<ul>
			<li v-for="item in items" :key="item.id">{{ item.name }}</li>
		</ul>
  </div>
</template>

```

In this example, we've used the **`v-if`** directive to conditionally show a message, the **`v-model`** directive to bind a form input to a data property, and the **`v-for`** directive to loop over an array and render a list of items.

### ****Basic Directives****

Here are some of the most commonly used Vue 3 directives:

- **`v-model`**: Two-way binding between a form input element and a data property
- **`v-if`** and **`v-else`**: Conditionally render elements based on a boolean expression
- **`v-for`**: Render a list of items based on an array
- **`v-show`**: Conditionally display an element based on a boolean expression
- **`v-on`**: Attach event listeners to elements
- **`v-bind`**: Dynamically bind an attribute to an expression
- **`v-text`**: Render the text content of an element based on an expression
- **`v-html`**: Render HTML content based on an expression

### Vue 3 Computed Properties

Computed properties are used to calculate a value based on other properties in the Vue instance.

In Vue 3, computed properties are defined using the **`computed`** function. The **`computed`** function takes an object with a name for the computed property and a function that returns the computed value. Here's an example:

```jsx
<script setup>
	const firstName = ref("John");
	const lastName = ref("Doe");
	const fullname = computed(()=>`${firstName.value} ${lastName.value}`
</script>
```

In this example, we have a Vue instance with two data properties, **`firstName`**
 and **`lastName`**, and a computed property called **`fullName`**. The **`fullName`**property uses string interpolation to combine the first and last names into a single string.

### Vue 3 Watchers

Watchers are another important feature of Vue.js, and they allow you to watch for changes to a property or expression in the Vue instance and perform an action when it changes. Vue 3 continues to support watchers, but with some improvements over previous versions.

### Watch

In Vue 3, watchers are defined using the **`watch`**function. The **`watch`**function takes the name of the property or expression to watch and a function to be called when the property or expression changes. Here's an example:

```jsx

<script setup>
	const x = ref(0)
	const y = ref(0)

// single ref
watch(x, (newX) => {
  console.log(`x is ${newX}`)
})

// getter
watch(
  () => x.value + y.value,
  (sum) => {
    console.log(`sum of x + y is: ${sum}`)
  }
)

// array of multiple sources
watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x is ${newX} and y is ${newY}`)
})
<script setup>
```

### WatchEffect

**`watchEffect`** is a new API in Vue 3 that allows us to perform reactive side effects. It automatically detects the reactive dependencies used inside its callback function and tracks them.

This means that when any of these dependencies change, the **`watchEffect`** callback will be triggered. In other words, **`watchEffect`** is a shortcut for creating a watcher that automatically tracks all reactive dependencies inside its callback.

```jsx
import { reactive, watchEffect } from 'vue'
const state = reactive({
count: 0,
message: ''
})
watchEffect(() => {
console.log(Count is ${state.count})
state.message = Count is now ${state.count}
})
```

In this example, the **`watchEffect`** callback logs the current count and updates the message whenever the **`count`** property changes. Since **`watchEffect`** automatically tracks the **`count`** property, we don't need to explicitly define it as a dependency.

Overall, **`watchEffect`** is a convenient and powerful API that can simplify our reactive programming code in Vue 3.

### **`watch` vs. `watchEffect`**

**`watch`** and **`watchEffect`** are methods that allow us to perform side effects reactively. However, they differ in how they track their reactive dependencies.

- With **`watch`**, only explicitly watched sources are tracked. The callback won't track anything accessed within it. Additionally, the callback only triggers when the source has changed, giving more precise control over when the callback should fire. This separates dependency tracking from the side effect, providing greater control.
- On the other hand, **`watchEffect`** combines dependency tracking and side effects into one phase. During its synchronous execution, it automatically tracks every reactive property accessed. This method is more convenient and results in shorter code, but its reactive dependencies are less explicit.

### **Vue 3 Lifecycle Hooks**

Vue 3 provides several lifecycle hooks that allow you to execute code at specific stages in a component's lifecycle, such as when the component is created, mounted, updated, or destroyed. In addition to the lifecycle hooks, Vue 3 also introduces the Composition API, which provides a new way to organize and reuse component logic.

Here are the main lifecycle hooks provided by Vue 3:

- **`beforeCreate`**: Called before a component is created
- **`created`**: Called after a component is created, but before it's mounted to the DOM
- **`beforeMount`**: Called before a component is mounted to the DOM
- **`mounted`**: Called after a component is mounted to the DOM
- **`beforeUpdate`**: Called before a component is updated
- **`updated`**: Called after a component is updated
- **`beforeUnmount`**: Called before a component is unmounted from the DOM
- **`unmounted`**: Called after a component is unmounted from the DOM

![lifecycle-vue.png](img/article/lifecycle-vue.png)

You can define these lifecycle hooks as methods on your Vue components, like this with the composition api:

```jsx
<script setup>
import {ref, onMounted, onBeforeUnmount,onBeforeMount} from "vue
 console.log('Component created.')
	onBeforeMount(()=> {
    console.log('Component mounted.')
  })  
	onMounted(()=> {
	    console.log('Component mounted.')
	 })
  onBeforeUnmount(() =>{
    console.log('Component about to be unmounted.')
  })
</script>

<template>
  <p>Welcome</p>
</template>
```

In this example, we've defined a new component called **`MyComponent`** with a few lifecycle hooks. These hooks will be called when the component is created, mounted, and about to be unmounted.

## **4. Conclusion**

Vue 3 is a powerful JavaScript framework that makes it easy to build complex web applications. By following the steps in this guide, you should have a good understanding of the basics of Vue 3 and how to get started with building your own Vue 3 applications.

If you want to learn more about Vue 3, be sure to check out the [official Vue documentation](https://vuejs.org/), which has plenty of information and resources for learning Vue 3.

## **5. FAQs**

 **Q1. What is Vue 3?**

Vue 3 is a progressive JavaScript framework for building user interfaces.

 **Q2. What's new in Vue 3?**

Vue 3 introduces several new features and improvements, including a new reactive system, improved performance, and a streamlined API.

 **Q3. Can I use Vue 3 with TypeScript?**

Yes, Vue 3 has first-class TypeScript support and includes type definitions for all core APIs.

 **Q4. Is Vue 3 backward compatible with Vue 2?**

While there are some breaking changes between Vue 2 and Vue 3, there is an official migration guide and many tools available to help you upgrade your Vue 2 code to Vue 3.

 **Q5. What kind of projects is Vue 3 best suited for?**

Vue 3 is a versatile framework that can be used for a wide range of projects, from small web apps to large enterprise applications. It's particularly well-suited for projects that require a high degree of interactivity and dynamic user interfaces.