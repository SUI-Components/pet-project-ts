.PHONY: lib
OWNER=Web Platform <enablers-frontend@adevinta.com>

SHELL := /bin/bash
.DEFAULT_GOAL := help

co: ## Commit a new change using our wizard
	npx sui-mono commit

lint: bundle_reporter ## Lint JS, Repository and Sass
	npx sui-lint repository $(LINT_REPOSITORY_FLAGS)
	npx sui-lint js $(LINT_JS_FLAGS)
	npx sui-lint sass

test:
	npx -y ultra-runner --raw --recursive test

dev:
	npx -y ultra-runner --raw --filter app --recursive dev

precommit: lint

postinstall: ## Execute any prepublishOnly taks in all packages
	npx -y ultra-runner --raw --recursive prepublishOnly

prepush: test

bundle_reporter: ## Bundle the reporter scripts to send sui-lint metrics to DD
	rm -f .scripts/sui-lint-repository-reporter.bundle.js .scripts/sui-lint-repository-js.bundle.js
	npx esbuild $(PWD)/.scripts/sui-lint-js-reporter.js --bundle --platform=node --target=node10.4 > .scripts/sui-lint-js-reporter.bundle.js
	npx esbuild $(PWD)/.scripts/sui-lint-repository-reporter.js --bundle --platform=node --target=node10.4 > .scripts/sui-lint-repository-reporter.bundle.js


phoenix: ## Remove and reinstall all dependencies from internet w/out local cache
	rm -Rf node_modules package-lock.json
	npm install --cache=/tmp/$(shell date +%s) --no-fund --no-audit --ignore-scripts

ci: ## Install dependecies using package-log
	npm ci --include=dev --no-found --no-audit --ignore-scripts

help: ## show help
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'



