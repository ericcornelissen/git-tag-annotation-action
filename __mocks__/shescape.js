"use strict";

const shescape = {};

shescape.quote = jest
  .fn()
  .mockName("quote")
  .mockImplementation((x) => `'${x}'`);

module.exports = shescape;
