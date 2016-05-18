import express from 'express'

const state = {
  job1status: 'RUNNING',
  job1requestCount: 0,
  job2status: 'RUNNING',
  job2requestCount: 0
}

const setState = (key, newVal) => {
  state[key] = newVal
}

const app = express()
app.get('/jobs/1', (req, res, next) => {
  res.json({ jobId: 1, status: state.job1status })
  setState('job1requestCount', (state.job1requestCount + 1))

  // complete job1 successfully after 1st retry
  if (state.job1requestCount > 1) {
    setState('job1status', 'FINISHED')
  }
  next()
})

app.get('/jobs/2', (req, res, next) => {
  res.json({ jobId: 2, status: state.job2status })
  setState('job2requestCount', (state.job2requestCount + 1))

  if (state.job2requestCount > 2) {
    setState('job2status', 'ERROR')
  }
  next()
})

app.get('/jobs/3', (req, res, next) => {
  res.json({ jobId: 3, status: 'RUNNING' })
  next()
})

export default app
