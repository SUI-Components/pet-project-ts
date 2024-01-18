<h1 align="center" style="padding-bottom: 2ch">
  👋 Plantilla para Proyectos Frontend en Adevinta
</h1>

<h4 align="center">Este Readme explica los detalles y acuerdos para los futuros repositorios de frontend en Adevinta.</h4>

# Motivación del Repositorio

En Adevinta, manejamos numerosos proyectos frontend, cada uno en su propio repositorio. Con el tiempo, ha surgido la necesidad de migrar de monorepo-monopaquete a monorepo-multipaquetes. Esto nos permite probar cambios en todas las partes afectadas de la aplicación dentro de una misma PR.

Actualmente, varios repositorios siguen esta filosofía. Sin embargo, hemos notado que estos repositorios varían significativamente entre sí, a pesar de abordar problemas similares. Para optimizar este proceso, hemos creado este repositorio. Su objetivo es unificar todas las buenas prácticas y metodologías acordadas en el ámbito del frontend.

## ¿Quién Debería Usar Este Repositorio?
Idealmente, todos los equipos deberían adoptar este enfoque de monorepo-multipaquete para sus aplicaciones.

# Cómo Usar el Repositorio

Aunque planeamos convertirlo en una plantilla de GitHub pronto, por ahora la mejor manera de usarlo es clonando el repositorio, eliminando la carpeta `.git` y subiéndola a tu propio repositorio.

```bash
$ git clone git@github.mpi-internal.com:scmspain/frontend-all--pet-project-ts.git
$ rm -Rf .git
$ git init
$ git remote add upstream git@github.mpi-internal.com:scmspain/frontend-all--pet-project-ts.git
```

Nota: Hemos añadido un nuevo origen al repositorio de la plantilla para facilitar futuras actualizaciones. Aunque no es obligatorio, puede resultar útil.

# Acuerdos Actuales

Estos son los acuerdos vigentes en este repositorio:

- **Makefiles**: Para evitar scripts excesivamente largos en los `package.json`, hemos decidido trasladar todos los scripts a Makefiles. Así, la función de los scripts en el `package.json` será únicamente llamar a una tarea de Make.

# Use de Typescript

Este repositorio usa la versión de las librerías de SUI preparadas para poder usar Typescript. En principio no hay nada más que hacer, simplemente se puede mezclar ficheros TS y JS en el mismo paquete.

La configuración de TS que hay en la raiz del repositorio, tiene toda la configuración delegada a la librería `sui-bundler`. Como se puede ver aquí

```
{
  "extends": "@s-ui/bundler/tsconfig.json",
  "compilerOptions": {
    "rootDir": "."
  },
  "include": ["packages", "app", "qa", "widgets"]
}
```

# ¿Cómo trabajar con el repositorio?

En la raiz del proyecto hay un Makefile que contiene los tres comandos más importantes para trabajar con el repositorio.

```
$ make dev
```

Lanza la aplicación en modo dev con todos los paquetes linkados.

```
$ make test
```

Lanza todos los tests de la aplicación con un solo comando.

```
$ make co
```

Nuestro viejo amigo `npm run co`

# App y Paquetes 

## Aplicación

Aquí debe ir el contenido de la aplicación. Los ficheros que va a usar `sui-ssr` para construir el servidor. Es el mismo contenido que tenemos actualmente en los mismos repositorios.

Hay dos variables de entorno importantes a tener en cuenta cuando estas trabajando en esta carpeta:

* STAGE: Determina el entorno que vamos a usar. Usamos esta para evitar usar NODE_ENV que tiene otras funciones y es mejor no usarlo para configuraciones del dominio.
* MOCK_API_REQUEST: Si no está definada con el valor "true" nuestra aplicación no usar

> Nota: Es importante tener instalada la utlidad `jq`. Si estás en mac la forma más simple de hacerlo es mediante brew -> `$ brew install jq`.
> De otro modo trata de ejecutar cualquier tarea del makefile dará error

## Packages

