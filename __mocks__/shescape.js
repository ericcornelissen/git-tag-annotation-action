'use strict';

const shescape = jest.fn().mockName('shescape').mockImplementation(x => x);

module.exports = shescape;
