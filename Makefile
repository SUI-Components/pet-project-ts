.PHONY: lib
OWNER=Web Platform <enablers-frontend@adevinta.com>

SHELL := /bin/bash
.DEFAULT_GOAL := help

co: ## Commit a new change using our wizard
	npx sui-mono commit

lint: 
	npx sui-lint js
	npx sui-lint sass

test: ## Tests all aour packages and apps in browser and server
	npx -y ultra-runner --raw --recursive test

precommit: lint

postinstall: ## Execute any prepublishOnly taks in all packages
	npx -y ultra-runner --raw --recursive prepublishOnly

prepush: test

phoenix: ## Remove and reinstall all dependencies from internet w/out local cache
	rm -Rf node_modules package-lock.json
	npm install --cache=/tmp/$(shell date +%s) --no-fund --no-audit --ignore-scripts

ci: ## Install dependecies using package-log
	npm ci --include=dev --no-found --no-audit --ignore-scripts

help: ## show help
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'



