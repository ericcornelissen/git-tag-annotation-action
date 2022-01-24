const sinon = require("sinon");
const { suite } = require("uvu");
const assert = require("uvu/assert");

const main = require("../src/main.js");

const linux = "linux";
const win32 = "win32";

const Main = suite("Main");

Main.before.each((context) => {
  context.childProcess = {
    exec: sinon.stub(),
  };

  context.core = {
    getInput: sinon.stub(),
    setFailed: sinon.stub(),
    setOutput: sinon.stub(),
  };

  context.env = {
    GITHUB_REF: "v1.0.0",
  };

  context.shescape = {
    quote: sinon.stub(),
  };
});

for (const platform of [linux, win32]) {
  Main(`gets input at key "tag" on ${platform}`, (context) => {
    main({ ...context, platform });

    assert.ok(context.core.getInput.calledOnce);
    assert.ok(context.core.getInput.calledWith("tag"));
  });

  Main(`runs the correct git command on ${platform}`, (context) => {
    main({ ...context, platform });

    assert.ok(context.childProcess.exec.calledOnce);
    assert.ok(
      context.childProcess.exec.calledWith(
        sinon.match(/^git for-each-ref .+$/),
        sinon.match.func
      )
    );
  });

  Main(`uses the correct for-each-ref format on ${platform}`, (context) => {
    const expected = platform === win32 ? "%(contents)" : "'%(contents)'";

    main({ ...context, platform });

    assert.ok(
      context.childProcess.exec.calledWith(
        sinon.match(`--format=${expected}`),
        sinon.match.func
      )
    );
  });

  for (const tag of ["v3.1.4", "v0.2.718", "v0.0.1"]) {
    Main(`uses the input tag on ${platform}, tag=${tag}`, (context) => {
      const ref = `refs/tags/${tag}`;
      const escapedRef = `'${ref}'`;

      context.core.getInput.returns(undefined);
      context.env.GITHUB_REF = ref;
      context.shescape.quote.returns(escapedRef);

      main({ ...context, platform });

      assert.ok(context.shescape.quote.calledWith(ref));
      assert.ok(
        context.childProcess.exec.calledWith(
          sinon.match(escapedRef),
          sinon.match.func
        )
      );
    });

    Main(`uses the env tag on ${platform}, tag=${tag}`, (context) => {
      const ref = `refs/tags/${tag}`;
      const escapedRef = `'${ref}'`;

      context.core.getInput.returns(tag);
      context.shescape.quote.returns(escapedRef);

      main({ ...context, platform });

      assert.ok(context.shescape.quote.calledWith(ref));
      assert.ok(
        context.childProcess.exec.calledWith(
          sinon.match(escapedRef),
          sinon.match.func
        )
      );
    });
  }

  for (const annotation of ["Hello world!", "foobar"]) {
    Main(`sets the annotation ("${annotation}") on ${platform}`, (context) => {
      main({ ...context, platform });

      assert.ok(context.childProcess.exec.calledOnce);
      context.childProcess.exec.lastCall.callback(null, annotation);

      assert.not(context.core.setFailed.called);
      assert.ok(context.core.setOutput.calledOnce);
      assert.ok(
        context.core.setOutput.calledWith("git-tag-annotation", annotation)
      );
    });
  }

  for (const err of ["Something went wrong", "Oops"]) {
    Main(`handles a git error ("${err}") on ${platform}`, (context) => {
      main({ ...context, platform });

      assert.ok(context.childProcess.exec.calledOnce);
      context.childProcess.exec.lastCall.callback(err, null);

      assert.not(context.core.setOutput.called);
      assert.ok(context.core.setFailed.calledOnce);
      assert.ok(context.core.setFailed.calledWith(err));
    });

    Main(`handles an execution error ("${err}") on ${platform}`, (context) => {
      context.childProcess.exec.throws(new Error(err));

      main({ ...context, platform });

      assert.not(context.core.setOutput.called);
      assert.ok(context.core.setFailed.calledOnce);
      assert.ok(context.core.setFailed.calledWith(err));
    });
  }
}

Main.run();
