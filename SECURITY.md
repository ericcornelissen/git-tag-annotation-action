# Security Policy

The maintainers of the _Git Tag Annotation Action_ project take security issues
seriously. We appreciate your efforts to responsibly disclose your findings. Due
to the non-funded and open-source nature of the project, we take a best-efforts
approach when it comes to engaging with security reports.

## Supported Versions

The table below shows which versions of the project are currently supported
with security updates.

| Version | End-of-life |
| ------: | :---------- |
|   2.x.x | -           |
|   1.x.x | 2022-07-29  |

_This table only includes information on versions `<3.0.0`._

## Reporting a Vulnerability

To report a security issue in the latest version of a supported version range,
either (in order of preference):

- [Report it through GitHub][new github advisory], or
- Send an email to [security@ericcornelissen.dev] with the terms "SECURITY" and
  "git-tag-annotation-action" in the subject line.

Please do not open a regular issue or Pull Request in the public repository.

To report a security issue in an unsupported version of the project, or if the
latest version of a supported version range isn't affected, please report it
publicly. For example, as a regular issue in the public repository. If in doubt,
report the issue privately.

[new github advisory]: https://github.com/ericcornelissen/git-tag-annotation-action/security/advisories/new
[security@ericcornelissen.dev]: mailto:security@ericcornelissen.dev?subject=SECURITY%20%28git-tag-annotation-action%29

### What to Include in a Report

Try to include as many of the following items as possible in a security report:

- An explanation of the issue
- A proof of concept exploit
- A suggested severity
- Relevant [CWE] identifiers
- The latest affected version
- The earliest affected version
- A suggested patch
- An automated regression test

[cwe]: https://cwe.mitre.org/

## Advisories

> **Note**: Advisories will be created only for vulnerabilities present in
> released versions of the project.

| ID               | Date       | Affected versions | Patched versions |
| :--------------- | :--------- | :---------------- | :--------------- |
| `CVE-2020-15272` | 2020-06-25 | `<=1.0.0`         | `1.0.1`          |

_This table is ordered most to least recent._

## Acknowledgments

We would like to publicly thank the following reporters:

- _None yet_
