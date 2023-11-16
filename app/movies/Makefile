.PHONY: lib
OWNER=Web Platform <enablers-frontend@adevinta.com>

SHELL := /bin/bash
.DEFAULT_GOAL := help

ifeq (, $(shell which jq))
$(error "No jq in PATH, consider doing brew install jq")
endif

MOCK_API_REQUESTS ?= DISABLED API MOCKING
NODE_ENV ?= production
STAGE ?= production

ROOT=$(PWD)/../..
MOCK_NAME=$(shell cat "$(ROOT)/qa/mocks/package.json" | jq -r .name)
MOCKS_API_PATH=$(ROOT)/node_modules/$(MOCK_NAME)/routes

# CDN and statics
S3_BUCKET ?= s3://scm-milanuncios-frontend-pre/
S3_BUCKET_PET ?= $(S3_BUCKET)pet/

FIVE_MINUTES_CACHE=300
ONE_YEAR_CACHE=31536000

ASSET_MANIFEST="asset-manifest.json"
MANIFEST="manifest.json"
ROBOTS="robots.txt"
INDEX_HTML="index.html"
404_HTML="404.html"
500_HTML="500.html"
SERVICE_WORKER="service-worker.js"

cdn: ## Upload static folder to the CDN
	time aws s3 sync public/. $(S3_BUCKET_SPA) --region eu-west-3 --include '*' --exclude $(MANIFEST) --exclude $(ASSET_MANIFEST) --exclude $(SERVICE_WORKER) --exclude $(INDEX_HTML) --exclude $(500_HTML) --exclude $(404_HTML) --cache-control max-age=$(ONE_YEAR_CACHE)
	time aws s3 cp public/$(ASSET_MANIFEST) $(S3_BUCKET_SPA)$(ASSET_MANIFEST)
	time aws s3 cp public/$(INDEX_HTML) $(S3_BUCKET_SPA)$(INDEX_HTML)
	time aws s3 cp public/$(404_HTML) $(S3_BUCKET_SPA)$(404_HTML)
	time aws s3 cp public/$(500_HTML) $(S3_BUCKET_SPA)$(500_HTML)
	time aws s3 cp public/$(MANIFEST) $(S3_BUCKET)$(MANIFEST) --content-type='application/json' --cache-control max-age=$(FIVE_MINUTES_CACHE) --metadata-directive REPLACE

.PHONY: critical_css
critical_css: kill_all ## Start docker server from compiled app and extract critical css
	NODE_ENV=$(NODE_ENV) STAGE=$(STAGE) HOST=$(HOST) PORT=$(PORT) docker-compose up -d
	sleep 5
	npm install @s-ui/critical-css --no-save
	node scripts/extract-critical-css.mjs
	ls -1 ./critical-css
	docker-compose down

.PHONY: spa
spa: ## Build SPA
	time npx sui-bundler build -C $(FLAGS)
	cp statics/$(MANIFEST) public/
	cp statics/$(ROBOTS) public/
	cp src/$(404_HTML) public/
	cp src/$(500_HTML) public/

.PHONY: ssr
ssr: ## Build SSR server
	time npx sui-ssr build -C $(FLAGS)

build_server:
	if [ ! -d ./public ]; then \
		mkdir public; \
		cp -f src/index.html public/index.html; \
	fi
	make ssr

tag_deployed_image_e2e: ## Tag deployed docker image for E2E
	echo $(UPLOADED_DOCKER_CONTAINER)
	echo $(UPLOADED_DOCKER_IMAGE)
	docker tag $(UPLOADED_DOCKER_CONTAINER) $(DOCKER_IMAGE_PR_E2E)
	docker push $(DOCKER_IMAGE_PR_E2E)

.PHONY: login
login: ## Loging in docker registry using env vars (exported locally or injected by travis)
	docker login --username="${ARTIFACTORY_USER}" --password="${ARTIFACTORY_PWD}" ${DOCKER_REGISTRY}

