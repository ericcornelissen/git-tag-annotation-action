'use strict';

const shescape = jest.createMockFromModule('shescape');

shescape.quote = jest.fn().mockName('quote').mockImplementation(x => `'${x}'`);

module.exports = shescape;
