# Release Guidelines

If you need to release a new version of git-tag-annotation-action you should
follow the guidelines found in this file.

## Automated Releases (Preferred)

The [`release.yml`](./.github/workflows/release.yml) [GitHub Actions] workflow
should be used to create releases. This workflow:

1. Can be [triggered manually] to initiate a new release by means of a Pull
   Request.
1. Is triggered on the `main` branch and will create a [git tag] for the version
   in the manifest **if** it doesn't exist yet. This will also keep the `v1` tag
   up-to-date.

The release process is as follows:

1. Initiate a new release by triggering the `release.yml` workflow manually. Use
   an update type in accordance with [Semantic Versioning].
1. Review the created Pull Request and merge if everything looks OK. After
   merging a [git tag] for the new version will be created automatically.
1. Create a new [GitHub Release] for the (automatically) created tag. If the
   version should be published to the [GitHub Marketplace] ensure that checkbox
   is checked.

## Manual Releases (Discouraged)

If it's not possible to use automated releases, or if something goes wrong with
the automatic release process, you can follow these steps to release a new
version (using `v1.6.1` as an example):

1. Make sure that your local copy of the repository is up-to-date:

   ```sh
   # Sync
   git switch main
   git pull origin main

   # Or clone
   git clone git@github.com:ericcornelissen/git-tag-annotation-action.git
   ```

1. Verify that the repository is in a state that can be released:

   ```sh
   npm install
   npm run lint
   npm run test
   npm run build
   ```

1. Update the version number in the package manifest and lockfile:

   ```sh
   npm version v1.6.1 --no-git-tag-version
   ```

   If that fails change the value of the version field in `package.json` to the
   new version:

   ```diff
   -  "version": "1.6.0",
   +  "version": "1.6.1",
   ```

   and to update the version number in `package-lock.json` it is recommended to
   run `npm install` (after updating `package.json`) which will sync the version
   number.

1. Update the changelog:

   ```sh
   node script/bump-changelog.js
   ```

   If that fails, manually add the following text after the `## [Unreleased]`
   line:

   ```md
   - _No changes yet_

   ## [1.6.1] - YYYY-MM-DD
   ```

   The date should follow the year-month-day format where single-digit months
   and days should be prefixed with a `0` (e.g. `2022-01-01`).

1. Commit the changes to `main` using:

   ```sh
   git add lib/ CHANGELOG.md package.json package-lock.json
   git commit -m "Version bump"
   ```

1. Create a tag for the new version and update the tag pointing to the latest v1
   release using

   ```sh
   git tag v1.6.1
   git tag -f v1
   ```

1. Push the commit and tags:

   ```sh
   git push origin main v1.6.1
   git push origin v1 --force
   ```

1. Create a new [GitHub Release]. If the version should be published to the
   [GitHub Marketplace] ensure that checkbox is checked.

[git tag]: https://git-scm.com/book/en/v2/Git-Basics-Tagging
[github actions]: https://github.com/features/actions
[github marketplace]: https://github.com/marketplace
[github release]: https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository
[semantic versioning]: https://semver.org/spec/v2.0.0.html
[triggered manually]: https://docs.github.com/en/actions/managing-workflow-runs/manually-running-a-workflow
