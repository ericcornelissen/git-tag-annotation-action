# Contributing to Git Tag Annotation Action

The maintainers of the _Git Tag Annotation Action_ welcome contributions and
corrections to the source code, tests, documentation, and other aspects of the
project. If you plan to make a contribution, please do make sure to read through
the relevant sections of this document.

---

## Reporting Issues

### Security

For security related issues, please refer to the [security policy].

### Bugs

If you have problems with the _Git Tag Annotation Action_ or think you've found
a bug, please report it to the developers. We ask you to always open an issue
describing the bug as soon as possible so that we, and others, are aware of the
bug.

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

Once you have a precise problem you can report it as a [bug report].

### Feature Requests

The simplicity of the _Git Tag Annotation Action_ Action is by design. It is
unlikely new features will be added, but you are free to create a [feature
request]. Please avoid implementing a new feature before submitting an issue for
it first. Also, make sure the feature has not already been requested.

### Corrections

Corrections, such as fixing typos, are valuable contributions. For small changes
you can open a Pull Request with the changes directly. Or you can [open an
issue] instead.

---

## Making Changes

You are always free to contribute by working on one of the confirmed or accepted
(and unassigned) [open issues] and opening a Pull Request for it.

It is advised to indicate that you will be working on a issue by commenting on
that issue. This is so others don't start working on the same issue as you are.
Also, don't start working on an issue which someone else is working on - give
everyone a chance to make contributions.

When you open a Pull Request that implements an issue make sure to link to that
issue in the Pull Request description and explain how you implemented the issue
as clearly as possible.

> **Note** If you, for whatever reason, can no longer continue your contribution
> please share this in the issue or your Pull Request. This gives others the
> opportunity to work on it. If we don't hear from you for an extended period of
> time we may decide to allow others to work on the issue you were assigned to.

### Prerequisites

To be able to contribute you need at least the following:

- [Git];
- [Node.js] v18 or higher and [npm] v8 or higher;
- (Recommended) a code editor with [EditorConfig] support;
- (Suggested) [ShellCheck];
- (Optional) [act];
- (Optional) [Fossa CLI];

We use [husky] to automatically install git hooks. Please enable it when
contributing to this project. If you have npm installation scripts disabled, run
`npm run prepare` after installing dependencies.

### Workflow

If you decide to contribute anything, please use the following workflow:

- Fork this repository
- Create a new branch from the latest `main`
- Make your changes on the new branch
- Commit to the new branch and push the commit(s)
- Make a Pull Request against `main`

### Development Details

#### Formatting

The source code of the project is formatted using [Prettier]. Run the command
`npm run format` to format the source code, or `npm run lint` to check if your
changes follow the expected format. The pre-commit hook will format all staged
changes. The pre-push hook will prevent pushing code that is not formatted
correctly.

#### Building

This project uses [rollup.js] to compile the source code into a standalone
JavaScript file (which can be found in the `lib/` directory). This is done so
that it can be invoked as a standalone file when used as an Action. Otherwise
the contents of `node_modules/` would have to be included in the repository.

The file is generated using the `npm run build` command; you can run this
command to see if your changes are valid. You should **not** include changes to
this file when committing - if you try to commit it, the pre-commit hook will
automatically unstage the changes.

Instead, the file will be updated automatically prior to a release as well as
build when necessary for testing.

#### Linting

The project uses linters to catch mistakes (in contrast to [Prettier], which is
only for formatting). Use these commands to check your changes if applicable:

| File type                | Command                |
| :----------------------- | :--------------------- |
| MarkDown (`.md`)         | `npm run lint:md`      |
| Shell scripts (`.{,sh}`) | `npm run lint:sh` (\*) |

(\*): requires you have [ShellCheck] available on your system.

#### Vetting

The project is vetted using a small collection of static analysis tools. Run
`npm run vet` to analyze the project for potential problems.

#### Licenses

This project uses [Fossa] to check for potential license violations in project
dependencies. This is an automated check in the CI. You can perform the check
locally using the [Fossa CLI] - a Fossa account is required - by running (after
authenticating) `npm run check-licenses`.

> **Note** Your results may differ from the CI check because the license policy
> can only be configured in the web app.

---

## Testing

### Unit Testing

The unit tests for this project can be found in the `test` directory. The
testing framework is [uvu]. To run the unit tests you can use the `npm run test`
command. Use `npm run coverage` to run tests and generate a coverage report. The
coverage report can be found in `_reports/coverage`.

Unit tests may be written as a [property tests]. The [fast-check] framework is
used to write property tests. When writing a unit test, it is encouraged to
write it as a property test, though this is not required.

The effectiveness of unit tests is measured using [mutation testing]. You can
run the mutation tests using the `npm run test:mutation` command. The mutation
report can be found in `_reports/mutation`.

### End-to-end Testing

The end-to-end tests for this project run in the Continuous Integration as part
of the "Verify code" workflow. These tests aim to verify that the Action can run
in the GitHub Actions environment and outputs the expected values.

#### Running End-to-end Tests Locally

You can use [act] to run the end-to-end tests locally. If you have the
`act` program available on your PATH you can use `npm run test:e2e` to run the
end-to-end tests locally.

There are some limitations to using [act]:

- It depends on [Docker] to run workflows.
- Your system may not support all operating systems the tests should run on.
  Hence, the end-to-end tests may succeed locally but fail on GitHub because you
  couldn't run them for all operating systems.
- All jobs that the end-to-end test job `needs` have to be executed as well.

[bug report]: https://github.com/ericcornelissen/git-tag-annotation-action/issues/new?labels=bug
[debug logging]: https://docs.github.com/en/actions/managing-workflow-runs/enabling-debug-logging
[docker]: https://www.docker.com/
[editorconfig]: https://editorconfig.org/
[fast-check]: https://github.com/dubzzz/fast-check#readme
[feature request]: https://github.com/ericcornelissen/git-tag-annotation-action/issues/new?labels=enhancement
[fossa]: https://fossa.com/
[fossa cli]: https://github.com/fossas/fossa-cli
[git]: https://git-scm.com/
[husky]: https://typicode.github.io/husky/
[mutation testing]: https://en.wikipedia.org/wiki/Mutation_testing
[node.js]: https://nodejs.org/en/
[act]: https://github.com/nektos/act
[npm]: https://www.npmjs.com/
[open issues]: https://github.com/ericcornelissen/git-tag-annotation-action/issues
[open an issue]: https://github.com/ericcornelissen/git-tag-annotation-action/issues/new
[prettier]: https://prettier.io/
[property tests]: https://en.wikipedia.org/wiki/Property_testing
[rollup.js]: https://rollupjs.org/guide/en/
[security policy]: ./SECURITY.md
[shellcheck]: https://github.com/koalaman/shellcheck
[uvu]: https://www.npmjs.com/package/uvu
