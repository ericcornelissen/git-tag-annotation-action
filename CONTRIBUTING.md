# Contributing to Git Tag Annotation Action

The maintainers of the Git Tag Annotation Action welcome contributions and
corrections to both the source code and documentation. Before contributing,
please make sure you read the relevant section in this document. If you decide
to contribute anything, please use the following this workflow

- Fork this repository
- Create a new branch from the latest `main`
- Make your changes on the new branch
- Commit to the new branch and push the commits
- Make a Pull Request

## New Features

The simplicity of this Action is by design. It is unlikely new features will be
added to the Action, but you are free to [open an issue with a feature request].
Please avoid implementing a new feature before submitting an issue or it first!

## Bugs

We take bugs seriously. Please report a bug as soon as you discover one. To do
this [open an issue with a bug report]. You are also free to contribute by
fixing one of the [open bug reports] and opening a Pull Request for it.

## Development details

This project uses [rollup.js] to compile the source code into a standalone
JavaScript file. You can use the `npm run build` command to update this file.

You DO NOT have to include the update to this file when submitting a Pull
Request. The file will be automatically updated on the `main` branch if that is
required.

[open bug reports]: https://github.com/ericcornelissen/git-tag-annotation-action/labels/bug
[open an issue with a bug report]: https://github.com/ericcornelissen/git-tag-annotation-action/issues/new?labels=bug
[open an issue with a feature request]: https://github.com/ericcornelissen/git-tag-annotation-action/issues/new?labels=enhancement
[rollup.js]: https://rollupjs.org/guide/en/
