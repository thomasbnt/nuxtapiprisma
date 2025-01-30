const f = require('fastify')({logger: false})
const cors = require('@fastify/cors')
f.register(cors, {
  origin: '*',
})

require('dotenv').config()

f.get('/', (request, reply) => {
  reply.header('Content-Type', 'application/json')
  return {message: 'Forbidden'}
})


// POST /persons
const persons = require('./routes/persons');
f.register(persons)

// GET /list
const list = require('./routes/list');
f.register(list)



const start = async () => {
  try {
    await f.listen({
      host: 'localhost',
      port: 4000,
    }).then(r => console.log(`Server listening on ${r}`))
  } catch (err) {
    f.log.error(err)
    process.exit(1)
  }
}
start().then(r => r)
