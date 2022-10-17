---
    title: 'Basic of typescript'
    description: 'What is Typescript ? is it a new javascript? Discover the basics of the typescript  and his advantage  against  javascript'
    img: 'img/test.jpg'
    draft: true
    category: 'Road To Basic'
    tags: ['javascript']
---



Its Anders Hejlsberg director of the csharp project at microsoft who create typescript. ( creator of .Net , j++ and delphi too ). Its a free open source project which is a superset of javascript. Its javascript with some amelioration and every js code work on ts

To understand why u should use ts you must understand why you hate js that much

( illustration )

JavaScript was designed to write small programs. But now it is used to make complex programs. From the start JavaScript is not suitable for large programs: The more complex the code becomes, the harder it becomes to maintain.

[proposer une liste exaustive de truc que les gens n’aiment pas avec js]

As a solution typescript arrive wtith static typing , a best code organisation and a code more simple.

STATIC TYPE

Typage dynamique

i est une variable: var i;

Typage statique

i est une variable de type number: var i: number;

Lors que le typage est dynamique, le type de i n’est connu qu’à sa première affectation: i = 5;

Typage dynamique

add() est une fonction:

function add(x, y) {

return x + y;

}

cette fonction peut prendre des chaine des caratère , des booleen ou mm des objets en paramètre.

Typage statique

add() est une fonction de type number et qui prend en paramètre deux arguments de type number:

function add(x : number, y : number) : number {

return x + y;

}

ici add ne prend en paramètre que les types spécifier.

liste de touts les types : [https://www.typescriptlang.org/docs/handbook/basic-types.html](https://www.typescriptlang.org/docs/handbook/basic-types.html)

THE CONSIQUENCES

There are more code , due to type spécified But some errors are detect more earlier during the developpement and the code became more readable.

En JavaScript

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

En TypeScript

// Adds two numbers

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

You can also create ur own type like in c++

Module

the typescript way to organise big project. The code is organised on modules and can be import or export.

CLAUSES

the clauses are more or less the same as on javascript.

CONCLUSION

Modules improve reutilisabiliti and scalability while static type improve error detection and lisibiliti . Thats what make typescript a good option for ur next project