#!/bin/bash
# SPDX-License-Identifier: MIT-0

# --- Setup ------------------------------------------------------------------ #

set -eo pipefail

changelog="$(cat CHANGELOG.md)"
date=$(date '+%Y-%m-%d')
version=$(cat .version)

anchor='## [Unreleased]'

# --- Script ----------------------------------------------------------------- #

new_content="${anchor}

- _No changes yet._

## [${version}] - ${date}"

changelog=${changelog//"${anchor}"/"${new_content}"}

echo "${changelog}" >CHANGELOG.md
