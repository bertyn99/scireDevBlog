---
    title: 'Vue 3 Directives: A Comprehensive Guide in Depth'
    description: 'We will dive deep into Vue 3 directives, explaining what they are, how they work, and how you can use them in your Vue 3 projects.'
    image: 'img/article/cover/vue-3-directive_cover.webp'
    author: 'magius'
    category: 'road to basic'
    createdAt: '2023-04-07'
    modifiedAt: '2023-04-07'
    tags: ['frontend']
    head:
        meta: 
            -  name: "keywords"
               content: "vue, vue3, vue directive, custom directive, framework, javascript"
---


Vue is a popular JavaScript framework that simplifies the process of building modern web applications. Vue 3 is the latest version of the framework and comes with several new features, including updated directives. In this comprehensive guide, we'll dive deep into Vue 3 directives, explaining what they are, how they work, and how you can use them in your Vue 3 projects.

## **What are Vue 3 directives?**

Directives in Vue 3 are special attributes that allow you to apply reactive behavior to the DOM when the value of an expression changes. Directives are prefixed with the "v-" character and can be used to manipulate elements, attributes, and text content. In other words, directives provide a way to add dynamic behavior to your HTML templates.

## **Built-in directives in Vue 3**

Vue 3 comes with several built-in directives that you can use right out of the box. These directives include v-if, v-show, v-for, v-bind, v-on, and v-model.

### **v-if**

The `v-if` directive is used to conditionally render a block of HTML based on a boolean expression. If the expression is true, the HTML is displayed. If the expression is false, the HTML is hidden.

```jsx
<template>
  <div v-if="show">
    This is displayed when show is true.
  </div>
</template>

<script setup>
import { ref } from "vue";
const show= ref(true)
</script>

```

### **v-show**

The `v-show` directive is similar to v-if, but instead of adding or removing the HTML from the DOM, it toggles the CSS display property. This means that the HTML is always in the DOM, but it's only visible when the expression is true.

```
<template>
  <div v-show="show">
    This is always in the DOM, but only visible when show is true.
  </div>
</template>

<script setup>
import { ref } from "vue";
const show= ref(true)
</script>
```

### **v-for**

The `v-for` directive is used to render a list of items based on an array. It loops through the array and renders a block of HTML for each item in the array.

```
htmlCopy code
<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      {{ item.name }}
    </li>
  </ul>
</template>
<script setup>
	import { ref } from "vue";
	const items: ref([
	        { id: 1, name: 'Item 1' },
	        { id: 2, name: 'Item 2' },
	        { id: 3, name: 'Item 3' }
	      ])
</script>    
```

### **v-on**

The **`v-on`** directive in Vue 3 is used to bind event listeners to elements in your templates. It allows you to respond to user interactions, such as mouse clicks, key presses, and form submissions.

The **`v-on`** directive can take a variety of argument formats, including a string containing the event name, or an object with the event name as the key and the event handler as the value.

```jsx
<!-- using string argument -->
<button v-on:click="handleClick">Click me</button>

<!-- using object argument -->
<button v-on="{ mousedown: handleMouseDown, mouseup: handleMouseUp }">Press me</button>

```

You can also use the shorthand syntax for **`v-on`** by prefixing the event name with the **`@`** symbol.

```jsx
<!-- shorthand syntax for click event -->
<button @click="handleClick">Click me</button>

```

In addition to event listeners, the **`v-on`** directive can also be used to listen for custom events emitted by child components.

```jsx
<child-component @custom-event="handleCustomEvent"></child-component>
```

When using **`v-on`** with custom events, you should use the kebab-case naming convention for the event name.

```
// child component emitting custom event
this.$emit('custom-event', eventData);
```

The **`v-on`** directive can also accept modifier keys to further customize its behavior. Some of the available modifiers include:

- **`.prevent`** - prevents the default behavior of the event
- **`.stop`** - stops event propagation
- **`.self`** - only triggers the event if it originated from the element itself, not a child element
- **`.once`** - only triggers the event once
- **`.passive`** - indicates that the event listener will not call **`preventDefault()`**

```jsx
<!-- using .prevent modifier -->
<form v-on:submit.prevent="handleSubmit">
  ...
</form>

<!-- using .stop modifier -->
<div v-on:click.stop="handleClick">
  ...
</div>

<!-- using .once modifier -->
<button v-on:click.once="handleClick">Click me once</button>
```

Overall, the **`v-on`** directive is a crucial tool for creating dynamic and interactive Vue 3 applications, allowing you to respond to user actions and emit custom events.

### **v-model**

The `v-model` directive is a two-way binding directive that allows you to bind form input values to data properties. This means that changes to the input value will update the data property, and changes to the data property will update the input value.

```jsx
<template>
  <input v-model="message" placeholder="Enter a message">
  <p>{{ message }}</p>
</template>

<script setup>
	import { ref } from "vue";
  const message=ref("")

</script>
```

## **Custom directives in Vue 3**

In addition to the built-in directives, you can also create custom directives in Vue 3. Custom directives allow you to encapsulate complex behavior and reuse it throughout your application.

### **Registering custom directives**

