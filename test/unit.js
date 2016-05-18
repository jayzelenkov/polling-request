/* eslint-env node, mocha */
/* eslint-disable no-unused-expressions */
require('babel-polyfill')
import chai, { expect } from 'chai'
import spies from 'chai-spies'
chai.use(spies)
import request from '../dist/polling-request'

describe('polling-request unit tests', () => {
  it('should export polling-request function', () => {
    expect(request).to.exist
    expect(request).to.be.an.instanceof(Function)
  })
})
