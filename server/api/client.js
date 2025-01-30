import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();
export default defineEventHandler(async (req) => {
  try {
    const data = req._path
    // Check if the path is valid from the front-end
    if (!data && !data.includes('/api/client?user=')) return {
      message: 'Missing some informations'
    }

    // Get information about the Client from the User connected
    const UserAndClient = JSON.parse(decodeURIComponent(data.replace('/api/client?user=', '')))
    const {client} = UserAndClient
    // Check if the client is valid
    if (!client) return {
      message: 'Client not found'
    }
    return {
      client
    }
  } catch (error) {
    console.error(error)
  }
})