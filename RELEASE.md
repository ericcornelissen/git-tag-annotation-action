# Release Guidelines

If you need to release a new version of the _Git Tag Annotation Action_, follow
the guidelines found in this document.

- [Automated Releases (Preferred)](#automated-releases-preferred)
- [Manual Releases (Discouraged)](#manual-releases-discouraged)
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
   git switch main
   git pull origin main
   ```

   Or clone:

   ```shell
   git clone git@github.com:ericcornelissen/git-tag-annotation-action.git
   ```

1. Verify that the repository is in a state that can be released:

   ```shell
   npm clean-install
   npm run lint
   npm run test
   npm run vet
   ```

1. Update the contents of the `lib/` directory using:

   ```shell
   npm run build
   ```

1. Update the version number in the package manifest and lockfile:

   ```shell
   npm version v2.7.1 --no-git-tag-version
   ```

   If that fails change the value of the version field in `package.json` to the
   new version:

   ```diff
   -  "version": "2.7.0",
   +  "version": "2.7.1",
   ```

   and to update the version number in `package-lock.json` it is recommended to
   run `npm install` (after updating `package.json`) which will sync the version
   number.

1. Update the changelog:

   ```shell
   node script/bump-changelog.js
   ```

   If that fails, manually add the following text after the `## [Unreleased]`
   line:

   ```markdown
   - _No changes yet_

   ## [2.7.1] - YYYY-MM-DD
   ```

   The date should follow the year-month-day format where single-digit months
   and days should be prefixed with a `0` (e.g. `2022-01-01`).

1. Commit the changes to a new release branch and push using:

   ```shell
   git checkout -b release-$(sha1sum package-lock.json | awk '{print $1}')
   git add lib/ CHANGELOG.md package.json package-lock.json
   git commit --message "Version bump" --no-verify
   git push origin release-$(sha1sum package-lock.json | awk '{print $1}')
   ```

   The `--no-verify` option is required as otherwise the changes to `lib/` will
   be unstaged.

1. Create a Pull Request to merge the release branch into `main`. Merge the Pull
   Request if all continuous integration checks passed.

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
   git switch v2
   git merge main
   git switch main
   ```

1. Push the `v2` branch and new tag:

   ```shell
   git push origin v2 v2.7.1
   ```

1. Create a [GitHub Release] for the new version. Ensure it is published to the
   [GitHub Marketplace].

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
