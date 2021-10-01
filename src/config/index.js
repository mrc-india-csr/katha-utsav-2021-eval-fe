'use strict';
const {MergeIgnoringUndefined} = require("../utils/helpers");
const env = process.env.NODE_ENV;

const validEnvironments = ['local', 'prod'];

module.exports = /* istanbul ignore next */ MergeIgnoringUndefined(
  require('./defaults'),
  validEnvironments.indexOf(env) > -1 ? require('./' + env) : /* istanbul ignore next */ require('./local')
);