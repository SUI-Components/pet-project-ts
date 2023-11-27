# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/engine/reference/builder/

ARG NODE_VERSION=20.0.0

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION} as base

ARG NODE_ENV=production

# Set working directory for all build stages.
WORKDIR /usr/src/app

# Use production node environment by default.
ENV NODE_ENV ${NODE_ENV}

# Install system dependencies
RUN apt-get -y -qq update && \
    apt-get install -y -qq curl && \
    apt-get clean && \
    curl -o /usr/local/bin/jq http://stedolan.github.io/jq/download/linux64/jq && \
    chmod +x /usr/local/bin/jq

################################################################################
# Create a stage for installing production dependecies.
FROM base as deps

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# into this layer.

##############################################################################################
#                                                                                          ###
# ⚠️  DONT FORGET UPDATE THIS PART OF THE DOCKERFILE IF YOU ADD A NEW APP / PACKAGE / QA ⚠️  ###
#                                                                                          ###
##############################################################################################
COPY package.json package.json
COPY package-lock.json package-lock.json

COPY app/package.json app/package.json

COPY packages/domain/package.json packages/domain/package.json
COPY packages/js/package.json packages/js/package.json
COPY packages/literals/package.json packages/literals/package.json
COPY packages/styles/package.json packages/styles/package.json
COPY packages/ui/package.json packages/ui/package.json

COPY qa/contracts/package.json qa/contracts/package.json
COPY qa/e2e/package.json qa/e2e/package.json
COPY qa/mocks/package.json qa/mocks/package.json

# RUN --mount=type=cache,target=$HOME/.npm npm ci --include=dev --ignore-scripts
RUN npm ci --include=dev --ignore-scripts

################################################################################
# Create a stage for building the application.
FROM deps as build

# define a default application to be build
ARG NODE_ENV=production
ARG STAGE=production
ARG CDN=/

# Copy the rest of the source files into the image.
COPY . .

RUN npm run postinstall

WORKDIR /usr/src/app/app

ENV NODE_ENV ${NODE_ENV}
ENV STAGE ${STAGE}
ENV CDN ${CDN}

RUN make build

WORKDIR /usr/src/app
RUN npx msw init app/public --save

################################################################################
# Create a new stage to run the application with minimal runtime dependencies
# where the necessary files are copied from the build stage.
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

COPY --from=build /usr/src/app/app /usr/src/app

# Run the application.
CMD ["node", "server/index.js"]
