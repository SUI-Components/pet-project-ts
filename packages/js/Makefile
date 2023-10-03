.PHONY: lib
OWNER=Web Platform <enablers-frontend@adevinta.com>

SHELL := /bin/bash
.DEFAULT_GOAL := help

export TEST_FLAG=

lib: ## Build the library
	@rm -Rf ./lib
	@npx sui-js-compiler

prepublishOnly: lib ## Build the Library before publish the package

lint: ## Lint and fix JS/TS code
	npx sui-lint js --fix

test: test_client test_server ## Run client and server tests

test_client: ## run client tests
	npx sui-test browser $(TEST_FLAG)

test_server: ## run server tests
	npx sui-test server $(TEST_FLAG)

test_client_watch: ## run client test in watch mode
	TEST_FLAG=--watch $(MAKE) test_client

test_server_watch: ## run server test in watch mode
	TEST_FLAG=--watch $(MAKE) test_server

test_ci: ## Execute test using CI mode
	NODE_ENV=test npx karma start --single-run --browsers Chrome

help: ## show help
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'


