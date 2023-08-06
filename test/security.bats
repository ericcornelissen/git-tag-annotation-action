GITHUB_OUTPUT='github_output'

setup() {
  load 'test_helper/bats-support/load'
  load 'test_helper/bats-assert/load'

  rm --force github_output
}

@test "argument splitting, context tag" {
  CONTEXT_TAG='v1.0.0 --format'

  GITHUB_OUTPUT="${GITHUB_OUTPUT}" \
    GITHUB_REF="refs/tags/${CONTEXT_TAG}" \
    run ./src/main.sh

  actual="$(cat "${GITHUB_OUTPUT}")"
  expected="annotation<<EOF
EOF"

  assert_equal "${actual}" "${expected}"
}

@test "argument splitting, provided tag" {
  PROVIDED_TAG='v1.0.0 --format'

  GITHUB_OUTPUT="${GITHUB_OUTPUT}" \
    PROVIDED_TAG="${PROVIDED_TAG}" \
    run ./src/main.sh

  actual="$(cat "${GITHUB_OUTPUT}")"
  expected="annotation<<EOF
EOF"

  assert_equal "${actual}" "${expected}"
}

@test "shell injection" {
  PROVIDED_TAG='" && ls . ;'

  GITHUB_OUTPUT="${GITHUB_OUTPUT}" \
    PROVIDED_TAG="${PROVIDED_TAG}" \
    run ./src/main.sh
  assert_success
}
