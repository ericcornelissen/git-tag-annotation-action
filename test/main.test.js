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
    warning: sinon.stub(),
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

    assert.is(context.core.getInput.callCount, 1);
    assert.ok(context.core.getInput.calledWithExactly("tag"));
  });

  Main(`runs the correct git command on ${platform}`, (context) => {
    main({ ...context, platform });

    assert.is(context.childProcess.exec.callCount, 1);
    assert.ok(
      context.childProcess.exec.calledWithExactly(
        sinon.match(/^git for-each-ref .+$/),
        sinon.match.func
      )
    );
  });

  Main(`uses the correct for-each-ref format on ${platform}`, (context) => {
    const expected = platform === win32 ? "%(contents)" : "'%(contents)'";

    main({ ...context, platform });

    assert.ok(
      context.childProcess.exec.calledWithExactly(
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

      assert.ok(context.shescape.quote.calledWithExactly(ref));
      assert.ok(
        context.childProcess.exec.calledWithExactly(
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

      assert.ok(context.shescape.quote.calledWithExactly(ref));
      assert.ok(
        context.childProcess.exec.calledWithExactly(
          sinon.match(escapedRef),
          sinon.match.func
        )
      );
    });
  }

  for (const annotation of ["Hello world!", "foobar"]) {
    Main(`sets the annotation ("${annotation}") on ${platform}`, (context) => {
      main({ ...context, platform });

      assert.is(context.childProcess.exec.callCount, 1);
      context.childProcess.exec.lastCall.callback(null, annotation);

      assert.not(context.core.setFailed.called);
      assert.is(context.core.setOutput.callCount, 1);
      assert.ok(
        context.core.setOutput.calledWithExactly(
          "git-tag-annotation",
          annotation
        )
      );
    });
  }

  for (const err of ["Something went wrong", "Oops"]) {
    Main(`handles a git error ("${err}") on ${platform}`, (context) => {
      main({ ...context, platform });

      assert.is(context.childProcess.exec.callCount, 1);
      context.childProcess.exec.lastCall.callback(err, null);

      assert.not(context.core.setOutput.called);
      assert.is(context.core.setFailed.callCount, 1);
      assert.ok(context.core.setFailed.calledWithExactly(err));
    });

    Main(`handles an execution error ("${err}") on ${platform}`, (context) => {
      context.childProcess.exec.throws(new Error(err));

      main({ ...context, platform });

      assert.not(context.core.setOutput.called);
      assert.is(context.core.setFailed.callCount, 1);
      assert.ok(context.core.setFailed.calledWithExactly(err));
    });
  }

  Main(`prints a deprecation warning on ${platform}`, (context) => {
    main({ ...context, platform });

    assert.ok(
      context.core.warning.calledWithExactly(
        sinon.match(
          "General support for git-tag-annotation-action@v1 ends 2022-04-30."
        )
      )
    );
    assert.ok(
      context.core.warning.calledWithExactly(
        sinon.match("Security support ends 2022-07-29.")
      )
    );
    assert.ok(context.core.warning.calledWithExactly(sinon.match("v2")));
  });
}

Main.run();
