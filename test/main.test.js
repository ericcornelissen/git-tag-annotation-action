const sinon = require("sinon");
const test = require("tape");

const main = require("../src/main.js");

const linux = "linux";
const win32 = "win32";

for (const platform of [linux, win32]) {
  test(`gets input at key "tag" on ${platform}`, (t) => {
    const { context } = setup();

    main({ ...context, platform });

    t.true(context.core.getInput.calledOnce);
    t.true(context.core.getInput.calledWith("tag"));

    t.end();
  });

  test(`runs the correct git command on ${platform}`, (t) => {
    const { context } = setup();

    main({ ...context, platform });

    t.true(context.childProcess.exec.calledOnce);
    t.true(
      context.childProcess.exec.calledWith(
        sinon.match(/^git for-each-ref .+$/),
        sinon.match.func
      )
    );

    t.end();
  });

  test(`uses the correct for-each-ref format on ${platform}`, (t) => {
    const { context } = setup();
    const expected = platform === win32 ? "%(contents)" : "'%(contents)'";

    main({ ...context, platform });

    t.true(
      context.childProcess.exec.calledWith(
        sinon.match(`--format=${expected}`),
        sinon.match.func
      )
    );
    t.end();
  });

  for (const tag of ["v3.1.4", "v0.2.718", "v0.0.1"]) {
    test(`uses the environment tag on ${platform}, tag=${tag}`, (t) => {
      const { context } = setup();
      const ref = `refs/tags/${tag}`;
      const escapedRef = `'${ref}'`;

      context.core.getInput.returns(undefined);
      context.env.GITHUB_REF = ref;
      context.shescape.quote.returns(escapedRef);

      main({ ...context, platform });

      t.true(context.shescape.quote.calledWith(ref));
      t.true(
        context.childProcess.exec.calledWith(
          sinon.match(escapedRef),
          sinon.match.func
        )
      );

      t.end();
    });

    test(`uses the input tag on ${platform}, tag=${tag}`, (t) => {
      const { context } = setup();
      const ref = `refs/tags/${tag}`;
      const escapedRef = `'${ref}'`;

      context.core.getInput.returns(tag);
      context.shescape.quote.returns(escapedRef);

      main({ ...context, platform });

      t.true(context.shescape.quote.calledWith(ref));
      t.true(
        context.childProcess.exec.calledWith(
          sinon.match(escapedRef),
          sinon.match.func
        )
      );

      t.end();
    });
  }

  for (const annotation of ["Hello world!", "foobar"]) {
    test(`sets the annotation ("${annotation}") on ${platform}`, (t) => {
      const { context } = setup();

      main({ ...context, platform });

      t.true(context.childProcess.exec.calledOnce);
      context.childProcess.exec.lastCall.callback(null, annotation);

      t.false(context.core.setFailed.called);
      t.true(context.core.setOutput.calledOnce);
      t.true(
        context.core.setOutput.calledWith("git-tag-annotation", annotation)
      );

      t.end();
    });
  }

  for (const err of ["Something went wrong", "Oops"]) {
    test(`handles a git error ("${err}") on ${platform}`, (t) => {
      const { context } = setup();

      main({ ...context, platform });

      t.is(context.childProcess.exec.callCount, 1);
      context.childProcess.exec.lastCall.callback(err, null);

      t.false(context.core.setOutput.called);
      t.is(context.core.setFailed.callCount, 1);
      t.true(context.core.setFailed.calledWith(err));

      t.end();
    });

    test(`handles an execution error ("${err}") on ${platform}`, (t) => {
      const { context } = setup();

      context.childProcess.exec.throws(new Error(err));

      main({ ...context, platform });

      t.false(context.core.setOutput.called);
      t.is(context.core.setFailed.callCount, 1);
      t.true(context.core.setFailed.calledWith(err));

      t.end();
    });
  }
}

function setup() {
  const childProcess = {
    exec: sinon.stub(),
  };

  const core = {
    getInput: sinon.stub(),
    setFailed: sinon.stub(),
    setOutput: sinon.stub(),
  };

  const env = {
    GITHUB_REF: "v1.0.0",
  };

  const shescape = {
    quote: sinon.stub(),
  };

  return {
    context: { childProcess, core, env, shescape },
  };
}
