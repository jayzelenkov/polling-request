# polling-request [![Travis][build-badge]][build] [![Circle][circle-build-badge]][circle-build] [![npm package][npm-badge]][npm]

A simple way to query async APIs.

## Installation

Using [npm](https://www.npmjs.com/):

    $ npm install --save polling-request


## Usage

Lets asume we have the following API endpoint:

request: `POST /generateReport`  
response: `{jobId: 1, status: 'RUNNING'}`

It can take between 30 seconds and 10 minutes for the back end to generate a report.

Luckily for us there is another endpoint to check the job status:

request: `GET /job/{jobId}`  
response: `{status: 'RUNNING|FINISHED', report: {  }}`

`polling-request` takes care of polling and lets us focus on writing business logic:


```js
import request from 'polling-request'
const expectedJSON = { status: 'FINISHED' }

let promise = request('/jobs/1', expectedJSON)

// polling after 1min: { status: 'RUNNING' }
// polling after 2min: { status: 'RUNNING' }
// polling after 3min: { status: 'FINISHED' }
promise.then(response => {
  showReport(response.report)
})
```


## License

MIT


[build-badge]: https://img.shields.io/travis/jzelenkov/polling-request/master.svg?style=flat-square
[build]: https://travis-ci.org/jzelenkov/polling-request

[circle-build-badge]: https://img.shields.io/circleci/project/jzelenkov/polling-request/master.svg?style=flat-square
[circle-build]: https://circleci.com/gh/jzelenkov/polling-request

[npm-badge]: https://img.shields.io/npm/v/polling-request.svg?style=flat-square
[npm]: https://www.npmjs.org/package/polling-request
