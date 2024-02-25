# SPDX-License-Identifier: MIT-0

TEST_FILES:=test/test_*.sh
SHELL_SCRIPTS:=src/main.sh $(TEST_FILES)

GITHUB_OUTPUT:=github_output

CONTAINER_ENGINE?=docker
DEV_ENV_NAME:=git-tag-annotation-action-dev
DEV_IMG_NAME:=$(DEV_ENV_NAME)-img

.PHONY: default
default: help

.PHONY: clean
clean: ## Clean the repository
	@git clean -fx $(GITHUB_OUTPUT)

.PHONY: dev-env dev-img
dev-env: dev-img ## Run an ephemeral development environment container
	@$(CONTAINER_ENGINE) run \
		-it \
		--rm \
		--workdir "/git-tag-annotation-action" \
		--mount "type=bind,source=$(shell pwd),target=/git-tag-annotation-action" \
		--name "$(DEV_ENV_NAME)" \
		"$(DEV_IMG_NAME)"

dev-img: ## Build a development environment container image
	@$(CONTAINER_ENGINE) build \
		--file Containerfile \
		--tag "$(DEV_IMG_NAME)" \
		.

.PHONY: format format-check
format: ## Format the source code
	@shfmt --simplify --write $(SHELL_SCRIPTS)

format-check: ## Check the source code formatting
	@shfmt --diff $(SHELL_SCRIPTS)

.PHONY: help
help: ## Show this help message
	@printf "Usage: make <command>\n\n"
	@printf "Commands:\n"
	@awk -F ':(.*)## ' '/^[a-zA-Z0-9%\\\/_.-]+:(.*)##/ { \
		printf "  \033[36m%-30s\033[0m %s\n", $$1, $$NF \
	}' $(MAKEFILE_LIST)

.PHONY: lint lint-ci lint-container lint-sh lint-yaml
lint: lint-ci lint-container lint-sh lint-yaml ## Lint the project

lint-ci: ## Lint Continuous Integration configuration files
	@SHELLCHECK_OPTS='--enable=avoid-nullary-conditions --enable=deprecate-which --enable=quote-safe-variables --enable=require-variable-braces' \
		actionlint

lint-container: ## Lint the Containerfile
	@hadolint Containerfile

lint-sh: ## Lint shell scripts
	@shellcheck $(SHELL_SCRIPTS)

lint-yaml: ## Lint YAML files
	@yamllint --config-file .yamllint.yml .

.PHONY: test test-e2e test-run
test: ## Run the automated tests
	@./test/test_functional.sh
	@./test/test_security.sh

test-run: ## Run the action locally
	@rm -f ${GITHUB_OUTPUT}
	@touch ${GITHUB_OUTPUT}
	@( \
		GITHUB_REF="refs/tags/v1.0.0" \
		GITHUB_OUTPUT="${GITHUB_OUTPUT}" \
		PROVIDED_TAG="${tag}" \
		./src/main.sh \
	)

.PHONY: verify
verify: format-check lint test ## Verify project is in a good state
