---
    title: ' The best console.log() tips & tricks'
    description: 'Everyone sometimes logs or debugs code using the JavaScript console. But the console object is much more than just a console.log().'
    image: 'img/article/cover/js.webp'
    author: 'Magius'
    category: 'tips and advice'
    createdAt: '2023-01-01'
    modifiedAt: '2023-01-01'
    tags: ['javascript']
    head:
        meta: 
            -  name: "keywords"
               content: "console, log, javascript, console.log, debug, time"
            
---

Everyone sometimes logs or debugs code using the JavaScript console. But the console object is much more than just a console.log().

## Computed property names
The property names computed in ES6 are particularly useful because they make it easy to recognize registered variables by enclosing them in a pair of braces.

```js
const x = 1, y = 2, z = 3;

console.log({x, y, z}); // {x: 1, y: 2, z: 3}
```

## **Logging levels**

Console.log() is only one of the available logging modes; the others are console.debug(), [console.info](http://console.info/)(), console.warn() et console.error ().

```js
console.debug('Debug mmsg');
console.info('Useful info');
console.warn('This is a warning');
console.error('Something went wrong!');
```

## **console.trace()**

The functionality of console.trace() is the same as console.log(), but it additionally displays the full stack trace so you can see everything that is going on.

```js
const outer = () => {
  const inner = () => console.trace('Hello');
  inner();
};

outer();
/*
  Hello
  inner @ VM100:3
  outer @ VM100:5
  (anonymous) @ VM358:1
*/
```

## **console.assert()**

When an assertion fails (i.e. when the first parameter is false), console.assert() provides a convenient way to simply log something as an error and ignore it in all other cases.

```js
const value = 10;

console.assert(value === 10, 'Value is not 10!'); // Nothing is logged
console.assert(value === 20, 'Value is not 20!'); // Logs "Value is not 20!"
```

## **console.count()**

You can use console.count() to count how many times a piece of code has been executed.
```js
Array.from({ length: 4 }).forEach(
  () => console.count('items')  // Call the counter labelled 'items');
/*
  items: 1
  items: 2
  items: 3
  items: 4
*/console.countReset('items');  )// Reset the counter labelled 'items'
```

### **console.time()**

console.time() provides a quick way to check the performance of your code, but should not be used for true benchmarking due to its low accuracy.

```js
console.time('slow comp');    // Start the 'slow comp' timer
console.timeLog('slow comp'); // Log the value of the 'slow comp' timer
console.timeEnd('slow comp'); // Stop and log the 'slow comp' timer
```

### **console.table()**

Allows you to easily display a table in the console.
```js
console.table(["apples", "oranges", "bananas"]);

// display
| Index |   Values  |
|-------|-----------|
|   0   | 'apples'  |
|   1   | 'oranges' |
|   2   | 'bananas' |


```
