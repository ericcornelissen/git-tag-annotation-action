"use strict";

const core = jest.createMockFromModule("@actions/core");

core.getInput = jest.fn().mockName("core.getInput");
core.setFailed = jest.fn().mockName("core.setFailed");
core.setOutput = jest.fn().mockName("core.setOutput");

module.exports = core;
