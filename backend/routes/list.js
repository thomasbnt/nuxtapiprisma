require('dotenv').config()
const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const {User} = prisma

async function list(fastify) {
  fastify.get('/list', async () => {
      try {
        console.log('GET /list')
        const list = await User.findMany({
          include: {
            jobs: true
          }
        })
        return {list}

      } catch (error) {
        console.log(error)
        return {list: error.message}
      }
    }
  );
}

module.exports = list;
