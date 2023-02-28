#!/bin/bash

{
  echo 'annotation<<EOF'
  if [ -z "${PROVIDED_TAG}" ]; then
    git for-each-ref "${GITHUB_REF}" --format '%(contents)'
  else
    git for-each-ref "refs/tags/${PROVIDED_TAG}" --format '%(contents)'
  fi
  echo 'EOF'
} >>"${GITHUB_OUTPUT}"
