GITHUB_OUTPUT:=github_output

.PHONY: default
default: help

.PHONY: clean
clean: ## Clean the repository
	@git clean -fx \
		$(GITHUB_OUTPUT)

.PHONY: format format-check
format: ## Format the source code
	@shfmt \
		--simplify --write \
		src/main.sh

format-check: ## Check the source code formatting
	@shfmt \
		--diff \
		src/main.sh

.PHONY: help
help: ## Show this help message
	@printf "Usage: make <command>\n\n"
	@printf "Commands:\n"
	@awk -F ':(.*)## ' '/^[a-zA-Z0-9%\\\/_.-]+:(.*)##/ { \
		printf "  \033[36m%-30s\033[0m %s\n", $$1, $$NF \
	}' $(MAKEFILE_LIST)

.PHONY: lint lint-ci lint-sh lint-yaml
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

.PHONY: test test-e2e test-run
test: ## Run the automated tests
	@./test/bats/bin/bats \
		test/test.bats

test-e2e: ## Run the end-to-end tests
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

.PHONY: verify
verify: format-check lint test-run ## Verify project is in a good state
