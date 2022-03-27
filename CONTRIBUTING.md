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

> :information_source: If you want to make a contribution to v1 of the Action,
> please refer to the [Contributing Guidelines for v1].

## New Features

The simplicity of this Action is by design. It is unlikely new features will be
added to the Action, but you are free to [open an issue with a feature request].
Please avoid implementing a new feature before submitting an issue for it first!

## Bugs

We take bugs seriously. Please report a bug as soon as you discover one. To do
this [open an issue with a bug report]. You are also free to contribute by
fixing one of the [open bug reports] and opening a Pull Request for it.

## Project Setup

To be able to contribute you need at least the following:

- _Git_;
- _NodeJS_ v16.0 or higher and _NPM_ v7 or higher;
- (Recommended) a code editor with _[EditorConfig]_ support;

### Using Docker

To use a Docker container for development you can follow the steps below. If
you're already familiar with Docker (or another container management platform)
you can use your preferred workflow, just ensure your meet the requirements
listed above.

```sh
# Make sure you're in the directory where you cloned git-tag-annotation-action.
$ pwd
/path/to/git-tag-annotation-action

# Start a container. This command will mount your current working directory to
# the working directory in the container so that you can use your own editor.
$ docker run -it \
    --entrypoint "sh" \
    --workdir "/git-tag-annotation-action" \
    --mount "type=bind,source=$(pwd),target=/git-tag-annotation-action" \
    --name "git-tag-annotation-action" \
    "node:$(cat .nvmrc)-alpine"

# (Optional) Setup git if you want to run git commands inside the container.
git-tag-annotation-action$ apk add git
git-tag-annotation-action$ git config --global user.email "you@example.com"
git-tag-annotation-action$ git config --global user.name "Your Name"

# Run any command you want to run.
git-tag-annotation-action$ npm install
git-tag-annotation-action$ npm test

# After exiting the container it won't be removed and you can reuse it later.
git-tag-annotation-action$ exit
$ docker start -i git-tag-annotation-action

# Don't forget to delete the container when you no longer need it.
git-tag-annotation-action$ exit
$ docker container rm git-tag-annotation-action
```

## Development details

This project uses [rollup.js] to compile the source code into a standalone
JavaScript file. You can use the `npm run build` command to update this file.

You SHOULD NOT include the update to this file when submitting a Pull Request.
The file will be automatically updated prior to a release.

Note that the end-to-end tests for this project run `npm run build` before
testing begins. So, code changes will always be tested.

[contributing guidelines for v1]: https://github.com/ericcornelissen/git-tag-annotation-action/blob/main-v1/CONTRIBUTING.md
[open bug reports]: https://github.com/ericcornelissen/git-tag-annotation-action/labels/bug
[open an issue with a bug report]: https://github.com/ericcornelissen/git-tag-annotation-action/issues/new?labels=bug
[open an issue with a feature request]: https://github.com/ericcornelissen/git-tag-annotation-action/issues/new?labels=enhancement
[rollup.js]: https://rollupjs.org/guide/en/
