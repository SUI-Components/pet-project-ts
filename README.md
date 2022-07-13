<h1 align="center" style="padding-bottom: 2ch">
  👋 Welcome to the frontend team!
</h1>

<h4 align="center">Pet project for newcomers</h4>

<p align="center">
  <a href="#-introduction">Introduction</a> •
  <a href="#-getting-started">Getting started</a> •
  <a href="#-examples">Examples</a>
</p>

## 🔥 Introduction

As a new frontend developer at Adevinta Spain, you will be working with cutting edge technologies as **React, DDD, ES6, Webpack, SUI Components, SUI Tools** and more... To have a first contact with the tech stack for your first week, you will be working on a side pet project that will work as a simulated scenario of what you will face in our real-life projects.

**You should be assigned one buddy that will help you through the process of learning all our stack. Please, don't hesitate to ask her/him whatever you need. She/He will be pleased to help you whenever you need it.**

### What we expect of this course

First of all, **this is not a test**. Keep calm, learn and enjoy the new things that are going to come. We don't expect that you learn all the core concepts at 100% so if you feel that you are not catching up on everything at the first read, try to read it again and/or ask your buddy for whatever you want.

### About the pet project

Using the [The MovieDB API](https://www.themoviedb.org/documentation/api) create a project where we can search movies, list them and be able to access to the movie's detail. Feel free to add other functionalities that you can think of.

#### We will base our project on the Adevinta Web Convergence Tools and Conventions that are basically the next ones:

- [sui-bundler](https://github.com/SUI-Components/sui/tree/master/packages/sui-bundler)
- [sui-domain](https://github.com/SUI-Components/sui/tree/master/packages/sui-domain)
- [sui-lint](https://github.com/SUI-Components/sui/tree/master/packages/sui-lint)
- [sui-ssr](https://github.com/SUI-Components/sui/tree/master/packages/sui-ssr)
- [sui-studio](https://github.com/SUI-Components/sui/tree/master/packages/sui-studio)
- [sui-test](https://github.com/SUI-Components/sui/tree/master/packages/sui-test)
- [sui-theme](https://github.com/SUI-Components/sui/tree/master/packages/sui-theme)

There is some useful information on the frontend team at Adevinta Spain [here](https://confluence.mpi-internal.com/display/ST/Frontend)

### How much time do we have to build that project?

Normally ~10 days would be enough. Surely when you start in the company you will have to attend onboarding meetings and trainings, so you will have less time. Do not worry, and do your project with peace of mind.

You can work alone on the project, but you can also have pair programming sessions with your buddy, to clarify concepts that you want to reinforce.

### Requirements

node version 16

## 🚀 Getting Started

What is a web server project? For us, a web app is a project that will handle the routing, get route requests, server-side rendering and more...

### Let's start to set up our environment

First thing that we need to do is **create our repository**. Go to [Adevinta Spain Github](https://github.mpi-internal.com/scmspain) and log in with your account.

In order to have all repositories well organized, at Adevinta Spain, we follow a [name convention for repositories](https://docs.mpi-internal.com/scmspain/es-td-agreements/05-global/repo-nomenclature/).

Following this convention, and assuming that this pet project is not owned by any marketplace, we will use the acronym of `mv` (movies will be your pet project marketplace). So, following this convention we are going to name our first repository under our profile as:

`<role>-<marketplace acronym>--<type>-<name>` in our case, for example `frontend-mv--web-app`

Then we are going to **init our npm project**:

```sh
npm init -y
```

###  How is the project structured?

Adevinta Spain Frontend projects are monorepos. A monorepo is a repository with all frontend projects (folders) that `web-app` needs to run.

According to that, we split the learning process into four parts, in every one you'll find further instructions to continue the project:

**1 - Web App package:** [src](./README_WEB_APP.md)

**2 - Theme package:** [theme](./README_THEME.md)

**3 - Studio (components) folder:** [components](./README_COMPONENTS.md)

**4 - Domain (business logic) package:** [domain](./README_DOMAIN.md)

At the end of the learning process, you will have created a marketplace project with a folder structure similar to the one you will see in our frontend projects.

```
/
├── components/
│   └── AwesomeComponent
│   │   └── package.json
│   └── ...
├── domain/
│   └── package.json
├── src/
│   └── pages/
│   │   └── Home
│   │       └── index.js
│   │       └── index.scss
│   └── routes.js
│   └── app.js
│   └── contextFactory.js
│   └── index.html
│   └── index.scss
├── theme/
│   └── package.json
├── .gitignore
└── package.json
```

## 😽 Examples

### They've already done it, look at their code!

Look at the repositories of different projects already finished in case you need to get ideas or solve doubts. Don't be shy and share your project with next newcomers 😝!

#### Monorepo examples:

- [Alfredo Zimperz](https://github.mpi-internal.com/alfredo-zimperz/pet-project)
- [Daniela Aguilera](https://github.mpi-internal.com/daniela-aguilera/frontend-mv--web-app)
- [Jenifer Lopez](https://github.mpi-internal.com/jenifer-lopez/pet-project-themoviedb)
- [Stefi Rosca](https://github.mpi-internal.com/stefania-rosca/frontend-mv--web-app)

#### Multirepo examples (legacy project folder structure):

- [Javier Ausó](https://github.mpi-internal.com/javier-auso?tab=repositories)
- [Joan Manrubia](https://github.mpi-internal.com/joan-manrubia?tab=repositories)
- [Juan Carlos Ruiz](https://github.mpi-internal.com/juancarlos-ruiz?utf8=%E2%9C%93&tab=repositories&q=frontend-mv--)
- [Nacho Rodríguez](https://github.mpi-internal.com/ignacio-rodriguez?utf8=%E2%9C%93&tab=repositories&q=frontend-mv--)
- [Stivali Serna](https://github.mpi-internal.com/stivali-serna?tab=repositories)
- [Xavier Conejo](https://github.mpi-internal.com/xavier-conejo?utf8=%E2%9C%93&tab=repositories&q=frontend-mv--)
