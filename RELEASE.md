# Release Guidelines

If you need to release a new version of git-tag-annotation-action you should
follow the guidelines found in this file.

## Release Process

A typical release process will look something like this (using `v1.6.1` as an
example):

1. Switch to the `main` branch and ensure you are up-to-date with origin.
1. [Update the version] in the package manifest and lockfile to "1.6.1"
   (excluding the "v") and [update the changelog] accordingly.
1. Commit the changes to `main` using `git commit -a -m "Version bump"`.
1. Create a tag for the new version using `git tag v1.6.1` (including the "v").
1. Push the commit and tag using `git push origin main v1.6.1`.
1. Update the tag pointing to the latest v1 release using `git tag -f v1`.
1. Push the tag using `git push origin v1 --force`.
1. Create a new [GitHub Release]. If the version should be published to the
   [GitHub Marketplace] ensure that checkbox is checked.

## Updating the Version Number

To update the version number in `package.json`, change the value of the version
field to the new version (using `v1.6.1` as an example):

```diff
-  "version": "1.6.0",
+  "version": "1.6.1",
```

To update the version number in `package-lock.json` it is recommended to run
`npm install` (after updating `package.json`) this will sync the version number.

## Updating the Changelog

To update the changelog add the following text after the `## [Unreleased]` line
(using `v1.6.1` as an example):

```md
- _No changes yet_

## [1.6.1] - YYYY-MM-DD
```

The date should follow the year-month-day format where single-digit months and
days should be prefixed with a `0` (e.g. `2022-01-01`).

[github marketplace]: https://github.com/marketplace
[github release]: https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository
[update the changelog]: #updating-the-changelog
[update the version]: #updating-the-version-number
