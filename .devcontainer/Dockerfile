ARG VARIANT=16-bullseye
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-${VARIANT}

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
    shellcheck \
    && curl https://raw.githubusercontent.com/nektos/act/master/install.sh | sh \
    && curl https://raw.githubusercontent.com/fossas/fossa-cli/master/install-latest.sh | sh
