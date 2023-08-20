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
  export GITHUB_REF='refs/tags/v1.0.0 --format'

  assert "./src/main.sh" ""
  assert "cat ${GITHUB_OUTPUT}" 'annotation<<EOF
EOF'

  assert_end argument_splitting_context_tag
}

{
  setup
  export PROVIDED_TAG='v1.0.0 --format'

  assert "./src/main.sh" ""
  assert "cat ${GITHUB_OUTPUT}" 'annotation<<EOF
EOF'

  assert_end argument_splitting_provided_tag
}

{
  setup
  export GITHUB_REF='refs/tags/" && ls . ;'

  assert "./src/main.sh" ""
  assert "cat ${GITHUB_OUTPUT}" 'annotation<<EOF
EOF'

  assert_end shell_injection_context_tag
}

{
  setup
  export PROVIDED_TAG='" && ls . ;'

  assert "./src/main.sh" ""
  assert "cat ${GITHUB_OUTPUT}" 'annotation<<EOF
EOF'

  assert_end shell_injection_provided_tag
}
