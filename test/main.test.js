const sinon = require("sinon");
const { test, beforeEach } = require("tap");

const main = require("../src/main.js");

const linux = "linux";
const win32 = "win32";

beforeEach((t) => {
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

    t.equal(t.context.core.getInput.callCount, 1);
    t.ok(t.context.core.getInput.calledWith("tag"));

    t.end();
  });

  test(`runs the correct git command on ${platform}`, (t) => {
    main({ ...t.context, platform });

    t.equal(t.context.childProcess.exec.callCount, 1);
    t.ok(
      t.context.childProcess.exec.calledWith(
        sinon.match(/^git for-each-ref .+$/),
        sinon.match.func
      )
    );

    t.end();
  });

  test(`uses the correct for-each-ref format on ${platform}`, (t) => {
    const expected = platform === win32 ? "%(contents)" : "'%(contents)'";

    main({ ...t.context, platform });

    t.ok(
      t.context.childProcess.exec.calledWith(
        sinon.match(`--format=${expected}`),
        sinon.match.func
      )
    );

    t.end();
  });

  for (const tag of ["v3.1.4", "v0.2.718", "v0.0.1"]) {
    test(`uses the environment tag on ${platform}, tag=${tag}`, (t) => {
      const ref = `refs/tags/${tag}`;
      const escapedRef = `'${ref}'`;

      t.context.core.getInput.returns(undefined);
      t.context.env.GITHUB_REF = ref;
      t.context.shescape.quote.returns(escapedRef);

      main({ ...t.context, platform });

      t.ok(t.context.shescape.quote.calledWith(ref));
      t.ok(
        t.context.childProcess.exec.calledWith(
          sinon.match(escapedRef),
          sinon.match.func
        )
      );

      t.end();
    });

    test(`uses the input tag on ${platform}, tag=${tag}`, (t) => {
      const ref = `refs/tags/${tag}`;
      const escapedRef = `'${ref}'`;

      t.context.core.getInput.returns(tag);
      t.context.shescape.quote.returns(escapedRef);

      main({ ...t.context, platform });

      t.ok(t.context.shescape.quote.calledWith(ref));
      t.ok(
        t.context.childProcess.exec.calledWith(
          sinon.match(escapedRef),
          sinon.match.func
        )
      );

      t.end();
    });
  }

  for (const annotation of ["Hello world!", "foobar"]) {
    test(`sets the annotation ("${annotation}") on ${platform}`, (t) => {
      main({ ...t.context, platform });

      t.equal(t.context.childProcess.exec.callCount, 1);
      t.context.childProcess.exec.lastCall.callback(null, annotation);

      t.notOk(t.context.core.setFailed.called);
      t.equal(t.context.core.setOutput.callCount, 1);
      t.ok(
        t.context.core.setOutput.calledWith("git-tag-annotation", annotation)
      );

      t.end();
    });
  }

  for (const err of ["Something went wrong", "Oops"]) {
    test(`handles a git error ("${err}") on ${platform}`, (t) => {
      main({ ...t.context, platform });

      t.equal(t.context.childProcess.exec.callCount, 1);
      t.context.childProcess.exec.lastCall.callback(err, null);

      t.notOk(t.context.core.setOutput.called);
      t.equal(t.context.core.setFailed.callCount, 1);
      t.ok(t.context.core.setFailed.calledWith(err));

      t.end();
    });

    test(`handles an execution error ("${err}") on ${platform}`, (t) => {
      t.context.childProcess.exec.throws(new Error(err));

      main({ ...t.context, platform });

      t.notOk(t.context.core.setOutput.called);
      t.equal(t.context.core.setFailed.callCount, 1);
      t.ok(t.context.core.setFailed.calledWith(err));

      t.end();
    });
  }
}
