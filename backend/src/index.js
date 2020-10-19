import express from 'express';
import bodyParser from 'body-parser'
import cors from 'cors'

import { port } from './configuration';
import handlers from './handlers'

// Create server
const app = express()

app
    .use(bodyParser.json())
    .use(cors())

app.get('/', (_, response) => {
    response.end('1')
})

app.get('/get-statuses', handlers.getStatusesHandler)

app.get('/get-statistic', handlers.getStatisticHandler)

app.post('/set-params', (request, response) => {
    console.log(request.body)
    response.end()
})

app.use((_, response) => {
    response.statusCode = 404
    response.end()
})

app.use((err, response) => {
    console.error(err);
    response.statusCode = 500
    response.end()
  });

app.listen(port, () => {
    process.stdout.write(`Serving on ${port}...\n`)
})


//import getReposStats from './stats'
// getReposStats()