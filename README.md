# Git Tag Annotation Action
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fericcornelissen%2Fgit-tag-annotation-action.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fericcornelissen%2Fgit-tag-annotation-action?ref=badge_shield)


A GitHub Action to get the annotation associated with the current git tag.

_Based on [kceb/git-message-action]._

## Example usage

Make sure to only use this Action in the context of a tag, this can be achieved
by configuring your workflow to only run on tag pushes.

```yaml
on:
  push:
    tags:
    - 'v*'
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
    tag: 'v1.2.3'
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
      - 'v*' # Push events of tags matching v*, i.e. v1.0, v20.15.10

jobs:
  example:
    name: Example job
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v1
      - name: Create Release
        id: tag_data
        uses: ericcornelissen/git-tag-annotation-action@v1
      - name: The output
        run: echo ${{ steps.tag_data.outputs.git-tag-annotation }}
```

## Known Issues

This Action is currently incompatible with [actions/checkout@v2] because it does
not preserve tag annotations correctly. We recommend using [actions/checkout@v1]
instead if possible. Otherwise, you can run `git fetch --tags --force` manually
after the [actions/checkout@v2] step.

For more information regarding this problem see [actions/checkout#290].

[actions/checkout@v1]: https://github.com/actions/checkout/tree/v1
[actions/checkout@v2]: https://github.com/actions/checkout/tree/v2
[actions/checkout#290]: https://github.com/actions/checkout/issues/290
[kceb/git-message-action]: https://github.com/kceb/git-message-action
[the GitHub Actions output docs]: https://help.github.com/en/actions/reference/contexts-and-expression-syntax-for-github-actions#steps-context


## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fericcornelissen%2Fgit-tag-annotation-action.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fericcornelissen%2Fgit-tag-annotation-action?ref=badge_large)