# Contributing to Git Tag Annotation Action

The maintainers of the _Git Tag Annotation Action_ welcome contributions and
corrections to the source code, documentation, and other aspects of the project.
Before contributing, please make sure you read the relevant section in this
document.

> **Note** If you want to make a contribution to v1 of the Action, please refer
> to the [Contributing Guidelines for v1].

---

## Reporting Issues

### Security

For security related issues, please refer to the [Security Policy].

### Bugs

If you have problems with the _Git Tag Annotation Action_ or think you've found
a bug, please report it to the developers. We ask you to **ALWAYS** open an
issue describing the bug as soon as possible so that we, and others, are aware
of the bug.

Before reporting a bug, make sure you've actually found a real bug. Carefully
read the documentation and see if it really says you can do what you're trying
to do. If it's not clear whether you should be able to do something or not,
report that too; it's a bug in the documentation! Also, make sure the bug has
not already been reported.

When preparing to report a bug, try to isolate it to a small working example
that reproduces the problem. Once you have this, collect additional information
such as:

- The exact version of _Git Tag Annotation Action_ you're using.
- A description of the expected behaviour and the actual behaviour.
- All error and warning messages.
- A link to a workflow run where the bug occurs with [debug logging] enabled.

Once you have a precise problem [open an issue with a bug report].

### Feature Requests

The simplicity of the _Git Tag Annotation Action_ Action is by design. It is
unlikely new features will be added, but you are free to [open an issue with a
feature request]. Please avoid implementing a new feature before submitting an
issue for it first.

### Corrections

Corrections, such as fixing typos, are valuable contributions. For small changes
you can open a Pull Request with the changes directly. Or you can [open an
issue] instead.

---

## Making Changes

You are always free to contribute by working on one of the **confirmed** [open
bug reports] or any of the other [open issues] and opening a Pull Request for
it.

### Workflow

If you decide to contribute anything, please use the following workflow:

- Fork this repository
- Create a new branch from the latest `main`
- Make your changes on the new branch
- Commit to the new branch and push the commit(s)
- Make a Pull Request against `main`

### Project Setup

To be able to contribute you need at least the following:

- _Git_;
- _Node.js_ v18 or higher and _npm_ v8 or higher;
- (Recommended) a code editor with _[EditorConfig]_ support;

We use [Husky] to automatically install git hooks. Please enable it when
contributing to this project.

### Development Details

#### Formatting

The source code of the project is formatted using [Prettier]. Run the command
`npm run format` to format the source code, or `npm run lint` to check if your
changes follow the expected format. The pre-commit hook will format all staged
changes. The pre-push hook will prevent pushing code that is not formatted
correctly.

#### Building

This project uses [rollup.js] to compile the source code into a standalone
JavaScript file. This file can be found in the `lib/` directory. The file is
generated using the `npm run build` command; you can run this command to see if
your changes are valid.

You should **NOT** include changes to this file when committing. If you try to
commit it, the pre-commit hook will automatically unstage the changes. Instead,
the file will be updated automatically prior to a release.

#### Vetting

The project is vetted using a small collection of static analysis tools. Run
`npm run vet` to analyze the project for potential problems.

---

## Testing

### Unit Testing

The unit tests for this project can be found in the `test` directory. The
testing framework is [uvu]. To run the unit tests you can use the `npm run test`
command. Use `npm run coverage` to run tests and generate a coverage report. The
coverage report can be found in `_reports/coverage/lcov-report`.

The effectiveness of unit tests is measured using [Mutation Testing]. You can
run the mutation tests using the `npm run test:mutation` command. The mutation
report can be found in `_reports/mutation`.

### End-to-end Testing

The end-to-end tests for this project only run in the Continuous Integration as
part of the "Verify code" workflow. These tests aim to verify that the Action
can run and outputs the expected values.

> **Note** The end-to-end tests for this project run `npm run build` before
> testing begins. So it is not necessary to commit the output of this command.

[contributing guidelines for v1]: https://github.com/ericcornelissen/git-tag-annotation-action/blob/main-v1/CONTRIBUTING.md
[debug logging]: https://docs.github.com/en/actions/managing-workflow-runs/enabling-debug-logging
[editorconfig]: https://editorconfig.org/
[husky]: https://typicode.github.io/husky/
[mutation testing]: https://en.wikipedia.org/wiki/Mutation_testing
[open bug reports]: https://github.com/ericcornelissen/git-tag-annotation-action/issues?q=label%3Abug+is%3Aissue+is%3Aopen
[open issues]: https://github.com/ericcornelissen/git-tag-annotation-action/issues
[open an issue]: https://github.com/ericcornelissen/git-tag-annotation-action/issues/new
[open an issue with a bug report]: https://github.com/ericcornelissen/git-tag-annotation-action/issues/new?labels=bug
[open an issue with a feature request]: https://github.com/ericcornelissen/git-tag-annotation-action/issues/new?labels=enhancement
[prettier]: https://prettier.io/
[rollup.js]: https://rollupjs.org/guide/en/
[security policy]: ./SECURITY.md
[uvu]: https://www.npmjs.com/package/uvu
