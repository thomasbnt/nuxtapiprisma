require('dotenv').config()
const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const {User} = prisma

async function persons(fastify) {
  fastify.post('/persons', async (req) => {
      try {
        console.log('GET /persons')
        console.log(req.body.jobs)
        if (!req.body || !req.body.firstname || !req.body.lastname
          || !req.body.birthday || !req.body.jobs[0]
          || !req.body.jobs[0]?.job || !req.body.jobs[0]?.position || !req.body.jobs[0]?.start) {
          return {error: 'Il manque des informations'}
        }

        if (!req.body.birthday.match(/^\d{4}-\d{2}-\d{2}$/)) {
          return {error: 'Format de date invalide pour la date de naissance'}
        }

        if (!req.body.jobs[0].start.match(/^\d{4}-\d{2}-\d{2}$/)) {
          return {error: 'Format de date invalide pour la date de début'}
        }

        req.body.birthday = new Date(req.body.birthday).toISOString()
        req.body.jobs[0].start = new Date(req.body.jobs[0].start).toISOString()
        if (typeof req.body.jobs[0].job !== 'string' || typeof req.body.jobs[0].position !== 'string'
          || typeof req.body.firstname !== 'string' || typeof req.body.lastname !== 'string') {
          return {error: 'Veuillez renseigner des chaînes de caractères'}
        }

        const age = new Date().getFullYear() - new Date(req.body.birthday).getFullYear()
        if (age > 150) {
          return {error: 'Age invalide'}
        }

        const jobs = []
        jobs.push({
          job: req.body.jobs[0].job,
          position: req.body.jobs[0].position,
          start: req.body.jobs[0].start,
          end: req.body.jobs[0].end ? req.body.jobs[0].end : null
        })

        const person = await User.create({
          data: {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            birthday: req.body.birthday,
            jobs: {
              create: jobs
            }
          }
        })

        return {person}
      } catch (error) {
        console.log(error)
        return {person: error.message}
      }
    }
  );
}

module.exports = persons;
