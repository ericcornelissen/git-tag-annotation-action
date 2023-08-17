#!/bin/bash
source ./test/osht.sh

PLAN 2

# --- SETUP ------------------------------------------------------------------ #
CONTEXT_TAG='" && ls . ;'

export GITHUB_OUTPUT='github_output'
export GITHUB_REF="refs/tags/${CONTEXT_TAG}"

rm -f "${GITHUB_OUTPUT}"

# --- RUN -------------------------------------------------------------------- #
RUNS ./src/main.sh
IS "$(cat "${GITHUB_OUTPUT}")" == "annotation<<EOF
EOF"
