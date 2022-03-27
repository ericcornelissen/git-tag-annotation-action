# Git Tag Annotation Action

[![Continuous Integration][ci-image]][ci-url]
[![Coverage Report][coverage-image]][coverage-url]
[![Mutation Report][mutation-image]][mutation-url]
[![Quality Report][quality-image]][quality-url]

A GitHub Action to get the annotation associated with the current git tag.

_Based on [kceb/git-message-action]._

## Example usage

Make sure to only use this Action in the context of a tag, this can be achieved
by configuring your workflow to only run on tag pushes.

```yaml
on:
  push:
    tags:
      - "v*"
```

Then, you can obtain the annotation for the current tag using:

```yaml
- uses: ericcornelissen/git-tag-annotation-action@v1
  id: tag_data
```

Or you can get the annotation of a specific tag by specifying it using the `tag`
input:

```yaml
- uses: ericcornelissen/git-tag-annotation-action@v1
  id: tag_data
  with:
    tag: "v1.2.3"
```

## Outputs

The Action will output the git tag annotation to `git-tag-annotation` which you
can use in subsequent steps by writing something like (note that "tag_data" here
refers to the `id` of this Action's step):

```yaml
annotation: ${{ steps.tag_data.outputs.git-tag-annotation }}
```

For more info on how to use outputs see [the GitHub Actions output docs].

## Full Example

The Workflow file below shows how you can use this Action. If you use this file
as is the git tag annotation will be outputted to the Workflow logs.

```yaml
name: My workflow
on:
  push:
    tags:
      - "v*" # Push events of tags matching v*, i.e. v1.0, v20.15.10

jobs:
  example:
    name: Example job
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2
        with:
          fetch-depth: 0
      - name: Get tag annotation
        id: tag_data
        uses: ericcornelissen/git-tag-annotation-action@v1
      - name: The output
        run: echo ${{ steps.tag_data.outputs.git-tag-annotation }}
```

## Known Issues

There have been issues when using this Action with [actions/checkout@v2]. If
you're experiencing issues, run `git fetch --tags --force` manually after the
[actions/checkout@v2] step. If that doesn't work or isn't desired, you can (**at
your own risk**) use [actions/checkout@v1] instead. It is recommended to check
that [actions/checkout@v1] is still supported when writing your workflow.

For more information regarding this problem see [actions/checkout#290].

[actions/checkout@v1]: https://github.com/actions/checkout/tree/v1
[actions/checkout@v2]: https://github.com/actions/checkout/tree/v2
[actions/checkout#290]: https://github.com/actions/checkout/issues/290
[kceb/git-message-action]: https://github.com/kceb/git-message-action
[the github actions output docs]: https://help.github.com/en/actions/reference/contexts-and-expression-syntax-for-github-actions#steps-context
[ci-url]: https://github.com/ericcornelissen/git-tag-annotation-action/actions/workflows/verify.yml
[ci-image]: https://github.com/ericcornelissen/git-tag-annotation-action/actions/workflows/verify.yml/badge.svg
[coverage-url]: https://codecov.io/gh/ericcornelissen/git-tag-annotation-action
[coverage-image]: https://codecov.io/gh/ericcornelissen/git-tag-annotation-action/branch/main-v1/graph/badge.svg
[mutation-url]: https://dashboard.stryker-mutator.io/reports/github.com/ericcornelissen/git-tag-annotation-action/main-v1
[mutation-image]: https://img.shields.io/endpoint?style=flat&url=https%3A%2F%2Fbadge-api.stryker-mutator.io%2Fgithub.com%2Fericcornelissen%2Fgit-tag-annotation-action%2Fmain-v1
[quality-url]: https://codeclimate.com/github/ericcornelissen/git-tag-annotation-action/maintainability
[quality-image]: https://api.codeclimate.com/v1/badges/53d2c44543bf636105f3/maintainability
