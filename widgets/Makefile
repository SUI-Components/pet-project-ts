.PHONY: lib
OWNER=Web Platform <enablers-frontend@adevinta.com>

SHELL := /bin/bash
.DEFAULT_GOAL := help

WIDGETS_DEV_PORT ?= 8081
WIDGETS_CDN ?= http://locahost:$(WIDGETS_DEV_PORT)

echo:
	$(info WIDGETS_DEV_PORT is $(WIDGETS_DEV_PORT))

build: ## Build the downloader and the widgets bundle
	trimmed := $(patsubst %/,%,$(WIDGETS_CDN))
	npx sui-widget-embedder build -R $(trimmed) -C

generate: ## Generate a new widget
	@: $(if $(PAGE),, \
		$(error "Missing one required parameter: PAGE"))
	npx sui-widget-embedder generate $(PAGE)

prepublishOnly: build ## Build the Library before publish the package

start: echo ## Start a server with the downloader (make start PAGE=[page_to_serve])
	@: $(if $(PAGE),, \
		$(error "Missing one required parameter: PAGE"))
	PORT=$(WIDGETS_DEV_PORT) npx sui-widget-embedder dev -p $(PAGE)

start_home:
	PAGE=home make start

help: ## show help
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'



