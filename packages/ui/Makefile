.PHONY: lib
OWNER=Web Platform <enablers-frontend@adevinta.com>

SHELL := /bin/bash
.DEFAULT_GOAL := help

TEST_FLAG ?=

dev: ## Start a studio development mode
	NODE_ENV=development npx sui-studio dev

generate: ## Generate a new component
	@: $(if $(and $(PREFIX),$(CATEGORY),$(COMPONENT)),, \
		$(error "Missing one or more required parameters: PREFIX, CATEGORY, COMPONENT"))
	npx sui-studio generate -P $(PREFIX) -S adv-ui --swc $(CATEGORY) $(COMPONENT)

start: ## Start a studio in Demo mode
	NODE_ENV=development npx sui-studio start

test: ## Execute studio test
	npx sui-studio test $(TEST_FLAG)

help: ## show help
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'


