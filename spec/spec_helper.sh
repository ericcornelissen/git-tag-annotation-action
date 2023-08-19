# shellcheck shell=sh

export GITHUB_OUTPUT='github_output'

# --- HELPERS ------------------------------------------------------------------

set_context_tag() {
  export GITHUB_REF="refs/tags/$1"
}

set_provided_tag() {
  export PROVIDED_TAG="$1"
}

# --- HOOKS --------------------------------------------------------------------

clear_github_output() {
  rm -rf "${GITHUB_OUTPUT}"
}

reset_env() {
  unset GITHUB_REF
  unset PROVIDED_TAG
}

# --- MATCHERS -----------------------------------------------------------------

contents() {
  file=${contents:?}
  test "$(cat "${file}")" "=" "$1"
}
