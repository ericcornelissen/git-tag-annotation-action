# shellcheck shell=sh

V1_0_0_ANNOTATION="annotation<<EOF
- Run the Action to get the git tag annotation of the current tag.
- Run the Action to get the git tag annotation of a specified tag.

EOF"

NO_ANNOTATION="annotation<<EOF
EOF"

BeforeEach 'clear_github_output'

Describe 'the tag from the GitHub context'
  BeforeAll 'reset_env'

  Describe 'is valid'
    set_context_tag 'v1.0.0'

    It 'should write the context tag annotation'
      When run script ./src/main.sh
      The status should be success
      The output should be blank
      The error should be blank
      The file "${GITHUB_OUTPUT}" should satisfy contents "${V1_0_0_ANNOTATION}"
    End
  End

  Describe 'is an attempt at argument splitting'
    set_context_tag 'v1.0.0 --format'

    It 'should not split arguments'
      When run script ./src/main.sh
      The status should be success
      The output should be blank
      The error should be blank
      The file "${GITHUB_OUTPUT}" should satisfy contents "${NO_ANNOTATION}"
    End
  End

  Describe 'is an attempt at shell injection'
    set_context_tag '" && echo h4xz0r ;'

    It 'should not execute the injected command'
      When run script ./src/main.sh
      The status should be success
      The output should be blank
      The error should be blank
      The file "${GITHUB_OUTPUT}" should satisfy contents "${NO_ANNOTATION}"
    End
  End
End

Describe 'the tag provided by the user'
  BeforeAll 'reset_env'

  Describe 'is valid'
    set_provided_tag 'v1.0.0'

    It 'should write the context tag annotation'
      When run script ./src/main.sh
      The status should be success
      The output should be blank
      The error should be blank
      The file "${GITHUB_OUTPUT}" should satisfy contents "${V1_0_0_ANNOTATION}"
    End
  End

  Describe 'is an attempt at argument splitting'
    set_provided_tag 'v1.0.0 --format'

    It 'should not split arguments'
      When run script ./src/main.sh
      The status should be success
      The output should be blank
      The error should be blank
      The file "${GITHUB_OUTPUT}" should satisfy contents "${NO_ANNOTATION}"
    End
  End

  Describe 'is an attempt at shell injection'
    set_provided_tag '" && echo h4xz0r ;'

    It 'should not execute the injected command'
      When run script ./src/main.sh
      The status should be success
      The output should be blank
      The error should be blank
      The file "${GITHUB_OUTPUT}" should satisfy contents "${NO_ANNOTATION}"
    End
  End
End

Describe 'both the context tag and the tag provided by the user'
  BeforeAll 'reset_env'

  Describe 'are valid'
    set_context_tag 'v1.0.1'
    set_provided_tag 'v1.0.0'

    It 'should write the context tag annotation'
      When run script ./src/main.sh
      The status should be success
      The output should be blank
      The error should be blank
      The file "${GITHUB_OUTPUT}" should satisfy contents "${V1_0_0_ANNOTATION}"
    End
  End
End
