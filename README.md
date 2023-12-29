<!-- SPDX-License-Identifier: CC-BY-SA-4.0 -->

# Git Tag Annotation Action

[![Continuous Integration][ci-image]][ci-url]

A GitHub Action to get the annotation associated with the current git tag.

## Usage

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
- uses: ericcornelissen/git-tag-annotation-action@v2
  id: tag-data
```

Or you can get the annotation of a specific tag by specifying it using the `tag`
input:

```yaml
- uses: ericcornelissen/git-tag-annotation-action@v2
  id: tag-data
  with:
    tag: "v1.2.3"
```

## Outputs

The Action will output the git tag annotation to `git-tag-annotation` which you
can use in subsequent steps by writing something like (note that "tag-data" here
refers to the `id` of this Action's step):

```yaml
annotation: ${{ steps.tag-data.outputs.git-tag-annotation }}
```

For more info on how to use outputs see the [GitHub Actions output docs].

## Full Example

The Workflow file below shows how you can use this Action. If you use this file
as is, the git tag annotation will be outputted to the Workflow logs.

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
      - name: Checkout repository
        uses: actions/checkout@v4
      - name: Fetch tags
        run: git fetch --tags --force
      - name: Get current tag annotation
        id: tag-data
        uses: ericcornelissen/git-tag-annotation-action@v2
      - name: The output
        env:
          ANNOTATION: ${{ steps.tag-data.outputs.git-tag-annotation }}
        run: echo "$ANNOTATION"
```

## Runners

This Action is tested on the official [ubuntu-20.04], [ubuntu-22.04],
[macos-11], [macos-12], [windows-2019], [windows-2022] runner images. It is
recommended to use one of these images when using this Action.

[macos-11]: https://github.com/actions/runner-images/blob/main/images/macos/macos-11-Readme.md
[macos-12]: https://github.com/actions/runner-images/blob/main/images/macos/macos-12-Readme.md
[ubuntu-20.04]: https://github.com/actions/runner-images/blob/main/images/ubuntu/Ubuntu2004-Readme.md
[ubuntu-22.04]: https://github.com/actions/runner-images/blob/main/images/ubuntu/Ubuntu2204-Readme.md
[windows-2019]: https://github.com/actions/runner-images/blob/main/images/windows/Windows2019-Readme.md
[windows-2022]: https://github.com/actions/runner-images/blob/main/images/windows/Windows2022-Readme.md

## Security

### Permissions

This Action requires no [permissions].

### Network

This Action requires no network access.

## Known Issues

The [Checkout Action] is known to not always fetch tags as expected. For
workflows triggered by a tag push we recommend manually fetching all tags after
the repository has been checked out like:

```yaml
steps:
  - name: Checkout repository
    uses: actions/checkout@v4
  - name: Fetch tags
    run: git fetch --tags --force
```

> [!NOTE]
> For more info regarding this problem see [actions/checkout#290].

For other workflows, using the `fetch-depth` option should be sufficient:

```yaml
steps:
  - name: Checkout repository
    uses: actions/checkout@v4
    with:
      fetch-depth: 0
```

Since `actions/checkout@3.6.0` you can also force fetch tags if you don't want
to use fetch depth `0`:

```yaml
steps:
  - name: Checkout repository
    uses: actions/checkout@v4 # or a version >=3.6.0
    with:
      fetch-depth: 10 # or anything >0
      fetch-tags: true
```

## License

The project source code is licensed under the MIT license, see [LICENSE] for the
full license text. The documentation text is licensed under [CC BY-SA 4.0]; code
snippets under the MIT license.

---

Please [open an issue] if you found a mistake or if you have a suggestion for
how to improve the documentation.

[actions/checkout#290]: https://github.com/actions/checkout/issues/290
[cc by-sa 4.0]: https://creativecommons.org/licenses/by-sa/4.0/
[checkout action]: https://github.com/actions/checkout
[github actions output docs]: https://help.github.com/en/actions/reference/contexts-and-expression-syntax-for-github-actions#steps-context
[license]: ./LICENSE
[open an issue]: https://github.com/ericcornelissen/git-tag-annotation-action/issues/new
[permissions]: https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#permissions
[ci-url]: https://github.com/ericcornelissen/git-tag-annotation-action/actions/workflows/check.yml
[ci-image]: https://github.com/ericcornelissen/git-tag-annotation-action/actions/workflows/check.yml/badge.svg
