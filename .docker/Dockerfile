ARG NODE_VERSION=20.0.0

FROM node:${NODE_VERSION}-alpine

# define a defaul value for NODE_ENV, USER, EXPOSE
ARG NODE_ENV=production
ARG STAGE=production
ARG USER=node
ARG EXPOSE=3000
ARG CONSOLE

# Use production node environment by default.
ENV NODE_ENV ${NODE_ENV}
ENV STAGE ${STAGE}
ENV CONSOLE ${CONSOLE}
ENV PORT ${EXPOSE}

# Add Tini
# https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md
RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]

# Run the application as a non-root user.
USER ${USER}

# Expose the port that the application listens on.
EXPOSE ${EXPOSE}

WORKDIR /usr/src/app

COPY  ./app /usr/src/app

# Run the application.
CMD ["node", "server/index.js"]
