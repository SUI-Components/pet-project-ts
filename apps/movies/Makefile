.PHONY: lib
OWNER=Web Platform <enablers-frontend@adevinta.com>

SHELL := /bin/bash
.DEFAULT_GOAL := help

dev: ## Start a SPA dev server to develop the webapp
	npx sui-bundler dev

preview_ssr: clean ## Generate and Start a local preview of the App using a SSR server (Not for development)
	npx sui-bundler build -C
	npx sui-ssr build -C
	CONSOLE=true node server/index.js

clean: ## Revome SPA and Server dist folder
	rm -Rf public server



help: ## show help
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

