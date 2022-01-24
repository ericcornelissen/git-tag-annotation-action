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

for (const platform of [linux, win32]) {
  test(`gets input at key "tag" on ${platform}`, (t) => {
    main({ ...t.context, platform });

    t.is(t.context.core.getInput.callCount, 1);
    t.true(t.context.core.getInput.calledWith("tag"));
  });

  test(`runs the correct git command on ${platform}`, (t) => {
    main({ ...t.context, platform });

    t.is(t.context.childProcess.exec.callCount, 1);
    t.true(
      t.context.childProcess.exec.calledWith(
        sinon.match(/^git for-each-ref .+$/),
        sinon.match.func
      )
    );
  });

  test(`uses the correct for-each-ref format on ${platform}`, (t) => {
    const expected = platform === win32 ? "%(contents)" : "'%(contents)'";

    main({ ...t.context, platform });

    t.true(
      t.context.childProcess.exec.calledWith(
        sinon.match(`--format=${expected}`),
        sinon.match.func
      )
    );
  });

  for (const tag of ["v3.1.4", "v0.2.718", "v0.0.1"]) {
    test(`uses the environment tag on ${platform}, tag=${tag}`, (t) => {
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
    });

    test(`uses the input tag on ${platform}, tag=${tag}`, (t) => {
      const ref = `refs/tags/${tag}`;
      const escapedRef = `'${ref}'`;

      t.context.core.getInput.returns(tag);
      t.context.shescape.quote.returns(escapedRef);

      main({ ...t.context, platform });

      t.true(t.context.shescape.quote.calledWith(ref));
      t.true(
        t.context.childProcess.exec.calledWith(
          sinon.match(escapedRef),
          sinon.match.func
        )
      );
    });
  }

  for (const annotation of ["Hello world!", "foobar"]) {
    test(`sets the annotation ("${annotation}") on ${platform}`, (t) => {
      main({ ...t.context, platform });

      t.is(t.context.childProcess.exec.callCount, 1);
      t.context.childProcess.exec.lastCall.callback(null, annotation);

      t.false(t.context.core.setFailed.called);
      t.is(t.context.core.setOutput.callCount, 1);
      t.true(
        t.context.core.setOutput.calledWith("git-tag-annotation", annotation)
      );
    });
  }

  for (const err of ["Something went wrong", "Oops"]) {
    test(`handles a git error ("${err}") on ${platform}`, (t) => {
      main({ ...t.context, platform });

      t.is(t.context.childProcess.exec.callCount, 1);
      t.context.childProcess.exec.lastCall.callback(err, null);

      t.false(t.context.core.setOutput.called);
      t.is(t.context.core.setFailed.callCount, 1);
      t.true(t.context.core.setFailed.calledWith(err));
    });

    test(`handles an execution error ("${err}") on ${platform}`, (t) => {
      t.context.childProcess.exec.throws(new Error(err));

      main({ ...t.context, platform });

      t.false(t.context.core.setOutput.called);
      t.is(t.context.core.setFailed.callCount, 1);
      t.true(t.context.core.setFailed.calledWith(err));
    });
  }
}
