---
    title: 'MVC Pattern: What Developers Need to Know   '
    description: "If youre building an MVC (Model-View-Controller) app, this might be the first time you've heard about it. To get started with MVC, though, you'll need to understand how each component works. In this article I'll explain what each part of an MVC architecture does and why they're important for your application."
    image: 'img/article/cover/js.webp'
    author: 'one on one'
    category: 'one on one'
    createdAt: '2023-01-03'
    modifiedAt: '2023-01-03'
    tags: ['backend']
    head:
        meta: 
            -  name: "keywords"
               content: "mvc, model vue controller, model, vue, controller, pattern"
            

---


If you're building an MVC (Model-View-Controller) app, this might be the first time you have heard about it. To get started with MVC, though, you'll need to understand how each component works. In this article I'll explain what each part of an MVC architecture does and why they're important for your application.

## Model - A model represents the data in your application, such as a list of table rows from a database.

Model - The model is the heart of your application and represents the data in your application. A model can be a class or an object, and it can contain any number of properties that represent different pieces of information about the same thing. As you add more properties to your models, they become increasingly complex.

For example: A table might have columns such as ID, Name (the column name), Age (the column type) and Gender (the column data).

For each property on a model there must be an associated property with getter/setter methods that allow you to work with this property from within your views or controllers.

## View - A view is what you see in the browser, such as the actual HTML itself, or in iOS applications where the view is the screen that users see.

The view is the interface between your application and the user. It handles all of their interactions with your application, including what data and functionality to display on screen. In other words, it's where you put stuff so users can interact with it!

The view is also responsible for handling user input from touch events as well as keyboard navigation (like clicking buttons). For example: If I click on an image in my app then that event will be sent to our controller which handles moving around through views until we reach another button (or something else) which then triggers some action like opening up another window or saving an update file somewhere else on disk etc...

## Controller - A controller accepts input and converts it to commands for the model or view.

In the MVC architecture, the controller is a central part of the system. It acts as a mediator between users and models/Views. It handles user requests and generates responses based on those requests.

In addition to handling user input from clients (such as AJAX calls), controllers also handle internal events such as new records being inserted into tables or updated data being fetched from databases.

## Other web architecture like MVC

In this article, we will discuss the MVC architecture and its alternatives.

MVC is the most widely used web architecture. It can be used easily with framework like Angular or ReactJS. The main idea behind this web architecture is that it helps in separating concerns of application into three parts: Models (data), Views (presentation) and Controllers (behavior).

You may have heard about MVVM as an alternative to Model-View-Controller (MVC). This can be done by using Presentation Layer instead of Controller Layer where you replace Controller with View and View with Presenter combined together in one thing called Presentation Class/Service/Mixin etcetera as per your need but still keep same model classes & view components intact so that they work well together even if separated from controller class. However there are some drawbacks which come along with such approach too - Most importantly you have to write more code because now instead of just having one single file raising events from models when clicked on button press action calls another file which handles click event processing logic rather than writing everything inside only one file then turning around again separately doing what needs doing based on what happened during click event processing phases etcetera

## Conclusion

MVC is a very useful pattern for building applications, but it's not the only one. No matter which architectural pattern you use or how your application is structured, the key is to have clear separation between what data does and how it does it. This will make your code easier to understand, easier to change and more robust in case something goes wrong.