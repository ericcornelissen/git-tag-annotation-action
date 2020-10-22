# Git Tag Annotation Action

This action outputs the git annotation associated with the current tag.

_Based on [kceb/git-message-action]._

## Inputs

### `tag`

**Optional** The tag to get the message for (e.g. `v1.2.3`). Defaults to the
`GITHUB_REF` environment variable set by GitHub.

## Outputs

### `git-tag-annotation`

The git-tag-annotation

## Example usage
Without `tag`:
```
uses: ericcornelissen/git-tag-annotation-action@v1
```

With specified `tag`:
```
uses: ericcornelissen/git-tag-annotation-action@v1
with:
  tag: 'v1.2.3'
```

For more info on how to use outputs: https://help.github.com/en/actions/reference/contexts-and-expression-syntax-for-github-actions#steps-context

[kceb/git-message-action]: https://github.com/kceb/git-message-action