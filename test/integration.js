/* eslint-env node, mocha */
/* eslint-disable no-unused-expressions, max-len, no-console */
require('babel-polyfill')
import jsonServer from './_server'
import request from '../dist/polling-request'
import { expect } from 'chai'

let serverInstance = null
const config = { interval: 2 }

describe('polling-request integration tests', () => {
  before(() => {
    serverInstance = jsonServer.listen(3000)
  })
  after(() => {
    serverInstance.close()
  })

  describe('test succesful polling', () => {
    it('should match expected JSON on second try', async () => {
      const expectJSON = { status: 'FINISHED' }
      try {
        const response = await request('http://localhost:3000/jobs/1', expectJSON, config)
        expect(response).to.eql(Object.assign({ jobId: 1 }, expectJSON))
      } catch (err) {
        expect(err).to.not.exist
      }
    })

    it('should return expected ERROR state', async () => {
      const expectJSON = { status: 'ERROR' }
      try {
        const response = await request('http://localhost:3000/jobs/2', expectJSON, config)
        expect(response).to.eql(Object.assign({ jobId: 2 }, expectJSON))
      } catch (err) {
        expect(err).to.not.exist
      }
    })
  })

  describe('test unsuccessful polling', () => {
    it('should timeout', async () => {
      const expectJSON = { status: 'FINISHED' }
      try {
        // throws a timeout error
        await request('http://localhost:3000/jobs/3', expectJSON, config)
      } catch (err) {
        expect(err).to.exist
        expect(err).to.be.an.instanceof(Error)
      }
    })
  })
})
