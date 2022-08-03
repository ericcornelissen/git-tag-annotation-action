import fc from "fast-check";
import sinon from "sinon";
import { suite } from "uvu";
import * as assert from "uvu/assert";

import main from "../src/main.js";

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

  Main(`uses the input tag on ${platform}`, (context) => {
    fc.assert(
      fc.property(fc.string({ minLength: 1 }), (tag) => {
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
      })
    );
  });

  Main(`uses the env tag on ${platform}`, (context) => {
    fc.assert(
      fc.property(fc.string({ minLength: 1 }), (tag) => {
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
      })
    );
  });

  Main(`sets the annotation on ${platform}`, (context) => {
    fc.assert(
      fc.property(fc.string({ minLength: 1 }), (annotation) => {
        context.childProcess.exec.resetHistory();
        context.core.setOutput.resetHistory();

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
      })
    );
  });

  Main(`handles a git error on ${platform}`, (context) => {
    fc.assert(
      fc.property(fc.string({ minLength: 1 }), (err) => {
        context.childProcess.exec.resetHistory();
        context.core.setFailed.resetHistory();

        main({ ...context, platform });

        assert.is(context.childProcess.exec.callCount, 1);
        context.childProcess.exec.lastCall.callback(err, null);

        assert.not(context.core.setOutput.called);
        assert.is(context.core.setFailed.callCount, 1);
        assert.ok(context.core.setFailed.calledWithExactly(err));
      })
    );
  });

  Main(`handles an execution error on ${platform}`, (context) => {
    fc.assert(
      fc.property(fc.string({ minLength: 1 }), (err) => {
        context.core.setFailed.resetHistory();

        context.childProcess.exec.throws(new Error(err));

        main({ ...context, platform });

        assert.not(context.core.setOutput.called);
        assert.is(context.core.setFailed.callCount, 1);
        assert.ok(context.core.setFailed.calledWithExactly(err));
      })
    );
  });
}

Main.run();
