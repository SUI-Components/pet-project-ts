.PHONY: lib
OWNER=Web Platform <enablers-frontend@adevinta.com>

SHELL := /bin/bash
.DEFAULT_GOAL := help

ifeq (, $(shell which jq))
$(error "No jq in PATH, consider doing brew install jq")
endif

ROOT=$(PWD)/../..
MOCK_NAME=$(shell cat "$(ROOT)/qa/mocks/package.json" | jq -r .name)
MOCKS_API_PATH=$(ROOT)/node_modules/$(MOCK_NAME)/routes

dev: ## Start a SPA dev server to develop the webapp
	STAGE=development \
				NODE_ENV=development \
				MOCK_API_REQUESTS=true \
				MOCKS_API_PATH=$(MOCKS_API_PATH) \
				npx sui-bundler dev

preview_ssr: clean ## Generate and Start a local preview of the App using a SSR server (Not for development)
	npx sui-bundler build -C
	npx sui-ssr build -C
	CONSOLE=true node server/index.js

clean: ## Revome SPA and Server dist folder
	rm -Rf public server



help: ## show help
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

