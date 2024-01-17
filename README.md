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
git clone git@github.mpi-internal.com:scmspain/frontend-all--pet-project-ts.git
rm -Rf .git
git init
git remote add upstream git@github.mpi-internal.com:scmspain/frontend-all--pet-project-ts.git
```

Nota: Hemos añadido un nuevo origen al repositorio de la plantilla para facilitar futuras actualizaciones. Aunque no es obligatorio, puede resultar útil.

# Acuerdos Actuales

Estos son los acuerdos vigentes en este repositorio:

- **Makefiles**: Para evitar scripts excesivamente largos en los `package.json`, hemos decidido trasladar todos los scripts a Makefiles. Así, la función de los scripts en el `package.json` será únicamente llamar a una tarea de Make.
