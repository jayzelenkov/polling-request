/* eslint-env node, mocha */
/* eslint-disable no-unused-expressions */
require('babel-polyfill')
import { expect } from 'chai'
import request from '../dist/polling-request'

describe('polling-request unit tests', () => {
  it('should export polling-request function', () => {
    expect(request).to.exist
    expect(request).to.be.an.instanceof(Function)
  })
})
