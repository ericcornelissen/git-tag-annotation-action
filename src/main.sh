#!/bin/bash
# SPDX-License-Identifier: MIT

echo "::error::This action is deprecated since 2024-06-12. Refer to the README.md of the Action for a migration guide."

{
  echo 'annotation<<EOF'
  if [ -z "${PROVIDED_TAG}" ]; then
    git for-each-ref "${GITHUB_REF}" --format '%(contents)'
  else
    git for-each-ref "refs/tags/${PROVIDED_TAG}" --format '%(contents)'
  fi
  echo 'EOF'
} >>"${GITHUB_OUTPUT}"
