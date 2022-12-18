---
    title: 'Discovering docker'
    description: 'The API is an abstraction interface that allows different types of applications (web app, mobile app, connected object) to exchange data while having the same structure.'
    image: 'img/article/cover/api_cover.png'
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

## WHAT IS DOCKER

Docker is a tool that can package an application and its dependencies into an isolated container, which can be run on any server. It is a very popular tool and thats why u will find a water fall of tutoriels explaining why it is sooo wonderful  and life changing but for beginners and junior developper it look like hell. How it works was’nt very clear for me and it was even mor blury when i tried to used it. 

It was like using a magic tool and not understand where is the magic.

![giphy.webp](/img/article/giphy.webp)

The purpose of this blog post is to explain docker in a way that could be more understandable for beginners.

## WHAT IS AN UNIX

First you need to understand what is  unix. Don’t be too pressé you will understand why.

Unix is an os created in 1960 by AT&T. Since lots of operating systems are based on it (macos , unix …). they have all  share the same structure.

![general structure of an os base on unix](/img/article/os_unix_structure.png)

general structure of an os base on unix

It’s seperated in 3 level. The kernel , the executive and the os. 

The executive level and the kernel level is whats make the os level work. This levels can be diferents between UNIX computers but the structure is the same.

What users are directly in contact with is the os level. That level allow developpers to work( writing script , installing librairies and using environnemnent variables).

what u need to understand is that  developpers that are working on a unix based OS are working on the os level ( Niveau SE on the picture ). And the files tree are organised this way.

![Untitled](/img/article/unix_directory.png)

To resume all the os based on unix have that file structure. Maybe  the kernel level or the executive level are different but the os level and this file structure will be the same.

why is that information/ reminder so valuable ? well lets go into the core of the subject

First we have the structure. It can be your computer or a vps server .

![computer kernel](/img/article/computer_kernel.png)

On that computer you hava your operating system 

![operating systeme](/img/article/os.png)

And on your operating sys you can install docker witch come with the docker engine. This is what will build and containerize your apps

![docker engine](/img/article/docker_engine.png)

And finaly , from that starting point docker can create the working env for any project you want.

![container](/img/article/container.png)

 It will create all your working environnements seperatly so that they ‘ll have nothing in common. Based on the UNIX file structure every app create are in a “container”. Its a specific working env create by the docker engine like APP 1 .

![schema of docker](/img/article/shema_of_docker_structure.png)

Thats why docker is so loved by developers community. Docker can easyli create a container for the apps you want. You can easyli delete this containers and lt will not have effect on the others apps since each containers are seperated from each other.

Docker allow things like:

- Share your work wil all your team and it will work well on every computer. For exemple every members of your team have a different operating system . The same code may not work well on all of their computers. Docker allow you to create the same environnement (container ) for all your coworkers
- Its a good test tool where you can create the container needed for a project , test your project and delete that container when you don’t need it anymore.
- Easy to  deploy

docker also uses much less resources than virtualization techniques. docker also uses much less resources than virtualization techniques

![comparaison between docker and virtual machine](/img/article/compare_docker.png)

## SO HOW TO USE IT

The goal is to have a container app that you can start an any moment you need it and delete / stop it if you want.  

![Untitled](/img/article/Untitled%208.png)

For that you need an image. It’s what diffine what will be in any container.

![Untitled](/img/article/Untitled%209.png)

But befor all these steps everything start with a docker file. It will be the blueprint of your image

![Untitled](/img/article/Untitled%2010.png)

## CONCLUSION

This article proposes a specific way to present docker. I hope it helps you