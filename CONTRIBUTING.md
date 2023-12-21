<!-- SPDX-License-Identifier: CC0-1.0 -->

# Contributing Guidelines

The maintainers of the _Git Tag Annotation Action_ welcome contributions and
corrections of all forms. This includes improvements to the documentation or
code base, new tests, bug fixes, and implementations of new features. We
recommend you open an issue before making any substantial changes so you can be
sure your work won't be rejected. But for small changes, such as fixing a typo,
you can open a Pull Request directly.

If you plan to make a contribution, please do make sure to read through the
relevant sections of this document.

- [Reporting Issues](#reporting-issues)
  - [Security](#security)
  - [Bugs](#bugs)
  - [Feature Requests](#feature-requests)
  - [Corrections](#corrections)
- [Making Changes](#making-changes)
  - [Prerequisites](#prerequisites)
  - [Workflow](#workflow)
  - [Development Details](#development-details)

---

## Reporting Issues

### Security

For security related issues, please refer to the [security policy].

### Bugs

If you have problems with the project or think you've found a bug, please report
it to the developers. We ask you to always open an issue describing the bug as
soon as possible so that we, and others, are aware of the bug.

Before reporting a bug, make sure you've actually found a real bug. Carefully
read the documentation and see if it really says you can do what you're trying
to do. If it's not clear whether you should be able to do something or not,
report that too; it's a bug in the documentation! Also, make sure the bug has
not already been reported.

When preparing to report a bug, try to isolate it to a small working example
that reproduces the problem. Once you have this, collect additional information
such as:

- The exact version of the Action you're using.
- A description of the expected behaviour and the actual behaviour.
- All error and warning messages.
- A link to a workflow run where the bug occurs with [debug logging] enabled.

Once you have a precise problem you can report it as a [bug report].

### Feature Requests

The simplicity of the project is by design - it is unlikely new features will be
added. Please avoid implementing a new feature before submitting an issue for it
first. To request a feature, make sure you have a clear idea what you need and
why. Also, make sure the feature has not already been requested.

When you have a clear idea of what you need, you can submit a [feature request].

### Corrections

Corrections, such as fixing typos or refactoring code, are important. For small
changes you can open a Pull Request directly, Or you can first [open an issue].

---

## Making Changes

You are always free to contribute by working on one of the confirmed or accepted
and unassigned [open issues] and opening a Pull Request for it.

It is advised to indicate that you will be working on a issue by commenting on
that issue. This is so others don't start working on the same issue as you are.
Also, don't start working on an issue which someone else is working on - give
everyone a chance to make contributions.

When you open a Pull Request that implements an issue make sure to link to that
issue in the Pull Request description and explain how you implemented the issue
as clearly as possible.

> [!NOTE]
> If you, for whatever reason, can no longer continue your contribution please
> share it in the issue or your Pull Request. This gives others the opportunity
> to work on it. If we don't hear from you for an extended period of time we may
> decide to allow others to work on the issue you were assigned to.

### Prerequisites

To be able to contribute you need the following tooling:

- [git];
- [Make];
- (Recommended) a code editor with [EditorConfig] support;
- (Suggested) [actionlint] (see `.tool-versions` for preferred version);
- (Suggested) [ShellCheck] (see `.tool-versions` for preferred version);
- (Suggested) [shfmt] (see `.tool-versions` for preferred version);
- (Suggested) [yamllint] (see `.tool-versions` for preferred version);
- (Optional) [Docker] or [Podman] (development environment available);

### Workflow

If you decide to contribute anything, please use the following workflow:

- Fork this repository
- Create a new branch from the latest `main`
- Make your changes on the new branch
- Commit to the new branch and push the commit(s)
- Make a Pull Request against `main`

### Development Details

#### Formatting and Linting

This project uses formatters to format source code. Run:

```shell
make format
```

This project also uses linters to catch mistakes and enforce style. Run:

```shell
make lint
```

to run all linters or use the following commands to check specific file types:

| File type        | Command          | Linter       |
| :--------------- | :--------------- | :----------- |
| CI workflows     | `make lint-ci`   | [actionlint] |
| Shell (`.{,sh}`) | `make lint-sh`   | [ShellCheck] |
| YAML (`.yaml`)   | `make lint-yaml` | [yamllint]   |

#### Testing

##### Manual Testing

You can do a test run locally using the `make test-run` command. This will
emulate a run using `refs/tags/v1.0.0` as the environment git ref and the
(optional) `tag` argument as the Action's `tag` input, for example

```shell
make test-run tag=v1.1.0
```

This Action output will be written to the `github_output` file.

##### Automated Testing

You can run automated tests using the `make test` command. This uses [Bash Test
Tools] to run tests. Automated tests are located in the `test/` directory and
must use the `test_` prefix and `.sh` extension.

##### End-to-end Testing

Additional automated tests for this project are in the form of end-to-end tests
that are ran in the Continuous Integration as part of the "Check" workflow.
These tests aim to verify that the Action can run in the GitHub Actions
environment and outputs the expected values.

[actionlint]: https://github.com/rhysd/actionlint
[bash test tools]: https://thorsteinssonh.github.io/bash_test_tools/
[bug report]: https://github.com/ericcornelissen/git-tag-annotation-action/issues/new?labels=bug
[debug logging]: https://docs.github.com/en/actions/managing-workflow-runs/enabling-debug-logging
[docker]: https://www.docker.com/
[editorconfig]: https://editorconfig.org/
[feature request]: https://github.com/ericcornelissen/git-tag-annotation-action/issues/new?labels=enhancement
[git]: https://git-scm.com/
[make]: https://www.gnu.org/software/make/
[open an issue]: https://github.com/ericcornelissen/git-tag-annotation-action/issues/new
[open issues]: https://github.com/ericcornelissen/git-tag-annotation-action/issues?q=is%3Aissue+is%3Aopen+no%3Aassignee
[podman]: https://podman.io/
[security policy]: ./SECURITY.md
[shellcheck]: https://github.com/koalaman/shellcheck
[shfmt]: https://github.com/mvdan/sh
[yamllint]: https://github.com/adrienverge/yamllint
