GITHUB_OUTPUT='github_output'

setup() {
  load 'test_helper/bats-support/load'
  load 'test_helper/bats-assert/load'

  rm --force github_output
}

@test "shell injection" {
  PROVIDED_TAG='" && ls . ;'

  GITHUB_OUTPUT="${GITHUB_OUTPUT}" \
    PROVIDED_TAG="${PROVIDED_TAG}" \
    run ./src/main.sh
  assert_success
}
