---
    title: 'What is an API and why we use them ?'
    description: 'The API is an abstraction interface that allows different types of applications (web app, mobile app, connected object) to exchange data while having the same structure.'
    image: 'img/article/cover/js.webp'
    author: 'Magius'
    category: 'one on one'
    createdAt: '2022-12-08'
    modifiedAt: '2022-12-08'
    tags: ['backend']
    head:
        meta: 
            -  name: "keywords"
               content: "api, interface, data structure, web development"
            

---

You've probably already wondered what makes it possible :

- your weather application to always know what the weather will be like during your weekend in Dunkerque?
- AirBnB to geolocate a property on a map (is it useful to specify Dunkirk)?

![meme_api](/img/article/meme_api.png)

Understanding and offering APIs can be a challenge for non-technical users. What is an API? What is shared via an API? Data, services? How is an API designed? How is an API coded? What strategic transformation does it imply?

So many questions that can quickly become confusing. The task was a bit frightening - when you come from a technical background like mine - but I am confident that the curious will be satisfied.

## What is an API?

API stands for Application Programming Interface. It is a computer interface that connects software or applications to other separate systems so that they can exchange functionality, services, technologies and data. The API materializes as a gateway to functionality held by an independent entity.

Using a universal programming language, it facilitates interaction between users and providers by sending access requests to the provider's services. It facilitates the creation and integration of functionality so that developers do not need to have complete mastery of the program they wish to exploit.

## Types of APIs

It is important to understand that APIs are not limited to the web. As we have seen, APIs are abstractions of the services they expose. They hide the specifics of the service from the consumer (like an electrical outlet hides the wires in the wall).

APIs can therefore be classified into different categories depending on the type of abstraction they describe:

- Operating system APIs allow software to interact with peripherals (your webcam), to recognize your gestures (on your touch screen)...
- Programming language APIs allow developers to use predefined functions, so they don't have to reinvent the wheel.
- Infrastructure APIs allow the modification of resources available to run an application via the cloud (virtual machines, servers, network architecture, etc). Think Amazon Web Services!
- Web services APIs: from Google Maps backgrounds to Facebook's Social Graph to tweet monitoring, this is the fastest growing category of APIs. For example, the Airbnb service uses the Google Maps API to transform the addresses of rental properties into geolocated points.

We take a look at the web services api and how it works.

## How does it work?

To understand how an API works, let's first look at the word that makes up its acronym. An API can be broken down into three words:

- **Application:** By application we mean any service with which a developer or another application wishes to interact. It can be a weather service, an image sharing application, an Open Data portal.
- **Interface:** The interface is the gateway through which it will be possible to interact with the application (rest/soap).
- **Program:** The program is a computer function to which a developer gives instructions and which will interact with the application for us. The program can for example retrieve data at regular intervals or submit a postal address (to retrieve a geographic coordinate)...

![Untitled](/img/article/schema_api.png)

The API is therefore an abstraction interface that allows different types of applications (web app, mobile app, connected object) to exchange data having the same structure.

The perfect example to illustrate this would be a waitress in a restaurant that would act as an interface between the customer's requests/orders and the kitchen (backend)

It allows to structure the customer's requests and to transform them into a dish order that the kitchen can or cannot realize.

And just like an api can be consumed by several devices the kitchen of the restaurant can receive orders from different waitresses in physical or from customers who ordered on phones.