.PHONY: run_image
run_image: login ## Run a dockerized app
	if [ -z "$(DOCKER_TAG)" ]; then \
		echo "A Docker valid tag must be defined."; \
		exit 1; \
	fi
	docker run -p 3000:3000 -d -e STAGE=$(STAGE) -e NODE_ENV=$(NODE_ENV) -e HOST=local.milanuncios.net -e PORT=$(PORT) $(DOCKER_IMAGE_TAG)

e2e_ci: login install_test_e2e_deps start_image ## run test E2E for a PR (Use only in travis)
	CYPRESS_DASHBOARD_PR_SLUG_SUB_STRING="cypress-dashboard"; \
	CYPRESS_DASHBOARD_METRICS_PERCENTAGE=5; \
	RANDOM_NUMBER=$$(( $$RANDOM % 100 + 1 )); \
	if [[ $$TRAVIS_PULL_REQUEST_BRANCH == *"$$CYPRESS_DASHBOARD_PR_SLUG_SUB_STRING"* ]] || [ $$RANDOM_NUMBER -lt $$CYPRESS_DASHBOARD_METRICS_PERCENTAGE ]; then \
		echo "Branch $${TRAVIS_PULL_REQUEST_BRANCH} contains substring $${CYPRESS_DASHBOARD_PR_SLUG_SUB_STRING}"; \
		echo "or random number $${RANDOM_NUMBER} less than $${CYPRESS_DASHBOARD_METRICS_PERCENTAGE}"; \
		echo "Sending metrics to Cypress Dashboard"; \
		docker run --network host --shm-size 1g \
			-e CYPRESS_PROJECT_ID=gs84zi \
			-e COMMIT_INFO_BRANCH="$(shell git rev-parse --abbrev-ref HEAD)" \
			-e COMMIT_INFO_MESSAGE="$(shell git show -s --pretty=%B)" \
			-e COMMIT_INFO_EMAIL="$(shell git show -s --pretty=%ae)" \
			-e COMMIT_INFO_AUTHOR="$(shell git show -s --pretty=%an)" \
			-e COMMIT_INFO_SHA="$(shell git show -s --pretty=%H)" \
			-e COMMIT_INFO_REMOTE="$(shell git config --get remote.origin.url)" \
			-v $(ROOT_DIR)/test-e2e:/usr/src/test-e2e \
			$(DOCKER_HUB_REGISTRY)/suitools/e2e-test \
			--baseUrl=http://localhost:3000 \
			--scope $(SCOPE) \
			--ci \
			--noWebSecurity \
			--defaultCommandTimeout 8000 \
			--screenshotsOnError \
			--record \
			--key 7b66ca93-0e46-4591-9e00-52e96b66cded; \
	else \
		echo "Branch $${TRAVIS_PULL_REQUEST_BRANCH} does not contain substring $${CYPRESS_DASHBOARD_PR_SLUG_SUB_STRING}"; \
		echo "or random number $${RANDOM_NUMBER} more than $${CYPRESS_DASHBOARD_METRICS_PERCENTAGE}"; \
		echo "Not sending metrics to Cypress Dashboard"; \
		docker run --network host --shm-size 1g \
			-v $(ROOT_DIR)/test-e2e:/usr/src/test-e2e \
			$(DOCKER_HUB_REGISTRY)/suitools/e2e-test \
			--baseUrl=http://localhost:3000 \
			--scope=$(SCOPE) \
			--ci \
			--noWebSecurity \
			--defaultCommandTimeout 8000; \
	fi

install_test_e2e_deps:
	npm install --prefix test-e2e --production=false
	unlink test-e2e/node_modules/@adv-ui/ma-web-app-mocks
	npx ncp mocks test-e2e/node_modules/@adv-ui/ma-web-app-mocks

.PHONY: e2e_dev
e2e_dev: ## Develop local e2e tests
	npx @s-ui/test-e2e --baseUrl=http://localhost:3000 --scope=./integration --gui --noWebSecurity

