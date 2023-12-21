<!-- SPDX-License-Identifier: CC0-1.0 -->

# Release Guidelines

If you need to release a new version of the _Git Tag Annotation Action_, follow
the guidelines found in this document.

- [Automated Releases (Preferred)](#automated-releases-preferred)
- [Manual Releases (Discouraged)](#manual-releases-discouraged)
- [Creating a GitHub Release](#creating-a-github-release)
- [Major Releases](#major-releases)
- [Non-current Releases](#non-current-releases)

## Automated Releases (Preferred)

To release a new version follow these steps:

1. [Manually trigger] the [release workflow] from the `main` branch; Use an
   update type in accordance with [Semantic Versioning]. This will create a Pull
   Request that start the release process.
1. Follow the instructions in the description of the created Pull Request.

## Manual Releases (Discouraged)

If it's not possible to use automated releases, or if something goes wrong with
the automatic release process, you can follow these steps to release a new
version (using `v2.7.1` as an example):

1. Make sure that your local copy of the repository is up-to-date, sync:

   ```shell
   git checkout main
   git pull origin main
   ```

   Or clone:

   ```shell
   git clone git@github.com:ericcornelissen/git-tag-annotation-action.git
   ```

1. Update the version number in the `.version` file:

   ```shell
   ./script/version-bump.sh [major|minor|patch]
   ```

   Or edit the `.version` file manually:

   ```diff
   - 0.1.1
   + 0.1.2
   ```

1. Update the changelog:

   ```shell
   ./script/update-changelog.sh
   ```

   Or edit the `CHANGELOG.md` file manually. Add the following after the
   `## [Unreleased]` line, adjusting the version number for the release:

   ```markdown
   - _No changes yet_

   ## [2.7.1] - YYYY-MM-DD
   ```

   The date should follow the year-month-day format where single-digit months
   and days should be prefixed with a `0` (e.g. `2022-01-01`).

1. Commit the changes to a new release branch and push using:

   ```shell
   git checkout -b release-$(sha1sum .version | awk '{print $1}')
   git add .version CHANGELOG.md
   git commit --message "Version bump"
   git push origin release-$(sha1sum .version | awk '{print $1}')
   ```

1. Create a Pull Request to merge the release branch into `main`.

1. Merge the Pull Request if the changes look OK and all continuous integration
   checks are passing.

   > **Note** At this point, the continuous delivery automation may pick up and
   > complete the release process. If no, or only partially, continue following
   > the remaining steps.

1. Immediately after the Pull Request is merged, sync the `main` branch:

   ```shell
   git checkout main
   git pull origin main
   ```

1. Create a [git tag] for the new version:

   ```shell
   git tag v2.7.1
   ```

1. Update the `v2` branch to point to the same commit as the new tag:

   ```shell
   git checkout v2
   git merge main
   ```

1. Push the `v2` branch and new tag:

   ```shell
   git push origin v2 v2.7.1
   ```

1. [Create a GitHub Release](#creating-a-github-release).

## Creating a GitHub Release

Create a [GitHub Release] for the [git tag] of the new release. The release
title should be "Release {_version_}" (e.g. "Release v2.1.7"). The release text
should be the changes from the changelog for the version (including links).

Ensure the version is published to the [GitHub Marketplace] as well.

## Major Releases

For major releases, some additional steps are required. This may include:

- Ensure any references to the major version in the documentation (external and
  internal) are updated.
- Update the automated release workflow to create releases for the new major
  version.

Make sure these additional changes are included in the release Pull Request.

## Non-current Releases

When releasing an older version of the project, refer to the Release Guidelines
(`RELEASE.md`) of the respective main branch instead.

[git tag]: https://git-scm.com/book/en/v2/Git-Basics-Tagging
[github marketplace]: https://github.com/marketplace
[github release]: https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository
[manually trigger]: https://docs.github.com/en/actions/managing-workflow-runs/manually-running-a-workflow
[release workflow]: ./.github/workflows/release.yml
[semantic versioning]: https://semver.org/spec/v2.0.0.html
