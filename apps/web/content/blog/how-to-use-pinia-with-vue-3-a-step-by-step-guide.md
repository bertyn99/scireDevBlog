---
    title: 'How to Use Pinia with Vue 3: A Step-by-Step Tutorial'
    description: "If you're building an application with Vue 3, you may have heard of Pinia - a state management library specifically designed for Vue 3. In this tutorial, we'll show you how to use Pinia to manage state in your Vue 3 applications, step by step."
    image: 'img/article/cover/vue-3-pinia_cover.webp'
    author: 'magius'
    category: 'road to basic'
    createdAt: '2023-04-09'
    modifiedAt: '2023-04-09'
    tags: ['frontend']
    head:
        meta: 
            -  name: "keywords"
               content: "pinia, vue3, store management, vuex, pinia guide, javascript"
---

Vue 3 is a dynamic JavaScript framework that makes building robust and dynamic user interfaces a breeze. While Vue 3's state management system is powerful, managing the state of a complex application can be a daunting task. That's where Pinia comes in. Pinia is a simple yet powerful state management system that makes managing your application state a lot easier. In this tutorial, we'll take a step-by-step approach to getting you started with Pinia in Vue 3.

## **Introduction**

Pinia provides a simple, reactive store that allows you to manage application state in a centralized location. It's designed to work seamlessly with Vue 3, and offers features like lazy state initialization, time-travel debugging, and TypeScript support out of the box.

## **Understanding Pinia**

Pinia is a lightweight, standalone state management library for Vue 3 applications. It provides a reactive store that allows you to manage application state in a centralized location. The store can be used to store any type of data, including primitives, objects, and arrays.

In Pinia, you define stores using the **`defineStore`** function. Stores can have state, actions, and getters.

## **Installing and Setting up Pinia**

To use Pinia in your Vue 3 application, you'll first need to install it:

```jsx
npm install pinia
```

Once Pinia is installed, you'll need to create a Pinia instance and install it in your Vue app:

```jsx
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.mount('#app')

```

This creates a Pinia instance and installs it in your Vue app using the **`app.use()`** method.

## **Creating a Pinia Store**

Once Pinia is set up, you can start creating stores to manage your application state. Let's create a simple store to manage a todo list:

```jsx
import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo',{
  state: () => ({
  }),
})
```

In this example, we've defined a store with an **`id`** of **`'todo'`**, a **`todos`** array in its state, and two actions: **`addTodo`** and **`removeTodo`**. The **`addTodo`** action takes a todo object as its argument and pushes it to the **`todos`** array. The **`removeTodo`** action takes a todo object as its argument and removes it from the **`todos`** array.

## **Adding State and Actions to Your Pinia Store**

Now that we have a basic Pinia store setup and connected to our Vue app, let's start adding some state and actions to it.

To add state to our store, we can simply define a property on the store object:

```jsx
import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo',{
  state: () => ({
    todos: []
  }),
  // ...
})
```

Here, we've added a **`todos`** property to our store's state object, which is initialized as an empty array.

To add an action to our store, we define a method on the store object:

```jsx
import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo',{
  state: () => ({
    todos: []
  }),
  actions: {
    addTodo(todo) {
      this.todos.push(todo)
    },
    removeTodo(todo) {
      const index = this.todos.indexOf(todo)
      if (index !== -1) {
        this.todos.splice(index, 1)
      }
    }
  }
})
```

Here, we've defined an **`addTodo`** action that takes a **`text`** argument and pushes a new todo object onto the **`todos`** array with that text and a **`done`** property set to **`false`**.

With our state and actions defined, we can now use them in our Vue components.

## Using Pinia in a Vue Component

Now that we have our Pinia store set up, we can use it in our Vue components. In this section, we'll create a simple component to demonstrate how to use Pinia.

Let's create a TodoList component that displays a list of todos and allows the user to add new todos.

First, we'll import the **`defineComponent`** function from Vue:

```jsx
import { defineComponent } from 'vue'
```

Next, we'll import our Pinia store:

```jsx
import { useTodoStore } from '@/stores/todo'
```

Then, we'll define our **`TodoList`** component:

```jsx
export default defineComponent({
  name: 'TodoList',
  setup() {
    // get our todo store
    const todoStore = useTodoStore()

    // define our template
    return () => {
      return (
        <div>
          <h1>Todo List</h1>
          <ul>
            {todoStore.todos.map((todo) => (
              <li key={todo.id}>{todo.text}</li>
            ))}
          </ul>
          <input
            type="text"
            v-model={todoStore.newTodoText}
            placeholder="Enter a new todo"
          />
          <button onClick={todoStore.addTodo}>Add Todo</button>
        </div>
      )
    }
  },
})

```