.PHONY: e2e_local
e2e_local: spa ssr start_msw ## Run locally the e2e tests
	npx concurrently --kill-others --success=first \
		"node ./server/index.js" \
		"npx @s-ui/test-e2e --baseUrl=http://localhost:3000 --scope=./integration"

.PHONY: run_e2e_ci_pr
run_e2e_ci_pr: kill_all ## Debug E2E tests over any PR dockerized app
	make start_image
	make e2e_dev

.PHONY: kill_all
kill_all: ## Kill all running Docker containers
	[ -z "$(shell docker ps -q)" ] || docker kill $(shell docker ps -q)

.PHONY: d_remove_containers
d_remove_containers: ## Remove all Docker containers
	docker rm -f $(shell docker ps -a -q)

.PHONY: d_remove_images
d_remove_images: ## Remove all Docker images
	docker rmi $(shell docker images -a -q)

.PHONY: lint
lint: ## Lint SPA code
	npx sui-lint js $(FLAGS)
	npx sui-lint sass

publish_contract: ## Publish contract to broker
	npx @s-ui/test-contract publish --broker-url $(if $(TRAVIS_BUILD_NUMBER), 'http://platform-common--pactbroker.es-global-pro.schip.io', 'http://pact-broker.schip-proxy.spain.mpi-internal.com')

start_image: ## Run docker image with docker compose
	TEST_E2E=$(TEST_E2E) NODE_ENV=$(NODE_ENV) STAGE=$(STAGE) HOST=$(HOST) PORT=$(PORT) DOCKER_IMAGE=${DOCKER_IMAGE_PR_E2E} docker-compose -f docker-compose-image.yml up -d

start_msw: ## start msw
	npm run start:msw

.PHONY: start_ssr
start_ssr: spa ssr start_msw ## Run a production ready SSR in local
	VERBOSE=$(VERBOSE) node --inspect server/index.js

.PHONY: start_dev
start_dev: start_msw ## Run a development SPA in local
	npx sui-bundler dev --link-package=./domain --link-package=./literals $(FLAGS)

.PHONY: start_spa
start_spa: spa start_msw ## Run a production ready SPA in local
	cp -R statics/ public/
	npx serve -s public -p 3000

.PHONY: comment
comment: ## Make a comment in PR
	curl -H "Authorization: token ${GH_TOKEN}" -X POST -d "{\"body\": \"PR URL: https://frontend-ma--web-app-pr-$(TRAVIS_PULL_REQUEST).es-microma-pre.schip.io/\"}" "https://github.mpi-internal.com/api/v3/repos/${TRAVIS_REPO_SLUG}/issues/${TRAVIS_PULL_REQUEST}/comments"

.PHONY: help
help: ## show help
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'


echo: ## Just print important env var after execute other task
	@echo "ENV Vars:"
	@echo "STAGE => ${STAGE}"
	@echo "NODE_ENV => ${NODE_ENV}"
	@echo "MOCK_API_REQUESTS => ${MOCK_API_REQUESTS}"

build: echo ## Build public and server folder to be deployed
	@NODE_ENV=$(NODE_ENV) STAGE=$(STAGE) npx sui-bundler build -C
	@NODE_ENV=$(NODE_ENV) STAGE=$(STAGE) npx sui-ssr build -C

dev: ## Start a SPA dev server to develop the webapp
	npx msw init ./public --save
	STAGE=development \
				NODE_ENV=development \
				MOCK_API_REQUESTS=true \
				MOCKS_API_PATH=$(MOCKS_API_PATH) \
				npx sui-bundler dev

preview_ssr: clean build ## Generate and Start a local preview of the App using a SSR server (Not for development)
	CONSOLE=true \
		NODE_ENV=$(NODE_ENV) \
		STAGE=$(STAGE) \
		node server/index.js

preview_ssr_dev: ## Generate and Start a local preview of the app using a SSR server but using "development" as NODE_ENV and STAGE
	NODE_ENV=development STAGE=development make preview_ssr

clean: ## Revome SPA and Server dist folder
	rm -Rf public server

help: ## show help
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

