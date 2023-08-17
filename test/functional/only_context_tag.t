#!/bin/bash
source ./test/osht.sh

PLAN 2

# --- SETUP ------------------------------------------------------------------ #
CONTEXT_TAG='v1.0.0'

export GITHUB_OUTPUT='github_output'
export GITHUB_REF="refs/tags/${CONTEXT_TAG}"

rm -f "${GITHUB_OUTPUT}"

# --- RUN -------------------------------------------------------------------- #
RUNS ./src/main.sh
IS "$(cat "${GITHUB_OUTPUT}")" == "annotation<<EOF
- Run the Action to get the git tag annotation of the current tag.
- Run the Action to get the git tag annotation of a specified tag.

EOF"
