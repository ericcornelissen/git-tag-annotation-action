#!/bin/bash
source ./test/assert.sh

export GITHUB_OUTPUT='github_output'

setup() {
  unset GITHUB_REF
  unset PROVIDED_TAG

  rm -f "${GITHUB_OUTPUT}"
}

{
  setup
  export GITHUB_REF='refs/tags/v1.0.0'

  assert "./src/main.sh" ""
  assert "cat ${GITHUB_OUTPUT}" 'annotation<<EOF
- Run the Action to get the git tag annotation of the current tag.
- Run the Action to get the git tag annotation of a specified tag.

EOF'

  assert_end only_context_tag
}

{
  setup
  export PROVIDED_TAG='v1.0.0'

  assert "./src/main.sh" ""
  assert "cat ${GITHUB_OUTPUT}" 'annotation<<EOF
- Run the Action to get the git tag annotation of the current tag.
- Run the Action to get the git tag annotation of a specified tag.

EOF'

  assert_end only_provided_tag
}

{
  setup
  export PROVIDED_TAG='v1.0.0'
  export GITHUB_REF='refs/tags/v1.0.1'

  assert "./src/main.sh" ""
  assert "cat ${GITHUB_OUTPUT}" 'annotation<<EOF
- Run the Action to get the git tag annotation of the current tag.
- Run the Action to get the git tag annotation of a specified tag.

EOF'

  assert_end both_context_and_provided_tag
}
