.PHONY: lib
OWNER=Web Platform <enablers-frontend@adevinta.com>

SHELL := /bin/bash
.DEFAULT_GOAL := help

lib: ## Build the library
	@rm -Rf ./lib
	@npx sui-js-compiler
	@cp -r src/dictionaries lib/dictionaries

prepublishOnly: lib ## Build the Library before publish the package

help: ## show help
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'


