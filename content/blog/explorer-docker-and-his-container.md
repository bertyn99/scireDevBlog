---
    title: 'Learn what docker is and how it works'
    description: 'Docker is an open-source platform that lets you build, deploy, and run applications inside containers. Here\`s everything you need to know about docker'
    image: 'img/article/cover/docker_cover.png'
    author: 'Randomcitizen'
    category: 'one on one'
    createdAt: '2022-12-18'
    modifiedAt: '2022-12-18'
    tags: ['backend']
    head:
        meta: 
            -  name: "keywords"
               content: "api, interface, data structure, web development,rest api, soap api, what is api, api definition, api integration, api meaning"
            

---


Docker is a tool that can package an application and its dependencies into an isolated container, which can be run on any server. It is a very popular tool and thats why u will find a water fall of tutoriels explaining why it is sooo wonderful  and life changing but for beginners and junior developper it look like hell. How it works was’nt very clear for me and it was even mor blury when i tried to used it. 

It was like using a magic tool and not understand where is the magic.

![giphy.webp](/img/article/giphy.webp)

The purpose of this blog post is to explain docker in a way that could be more understandable for beginners.

## Brief History of docker
Docker has been around since 2008, when Solomon Hykes founded DotCloud as a platform as a service (PaaS). It was not until 2013 that the team rebranded the company to Docker and focused on democratizing software containers and making them accessible for everyone. Fast forward to today, and we have seen major tech providers like Microsoft, IBM, and Red Hat jump onboard with the container revolution that Docker has created.

At its core, docker is an open source tool capable of packaging applications along with their dependencies into isolated containers that can be run on any server. This allows developers to quickly and easily create and deploy applications in a secure environment, without worrying about the underlying infrastructure of where it is running. 

In addition, Docker also provides tools to build, ship, and manage containerized applications at scale with ease. With its simple yet powerful command line interface (CLI), docker makes it easy for even the most novice user to get up and running with containers in no time. So let's take a look at how docker works! But first you need to understand what is  unix. Don’t be too pressé you will understand why.


## WHAT IS AN UNIX


Unix is an os created in 1960 by AT&T. Since lots of operating systems are based on it (macos , unix …). they have all  share the same structure.

![general structure of an os base on unix](/img/article/os_unix_structure.png)
> general structure of an os base on unix

It’s seperated in 3 level. The kernel , the executive and the os. 

The executive level and the kernel level is whats make the os level work. This levels can be diferents between UNIX computers but the structure is the same.

What users are directly in contact with is the os level. That level allow developpers to work( writing script , installing librairies and using environnemnent variables).

what u need to understand is that  developpers that are working on a unix based OS are working on the os level ( Niveau SE on the picture ). And the files tree are organised this way.

![directory tree](/img/article/unix_directory.png)

To resume all the os based on unix have that file structure. Maybe  the kernel level or the executive level are different but the os level and this file structure will be the same.

why is that information/ reminder so valuable ? well lets go into the core of the subject

## Key Components of Docker

### Docker engine

The Docker engine is the core technology behind docker, which is responsible for creating and running containers. It consists of a server, a runtime, and storage components that work together to create and manage containerized applications. The server component is responsible for managing requests from users or other programs such as the CLI and providing an interface between them and the container runtime. 
If we recover the structure stated before it can be your computer or a vps server .

![computer kernel](/img/article/computer_kernel.png)

On that computer you hava your operating system 

![operating systeme](/img/article/os.png)

And on your operating sys you can install docker witch come with the docker engine. This is what will build and containerize your apps

![docker engine](/img/article/docker_engine.png)


### what is container

In simple terms, a container consists of an application and all its dependencies packaged into one unit. This makes it easy for developers to move their applications between different environments without having to worry about compatibility or configuration issues. A container is also isolated from other containers and the host environment, meaning that any changes made inside the container will not affect any other containers or the host system. 

And finaly , from that starting point docker can create the working env for any project you want.

![container](/img/article/container.png)

 It will create all your working environnements seperatly so that they ‘ll have nothing in common. Based on the UNIX file structure every app create are in a “container”. Its a specific working env create by the docker engine like APP 1 .

![schema of docker](/img/article/shema_of_docker_structure.png)

Thats why docker is so loved by developers community. Docker can easyli create a container for the apps you want. You can easyli delete this containers and lt will not have effect on the others apps since each containers are seperated from each other.

Docker allow things like:

- -Share your work wil all your team and it will work well on every computer. For exemple every members of your team have a different operating system . The same code may not work well on all of their computers. Docker allow you to create the same environnement (container ) for all your coworkers
- -Its a good test tool where you can create the container needed for a project , test your project and delete that container when you don’t need it anymore.
- -Easy to  deploy

docker also uses much less resources than virtualization techniques. docker also uses much less resources than virtualization techniques

![comparaison between docker and virtual machine](/img/article/compare_docker.png)


### What is a Docker Image?

A docker image is an immutable file that contains all necessary code and dependencies needed to run an application. It is essentially a snapshot of your application that you can use in many different environments. Docker images are built using the dockerfile, which is a text document that contains all of the instructions needed to create and configure your application. 

Once you have created your dockerfile, you can then build it into an image with the `docker build` command. This will take your source code and containerize it into a single file ready for deployment.  
After you have built a docker image, you can then use it by either running it directly with the `docker run` command or publishing it to a registry so that others can access it. The registry is essentially like an online repository where images can be shared and distributed among teams and users alike. 

Docker provides its own official registry called **Docker Hub** which allows users to store, share, and update their images in a central place. You can also create private registries if you want more control over who can access your images. 

### What are Layers?

Docker images are composed of layers, each one representing a distinct step in the building process. These layers are built on top of each other like a stack and they act as the foundation of any given docker image. Each layer consists of files and metadata such as environment variables or labels that describe how to run the application within that layer. 

These layers are important because they allow you to make small changes to your image without having to rebuild the entire thing from scratch. This makes it easier and faster for developers to iterate on their applications as needed. 

## SO HOW TO USE IT

The goal is to have a container app that you can start an any moment you need it and delete / stop it if you want.  

![Untitled](/img/article/Untitled%208.png)

For that you need an image. It’s what define what will be in any container.

![Untitled](/img/article/Untitled%209.png)



But befor all these steps everything start with a docker file. It will be the blueprint of your image

![Untitled](/img/article/Untitled%2010.png)

## CONCLUSION

This article proposes a specific way to present docker. I hope it helps you