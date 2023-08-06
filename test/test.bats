setup() {
  rm --force github_output
}

@test "can run our script" {
  GITHUB_OUTPUT='github_output' ./src/main.sh
}
