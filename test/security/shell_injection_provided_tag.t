#!/bin/bash
source ./test/osht.sh

PLAN 4

# --- SETUP ------------------------------------------------------------------ #
export GITHUB_OUTPUT='github_output'
export PROVIDED_TAG='" && ls . ;'

rm -f "${GITHUB_OUTPUT}"

# --- RUN -------------------------------------------------------------------- #
RUNS ./src/main.sh
NOGREP .
NEGREP .
IS "$(cat "${GITHUB_OUTPUT}")" == "annotation<<EOF
EOF"