La estructura general de los paquetes y que es lo que contienen está bien definida en el ADR que se creó sobre ello [Project Structure ADR](https://github.mpi-internal.com/scmspain/es-td-agreements/blob/master/30-Frontend/00-agreements/02-project-structure.md)

Como paquetes principales tenemos:

* Domain: Tenemos la lógica de negocio de la aplicación y los principales comandos a ejecutar son: `make test` y `make lib`
* JS: Ya tenemos un sui-js global donde tratamos de meter esas pequeñas utilidades que compartimos pero nunca tenemos claro donde van. Esto es lo mismo pero a nivel de proyecto.
* literals: Contiene el diccionario de traducciónes de la aplicación. El comando `make lib` crea una copia de los literales para poder usarse como paquete npm
* Styles: Seguramente solo contenga un ficher sass con el tema del site.
* UI: Es el studio de la aplicación. Tienes una carpeta `components` con todos los componentes. Lo comandos make más importantes en este paquete son:
    * `make dev` : Levanta el estudio en modo desarrollo. En principio el dominio NO está linkado.
    * `make generate`: Genera un nuevo componente en nuestro estudio. Es importante definir tres variables de entorno cuando lo uses -> `make generate PREFIX=adv-ui CATEGORY=atom COMPONENT=card`

## Widgets

Contiene lo necesario para hacer funcionar al paquete `sui-react-widgets` y todos los widgets que se definan aquí pasarán a ser desplegados a producción en CI/CD junto con la aplicación principal, usando la última versión de todas las librerías. Así esperamos que el código de los widgets en producción no esté desalineado con el de la aplicación, cosa que pasa actualmente.
En este paquete hay tres tareas de make que son importantes conocer:

* `make build`: Construye el fichero donwloader.js y todos los demás ficheros estáticos.
    * WIDGET_CDN se utilizar para define la URL de CDN que ha de servirlos. en CI/CD ya debería de venir definida.
* `make generate`: Crea una nueva pagina dentro de la carpeta `pages` para poder agregar nuevos widgets a esa página
    * PAGE: es la variable de entorno que se define para nombre a la página -> `make generate PAGE=listing`
* `make start`: Empieza un servidor de desarrollo apuntando a una página en particular.
    * PAGE: vuelve a ser necesario definirlo
    * WIDGETS_DEV_PORT: define en que puerto se pone a la escucha nuestro servidor de desarrollo, por defecto es el puerto `8081`. -> `make start PAGE=listing WIDGETS_DEV_PORT=2024`

## QA

Aquí vamos a encontrar todos los paquetes que estén relacionados con E2E testing o mocking de la aplicación.

* contrats: Los tests de contrato de la aplicación.
* e2e: Los tests de cypress para ejecutar en CI/CD. Han de seguir la misma estructura de ficheros que necesita el paquete `sui-test-e2e`. En este carpeta no hay un makefile, porque casi siempre será usado desde CI / CD
* mocks: Los mocks de MSW, siguen la forma de carga de autoload, que ya se ha definido en esta guía [MSW AUTOLOAD](https://github.mpi-internal.com/scmspain/es-td-agreements/blob/master/30-Frontend/10-guides/50-msw-mocks/how-to-create-msw-mocks.md)

# Docker / Docker componentes

El uso de docker y docker compose es extenso en este repositorio. Y es importante tener una visión general de todo lo que hay dentro de la carpeta `.docker`:

* *Dockerfile*: Este es el fichero principal de la aplicación. Es la imagen de docker que acabará en producción.
* *Dockerfile.criticalCSS* : Imagen de docker que tiene instalado chrome y es capaz de ejecutar el script `app/scripts/extract-critical-css.mjs` usando el paquete de sui `@s-ui/critical-css`. Este escript generará los criticals css que se van a guardar en la carpeta `critical-css`
* *Dockerfile.test* : Es un prueba de concepto donde estamos tratando de ejecutar todos los tests del mono repo dentro de una imagen de docker con un chrome preinstalado para optimazar el pipeline de testing. Con ella hemos visto una reducción de hasta 1min en cada ejecución.
* *Dockerfile.dev* : Realmente no se llega a usar, y solo está ahí a efectos demostrativos de como se podría hacer.

Aunque podríamos usar los Dockers files directamente, la realidad es que casi siempre lo hacemos mediante docker compose, ya que el gestiona la generación de imágenes y el borrado cuando ya no es necesario.

* *compose.criticaCSS.yml* : Levanta dos servicios, A) La imagen del servidor creada con el fichero _Dockerfile_ y B) la image creada con el fichero _Dockerfile.criticalCSS_. Las conecta en la misma red y luego ejecuta el proceso de generación del critical css
    * APP_IMG : Es un variable de entorno crítica, sin ella definida todo el proceso falla. Y hace referencia a la IMG de docker que hemos creado usando el fichero _Dockerfile_
* *compose.e2e.yml* : Se utiliza para ejecutar los tests E2E y también levanta dos servicios que luego son conectados por la misma red interna.  A) La imagen del servidor creada con el fichero _Dockerfile_ y B) un servicio creado con la image _Dockerfile.criticalCSS_. Usa por defecto la imagen `sui-tools/e2e-test`
    * E2E : esta variable de entorno nos podría llegar a permitir cambiar la imagen de docker que queremos usar como en runner de tests e2e, por si hemos hecho una imagen custom por algún motivo.
