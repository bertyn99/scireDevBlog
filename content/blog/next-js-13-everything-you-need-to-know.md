---
    title: "Next JS 13 : Everything you need to know"
    description: "Next JS 13 was released a few weeks ago and there are some new features and changes you need to know about. In this blog post, we'll take a look at what's new in Next JS 13 and how it can impact your development process. We will also discuss some of the changes that have been made to the framework since Next JS 12. So, if you're interested in learning more about Next JS 13, keep reading!"
    image: 'img/article/cover/next_13_cover.png'
    author: 'Magius'
    category: 'tips and advice'
    createdAt: '2023-01-25'
    modifiedAt: '2023-01-25'
    tags: ['next','react']
    head:
        meta: 
            -  name: "keywords"
               content: "next js 13, next, react,  turbopack, layout, data fetching"
            
---

Next JS 13 was released a few weeks ago and there are some new features and changes you need to know about. In this blog post, we'll take a look at what's new in Next JS 13 and how it can impact your development process. We will also discuss some of the changes that have been made to the framework since Next JS 12. So, if you're interested in learning more about Next JS 13, keep reading!

## **App directory**

This is the biggest change in this update - it is a new directory structure that will help developers create better applications and routes. It's still in beta, so we don't recommend using it for production yet. But you can use Next JS 13 with the pages directory if you want to use more stable features like improved next/image and next/link components. If you're feeling brave, though, you can opt into the app directory and benefit from its advantages.

Our app directory offers an array of options, including:

- **Layouts** – effortlessly transfer UI between routes while safeguarding state and bypassing expensive re-renders.
- **Server Components** – make server-first the standard for dynamic applications.
- **Streaming** – present immediate loading states and stream in units of UI as they are rendered.
- **Data Fetching Support** - async Server Components along with expanded fetch API allows component-level data retrieval.

![next 13 app dirrectory](/img/article/next13-app_directory.png)

### **Layouts**

With the app/ directory, you have at your disposal an efficient framework for intricate interfaces that keep track of state between navigations and efficiently render each component. Plus, you can also organize nested modules along with tests, components and styles through this system. This allows a seamless experience when routing complex patterns within an application.

To build routes within `app/`, it's as easy as creating a single file, `page.js`.

```jsx
// app/page.js
// This file maps to the index route (/)
export default function Page() {
  return <h1>Hello, Next.js!</h1>;
}

```

With this system, you can create user-friendly layouts that are shared between multiple pages. While navigating from page to page, these layouts maintain state and remain interactive without needing to be re-rendered.

```jsx
// app/blog/layout.js
export default function BlogLayout({ children }) {
  return <section>{children}</section>;
}
```

![next 13 app layout](/img/article/next13-layout.png)

### **Server Components**

The new Server Components design for React is now supported thanks to the app/ directory. In order to construct quick, highly interactive apps with a single programming model that offers an excellent developer experience, server and client components employ the server and the client for the respective tasks that they are each best at.

By lowering the amount of JavaScript delivered to the client and enabling speedier initial page loads, Server Components lays the groundwork for creating complex user interfaces.

When a route is loaded, the Next.js and React runtime, which is cacheable and predictable, are loaded. As your application grows, the size of this runtime remain the same. Additionally, the runtime is loaded asynchronously, allowing the client to gradually improve your HTML from the server.

### Data Fetching & **Streaming**

Data fetching in Next.js can be used to render content in different ways, including static generation, server-side rendering, and client-side rendering. In static generation, data is fetched at build time and is available to the client at runtime. In server-side rendering, data is fetched on the server and rendered to the client as a fully-rendered HTML page. In client-side rendering, data is fetched on the client and used to update the rendered content.

The new data fetching patterns in Next.js 13 are deeply coupled with React Server Components and replace the previous methods of data fetching, including getStaticProps, getServerSideProps, and client-side fetching using useEffect. These new patterns allow the option to incrementally stream and gradually render UI components to the client thanks to the app/ directory.

You can rapidly render portions of the website that don't particularly need data using Next.js's Server Components and nested layouts, and you can display a loading status for those areas that are really requesting data. The user may begin engaging with the website immediately using this method because it doesn't need them to wait for the complete page to load.

![next 13 data loading](/img/article/next13-data_loading.png)

By collocating your application source code, such as components, tests, and styles alongside your routes with Next.js 13 applications using the app/ directory, you can significantly boost performance when deployed to Vercel since responses are streamed by default in both Node.js and Edge runtimes!

With the app/ directory, you can also use a new special file loading.js to automatically create Instant Loading UI with Suspense boundaries.

![next 13 app data fetching](/img/article/next13-data_fetching.png)

### Caching Data

React and Next.js have expanded the native fetch Web API. It offers a single configurable method to retrieve, cache, and revalidate data at the component level and automatically deduplicates fetch requests. This implies that a single API is now used to access all the advantages of Server-Side Rendering (SSR), Incremental Static Regeneration (ISR), and Static Site Generation (SSG):

```jsx
// This request should be cached until manually invalidated.
// Similar to `getStaticProps`.
// `force-cache` is the default and can be omitted.
fetch(URL, { cache: 'force-cache' });

// This request should be refetched on every request.
// Similar to `getServerSideProps`.
fetch(URL, { cache: 'no-store' });

// This request should be cached with a lifetime of 10 seconds.
// Similar to `getStaticProps` with the `revalidate` option.
fetch(URL, { next: { revalidate: 10 } });

```

With this you can fetch data inside everywhere layout, page and components alongside with streaming.


## **Turbopack**

Over 3 billion people have downloaded Webpack. While it has been an essential component of constructing the Web, we have reached the boundaries of maximum speed with JavaScript-based technology.

**Turbopack** is the new Rust-based replacement to Webpack included with Next.js 13, and it offers significant speed improvements over its JavaScript predecessor. Turbopack processes transit source code faster and has been designed to scale efficiently with the increasing complexity of modern web applications.

With Turbopack enabled by default on all Next.js 13 projects, you won't have to do anything to get the turbocharged performance, so brace yourself for some seriously speedier page loads!

![next 13 turbopack benchmark](/img/article/next13-turbopack-benchmark.png)

## **New next/image**

Less client-side JavaScript is used by the new Next.js Image component, which is also easy to style and configure (requiring alt tags by default).

The next/image import has been renamed to next/legacy/image, and the next/future/image import has been renamed to next/image, in terms of code modifications. There is a codemod to facilitate a rapid migration.

You will now need to provide width and height if you weren't previously using them on non-static pictures (or images without the fill attribute). The alt prop functions similarly, however it is optional and can be left as an empty string.

## New next/font

You can use Google Fonts (or any other custom font) with the new @next/font without the browser submitting any requests. In addition to other static assets, CSS and font files are downloaded during build time.

To try it out, you need to install the package:

```
npm install @next/font
```

Then, you can use it like this:

```jsx
import { Montserrat } from "@next/font/google";

const montserrat = Montserrat();

// This file maps to the index route (/)
export default function Page() {
  return (
    <article>
      <h1>Hello, I am Page!</h1>

      <p className={montserrat.className}>I am using Montserrat font</p>
    </article>
  );
}
```

## Conclusion

If you're looking to get your hands dirty with [Next.js 13](https://nextjs.org/blog/next-13), be prepared for some beta-testing - many nifty features like next/font are still in beta after all! Migration might not be as easy as a Sunday morning, but the team at Next.js is working hard to make turbopack and other improvements production ready (and not just beta-ready). In short, if you're starting a new project, this seems like the time to get on the bus with V13 - it'll probably get you where you need to go faster than an acceleration rate of a million miles per hour!