We start by calling **`useTodoStore()`** to get a reference to our Pinia store. We then define our component using the **`defineComponent()`** function from [Vue](https://www.sciredev.com/blog/vue-3-a-beginners-guide-in-depth). Inside the component setup function, we define our template using the JSX syntax.

In our template, we display a list of todos by mapping over the **`todos`** array from our Pinia store. We also display an input field and a button to add new todos. When the user clicks the button, we call the **`addTodo()`** method on our Pinia store.

Note that we're using the **`v-model`** [directive](https://www.sciredev.com/blog/vue-3-directives-guide-in-depth) on our input field to bind it to the **`newTodoText`** property in our Pinia store. This means that when the user types in the input field, the **`newTodoText`** property in our store is updated automatically.

### **Pitfalls of Destructuring Your Pinia Store**

One common pitfall when using Pinia stores in Vue components is to destructure the store object directly. For example:

```jsx
const { todos } = useTodoStore()
```

This can lead to issues because the **`todos`** variable is now a standalone reactive object, separate from the actual Pinia store. This means that changes made to **`todos`** will not be reflected in the store, and vice versa.

To avoid this pitfall, it's important to always reference the store directly, like this:

```jsx
const todoStore = useTodoStore()
const todos = todoStore.todos

```

This ensures that our reactive data is always connected to the Pinia store.

## **Exploring Pinia Getters**

In addition to state and actions, Pinia also provides getters, which are functions that return computed values based on the current state of the store.

To define a getter in our store, we can add a **`getters`** object to our store definition:

```jsx
import { defineStore } from 'pinia'

export const useTodoStore = defineStore({
  id: 'todo',
  state: () => ({
    todos: []
  }),
  actions: {
 // ...
    }
  },
  getters: {
    doneTodosCount () {
      return this.todos.filter(todo => todo.done).length
    }
  }
})

```

Here, we've defined a **`doneTodosCount`** getter that returns the number of todos in the **`todos`** array that have a **`done`** property set to **`true`**.

### **Accessing Other Getters from a Getter**

One useful feature of Pinia getters is that they can access other getters from the same store. This allows us to compose more complex computed values from simpler ones.

For example, we can define a **`undoneTodosCount`** getter that calculates the number of todos that are not yet done by subtracting the **`doneTodosCount`** from the total number of todos:

```jsx
import { defineStore } from 'pinia'

export const useTodoStore = defineStore({
  id: 'todo',
  state: () => ({
    todos: []
  }),
  actions: {
    addTodo (text) {
      this.todos.push({ text, done: false })
    }
  },
  getters: {
    doneTodosCount () {
      return this.todos.filter(todo => todo.done).length
    },
    undoneTodosCount () {
      return this.todos.length - this.doneTodosCount
    }
  }
})

```

Here, we've defined an **`undoneTodosCount`** getter that subtracts the **`doneTodosCount`** getter from the total number of todos in the **`todos`** array.

### **Accessing Getters from Other Pinia Stores**

Sometimes you may need to access getters from other stores within your store. You can do this by passing the other store as an argument to your getter. For example:

```jsx
import { defineStore } from 'pinia'

export const useStore1 = defineStore('store1', {
  state: () => ({
    a: 1,
  }),
  getters: {
    value() {
      return this.a * 2
    },
  },
})

export const useStore2 = defineStore('store2', {
  state: () => ({
    b: 2,
  }),
  getters: {
    combinedValue(state) {
			const otherStore = useStore1()
      return state.b + otherStore.a
    },
  },
})

```

In this example, the **`combinedValue`** getter in **`useStore2`** is accessing the **`value`** getter from **`useStore1`** by passing it as an argument to the getter.

### **Passing Arguments to Getters**

You can also pass arguments to getters to make them more dynamic. To do this, simply define the argument in the getter function and pass it when you call the getter:

```
jsCopy code
import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
  state: () => ({
    todos: [
      { id: 1, text: 'Learn Vue 3', done: false },
      { id: 2, text: 'Use Pinia', done: false },
    ],
  }),
  getters: {
    getTodoById(id: number) {
      return this.todos.find((todo) => todo.id === id)
    },
  },
})

```

In this example, the **`getTodoById`** getter takes an **`id`** argument and returns the corresponding todo from the **`todos`** array.

## Tips on Pinia

Aside from the basics of creating and using a Pinia store, there are some additional tips that can make your experience with Pinia even better.

### Persisting Pinia Data in Local Storage

One of the most important aspects of any web application is to ensure that the user's data is persisted even after they close their browser. Fortunately, Pinia makes this incredibly easy by providing a plugin that allows you to automatically persist your Pinia store data in local storage.

To use this plugin, you can install it via npm:

```bash
npm install pinia-plugin-persist
```

Once installed, you can use it by importing it and passing it to the **`createPinia`** function:

```jsx
import { createPinia } from 'pinia'
import { createPersistPlugin } from 'pinia-plugin-persist'

const pinia = createPinia()
pinia.use(createPersistPlugin())
```

With this plugin, your Pinia store data will be automatically persisted in local storage and rehydrated when the user revisits your web application.

### Using Composables with the Pinia Store

Another way to make your experience with Pinia even better is to use composables with your Pinia store. While Pinia stores are great for managing your application state, they can quickly become cluttered with complex logic.

Composables allow you to extract and encapsulate logic that can be shared across components or even across multiple Pinia stores. For example, you might have a [composable](https://www.sciredev.com/blog/vue-3-a-beginners-guide-in-depth) that handles sorting and filtering logic for a list of data that is used in multiple components.

To use a composable with your Pinia store, you can simply import it and use it within your store's methods or getters:

```jsx
import { useMyComposable } from '@/composables'
import { defineStore } from 'pinia'

export const useMyStore = defineStore({
  id: 'my-store',
  state: () => ({
    data: []
  }),
  getters: {
    sortedData(state) {
      const myComposable = useMyComposable(this)
      return myComposable.sort(state.data)
    }
  }
})
```

By using composables with your Pinia store, you can keep your store code clean and maintainable while still having access to powerful logic that can be reused across your application.

## Conclusion

In this tutorial, we covered the basics of Pinia and how to use it with Vue 3. We learned how to install and set up Pinia, create a Pinia store, use Pinia in a Vue component, add state and actions to our Pinia store, explore Pinia getters, and some tips on how to make your experience with Pinia even better.

Pinia is a powerful and flexible state management solution for Vue 3, and it offers a lot of benefits over traditional Vuex. With Pinia, you get better type safety, better performance, and a simpler and more intuitive API. So if you're looking for a great state management solution for your Vue 3 application, be sure to give Pinia a try!