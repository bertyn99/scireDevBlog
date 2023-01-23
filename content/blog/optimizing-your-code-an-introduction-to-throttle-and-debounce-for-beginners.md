---
    title: "Optimizing Your Code: An Introduction to Throttle and Debounce for Beginners"
    description: "As developers, we often deal with events that can fire rapidly, such as user scrolling, resizing a window, or typing in an input field. These events can put a strain on our application's performance and cause it to slow down or become unresponsive. To combat this, we can use two important techniques: throttling and debouncing."
    image: "img/article/cover/throttle_and_debounce_cover.png"
    author: 'Magius'
    category: 'one on one' 
    createdAt: '2023-01-21'
    modifiedAt: '2023-01-21'
    tags: ['backend']
    head:
        meta: 
            -  name: "keywords"
               content: "api, interface"
---
As developers, we often deal  with events that can fire rapidly, such as user scrolling, resizing a window, or typing in an input field. These events can put a strain on our application's performance and cause it to slow down or become unresponsive. To combat this, we can use two important techniques: throttling and debouncing.

## Throttle

Throttling is a technique used to limit the number of times a function can be called within a certain period of time. This is particularly useful when dealing with events that can fire rapidly and repeatedly, such as a user scrolling a webpage or resizing a window. By throttling the number of times a function can be called, we can ensure that our application remains responsive and doesn't become bogged down by too many unnecessary calculations or updates.

Here's an example of a throttle function in JavaScript:

```jsx
Copy code
function throttle(fn, delay) {
  let lastCall = Date.now();
  return function() {
    const currentTime = Date.now();
    if (currentTime - lastCall >= delay) {
      lastCall = currentTime;
      fn.apply(this, arguments);
    }
  }
}

```

In this example, we're using the **`Date.now()`** function to get the current time, and then comparing it to the last time the function was called. If the delay period has passed, we update the **`lastCall`** variable and call the function. If not, we simply return without calling the function.

Here's how we would use the throttle function in a scroll event handler:

```jsx
Copy code
window.addEventListener('scroll', throttle(updatePosition, 100));

```

In this example, we're attaching the **`throttle`** function to the **`scroll`** event and passing in our **`updatePosition`** function as the first argument. The second argument is the delay period, in this case 100 milliseconds. This means that the **`updatePosition`** function will only be called once every 100 milliseconds, even if the scroll event is firing rapidly.

![with throttle](/img/article/with_throttle.png)

 without throttle

![without throttle](/img/article/without_throttle.png)

## Debounce

Debouncing, on the other hand, is a technique used to group multiple function calls together and execute them only once after a certain period of time has passed. This is useful when dealing with events that can fire rapidly, such as a user typing in an input field. Without debouncing, our code would execute a function for every keystroke, causing the application to slow down and potentially causing errors.

Here's an example of a debounce function in JavaScript:

```jsx

function debounce(fn, delay) {
  let timeoutId;
  return function() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  }
}

```

In this example, we're using the **`setTimeout`** function to create a delay period. Every time the debounced function is called, we're clearing any existing timeouts and setting a new one. When the delay period expires, the original function is called. This means that if the debounced function is called multiple times before the delay period expires, only the last call will actually execute the original function.

Here's how we would use the debounce function in an input field:

```jsx
const inputField = document.querySelector('input');
inputField.addEventListener('input', debounce(searchFunction, 500));
```

In this example, we're attaching the **`debounce`** function to the **`input`** event of an input field and passing in our **`searchFunction`** as the first argument. The second argument is the delay period, in this case 500 milliseconds. This means that the **`searchFunction`** will only be called once every 500 milliseconds, even if the input event is firing rapidly as the user types.

![with debounce](/img/article/with_debounce.png)

without debounce

![without debounce](/img/article/without_debounce.png)

It's important to note that throttling and debouncing are not mutually exclusive and can be used together in certain situations. For example, you may want to debounce a search function that is called on every keystroke, but also throttle the number of API requests that are made.

In general, throttling is more suitable for events that are triggered by user actions, such as scrolling or resizing, while debouncing is better for events that are triggered by user input, such as typing.

Choosing the right delay period is also crucial. A delay period that is too short will not effectively throttle or debounce the function, while a delay period that is too long will result in a noticeable delay for the user. It's important to find a balance that provides a good user experience while also maintaining good performance.

In conclusion, throttling and debouncing are two important techniques that developers use to optimize the performance of their code and improve the user experience of their applications. By understanding when and how to use these techniques, we can create performant and responsive applications that provide a smooth experience for the user.