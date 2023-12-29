# SPDX-License-Identifier: MIT-0

# Check out Docker at: https://www.docker.com/
# Check out Podman at: https://podman.io/

FROM alpine:3.18.4

RUN apk add --no-cache \
	bash \
	# asdf prerequisites
	bash curl git \
	# (asdf-)yamllint prerequisites
	jq make python3 py3-pip \
	# bash_test_tools prerequisites
	ncurses strace

ENV ASDF_DIR="/.asdf"

WORKDIR /setup
COPY .tool-versions .

RUN git clone https://github.com/asdf-vm/asdf.git /.asdf --branch v0.13.1 \
	&& echo '. "/.asdf/asdf.sh"' > ~/.bashrc \
	&& . "/.asdf/asdf.sh" \
	&& asdf plugin add actionlint \
	&& asdf plugin add hadolint \
	&& asdf plugin add cosign \
	&& asdf plugin add shellcheck \
	&& asdf plugin add shfmt \
	&& asdf plugin add yamllint \
	&& asdf install

ENTRYPOINT ["/bin/bash"]
