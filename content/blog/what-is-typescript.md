---
    title: 'What is typescript?'
    description: 'What is Typescript ? is it a new javascript? Discover the basics of the typescript , his origin and his advantage  against  javascript'
    image: 'img/article/cover/ts.webp'
    author: 'Randomcitizen'
    draft: true
    category: 'road to basic'
    tags: ['javascript']
    head:
        meta: 
            -  name: "keywords"
               content: "typescypt, javascript vs typescript, origin of typescript"
            
---



It's Anders Hejlsberg director of the csharp project at Microsoft who create typescript. ( creator of .Net , j++ and delphi too ). It's a free open-source project which is a superset of javascript. Its javascript with some amelioration and every javascript code work on typesccript.

To understand why you should use typesccript you must understand lets talk about the issues with javascript.

JavaScript was designed to write small programs. But now it is used to make complex projets. From the start JavaScript is not suitable for large programs: The more complex the code becomes, the harder it becomes to maintain.

In addition to that javascript can do…how can I say it, some strange things.

```ts
true == []; // -> false
true == ![]; // -> false

false == []; // -> true
false == ![]; // -> true
```

The list of those “stranger things” is uge , I let u go see them:[https://github.com/denysdovhan/wtfjs](https://github.com/denysdovhan/wtfjs)

As a solution typescript comes with static typing, the best code organization and a code more simple. 


## STATIC TYPE

### Dynamically typed languages

A language is dynamically typed if the type is associated with run-time values, and not named variables/fields/etc. This means that you as a programmer can write a little quicker because you do not have to specify types every time (unless using a statically-typed language with *type inference*).

Examples: Perl, Ruby, Python, PHP, JavaScript, Erlang

Most scripting languages have this feature as there is no compiler to do static type-checking anyway, but you may find yourself searching for a bug that is due to the interpreter misinterpreting the type of a variable.  Since javascript is more and more used to write complex project that lead to big bugs .

```js
 var i // is a variable:;
```

### Statically typed languages

A language is statically typed if the type of a variable is known at compile time. For some languages this means that you as the programmer must specify what type each variable is.

The main advantage here is that all kinds of checking can be done by the compiler, and therefore a lot of trivial bugs are caught at a very early stage.

Examples: C, C++, Java, Rust, Go, Scala

```ts
 var i: number //i is a variable of type number;
```

list of types : [https://www.typescriptlang.org/docs/handbook/basic-types.html](https://www.typescriptlang.org/docs/handbook/basic-types.html)

## THE CONSQUENCES

There is more code, due to type spécified. But some errors are detected earlier during the development and the code became more readable.

```js

// this function can take strings of characters, booleans or same objects as parameters.

// Adds two numbers
function add(x, y) {

return x + y;

}
add("toto", 31) // evaluates to "toto31"

add(12,24) // evaluates to 36

// Multiplies two numbers

function mul(x, y) {

return x * y;

}

mul("toto", 31) // evaluates to NaN (Not a Number)
```

```ts
// Adds two numbers+
// here add takes as parameter only the specified types

function add(x : number, y : number) : number {

return x + y;

}

add('toto', 31) // ERROR

add(12,24) // evaluates to 36

// Multiplies two numbers

function mul(x : number, y : number) : number {

return x * y;

}

mul('toto', 31) // ERROR
```

You can also create your own type like in c++

## Module

The typescript way to organize a big project is the code is organized into modules and can be imported or export.

## CONCLUSION

Modules improve reutilisabiliti and scalability while static type improve error detection and lisibiliti . Thats what make typescript a good option for ur next project