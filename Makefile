ROOT_DIR:=$(dir $(realpath $(lastword $(MAKEFILE_LIST))))

GITHUB_OUTPUT:=github_output

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

init: node_modules/ ## Initialize the project

lint-ci: ## Lint Continuous Integration configuration files
	@actionlint

lint-docker: ## Lint Dockerfiles
	@docker run -i \
		--rm \
		--mount "type=bind,source=$(ROOT_DIR)/.hadolint.yml,target=/.config/hadolint.yaml" \
		hadolint/hadolint:v2.12.0 \
		< ./.devcontainer/Dockerfile

lint-md: ## Lint MarkDown files
	@npm run markdownlint -- \
		--dot \
		--ignore-path .gitignore \
		.

lint-sh: ## Lint shell scripts
	@shellcheck \
		src/*.sh

test: ## Run the tests
	@act \
		--job test-e2e

test-run: ## Run the action locally
	@rm -f ${GITHUB_OUTPUT}
	@touch ${GITHUB_OUTPUT}
	@( \
		GITHUB_REF="refs/tags/v1.0.0" \
		GITHUB_OUTPUT="${GITHUB_OUTPUT}" \
		PROVIDED_TAG="${tag}" \
		./src/main.sh \
	)

.PHONY: clean help lint-ci lint-docker lint-md lint-sh test test-run

node_modules/: .npmrc .nvmrc package*.json
	@npm clean-install
