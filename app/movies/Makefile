.PHONY: lib
OWNER=Web Platform <enablers-frontend@adevinta.com>

SHELL := /bin/bash
.DEFAULT_GOAL := help

# ifeq (, $(shell which jq))
# $(error "No jq in PATH, consider doing brew install jq")
# endif

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
	time aws s3 sync public/. $(S3_BUCKET_PET) --region eu-west-3 --include '*' --exclude $(MANIFEST) --exclude $(ASSET_MANIFEST) --exclude $(SERVICE_WORKER) --exclude $(INDEX_HTML) --exclude $(500_HTML) --exclude $(404_HTML) --cache-control max-age=$(ONE_YEAR_CACHE)
	time aws s3 cp public/$(ASSET_MANIFEST) $(S3_BUCKET_PET)$(ASSET_MANIFEST)
	time aws s3 cp public/$(INDEX_HTML) $(S3_BUCKET_PET)$(INDEX_HTML)
	time aws s3 cp public/$(404_HTML) $(S3_BUCKET_PET)$(404_HTML)
	time aws s3 cp public/$(500_HTML) $(S3_BUCKET_PET)$(500_HTML)
	time aws s3 cp public/$(MANIFEST) $(S3_BUCKET)$(MANIFEST) --content-type='application/json' --cache-control max-age=$(FIVE_MINUTES_CACHE) --metadata-directive REPLACE

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

