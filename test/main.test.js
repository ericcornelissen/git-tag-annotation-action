const core = require('@actions/core');
const child_process = require('child_process');
const shescape = require('shescape');

const main = require('../src/main.js');

jest.mock('@actions/core');
jest.mock('child_process');
jest.mock('shescape');

describe.each(['linux', 'win32'])('os: %s', (platform) => {
  beforeEach(() => {
    core.getInput.mockClear();
    core.setFailed.mockClear();
    core.setOutput.mockClear();

    child_process.exec.mockClear();

    shescape.quote.mockClear();
  });

  it.each([
    'v1.2.3',
    'v0.3.14',
  ])('uses the tag from the environment (%s)', (tag) => {
    process.env.GITHUB_REF = `refs/tags/${tag}`;

    main(platform);

    expect(child_process.exec).toHaveBeenCalledWith(
      expect.stringContaining(`'refs/tags/${tag}'`),
      expect.any(Function),
    );
  });

  it('tries to get a tag from the input', () => {
    core.getInput.mockReturnValueOnce(undefined);

    main(platform);

    expect(core.getInput).toHaveBeenCalledTimes(1);
    expect(core.getInput).toHaveBeenCalledWith('tag');
  });

  it.each([
    'v3.2.1',
    'v0.2.718',
  ])('uses the tag from the input (%s)', (tag) => {
    core.getInput.mockReturnValueOnce(tag);

    main(platform);

    expect(core.getInput).toHaveBeenCalledTimes(1);
    expect(child_process.exec).toHaveBeenCalledWith(
      expect.stringContaining(`'refs/tags/${tag}'`),
      expect.any(Function),
    );
  });

  it('outputs the annotation', (done) => {
    const annotation = 'Hello world!';
    child_process.exec.mockImplementationOnce((_, fn) => {
      fn(null, annotation);

      expect(core.setOutput).toHaveBeenCalledTimes(1);
      expect(core.setOutput).toHaveBeenCalledWith(
        'git-tag-annotation',
        annotation,
      );
      done();
    });

    main(platform);
  });

  it('sets an error if the annotation could not be found', (done) => {
    child_process.exec.mockImplementationOnce((_, fn) => {
      fn('Something went wrong!', null);

      expect(core.setOutput).not.toHaveBeenCalled();
      expect(core.setFailed).toHaveBeenCalledTimes(1);
      done();
    });

    main(platform);
  });

  it('sets an error if exec fails', () => {
    child_process.exec.mockImplementationOnce(() => {
      throw new Error({ message: 'Something went wrong' })
    });

    main(platform);

    expect(core.setOutput).not.toHaveBeenCalled();
    expect(core.setFailed).toHaveBeenCalledTimes(1);
  });

  it('escapes malicious values from the input', () => {
    const tag = `'; $(cat /etc/shadow)`;
    core.getInput.mockReturnValueOnce(tag);

    main(platform);

    expect(shescape.quote).toHaveBeenCalledTimes(1);
    expect(shescape.quote).toHaveBeenCalledWith(`refs/tags/${tag}`);
  });
});
