<h1 align="center" style="padding-bottom: 2ch">
  👋 Frontend Project Template for Adevinta
</h1>

<h4 align="center">This Readme explains the details and agreements for future frontend repositories at Adevinta.</h4>

# Repository Motivation

At Adevinta, we handle numerous frontend projects, each in its own repository. Over time, the need has arisen to migrate from a mono-repo-single-package to a mono-repo-multi-package. This allows us to test changes in all affected parts of the application within the same PR.

Currently, several repositories follow this philosophy. However, we have noticed that these repositories vary significantly from each other, despite addressing similar problems. To optimize this process, we have created this repository. Its aim is to unify all the good practices and methodologies agreed upon in the field of frontend.

## Who Should Use This Repository?
Ideally, all teams should adopt this mono-repo-multi-package approach for their applications.

# How to Use the Repository

Although we plan to turn it into a GitHub template soon, for now, the best way to use it is by cloning the repository, deleting the `.git` folder, and uploading it to your own repository.

```bash
$ git clone git@github.mpi-internal.com:scmspain/frontend-all--pet-project-ts.git
$ rm -Rf .git
$ git init
$ git remote add upstream git@github.mpi-internal.com:scmspain/frontend-all--pet-project-ts.git
```

Note: We have added a new origin to the template repository to facilitate future updates. Although it is not mandatory, it can be useful.

# Current Agreements

These are the current agreements in this repository:

- **Makefiles**: To avoid excessively long scripts in the `package.json`, we have decided to move all scripts to Makefiles. Thus, the function of the scripts in the `package.json` will be solely to call a Make task.

# Use of Typescript

This repository uses the version of SUI libraries prepared for using Typescript. In principle, there is nothing more to do; you can simply mix TS and JS files in the same package.

The TS configuration in the root of the repository has all its configuration delegated to the `sui-bundler` library. As you can see here

```
{
  "extends": "@s-ui/bundler/tsconfig.json",
  "compilerOptions": {
    "rootDir": "."
  },
  "include": ["packages", "app", "qa", "widgets"]
}
```

# How to Work with the Repository?

## Run inside app folder, next commands:

Launches the application in dev mode:
```
$ make dev
```

Launches the application in dev mode with all the packages linked:
```
$ make dev_link_all
```

Launches all the application's tests with a single command:
```
$ make test
```

Our old friend `npm run co`:
```
$ make co
```


# App and Packages 

## Application

Here should go the content of the application. The files that `sui-ssr` will use to build the server. It is the same content we currently have in the same repositories.

There are two important environment variables to consider when working in this folder:

* STAGE: Determines the environment we are going to use. We use this to avoid using NODE_ENV, which has other functions and is better not used for domain configurations.
* MOCK_API_REQUEST: If not defined with the value "true," our application will not use

> Note: It is important to have the `jq` utility installed. If you are on a Mac, the simplest way to do it is via brew -> `$ brew install jq`.
> Otherwise, trying to execute any task from the makefile will give an error.

## Packages

The general structure of the packages and what they contain is well defined in the ADR that was created about it [Project Structure ADR](https://github.mpi-internal.com/scmspain/es-td-agreements/blob/master/30-Frontend/00-agreements/02-project-structure.md)

As main packages we have:

* Domain: We have the business logic of the application, and the main commands to execute are: `make test` and `make lib`
* JS: We already have a global sui-js where we try to include those small utilities that we share but never have clear where they go. This is the same but at the project level.
* Literals: Contains the application's translation dictionary. The command `make lib` creates a copy of the literals to be used as an npm package
* Styles: Probably only contains a sass file with the site theme.
* UI: It is the studio of the application. You have a `components` folder with all the components.

### Package UI (Studio and components)

The most important make commands in this package are, run inside `packages/ui` folder:
  * `make start`: Raises the studio in development mode. In principle, the domain is NOT linked.
  * `make generate`: Generates a new component in our studio. It is important to define three environment variables when you use it -> `make generate PREFIX=adv-ui CATEGORY=atom COMPONENT=card`
  * `make dev COMPONENT=atom/card`: Raises studio only with one component.
  * `make dev COMPONENT=atom/card BUNDLE_ARGS="-l ../domain"`: Raises studio only with one component and domain linked.

## Widgets

It contains what is necessary to make the `sui-react-widgets` package work, and all the widgets defined here will be deployed to production in CI/CD along with the main application, using the latest version of all libraries. Thus, we hope that the code of the widgets in production is not misaligned with that of the application, which is currently the case.
In this package, there are three make tasks that are important to know:

* `make build`: Builds the downloader.js file and all other static files.
    * WIDGET_CDN is used to define the CDN URL that has to serve them. In CI/CD it should already be defined.
* `make generate`: Creates a new page within the `pages` folder to be able to add new widgets to that page
    * PAGE: is the environment variable that is defined to name the page -> `make generate PAGE=listing`
* `make start`: Starts a development server pointing to a particular page.
    * PAGE: it is again necessary to define it
    * WIDGETS_DEV_PORT: defines which port our development server listens on, by default it is port `8081`. -> `make start PAGE=listing WIDGETS_DEV_PORT=2024`

## QA

Here we will find all the packages that are related to E2E testing or mocking of the application.

* Contracts: The contract tests of the application.
* e2e: The Cypress tests to run in CI/CD. They must follow the same file structure needed by the `sui-test-e2e` package. In this folder, there is no makefile, because it will almost always be used from CI / CD.
* mocks: The MSW mocks, follow the autoload loading form, which has already been defined in this guide [MSW AUTOLOAD](https://github.mpi-internal.com/scmspain/es-td-agreements/blob/master/30-Frontend/10-guides/50-msw-mocks/how-to-create-msw-mocks.md)

# Docker / Docker Components

The use of docker and docker compose is extensive in this repository. And it is important to have an overview of everything inside the `.docker` folder:

* *Dockerfile*: This is the main file of the application. It is the docker image that will end up in production.
* *Dockerfile.criticalCSS*: Docker image that has chrome installed and is capable of running the script `app/scripts/extract-critical-css.mjs` using the sui package `@s-ui/critical-css`. This script will generate the critical CSS that will be saved in the `critical-css` folder.
* *Dockerfile.test*: It is a proof of concept where we are trying to run all the tests of the mono repo inside a docker image with a pre-installed chrome to optimize the testing pipeline. With it, we have seen a reduction of up to 1 minute in each execution.
* *Dockerfile.dev*: It is not really used, and it is only there for demonstration purposes of how it could be done.

Although we could use the Dockers files directly, the reality is that we almost always do it through docker compose, as it manages the generation of images and their deletion when no longer needed.

* *compose.criticaCSS.yml*: Raises two services, A) The image of the server created with the _Dockerfile_ and B) the image created with the _Dockerfile.criticalCSS_. Connects them on the same network and then runs the critical css generation process.
    * APP_IMG: It is a critical environment variable, without it defined the whole process fails. And it refers to the docker IMG that we have created using the _Dockerfile_.
* *compose.e2e.yml*: It is used to run the E2E tests and also raises two services that are then connected by the same internal network. A) The image of the server created with the _Dockerfile_ and B) a service created with the image _Dockerfile.criticalCSS_. Uses by default the image `sui-tools/e2e-test`
    * E2E: this environment variable could allow us to change the docker image we want to use as an E2E test runner, in case we have made a custom image for some reason.

# Extras

You can check
- [Agreements, guides and troubleshooting](https://github.mpi-internal.com/scmspain/es-td-agreements/tree/master/30-Frontend)


