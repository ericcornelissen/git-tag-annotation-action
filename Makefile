GITHUB_OUTPUT:=github_output
ROOT_DIR:=$(dir $(realpath $(lastword $(MAKEFILE_LIST))))

default: help

clean: ## Clean the repository
	@git clean -fx \
		$(GITHUB_OUTPUT)

help: ## Show this help message
	@printf "Usage: make <command>\n\n"
	@printf "Commands:\n"
	@awk -F ':(.*)## ' '/^[a-zA-Z0-9%\\\/_.-]+:(.*)##/ { \
		printf "  \033[36m%-30s\033[0m %s\n", $$1, $$NF \
	}' $(MAKEFILE_LIST)

lint: lint-ci lint-sh lint-yaml ## Lint the project

lint-ci: ## Lint Continuous Integration configuration files
	@actionlint

lint-sh: ## Lint shell scripts
	@shellcheck \
		src/main.sh

lint-yaml: ## Lint YAML files
	@yamllint \
		-c .yamllint.yml \
		.

test: ## Run the tests
	@act --job test-e2e

test-run: ## Run the action locally
	@rm -f ${GITHUB_OUTPUT}
	@touch ${GITHUB_OUTPUT}
	@( \
		GITHUB_REF="refs/tags/v1.0.0" \
		GITHUB_OUTPUT="${GITHUB_OUTPUT}" \
		PROVIDED_TAG="${tag}" \
		./src/main.sh \
	)

verify: lint test-run ## Verify project is in a good state

.PHONY: clean default help lint lint-ci lint-sh lint-yaml test test-run verify
