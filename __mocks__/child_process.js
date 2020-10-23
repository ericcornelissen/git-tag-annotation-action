'use strict';

const child_process = jest.createMockFromModule('child_process');

child_process.exec = jest.fn().mockName('exec');

module.exports = child_process;
