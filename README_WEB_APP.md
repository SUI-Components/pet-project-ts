<h1 align="center">
  ⚛️ Web app!
  <br/><br/>
</h1>

<h4 align="center">A project to dominate them all</h4>

<p align="center">
  <a href="./README.md">🏠 Home</a> •
  <a href="#-introduction">🔥 Introduction</a> •
  <a href="#-getting-started">🚀 Getting started</a> •
  <a href="#-checkpoint">📍 Checkpoint</a>
</p>

## 🔥 Introduction

## 🚀 Getting started

First of all... what is a web server project? For us, a web app is a project that will handle with the routing, get route requests, server-side rendering and more...

Now we are going to **install some dev dependencies**....

```sh
npm install --save-dev --save-exact @s-ui/bundler @s-ui/lint @s-ui/mono @s-ui/ssr
```

```sh
@s-ui/bundler
@s-ui/lint
@s-ui/mono
@s-ui/ssr
```

In the case of our dependencies we always use the major version and always the exact version.

### 🧠 What do the dependencies we use do?

- **[@s-ui/bundler](https://github.com/SUI-Components/sui/tree/master/packages/sui-bundler)** - The responsible for bundling with webpack, ...

- **[@s-ui/ssr](https://github.com/SUI-Components/sui/tree/master/packages/sui-ssr)** - The responsible of set our server-side rendering server creating our server folder, passing and getting context and more...

- **[@s-ui/lint](https://github.com/SUI-Components/sui/tree/master/packages/sui-lint)** - The responsible of handle with our linting.

- **[@s-ui/mono](https://github.com/SUI-Components/sui/tree/master/packages/sui-mono)** - The one that will handle our commits and release flow.

Now that we have our dev packages let's install the ones that will go to production.

```sh
npm install --save --save-exact @s-ui/component-peer-dependencies @s-ui/hoc @s-ui/i18n @s-ui/react-initial-props @s-ui/react-router
```

```sh
@s-ui/component-peer-dependencies
@s-ui/hoc
@s-ui/i18n
@s-ui/react-initial-props
@s-ui/react-router
```

- [@s-ui/component-peer-dependencies](https://github.com/SUI-Components/sui/tree/master/packages/sui-component-peer-dependencies) - Peer dependencies of frontend projects at schibsted spain, react, react-dom, react-router, prop types and more...

- [@s-ui/hoc](https://github.com/SUI-Components/sui/tree/master/packages/sui-hoc) - Provide the context to our component tree

- [@s-ui/i18n](https://github.com/SUI-Components/sui/tree/master/packages/sui-i18n) - The isomorphic way to handle with locales.

- [@s-ui/react-initial-props](https://github.com/SUI-Components/sui/tree/master/packages/sui-react-initial-props) - Provides a way to make our app isomorphic standardizing getInitialProps on client and server.

- [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch) - An isomorphic fetcher for node and browserify.

Now that we have the packages installed let's add some scripts to our package.json.

```json
"scripts": {
  "co": "sui-mono commit",
  "test": "echo \"Error: no test specified\" && exit 1",
  "dev": "sui-bundler dev",
  "ssr": "sui-bundler build -C && sui-ssr build -C && node server/index.js --inspect `pbpaste`"
}
```

And that's it! We have our project ready to develop!

### Project structure

First of all, we are going to set the folder structure of our project.

```text
src/
  └── pages/
      └── .gitkeep
  └── routes.js
  └── app.js
  └── layout.js
  └── contextFactory.js
  └── index.html
  └── index.scss
```

**Creating our `INDEX.HTML`**

Inside our index.html file we are going to put the next code:

```html
<html>
  <head></head>
  <body>
    <div id="app"><!-- APP --></div>
  </body>
</html>
```

This code will be used by our SSR logic to inject our rendered website inside the app div.

_⚠️NOTE: The usage of `<!-- APP -->` is not trivial. It MUST HAVE THIS COMMENT for server-side replacement purposes. More info on the [code of the tool](https://github.com/SUI-Components/sui/blob/master/packages/sui-ssr/server/ssr/index.js#L105)_

**Creating our `INDEX.SCSS` file**
Leave it commented for now, we will cover the styles part in the next section.

```scss
// @import "~frontend-mv--uilib-theme/lib/index";
// Rest of your styles for the pages below
```

**Creating our `CONTEXTFACTORY.JS` file**

First of all, what is a context factory and why do we use it?

A context factory is just a file that will return an ASYNC function with ALL the elements that we expect to be injected as a context in our react components. For example, imagine that we want to have i18n and domain in all our components as they will use or not at any moment.

So you would put them in the contextFactory file. We return async functions by convention **EVEN IF THEY DON'T IMPLEMENT ANY ASYNC OPERATION**.

So... our context file could look like this (Don't forget to link the package to make it work):

```js
import domain from "<marketplace-domain-package>";

export default async () => ({ domain });
```

Don't worry if you don't know how to get your domain. Ask your assigned mentor at this point if you have doubts.

We will cover the creation of the domain package later, in the meantime to make the web app work create the file as this

```js
//import domain from "<marketplace-domain-package>";

export default async () => ({ domain: {} });
```

Later we will revisit this file to import the proper package!

**Creating our `LAYOUT.JS` file**

In this file we're going to include our basic skeleton that would be present across all our pages, so we will render every src/pages/* content inside of it (children)
Change it according to your needs:

```js
const Layout = ({children}) => {
  return (
    <>
      <header>Movies</header>
      {children}
      <footer>Adevinta Spain @ 2022</footer>
    </>
  )
}

export default Layout

```

**Creating our `ROUTES.JS` file**

At this moment and as an example we are going to put only the index route because how react-router works, is not the big thing here.

```js
import { Route, IndexRoute } from "@s-ui/react-router";
import { loadPage } from "@s-ui/react-initial-props";
import contextFactory from "./contextFactory";
import Layout from "./layout.js";

const LoadHomePage = loadPage(contextFactory, () =>
  import(/* webpackChunkName: "HomePage" */ "./pages/Home")
);

export default (
  <Route>
    <Route component={Layout}>
      <Route path="/">
        <IndexRoute getComponent={LoadHomePage} />
      </Route>
    </Route>
  </Route>
);
```

Okay, a lot of stuff is happening here.

First of all notice that we are importing these two things here:

```js
import { loadPage } from "@s-ui/react-initial-props";
import contextFactory from "./contextFactory";
```

That will be used to inject context to the page.

The second big thing here is that we are doing a [webpack dynamic importation](https://webpack.js.org/guides/code-splitting/#dynamic-imports):

```js
const LoadHomePage = loadPage(contextFactory, () =>
  import(/* webpackChunkName: "HomePage" */ "./pages/Home")
);
```

This is important so we will not download the chunk if we didn't navigate to the page.

The last thing that we are doing is to load the page component through a sui-react-initial-props method called `loadPage`.

Load page will work in the following manner:

- 1 - If we are on client

  - 1.1 - Check if we have the `__INITIAL_PROPS__` injected by SSR
    - 1.1.1 - Inject them to our page.

- 2 - If we are in server
  - 2.1 - Return the component and pass the initial props from the context

**Creating our `APP.JS` file (our entrypoint)**

```js
import ReactDOM from "react-dom";
import Context from "@s-ui/react-context";
import { Router, match } from "@s-ui/react-router";
import { withContext } from "@s-ui/hoc";
import { createClientContextFactoryParams } from "@s-ui/react-initial-props";

import contextFactory from "./contextFactory";
import routes from "./routes";

import "./index.scss";

contextFactory(createClientContextFactoryParams()).then(
  (context) => {
    match({ routes }, (err, _, renderProps) => {
      if (err) console.error(err); // eslint-disable-line no-console

      const App = withContext(context)(Router);
      ReactDOM.render(
        <Context.Provider value={context}>
          <App {...renderProps} />
        </Context.Provider>,
        document.getElementById("app")
      );
    });
  }
);
```

Let's explain what's happening here:

```js
contextFactory(createClientContextFactoryParams()).then(context => {
```

We are calling our contextFactory, and we are passing to them some params that we expect that usually are going to be used by our contextFactory.

`createClientContextFactoryParams` will return an object with the next params:

```js
  {
    cookies: document.cookie,
    isClient: true,
    pathName: window.location.pathname,
    userAgent: window.navigator.userAgent
  }
```

_⚠️ NOTE: We are calling CLIENT-CONTEXT-FACTORY-PARAMS as this code will be handled in client, the 'clientContextServerParams` will be called and managed automatically by our sui-ssr package_

After that, we'll call react-router `match` which has the purpose of being a kind of 'middleware' between a user url access and their final page component.

After that, we call `withContext` HOC passing the context and the react-router Router component. This will set the `childContextTypes` to our desired components getting as a prop our contextObject and iterating through the keys you can see the code that does that [here](https://github.com/SUI-Components/sui/blob/master/packages/sui-hoc/src/withContext.js#L6)

Then the last thing that we need now to have a little working example is to create the Home page component.

Under pages folder create another folder called Home, then create a file called `index.js` in it and paste the following example:

```js
import Helmet from "react-helmet";

export default function HomePage() {
  return (
    <>
      <Helmet>
        <link rel="canonical" href="http://spa.mock/" />
      </Helmet>
      <h1>Home page test title</h1>
    </>
  );
}
```

And that's it!

Run:

```sh
> npm run ssr
```

### Developing within the web-app

You can use `sui-bundler` in development mode to start your webapp locally and test it. In order to do that, you can use the following command:

```sh
npm run dev
```

This will launch a website in your `localhost:3000`. Like the components in sui-studio, you will need to add your dependencies in your `package.json` file and link the ones you want to use inside your pages. `sui-bundler` also supports linking packages locally with the `link-package` option:

```sh
npm run dev -- --link-package=/absolute_path/to/npm_package
npm run dev -- --link-package=../relative_path/to/npm_package
```

As with the components linking, you can use relative or absolute paths. If you want to link more than one package, you should add the `link-package` multiple times:

```sh
npm run dev -- --link-package=/absolute_path/frontend-mv--uilib-components/components/header/search \
--link-package=/absolute_path/frontend-mv--uilib-components/components/header/title \
--link-package=/absolute_path/frontend-mv--uilib-components/components/another/component \
--link-package=/absolute_path/frontend-mv--uilib-theme/ \
--link-package=/absolute_path/frontend-mv--lib-movies/
...
```