To register a custom directive, you can use the Vue.directive() method. In `<script setup>`, any camelCase variable that starts with the `v`prefix can be used as a custom directive. In the example above, `vHighlight`can be used in the template as `vHighlight`
.

```jsx
<template>
  <div v-highlight>
    This text will be highlighted.
  </div>
</template>

<script setup>
  
    const vHighlight= {
     mounted: (el) => el.style.backgroundColor = "red";
    }
  
<script>
```

### **Directive hooks**

Custom directives can define several hooks that allow you to run code at various stages of the directive's lifecycle. These hooks include bind, created, update, componentUpdated, and unbind.

```jsx
<template>
  <input v-focus>
</template>

<script>
const vHighlight= {
	// called before bound element's attributes
  // or event listeners are applied
  created(el, binding, vnode, prevVnode) {
    // see below for details on arguments
  },
  // called right before the element is inserted into the DOM.
  beforeMount(el, binding, vnode, prevVnode) {},
  // called when the bound element's parent component
  // and all its children are mounted.
  mounted(el, binding, vnode, prevVnode) {},
  // called before the parent component is updated
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // called after the parent component and
  // all of its children have updated
  updated(el, binding, vnode, prevVnode) {},
  // called before the parent component is unmounted
  beforeUnmount(el, binding, vnode, prevVnode) {},
  // called when the parent component is unmounted
  unmounted(el, binding, vnode, prevVnode) {}
}
</script>
```

## **Advanced usage of Vue 3 directives**

Vue 3 directives also come with several advanced features that allow you to customize their behavior even further.

### **Directive arguments**

If you're using directives, you'll be pleased to know that there's a whole new world of possibilities waiting for you with the introduction of hook arguments. This a little descriptive of this diretcive hook arguments :

- These nifty objects give you access to a bunch of juicy properties, like the **`el`** property, which allows you to manipulate the DOM directly.
****
- The **`binding`** object contains several properties, including:
    - **`value`**: the value passed to the directive.
    - **`oldValue`**: the previous value, only available in **`beforeUpdate`** and **`updated`**.
    - **`arg`**: the argument passed to the directive, if any.
    - **`modifiers`**: an object containing modifiers, if any.
    - **`instance`**: the instance of the component where the directive is used.
    - **`dir`**: the directive definition object.
    - **`vnode`**: the underlying VNode representing the bound element.
    - **`prevNode`**: the VNode representing the bound element from the previous render, only available in **`beforeUpdate`** and **`updated`** hooks.

Directive arguments allow you to pass additional information to a directive. You can specify an argument by adding a colon after the directive name.

```jsx
<template>
  <div v-color:red>
    This text will be red.
  </div>
</template>

<script setup>

 const vColor= {
   mounted(el, binding) =>el.style.color = binding.arg;
	    /* Value of binding
				{
				  arg: 'red',
				  modifiers: {},
				  value: undefined,
				  oldValue: undefined
				}
			*/
  }
</script>
```

### **Directive modifiers**

Directive modifiers allow you to specify additional behavior for a directive. You can specify a modifier by adding a dot after the directive name.

```jsx
htmlCopy code
<template>
  <form v-submit.prevent="login">
    ...
  </form>
</template>

<script setup>
   const vSubmit={
		mounted:(el, binding) {
			if(binding.modifiers.prevent){
			      el.addEventListener('submit', (event) => {
			        event.preventDefault();
			        binding.value();
			      });
		   }
		}
  };
</script>
```

### **Directive composition**

Directives can also be composed to create more complex behavior. You can use the v-bind and v-on directives to pass data and events between directives.

```jsx
<template>
  <div v-color:red v-click="handleClick">
    This text will be red and clickable.
  </div>
</template>

<script setup>
   const vColor:{
			mounted:(el, binding)=> el.style.color = binding.arg;	    
  };
const vClick={
	mounted:(el, binding)=> el.addEventListener('click', binding.value);
}

function handleClick() {
   console.log('Text clicked');
 }

</script>
```

### **Global vs. local directives**

By default, directives are registered globally in Vue 3. This means that once a directive is registered, it can be used in any component in your application.

```jsx
import { createApp } from 'vue'

const app = createApp({
  /* ... */
})

// register (object directive)
app.directive('custom-directive', {
  /* custom directive hooks */
})

// register (function directive shorthand)
app.directive('custom-directive', () => {
  /* ... */
})

// retrieve a registered directive
const myDirective = app.directive('custom-directive')
```

However, you can also register directives locally to a component by defining the directives property in the component's options.

```jsx
<template>
  <div v-highlight>
    This text will be highlighted.
  </div>
</template>

<script setup>
  
    const vHighlight= {
     mounted: (el) => el.style.backgroundColor = "red";
    }
<script>
```

But if you want to easily reuse your directive in few component without rewriting it every time you can just store it in a directive directory like that:

```jsx
export const vHighlight={
	 mounted: (el) => el.style.backgroundColor = "red";
}
```

Choose the methode wich you like.

## **Conclusion**

[Vue 3](/blog/vue-3-a-beginners-guide-in-depth) directives are a powerful feature that allow you to add dynamic behavior to your templates. In this article, we covered the built-in directives, creating custom directives, and advanced usage of directives. By mastering directives, you can create highly dynamic and interactive Vue 3 applications.