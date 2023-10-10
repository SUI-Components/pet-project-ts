.PHONY: lib
OWNER=Web Platform <enablers-frontend@adevinta.com>

SHELL := /bin/bash
.DEFAULT_GOAL := help

co:
	npx sui-mono commit

lint: 
	npx sui-lint js --staged
	npx sui-lint sass --staged

test:
	@echo \"Skipping tests as they are not present\"

precommit: lint

prepush: test

help: ## show help
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'



