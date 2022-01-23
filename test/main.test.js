const test = require("ava");
const sinon = require("sinon");

const main = require("../src/main.js");

const linux = "linux";
const win32 = "win32";

test.beforeEach((t) => {
  t.context.childProcess = {
    exec: sinon.stub(),
  };

  t.context.core = {
    getInput: sinon.stub(),
    setFailed: sinon.stub(),
    setOutput: sinon.stub(),
  };

  t.context.env = {
    GITHUB_REF: "v1.0.0",
  };

  t.context.shescape = {
    quote: sinon.stub(),
  };
});

const testGetInput = test.macro({
  exec(t, platform) {
    main({ ...t.context, platform });

    t.true(t.context.core.getInput.calledOnce);
    t.true(t.context.core.getInput.calledWith("tag"));
  },
  title(_, platform) {
    return `get input at key "tag" on ${platform}`;
  },
});

const testGitCommand = test.macro({
  exec(t, platform) {
    main({ ...t.context, platform });

    t.true(t.context.childProcess.exec.calledOnce);
    t.true(
      t.context.childProcess.exec.calledWith(
        sinon.match(/^git for-each-ref .+$/),
        sinon.match.func
      )
    );
  },
  title(_, platform) {
    return `git command that is executed on ${platform}`;
  },
});

const testGitCommandEnv = test.macro({
  exec(t, platform, tag) {
    const ref = `refs/tags/${tag}`;
    const escapedRef = `'${ref}'`;

    t.context.core.getInput.returns(undefined);
    t.context.env.GITHUB_REF = ref;
    t.context.shescape.quote.returns(escapedRef);

    main({ ...t.context, platform });

    t.true(t.context.shescape.quote.calledWith(ref));
    t.true(
      t.context.childProcess.exec.calledWith(
        sinon.match(escapedRef),
        sinon.match.func
      )
    );
  },
  title(_, platform, tag) {
    return `uses the tag from the environment on ${platform}, tag=${tag}`;
  },
});

const testGitCommandInput = test.macro({
  exec(t, platform, input) {
    const ref = `refs/tags/${input}`;
    const escapedRef = `'${ref}'`;

    t.context.core.getInput.returns(input);
    t.context.shescape.quote.returns(escapedRef);

    main({ ...t.context, platform });

    t.true(t.context.shescape.quote.calledWith(ref));
    t.true(
      t.context.childProcess.exec.calledWith(
        sinon.match(escapedRef),
        sinon.match.func
      )
    );
  },
  title(_, platform, tag) {
    return `uses the tag from the input ${platform}, tag=${tag}`;
  },
});

const testGitCommandFormatArgument = test.macro({
  exec(t, platform, expected) {
    main({ ...t.context, platform });

    t.true(
      t.context.childProcess.exec.calledWith(
        sinon.match(`--format=${expected}`),
        sinon.match.func
      )
    );
  },
  title(_, platform) {
    return `uses the correct for-each-ref format on ${platform}`;
  },
});

const testOutputExecSuccess = test.macro({
  exec(t, platform, annotation) {
    main({ ...t.context, platform });

    t.true(t.context.childProcess.exec.calledOnce);
    t.context.childProcess.exec.lastCall.callback(null, annotation);

    t.false(t.context.core.setFailed.called);
    t.true(t.context.core.setOutput.calledOnce);
    t.true(
      t.context.core.setOutput.calledWith("git-tag-annotation", annotation)
    );
  },
  title(_, platform, annotation) {
    return `command success ${platform}, annotation="${annotation}"`;
  },
});

const testOutputExecFailure = test.macro({
  exec(t, platform, err) {
    main({ ...t.context, platform });

    t.true(t.context.childProcess.exec.calledOnce);
    t.context.childProcess.exec.lastCall.callback(err, null);

    t.false(t.context.core.setOutput.called);
    t.true(t.context.core.setFailed.calledOnce);
    t.true(t.context.core.setFailed.calledWith(err));
  },
  title(_, platform, err) {
    return `command error on ${platform}, err="${err}"`;
  },
});

const testOutputFailure = test.macro({
  exec(t, platform, err) {
    t.context.childProcess.exec.throws(new Error(err));

    main({ ...t.context, platform });

    t.false(t.context.core.setOutput.called);
    t.true(t.context.core.setFailed.calledOnce);
    t.true(t.context.core.setFailed.calledWith(err));
  },
  title(_, platform, err) {
    return `execution error on ${platform}, err="${err}"`;
  },
});

for (const platform of [linux, win32]) {
  test(testGetInput, platform);
  test(testGitCommand, platform);

  for (const tag of ["v3.1.4", "v0.2.718", "v0.0.1"]) {
    test(testGitCommandEnv, platform, tag);
    test(testGitCommandInput, platform, tag);
  }

  for (const annotation of ["Hello world!", "foobar"]) {
    test(testOutputExecSuccess, platform, annotation);
  }

  for (const err of ["Something went wrong", "Oops"]) {
    test(testOutputExecFailure, platform, err);
    test(testOutputFailure, platform, err);
  }
}

test(testGitCommandFormatArgument, win32, "%(contents)");
test(testGitCommandFormatArgument, linux, "'%(contents)'");
