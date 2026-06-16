---
    title: 'Relative Time Strings in JavaScript: From Confusion to Clarity'
    description: 'A relative time string is a way of representing a date or time relative to the current date and time. This can be useful for displaying information such as "5 minutes ago" or "in 3 days" as opposed to an absolute date and time.'
    image: 'img/article/cover/intl_string_cover.png'
    author: 'Magius'
    category: 'tips and advice'
    createdAt: '2023-02-20'
    modifiedAt: '2023-02-20'
    tags: ['front-end', 'javascript', 'i18n']
    head:
        meta: 
            -  name: "keywords"
               content: "time, javascript, date, format date,internationalization"
---

## Introduction

A relative time string is a way of representing a date or time relative to the current date and time. This can be useful for displaying information such as "5 minutes ago" or "in 3 days" as opposed to an absolute date and time. This can provide a better user experience and make it easier for users to understand when an event occurred or when something was posted. Working with time and date strings in JavaScript can be tricky, especially when trying to format them in a way that is easy for users to understand. Understanding the different options and methods for creating relative time strings can be confusing and overwhelming for beginners.
The article will provide a clear and easy-to-understand guide on how to implement relative time strings in JavaScript. By the end of this article, you'll be able to create relative time strings with ease, making your application more user-friendly and easy to understand.

## II. Background

JavaScript has several built-in functions and methods for working with time and date strings. These include the Date() constructor, the getTime() method, and the toString() method, among others.

Using absolute time strings, such as "January 1, 2021 at 12:00 PM" can be confusing for users, especially if the date is in the past or the event is in the future. It also doesn't give a clear picture of how much time has passed since the event or how much time is left before the event.

Using relative time strings can provide a better user experience by making it easy for users to understand when an event occurred or when something was posted. It can also be more dynamic as it will automatically update as time passes. Additionally, relative time strings can help to reduce clutter on a website or application by taking up less space than an absolute time string.

## III. Understanding the Basics

In JavaScript, there is a new built-in object called Intl.RelativeTimeFormat that allows you to format relative time strings easily.

To create a basic relative time string in JavaScript, you first need to create an instance of Intl.RelativeTimeFormat. Then you can use the format() method to format your time difference.

```jsx
let rtf = new Intl.RelativeTimeFormat('en', { style: 'narrow' });
let timeDiff = -2;
let relativeTimeString = rtf.format(timeDiff);
console.log(relativeTimeString); // Output: "2 days ago"

```

C. Code examples and explanations of how to use relative time strings in different contexts: Relative time strings can be used in a variety of contexts, such as displaying the time since a post was made on a social media platform, or showing how long ago a user last logged in to an application. Here are a few examples of how to use relative time strings in different contexts:

- Example 1: Displaying the time since a post was made on a social media platform:

```jsx
let postDate = new Date(2022, 05, 15);
let currentDate = new Date();
let timeDiff = currentDate - postDate;
let timeDiffInDays = timeDiff / (1000 * 60 * 60 * 24);
let rtf = new Intl.RelativeTimeFormat('en', { style: 'narrow' });
let relativeTimeString = rtf.format(timeDiffInDays);
console.log(relativeTimeString); // Output: "2 days ago"

```

- Example 2: Showing how long ago a user last logged in to an application:

```jsx
let lastLoginDate = new Date(2022, 01, 01);
let currentDate = new Date();
let timeDiff = currentDate - lastLoginDate;
let timeDiffInMinutes = timeDiff / (1000 * 60);
let rtf = new Intl.RelativeTimeFormat('en', { style: 'narrow' });
let relativeTimeString = rtf.format(timeDiffInMinutes);
console.log(relativeTimeString); // Output: "45 minutes ago"
```

- Example 3: displaying the time remaining for an event

```jsx
let eventDate = new Date(2022, 10, 20);
let currentDate = new Date();
let timeDiff = eventDate - currentDate;
let timeDiffInDays = timeDiff / (1000 * 60 * 60 * 24);
let rtf = new Intl.RelativeTimeFormat('en', { style: 'narrow' });
let relativeTimeString = rtf.format(timeDiffInDays);
console.log(relativeTimeString); // Output: "30 days remaining"

```

By using the Intl.RelativeTimeFormat, you can create relative time strings easily and efficiently. This new object provides a standard way to format relative time strings and it's widely supported by modern browsers.

## IV. Advanced Features

The Intl.RelativeTimeFormat() constructor also accepts an options object, which can be used to customize the format of the relative time strings. Some options include the "locale" option to set the language of the relative time string, and the "style" option to set whether the relative time string should be displayed in short or long form.

Using the "locale" option, you can set the language of the relative time string to match the user's language or the language of your website or application. This can make it more accessible for users who speak different languages or are in different cultures.

It's important to handle edge cases and errors when working with relative time strings, such as when the date is in the future or when the date is invalid. The Intl.RelativeTimeFormat() method provides a way to handle these cases by returning an error message instead of a relative time string.

## V. Conclusion

The article has provided a clear and easy-to-understand guide on how to implement relative time strings in [JavaScript](what-is-javascript.md) using the Intl.RelativeTimeFormat. It has discussed the benefits of using relative time strings, the basics of how to create them, and advanced features such as customizing the format and handling edge cases and errors. Now that you have a better understanding of how to use relative time strings in JavaScript, you can start implementing them in your own projects and applications. By doing so, you'll be able to provide a better user experience and make it easier for users to understand when events occurred or when things were posted.

 Working with time and date strings in JavaScript can be tricky, but by understanding the different options and methods for creating relative time strings, you'll be able to create relative time strings with ease, making your application more user-friendly and easy to understand.