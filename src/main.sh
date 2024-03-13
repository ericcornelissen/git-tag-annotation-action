#!/bin/bash
# SPDX-License-Identifier: MIT

echo "::warn::This action is deprecated and support ends 2024-06-12. Refer to the README.md of the Action for a migration guide."

{
  echo 'annotation<<EOF'
  if [ -z "${PROVIDED_TAG}" ]; then
    git for-each-ref "${GITHUB_REF}" --format '%(contents)'
  else
    git for-each-ref "refs/tags/${PROVIDED_TAG}" --format '%(contents)'
  fi
  echo 'EOF'
} >>"${GITHUB_OUTPUT}"
